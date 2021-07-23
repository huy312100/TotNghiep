import { GET_ALL_COURSES,GET_CURRENT_COURSES,GET_INFO_COURSE_CHOOSE } from '../actions/Course';


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
            case GET_INFO_COURSE_CHOOSE:
                return {
                    ...state,
                    infoCourseChoose:action.infoCourseChoose
            }   
        default:
            return state;
    }
}
