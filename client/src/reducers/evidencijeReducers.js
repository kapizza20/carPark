import { FETCH_EVIDENCIJE,FETCH_EVIDENCIJA,UPDATE_EVIDENCIJE,DELETE_EVIDENCIJE,CREATE_EVIDENCIJE } from "../actions/types";
import _ from "lodash";

export default (state={},action)=>{
    switch(action.type){
        case FETCH_EVIDENCIJE:
            return {...state, ..._.mapKeys(action.payload,"IDEvidencije")};
        case CREATE_EVIDENCIJE:
            return({...state });
        case FETCH_EVIDENCIJA:
            return({...state, [action.payload.IDEvidencije]:action.payload});
        case UPDATE_EVIDENCIJE:
            return({...state,});
        case DELETE_EVIDENCIJE:
            return _.omit(state, action.payload);
        default:
            return state;
    }

}