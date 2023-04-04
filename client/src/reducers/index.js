import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form'
//import {reducer as formReducer} from 'redux-form'
import markeReducers from "./markeReducers";
import tipoviReducers from './tipoviReducers';
import statusiReducers from './statusiReducers';
import vozilaReducers from './vozilaReducers';
import vozaciReducers from './vozaciReducers';
import evidencijeReducers from './evidencijeReducers';
import cinoviReducers from './cinoviReducers';


export default combineReducers({
   marke: markeReducers,
   tipovi: tipoviReducers,
   statusi: statusiReducers,
   vozila: vozilaReducers,
   cinovi:cinoviReducers,
   vozaci:vozaciReducers,
   evidencije:evidencijeReducers,
   form: formReducer
});

