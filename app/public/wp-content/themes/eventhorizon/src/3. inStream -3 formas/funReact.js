function mifunction(props){
  // alert(props);
  return ('xxFunciona la invocacion, pero no consigo que muestre los parm entrada');
}

const domContainer = document.querySelector('plin');
// console.log(domContainer)

const root = ReactDOM.createRoot(domContainer);
root.render(React.createElement(mifunction))
