import {FETCH_MARKE, CREATE_MARKE, FETCH_MARKU,UPDATE_MARKE, DELETE_MARKE} from './types';
import axios from "axios";

export const fetchMarke=()=> async dispatch=>{
    const response=await axios.get('http://localhost:3001/marke')
        dispatch({type:FETCH_MARKE, payload:response.data})
    //console.log(response); -> promise
}

export const fetchMarku=(id)=> async dispatch=>{
    const response=await axios.get(`http://localhost:3001/marke/edit/${id}`);
        dispatch({type:FETCH_MARKU,payload:response.data}); 
}

export const createMarke=(formValues)=>async dispatch=>{
    const response=await axios.post('http://localhost:3001/marke',{...formValues})
        dispatch({type:CREATE_MARKE, payload:response.data})
}

export const updateMarke=(id,formValues)=>async dispatch=>{
    const response=await axios.patch(`http://localhost:3001/marke/edit/${id}`,{...formValues});
    dispatch({type:UPDATE_MARKE, payload:response.data})
}

export const deleteMarke=(id)=>async dispatch=>{
    //console.log(id);
    const response=await axios.delete(`http://localhost:3001/marke/delete/${id}`,{id});
    dispatch({type:DELETE_MARKE, payload:id})
}