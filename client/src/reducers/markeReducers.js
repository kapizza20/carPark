import { FETCH_MARKE, CREATE_MARKE } from "../actions/types";
import _ from "lodash";

export default (state={},action)=>{
    switch(action.type){
        case FETCH_MARKE:
            return {...state, ..._.mapKeys(action.payload,"IDMarkeVozila")};
        case CREATE_MARKE:
            return({...state, [action.payload.id]:action.payload});
        default:
            return state;
    }

}