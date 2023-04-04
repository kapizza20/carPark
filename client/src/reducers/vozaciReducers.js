import { FETCH_VOZACA,FETCH_VOZACI,CREATE_VOZACI,UPDATE_VOZACI,DELETE_VOZACI } from "../actions/types";
import _ from "lodash";

export default (state={},action)=>{
    switch(action.type){
        case FETCH_VOZACI:
            return {...state, ..._.mapKeys(action.payload,"IDVozaca")};
        case CREATE_VOZACI:
            return({...state });
        case FETCH_VOZACA:
            return({...state, [action.payload.IDVozaca]:action.payload});
        case UPDATE_VOZACI:
            return({...state,});
        case DELETE_VOZACI:
            return _.omit(state, action.payload);
        default:
            return state;
    }

}