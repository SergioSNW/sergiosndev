import ReactDOM from 'react-dom'
function MyComponent(props) {
    return (
      <div>
        <p>Hola, {props.name}</p>
        <p>Que tengas un buen dia!</p>
      </div>
    );
  }        
  ReactDOM.render(<MyComponent name="Pepe" />, 
      document.getElementById('app'));
