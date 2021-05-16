import {CONNECT_APPLICATION, DELETE_URL,GET_ALL_WEB_CUSTOMED,GET_PROFILE} from "./../actions/Profile";


const initialState = {
    allWebCustomed: [],
    profile:{},
}

export default (state = initialState, action)=>{
    switch(action.type){      
        case CONNECT_APPLICATION:
            return {...state}
        case DELETE_URL:
            return {
                ...state,
                allWebCustomed:[],
            };
        case GET_ALL_WEB_CUSTOMED:
            return{
                ...state,
                allWebCustomed: action.allWebCustomed
            };
        case GET_PROFILE:
            return {
                ...state,
                profile: action.profile,
            }
        default:
            return state;
    }
}