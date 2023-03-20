import React from 'react';
import './App.css';
import {BrowserRouter,Route,Routes} from "react-router-dom";
import Home from './pages/Home.js';
import Header from './components/Header.js';
import CreateMarke from './pages/CreateMarke';

const App=()=> {

  return (
    <div className="App">
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" exact element={<Home/>} />
        <Route path='/createMarke' exact element={<CreateMarke/>}/>
      </Routes> 
    </BrowserRouter>
    </div>
  );
}

export default App;
