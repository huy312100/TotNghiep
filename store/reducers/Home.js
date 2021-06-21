import { GET_NEWEST_DEADLINE,VISIBLE_BOT_TAB,NOTIFICATION_NOT_READ,MESSAGE_NOT_READ } from '../actions/Home';


const initialState = {
    newDeadline:[],
    visibleBotTab:false,
    notiNotRead:0,
    messNotRead:0
}

export default (state=initialState,action) => {
    switch (action.type) {
        case GET_NEWEST_DEADLINE:
            return {
                ...state,
                newDeadline:action.newDeadline
            }

        case VISIBLE_BOT_TAB:
            return{
                ...state,
                visibleBotTab:action.visibleBotTab
            }

        case NOTIFICATION_NOT_READ:
            return {
                ...state,
                notiNotRead:action.notiNotRead
            }

        case MESSAGE_NOT_READ:
            return {
                ...state,
                messNotRead:action.messNotRead
            }
        default:
            return state;
    }
}