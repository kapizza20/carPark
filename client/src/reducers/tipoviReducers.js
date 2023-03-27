import { FETCH_TIP,FETCH_TIPOVI,UPDATE_TIPOVI,DELETE_TIPOVI, CREATE_TIPOVI} from "../actions/types";
import _ from "lodash";

export default (state={},action)=>{
    switch(action.type){
        case FETCH_TIPOVI:
            return {...state, ..._.mapKeys(action.payload,"IDTipa")};
        case CREATE_TIPOVI:
            return({...state });
        case FETCH_TIP:
            return({...state, [action.payload.IDTipa]:action.payload});
        case UPDATE_TIPOVI:
            return({...state});
        case DELETE_TIPOVI:
            return _.omit(state, action.payload);
        default:
            return state;
    }

}