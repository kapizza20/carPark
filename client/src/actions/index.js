import {FETCH_MARKE, CREATE_MARKE, FETCH_MARKU,UPDATE_MARKE, DELETE_MARKE,
    CREATE_TIPOVI,FETCH_TIPOVI,FETCH_TIP,DELETE_TIPOVI,UPDATE_TIPOVI,
    FETCH_STATUSI, CREATE_STATUSI, FETCH_STATUS, UPDATE_STATUSI, DELETE_STATUSI,
    FETCH_VOZILA, CREATE_VOZILA, FETCH_VOZILO, UPDATE_VOZILA, DELETE_VOZILA,
    FETCH_CIN,CREATE_CINOVI,UPDATE_CINOVI,DELETE_CINOVI,FETCH_CINOVI,
    FETCH_EVIDENCIJA,UPDATE_EVIDENCIJE,CREATE_EVIDENCIJE,DELETE_EVIDENCIJE,FETCH_EVIDENCIJE,
    FETCH_VOZACA,CREATE_VOZACI,UPDATE_VOZACI,DELETE_VOZACI,FETCH_VOZACI
    } from './types';
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

//! ************************************TIPOVI**************************************

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

//! ************************************STATUSI**************************************

export const fetchStatusi=()=> async dispatch=>{
    const response=await axios.get(`http://${PORT}/statusi`)
        dispatch({type:FETCH_STATUSI, payload:response.data})
    //console.log(response); -> promise
}

export const createStatusi=(formValues)=>async dispatch=>{
    const response=await axios.post(`http://${PORT}/statusi`,{...formValues})
        dispatch({type:CREATE_STATUSI, payload:response.data})
}

export const fetchStatus=(id)=> async dispatch=>{
    const response=await axios.get(`http://${PORT}/statusi/edit/${id}`);
        dispatch({type:FETCH_STATUS,payload:response.data}); 
}

export const updateStatusi=(id,formValues)=>async dispatch=>{
    const response=await axios.patch(`http://${PORT}/statusi/edit/${id}`,{...formValues});
    //console.log(response.config.data);
    dispatch({type:UPDATE_STATUSI, payload:{res:response.config.data,id:id}})
}

export const deleteStatusi=(id)=>async dispatch=>{
    //console.log(id);
    const response=await axios.delete(`http://${PORT}/statusi/delete/${id}`,{id});
    dispatch({type:DELETE_STATUSI, payload:id})
}

//! *************************************VOZILA**************************************

export const fetchVozila=()=> async dispatch=>{
    const response=await axios.get(`http://${PORT}/vozila`)
        dispatch({type:FETCH_VOZILA, payload:response.data})
    //console.log(response); -> promise
}

export const createVozila=(formValues)=>async dispatch=>{
    const response=await axios.post(`http://${PORT}/vozila`,{...formValues})
        dispatch({type:CREATE_VOZILA, payload:response.data})
}

export const fetchVozilo=(id)=> async dispatch=>{
    const response=await axios.get(`http://${PORT}/vozila/edit/${id}`);
        dispatch({type:FETCH_VOZILO,payload:response.data}); 
}

export const updateVozila=(id,formValues)=>async dispatch=>{
    const response=await axios.patch(`http://${PORT}/vozila/edit/${id}`,{...formValues});
    //console.log(response.config.data);
    dispatch({type:UPDATE_VOZILA, payload:{res:response.config.data,id:id}})
}

export const deleteVozila=(id)=>async dispatch=>{
    //console.log(id);
    const response=await axios.delete(`http://${PORT}/vozila/delete/${id}`,{id});
    dispatch({type:DELETE_VOZILA, payload:id})
}

//! ******************************CINOVI**********************************

export const fetchCinovi=()=> async dispatch=>{
    const response=await axios.get(`http://${PORT}/cinovi`)
        dispatch({type:FETCH_CINOVI, payload:response.data})
    //console.log(response); -> promise
}

export const createCinovi=(formValues)=>async dispatch=>{
    const response=await axios.post(`http://${PORT}/cinovi`,{...formValues})
        dispatch({type:CREATE_CINOVI, payload:response.data})
}

export const fetchCin=(id)=> async dispatch=>{
    const response=await axios.get(`http://${PORT}/cinovi/edit/${id}`);
        dispatch({type:FETCH_CIN,payload:response.data}); 
}

export const updateCinovi=(id,formValues)=>async dispatch=>{
    const response=await axios.patch(`http://${PORT}/cinovi/edit/${id}`,{...formValues});
    //console.log(response.config.data);
    dispatch({type:UPDATE_CINOVI, payload:{res:response.config.data,id:id}})
}

export const deleteCinovi=(id)=>async dispatch=>{
    //console.log(id);
    const response=await axios.delete(`http://${PORT}/cinovi/delete/${id}`,{id});
    dispatch({type:DELETE_CINOVI, payload:id})
}

//! ******************************VOZACI**********************************

export const fetchVozaci=()=> async dispatch=>{
    const response=await axios.get(`http://${PORT}/vozaci`)
        dispatch({type:FETCH_VOZACI, payload:response.data})
    //console.log(response); -> promise
}

export const createVozaci=(formValues)=>async dispatch=>{
    const response=await axios.post(`http://${PORT}/vozaci`,{...formValues})
        dispatch({type:CREATE_VOZACI, payload:response.data})
}

export const fetchVozaca=(id)=> async dispatch=>{
    const response=await axios.get(`http://${PORT}/vozaci/edit/${id}`);
        dispatch({type:FETCH_VOZACA,payload:response.data}); 
}

export const updateVozaci=(id,formValues)=>async dispatch=>{
    const response=await axios.patch(`http://${PORT}/vozaci/edit/${id}`,{...formValues});
    //console.log(response.config.data);
    dispatch({type:UPDATE_VOZACI, payload:{res:response.config.data,id:id}})
}

export const deleteVozaci=(id)=>async dispatch=>{
    //console.log(id);
    const response=await axios.delete(`http://${PORT}/vozaci/delete/${id}`,{id});
    dispatch({type:DELETE_VOZACI, payload:id})
}

//! ******************************EVIDENCIJA**********************************

export const fetchEvidencije=()=> async dispatch=>{
    const response=await axios.get(`http://${PORT}/evidencije`)
        dispatch({type:FETCH_EVIDENCIJE, payload:response.data})
    //console.log(response); -> promise
}

export const createEvidencije=(formValues)=>async dispatch=>{
    const response=await axios.post(`http://${PORT}/evidencije`,{...formValues})
        dispatch({type:CREATE_EVIDENCIJE, payload:response.data})
}

export const fetchEvidencija=(id)=> async dispatch=>{
    const response=await axios.get(`http://${PORT}/evidencije/edit/${id}`);
        dispatch({type:FETCH_EVIDENCIJA,payload:response.data}); 
}

export const updateEvidencije=(id,formValues)=>async dispatch=>{
    const response=await axios.patch(`http://${PORT}/evidencije/edit/${id}`,{...formValues});
    //console.log(response.config.data);
    dispatch({type:UPDATE_EVIDENCIJE, payload:{res:response.config.data,id:id}})
}

export const deleteEvidencije=(id)=>async dispatch=>{
    //console.log(id);
    const response=await axios.delete(`http://${PORT}/evidencije/delete/${id}`,{id});
    dispatch({type:DELETE_EVIDENCIJE, payload:id})
}