import { GET_NEWEST_DEADLINE,VISIBLE_BOT_TAB } from '../actions/Home';


const initialState = {
    newDeadline:[],
    visibleBotTab:false,
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

        default:
            return state;
    }
}