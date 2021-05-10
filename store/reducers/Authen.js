import { LOGIN , LOGOUT ,REGISTER } from '../actions/Authen';


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
        default:
            return state;
    }
}
