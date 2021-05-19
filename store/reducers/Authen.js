import { LOGIN , LOGOUT ,REGISTER,CHANGE_PASSWORD } from '../actions/Authen';


const initialState = {
    token:""
}

export default (state=initialState,action) => {
    switch (action.type) {
        case LOGIN:
            return {
                token:action.token
        }
        case LOGOUT:
            return initialState;
           
        case REGISTER:
            return initialState;

        case CHANGE_PASSWORD:
            return{...state}
        default:
            return state;
    }
}
