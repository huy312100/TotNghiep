import { LOGIN , LOGOUT ,REGISTER,CHANGE_PASSWORD,TOKEN_NOTIFICATION,CONNECT_TO_SOCKET } from '../actions/Authen';


const initialState = {
    token:"",
    tokenNotification:"",
    socket:{},
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
        case CONNECT_TO_SOCKET:
            return{
                ...state,
                socket:action.socket
            }
        default:
            return state;
    }
}