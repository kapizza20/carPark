import { FETCH_VOZILA,FETCH_VOZILO,DELETE_VOZILA,UPDATE_VOZILA,CREATE_VOZILA} from "../actions/types";
import _ from "lodash";

export default (state={},action)=>{
    switch(action.type){
        case FETCH_VOZILA:
            return {...state, ..._.mapKeys(action.payload,"IDVozila")};
        case CREATE_VOZILA:
            return({...state });
        case FETCH_VOZILO:
            return({...state, [action.payload.IDVozila]:action.payload});
        case UPDATE_VOZILA:
            return({...state});
        case DELETE_VOZILA:
            return _.omit(state, action.payload);
        default:
            return state;
    }

}