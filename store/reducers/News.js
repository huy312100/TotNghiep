import { GET_ALL_UNIVERSITY_NEWS, GET_ALL_FACULTY_NEWS } from '../actions/News';

const initialState = {
    uniNews:[],
    facultNews:[]
}

export default (state=initialState,action) => {
    switch (action.type) {
        case GET_ALL_UNIVERSITY_NEWS:
            return {
                ...state,
                uniNews:action.uniNews
        }
        case GET_ALL_FACULTY_NEWS:
            return {
                ...state,
                facultNews:action.facultNews
            }    
        default:
            return state;
    }
}
