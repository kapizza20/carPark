import { FETCH_STATUSI, FETCH_STATUS,UPDATE_STATUSI,DELETE_STATUSI,CREATE_STATUSI } from "../actions/types";
import _ from "lodash";

export default (state={},action)=>{
    switch(action.type){
        case FETCH_STATUSI:
            return {...state, ..._.mapKeys(action.payload,"IDStatusa")};
        case CREATE_STATUSI:
            return({...state });
        case FETCH_STATUS:
            return({...state, [action.payload.IDStatusa]:action.payload});
        case UPDATE_STATUSI:
            return({...state,});
        case DELETE_STATUSI:
            return _.omit(state, action.payload);
        default:
            return state;
    }

}