import {GET_PROFILE} from "./../actions/Profile";

const initialState = {
    profile:{},
}

export default (state = initialState, action)=>{
    switch(action.type){      
        case GET_PROFILE:
            return {
                ...state,
                profile: action.profile,
            };
        default:
            return state;
    }
}