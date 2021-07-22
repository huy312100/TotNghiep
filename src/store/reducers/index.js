import authenReducer from "./authen";
import { combineReducers } from "redux";
import infoReducer from "./info";
import sidebarReducer from "./sidebar";

const rootReducer = combineReducers({
    authen:authenReducer,
    info:infoReducer,
    sidebar:sidebarReducer
})

export default rootReducer;