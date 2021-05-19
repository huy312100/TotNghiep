import { GET_CALENDAR_OF_MONTH } from '../actions/Calendar';


const initialState = {
    activities: [],
}

export default (state=initialState,action) => {
    switch (action.type) {
        case GET_CALENDAR_OF_MONTH:
            return {
                activities:action.activities
        }
        default:
            return state;
    }
}
