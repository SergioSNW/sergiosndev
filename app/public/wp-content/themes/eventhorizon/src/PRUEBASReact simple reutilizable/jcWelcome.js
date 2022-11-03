function AccesoAutorizado(props) {
  return <h1>Bienvenido!</h1>;
}

function AccesoNoAutorizado(props) {
  return <h1>Acceso no autorizado!!</h1>;
}

function Acceder(props) {
  const tieneAcceso = props.tieneAcceso;
  if (tieneAcceso) {
    return <AccesoAutorizado />;
  }
  return <AccesoNoAutorizado />;
}

ReactDOM.render(
  <Acceder tieneAcceso={false} />,
  document.getElementById('lolo')
);