import {FETCH_MARKE, CREATE_MARKE, FETCH_MARKU,UPDATE_MARKE, DELETE_MARKE,
     CREATE_TIPOVI,FETCH_TIPOVI,FETCH_TIP,DELETE_TIPOVI,UPDATE_TIPOVI} from './types';
import axios from "axios";

const PORT='localhost:3001';

export const fetchMarke=()=> async dispatch=>{
    const response=await axios.get(`http://${PORT}/marke`)
        dispatch({type:FETCH_MARKE, payload:response.data})
    //console.log(response); -> promise
}

export const fetchMarku=(id)=> async dispatch=>{
    const response=await axios.get(`http://${PORT}/marke/edit/${id}`);
        dispatch({type:FETCH_MARKU,payload:response.data}); 
}

export const createMarke=(formValues)=>async dispatch=>{
    const response=await axios.post(`http://${PORT}/marke`,{...formValues})
        dispatch({type:CREATE_MARKE, payload:response.data})
}

export const updateMarke=(id,formValues)=>async dispatch=>{
    const response=await axios.patch(`http://${PORT}/marke/edit/${id}`,{...formValues});
    //console.log(response.config.data);
    dispatch({type:UPDATE_MARKE, payload:{res:response.config.data,id:id}})
}

export const deleteMarke=(id)=>async dispatch=>{
    //console.log(id);
    const response=await axios.delete(`http://${PORT}/marke/delete/${id}`,{id});
    dispatch({type:DELETE_MARKE, payload:id})
}


export const fetchTipovi=()=> async dispatch=>{
    const response=await axios.get(`http://${PORT}/tipovi`)
        dispatch({type:FETCH_TIPOVI, payload:response.data})
    //console.log(response); -> promise
}

export const createTipovi=(formValues)=>async dispatch=>{
    const response=await axios.post(`http://${PORT}/tipovi`,{...formValues})
        dispatch({type:CREATE_TIPOVI, payload:response.data})
}

export const fetchTip=(id)=> async dispatch=>{
    const response=await axios.get(`http://${PORT}/tipovi/edit/${id}`);
        dispatch({type:FETCH_TIP,payload:response.data}); 
}

export const updateTipovi=(id,formValues)=>async dispatch=>{
    const response=await axios.patch(`http://${PORT}/tipovi/edit/${id}`,{...formValues});
    //console.log(response.config.data);
    dispatch({type:UPDATE_TIPOVI, payload:{res:response.config.data,id:id}})
}

export const deleteTipovi=(id)=>async dispatch=>{
    //console.log(id);
    const response=await axios.delete(`http://${PORT}/tipovi/delete/${id}`,{id});
    dispatch({type:DELETE_TIPOVI, payload:id})
}