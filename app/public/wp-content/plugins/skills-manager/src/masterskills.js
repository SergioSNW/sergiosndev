//  - Importante para import/export:
//    Solo hay que exportar las funciones principales que se van a
//    llamar desde el importador; las funciones de apoyo no deben
//    ser exportadas. Aqui, solo se exporta prFetch

//  - Definicion de variables globales para que funcione resumeSkills
//    ya que deben mantener su valor entre llamadas
var it, cmp, total, result;
var displ = 1; // switch para displayar (si=1/no=0)

export function tratarRecopSkills(bigArray) {
  var arrWork = [];
  let sum = [];
  bigArray.map((v) => {
    if (v.acf.skill) {
      v.acf.skill.forEach((element) => {
        arrWork.push(element.name);
      });
    }
  });
  if (displ) console.log("prFetch> Skills recopilados: ", arrWork);
  sum = masterSkills(arrWork);
  if (displ) console.log("prFetch> Fase-2: Generado el master: ", sum);
  return sum;
}

export function prFetch(uri, label) {
  var arrWork = [];
  let sum = [];
  let vista;
  fetch(uri)
    .then((res) => res.json())
    .then((res) => {
      res.map((v) => {
        if (v.acf.skill) {
          v.acf.skill.forEach((element) => {
            arrWork.push(element.name);
          });
        }
      });
      if (displ) console.log("prFetch> Skills recopilados: ", arrWork);
      sum = masterSkills(arrWork);
      if (displ) console.log("prFetch> Fase-2: Generado el master: ", sum);
      return sum;
      vista = viewTipo(sum, "cono");
      vista += viewTipo(sum, "habi");
      vista += viewTipo(sum, "idio");
      return vista;

      // document.getElementById(label).innerHTML =
      //   arrWork + "<hr>" + JSON.stringify(sum) + vista;
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
  let timerId = setTimeout(function plan() {
    console.log("msg desde plan. Delay:", delay, ", id_timer: ", timerId);
    delay = delay < 100 ? 0 : delay / 2;
    if (delay > 0) {
      timerId = setTimeout(plan, delay);
    }
  }, delay);
}
