import {FETCH_MARKE, CREATE_MARKE} from './types';
import axios from "axios";

export const fetchMarke=()=> async dispatch=>{
    const response=await axios.get('http://localhost:3001/marke')
        dispatch({type:FETCH_MARKE, payload:response.data})
    //console.log(response); -> promise
}

export const createMarke=(formValues)=>async dispatch=>{
     const response=await axios.post('http://localhost:3001/marke',{...formValues})
        dispatch({type:CREATE_MARKE, payload:response.data})
}

