import { Home, Detail, Form, Landing } from "./views";
import { Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      {/* de esta forma no se le pueden pasar props al componente*/}
      <Route exact path='/' component = {Landing}/>
      <Route exact path='/detail' component = {Detail}/>
      <Route exact path='/form' component = {Form}/>
      {/* de esta forma si le puedo pasar props al componente*/}
      <Route path='/home' render = {()=><Home/>} /> 
      
      
      


    </div>
  );
}

export default App;
