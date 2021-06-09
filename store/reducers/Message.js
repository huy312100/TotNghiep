import {FIRST_READ_MESSAGE} from "../actions/Message";

const initialState = {
    firstReadMsg: '',
    roomID: '',
}

export default (state=initialState,action) => {
    switch (action.type) {
        case FIRST_READ_MESSAGE:
            return {
                firstReadMsg: action.firstReadMsg
            }
        
        default:
            return state;
    }
}
