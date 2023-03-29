import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form'
//import {reducer as formReducer} from 'redux-form'
import markeReducers from "./markeReducers";
import tipoviReducers from './tipoviReducers';
import statusiReducers from './statusiReducers';
import vozilaReducers from './vozilaReducers';

export default combineReducers({
   marke: markeReducers,
   tipovi: tipoviReducers,
   statusi: statusiReducers,
   vozila: vozilaReducers,
   form: formReducer
});

