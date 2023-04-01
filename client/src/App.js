import React from 'react';
import './App.css';
import {BrowserRouter,Route,Routes} from "react-router-dom";
import Header from './components/Header.js';

import HomeMarke from './pages/HomeMarke.js';
import CreateMarke from './pages/CreateMarke';
import EditMarke from './pages/EditMarke';
import DeleteMarke from './pages/DeleteMarke';

import HomeTipovi from './pages/HomeTipovi';
import CreateTipovi from './pages/CreateTipovi';
import EditTipovi from './pages/EditTipovi';
import DeleteTipovi from './pages/DeleteTipovi';

import HomeStatusi from './pages/HomeStatusi';
import CreateStatusi from './pages/CreateStatusi';
import EditStatusi from './pages/EditStatusi';
import DeleteStatusi from './pages/DeleteStatusi';

import HomeVozila from './pages/HomeVozila';
import CreateVozila from './pages/CreateVozila';
import EditVozila from './pages/EditVozila';
import DeleteVozila from './pages/DeleteVozila';

const App=()=> {

  return (
    <div className="App">
    <BrowserRouter >
      <Header/>
      <Routes>
        <Route path="/" Component={()=>(<div>Dobrodosli</div>)}/>
        <Route path="/marke" exact element={<HomeMarke/>} />
        <Route path="/marke/createMarke" exact element={<CreateMarke/>}/>
        <Route path="/marke/editMarke/:id" exact element={<EditMarke/>}/>
        <Route path="/marke/deleteMarke/:id" exact element={<DeleteMarke/>}/>

        <Route path='/tipovi' exact element={<HomeTipovi/>}/>
        <Route path="/tipovi/createTipovi" exact element={<CreateTipovi/>}/>
        <Route path="/tipovi/editTipovi/:id" exact element={<EditTipovi/>}/>
        <Route path="/tipovi/deleteTipovi/:id" exact element={<DeleteTipovi/>}/>

        <Route path='/Statusi' exact element={<HomeStatusi/>}/>
        <Route path="/Statusi/createStatusi" exact element={<CreateStatusi/>}/>
        <Route path="/Statusi/editStatusi/:id" exact element={<EditStatusi/>}/>
        <Route path="/Statusi/deleteStatusi/:id" exact element={<DeleteStatusi/>}/>

        <Route path='/Vozila' exact element={<HomeVozila/>}/>
        <Route path="/Vozila/createVozila" exact element={<CreateVozila/>}/>
        <Route path="/Vozila/editVozila/:id" exact element={<EditVozila/>}/>
        <Route path="/Vozila/deleteVozila/:id" exact element={<DeleteVozila/>}/>

        <Route path="*" Component={()=>(<div>Тражена страница не постоји, направили сте грешку!</div>)} />
      </Routes> 
    </BrowserRouter>
    </div>
  );
}
        

export default App;
