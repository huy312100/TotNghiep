import { LOGIN , LOGOUT } from '../actions/Authen';


const initialState = {
    token:1
}

export default (state=initialState,action) => {
    switch (action.type) {
        case LOGIN:
            return {
                token:action.token
        }
        case LOGOUT:
            return initialState;
        default:
            return state;
    }
}
