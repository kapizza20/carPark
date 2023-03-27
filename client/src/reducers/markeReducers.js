import { FETCH_MARKE,FETCH_MARKU, CREATE_MARKE, UPDATE_MARKE, DELETE_MARKE } from "../actions/types";
import _ from "lodash";

export default (state={},action)=>{
    switch(action.type){
        case FETCH_MARKE:
            return {...state, ..._.mapKeys(action.payload,"IDMarkeVozila")};
        case CREATE_MARKE:
            return({...state });
        case FETCH_MARKU:
            return({...state, [action.payload.IDMarkeVozila]:action.payload});
        case UPDATE_MARKE:
            
            return({...state,});
        case DELETE_MARKE:
            return _.omit(state, action.payload);
        default:
            return state;
    }

}