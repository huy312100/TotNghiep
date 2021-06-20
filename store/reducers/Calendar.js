import { GET_CALENDAR_OF_MONTH,ADD_NEW_EVENT_TO_CALENDAR,ADD_PEOPLE_TO_CALENDAR } from '../actions/Calendar';


const initialState = {
    activities: [],
    allUserChoose:[],
}

export default (state=initialState,action) => {
    switch (action.type) {
        case GET_CALENDAR_OF_MONTH:
            return {
                ...state,
                activities:action.activities
        }

        case ADD_NEW_EVENT_TO_CALENDAR:
            return{
                ...state,
        }

        case ADD_PEOPLE_TO_CALENDAR:
            return{
                ...state,
                allUserChoose:action.allUserChoose
            }

        default:
            return state;
    }
}
