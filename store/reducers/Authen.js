import { LOGIN } from '../actions/Authen';


const initialState = {
    token:null
}

export default (state=initialState,action) => {
    switch (action.type) {
        case LOGIN:
            return {
                token:action.token,
        }
        default:
            return state;
    }
}
