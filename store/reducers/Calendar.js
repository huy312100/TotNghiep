import { GET_CALENDAR_OF_MONTH,GET_STATUS_OF_TITLE,GET_STATUS_OF_DATE,ADD_NEW_EVENT_TO_CALENDAR,ADD_PEOPLE_TO_CALENDAR } from '../actions/Calendar';


const initialState = {
    activities: [],
    statusTitle:false,
    statusDate:true,
    allUserChoose:[],
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

        case GET_STATUS_OF_DATE:
            return {
                ...state,
                statusDate:action.statusDate
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
