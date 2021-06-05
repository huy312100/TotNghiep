import { LOGIN , LOGOUT ,REGISTER,CHANGE_PASSWORD,TOKEN_NOTIFICATION } from '../actions/Authen';


const initialState = {
    token:"",
    tokenNotification:"",
}

export default (state=initialState,action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                token:action.token
        }
        case LOGOUT:
            return initialState;
           
        case REGISTER:
            return {...state};

        case CHANGE_PASSWORD:
            return{...state}
        case TOKEN_NOTIFICATION:
            return{
                ...state,
                tokenNotification:action.tokenNotification
            }
        default:
            return state;
    }
}
