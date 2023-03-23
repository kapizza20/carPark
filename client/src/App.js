import React from 'react';
import './App.css';
import {BrowserRouter,Route,Routes} from "react-router-dom";
import Home from './pages/Home.js';
import Header from './components/Header.js';
import CreateMarke from './pages/CreateMarke';
import EditMarke from './pages/EditMarke';
import DeleteMarke from './pages/DeleteMarke';

const App=()=> {

  return (
    <div className="App">
    <BrowserRouter >
      <Header/>
      <Routes>
        <Route path="/" exact element={<Home/>} />
        <Route path="/marke/createMarke" exact element={<CreateMarke/>}/>
        <Route path="/marke/editMarke/:id" exact element={<EditMarke/>}/>
        <Route path="/marke/deleteMarke/:id" exact element={<DeleteMarke/>}/>
      </Routes> 
    </BrowserRouter>
    </div>
  );
}

export default App;
