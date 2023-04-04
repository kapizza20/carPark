import { FETCH_CIN,FETCH_CINOVI,UPDATE_CINOVI,DELETE_CINOVI,CREATE_CINOVI } from "../actions/types";
import _ from "lodash";

export default (state={},action)=>{
    switch(action.type){
        case FETCH_CINOVI:
            return {...state, ..._.mapKeys(action.payload,"IDCina")};
        case CREATE_CINOVI:
            return({...state });
        case FETCH_CIN:
            return({...state, [action.payload.IDCina]:action.payload});
        case UPDATE_CINOVI:
            return({...state,});
        case DELETE_CINOVI:
            return _.omit(state, action.payload);
        default:
            return state;
    }

}