import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form'
//import {reducer as formReducer} from 'redux-form'
import markeReducers from "./markeReducers";

export default combineReducers({
   marke: markeReducers,
   form: formReducer
});

