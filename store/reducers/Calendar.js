import { GET_CALENDAR_OF_MONTH,GET_STATUS_OF_TITLE } from '../actions/Calendar';


const initialState = {
    activities: [],
    statusTitle:'true',
}

export default (state=initialState,action) => {
    switch (action.type) {
        case GET_CALENDAR_OF_MONTH:
            return {
                ...state,
                activities:action.activities
        }
        case GET_STATUS_OF_TITLE:
            return {
                ...state,
                statusTitle:action.statusTitle
            }
        default:
            return state;
    }
}
