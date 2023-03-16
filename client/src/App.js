import './App.css';
import axios from "axios";
import {useEffect, useState} from "react";

const App=()=> {

  const [listOfMarke,setListOfMarke]=useState([]);

  useEffect(()=>{
    axios.get('http://localhost:3001/marke').then((response)=>{
      setListOfMarke(response.data);

    })
  },[]);

  const renderList=listOfMarke.map((value,key)=>{
      return (
      <div className=''>
        <div className='title'>
          {value.NazivMarke}
        </div>
        <div className='date'>
          {value.updatedAt}
        </div>
      </div>)
    })

  return (
    <div className="App">
     {renderList}
    </div>
  );
}

export default App;
