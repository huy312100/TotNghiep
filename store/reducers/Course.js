import { GET_ALL_COURSES,GET_CURRENT_COURSES } from '../actions/Course';


const initialState = {
    allCourses: [],
    curCourses: [],
}

export default (state=initialState,action) => {
    switch (action.type) {
        case GET_ALL_COURSES:
            return {
                ...state,
                allCourses:action.allCourses,
        }
        case GET_CURRENT_COURSES:
            return {
                ...state,
                curCourses:action.curCourses,
            }
        default:
            return state;
    }
}
