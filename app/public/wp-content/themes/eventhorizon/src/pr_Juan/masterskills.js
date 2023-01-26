function masterSkills(bigArray) {
  bigArray = bigArray.sort();
  bigArray = bigArray.map(resumeSkills);
  console.log(
    "Fase-1: Marcados los repetidos. Quedan los acumulados como objetos y registado el tipo "
  );
  console.log(bigArray);
  return bigArray.filter((v) => v);
}

function resumeSkills(value, i, arr) {
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
  xVal = Number(value);
  if (isNaN(xVal)) return value;
  tot += xVal;
  if (tot > MAX) return MAX;
  return tot;
}

function genOut(item, nota) {
  const type = nota == 0 ? "habi" : nota > 0 ? "cono" : "idio";
  return { type, item, nota };
}

function viewTipo(array, tipo) {
  array = array.filter((v) => v.type == tipo);
  const rc = array.reduce((resul, v) => {
    return (resul += v.item + " = " + v.nota + "<br>");
  }, "<hr>>>> <strong>Apartado de " + tipo.toUpperCase() + "</strong> <<<<br>");
  return rc;
}
