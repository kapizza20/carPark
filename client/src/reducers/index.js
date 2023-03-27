import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form'
//import {reducer as formReducer} from 'redux-form'
import markeReducers from "./markeReducers";
import tipoviReducers from './tipoviReducers'

export default combineReducers({
   marke: markeReducers,
   tipovi: tipoviReducers,
   form: formReducer
});

