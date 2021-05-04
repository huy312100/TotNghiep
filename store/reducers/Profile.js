import {CONNECT_APPLICATION} from "./../actions/Profile";

const initialState = {}

export default (state = initialState, action)=>{
    switch(action.type){
        case CONNECT_APPLICATION:
            return state;
        default:
            return state;
    }
}