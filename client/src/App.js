import * as React from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from "./components/NavBar/NavBar";
import { Home, Detail, Form, Landing } from "./views";
import { Route } from "react-router-dom";

function App() {

  const location = useLocation();


  return (
    <div className="App">
      {location.pathname !== '/' && <NavBar/>}
      
      
      <Route exact path='/' component = {Landing}/>
      <Route path='/home' render = {()=><Home/>} /> 
      <Route exact path='/detail' component = {Detail}/>
      <Route exact path='/form' component = {Form}/>
      
      
      
      


    </div>
  );
}

export default App;
