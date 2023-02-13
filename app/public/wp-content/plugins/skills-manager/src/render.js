// -Definicion de variables globales para que funcione resumeSkills
// ya que deben mantener su valor entre llamadas
// -Definicion del flag paa displays
var it, cmp, total, result;
var displ = 1; // switch para displays en consola (si=1/no=0)

const requestURL = "http://eventhorizon.jc";
opcFetch(); //-- Llamada a version 1

//======================= RUTINAS ==============================
function opcFetch(site = location.origin) {
  // - Rutina que hace la recopilacion y sustitucion del contenido de los blocks, dinamicamente, mediante FETCHs
  var arrWork = [];
  let sumary = [];
  let vista;
  let jsonGral = [];
  if (displ) console.log("opcFech / parm-in: ", site);

  fetch(site + "/wp-json/wp/v2/courses")
    .then((res) => res.json())

    .then((res) => {
      console.log("json1: ", res);
      jsonGral = res;
      fetch(site + "/wp-json/wp/v2/jobs")
        .then((res) => res.json())

        .then((res) => {
          console.log("json2: ", res);
          jsonGral = jsonGral.concat(res);
          console.log("jsonGral: ", jsonGral);
          jsonGral.map((v) => {
            if (v.acf.skill) {
              v.acf.skill.forEach((element) => {
                arrWork.push(element.name);
              });
            }
          });

          if (displ) console.log("opcFetch> Skills recopilados_J: ", arrWork);
          sumary = masterSkills(arrWork);
          if (displ)
            console.log("opcFetch> Fase-2: Generado el master: ", sumary);

          const types = ["cono", "habi", "idio"];
          for (let j = 0; j < types.length; j++) {
            let nodes = document.getElementsByClassName(types[j]);

            for (let i = 0; i < nodes.length; i++) {
              if (!i) {
                if (displ) console.log("relleno-1. type: ", types[j]);
                vista = viewTipo(sumary, types[j]);
                if (displ) console.log("relleno-2. vista: ", vista);
              }
              nodes[i].innerHTML = vista;
            }
          }
        });
    })
    .catch((err) => console.error(err));
}

function viewTipo(array, tipo) {
  if (displ) console.log("viewTipo> parm-in: ", array, tipo);
  array = array.filter((v) => v.type == tipo);
  const rc = array.reduce((resul, v) => {
    return (resul += v.item + " = " + v.nota + "<br>");
  }, "<hr>>>> <strong>Apartado de " + tipo.toUpperCase() + "</strong> <<<<br>");
  return rc;
}

function masterSkills(bigArray) {
  // var it, cmp, total, result;
  bigArray = bigArray.sort();
  bigArray = bigArray.map(resumeSkills);
  if (displ)
    console.log(
      "masterSkills> Fase-1: Marcados los repetidos. Quedan los acumulados como objetos y registado el tipo ",
      bigArray
    );
  return bigArray.filter((v) => v);
}

function resumeSkills(value, i, arr) {
  if (displ) console.log("tto: ", i, value);
  if (i == 0) {
    it = value.split("+");
    cmp = it[0];
    total = ctlCuantif(it[1], 0);
  }

  if (i >= arr.length - 1) {
    return genOut(cmp, total);
  }

  it = arr[i + 1].split("+");
  if (it[0] == cmp) {
    total = ctlCuantif(it[1], total);
    return false;
  } else {
    result = genOut(cmp, total);
    total = ctlCuantif(it[1], 0);
    cmp = it[0];
    return result;
  }
}

function ctlCuantif(value, tot, MAX = 5) {
  let xVal = Number(value);
  if (isNaN(xVal)) return value;
  tot += xVal;
  if (tot > MAX) return MAX;
  return tot;
}

function genOut(item, nota) {
  if (displ) console.log("genOut. Parm-in: ", item, nota);
  const type = nota == 0 ? "habi" : nota > 0 ? "cono" : "idio";
  return { type, item, nota };
}

function retardo(delay) {
  // Funcion de prueba para ver uso del setTimeout
  let timerId = setTimeout(function plan() {
    console.log("msg desde plan. Delay:", delay, ", id_timer: ", timerId);
    delay = delay < 100 ? 0 : delay / 2;
    if (delay > 0) {
      timerId = setTimeout(plan, delay);
    }
  }, delay);
}
