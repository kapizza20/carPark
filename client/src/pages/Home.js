import React from "react";
import axios from "axios";
import {useEffect, useState} from "react";

const Home=()=>{
    const [listOfMarke,setListOfMarke]=useState([]);

    useEffect(()=>{
        axios.get('http://localhost:3001/marke')
            .then((response)=>{
                setListOfMarke(response.data);
            })
    },[]);

    const render=listOfMarke.map((value,key)=>{
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

    return render;
}

export default Home;