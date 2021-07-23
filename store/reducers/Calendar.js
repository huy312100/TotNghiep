import { GET_CALENDAR_OF_MONTH,ADD_NEW_EVENT_TO_CALENDAR,ADD_PEOPLE_TO_CALENDAR,GET_MODE_OF_CALENDAR } from '../actions/Calendar';


const initialState = {
    activities: [],
    allUserChoose:[],
    modeCalendar:'day',
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

        case GET_MODE_OF_CALENDAR:
            return{
                ...state,
                modeCalendar:action.modeCalendar
        }

        default:
            return state;
    }
}
