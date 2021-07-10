import authenReducer from "./authen";
import { combineReducers } from "redux";
import infoReducer from "./info";

const rootReducer = combineReducers({
    authen:authenReducer,
    info:infoReducer
})

export default rootReducer;