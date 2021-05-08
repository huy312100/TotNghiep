import { GET_NEWEST_DEADLINE } from '../actions/Home';


const initialState = {
    newDeadline:[],
}

export default (state=initialState,action) => {
    switch (action.type) {
        case GET_NEWEST_DEADLINE:
            return {
                newDeadline:action.newDeadline
        }
        default:
            return state;
    }
}