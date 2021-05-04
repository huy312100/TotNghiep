import {GET_ALL_INFO_UNIVERSITY,GET_ALL_FACULTY_OF_UNIVERSITY} from "./../actions/University";

const initialState={
    universityInfo:[],
    facultyInfo:[],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_INFO_UNIVERSITY:
            //console.log(state);
            return {
                ...state,
                universityInfo:action.universityInfo,
                facultyInfo:state.facultyInfo
            }
        case GET_ALL_FACULTY_OF_UNIVERSITY:
            return {
                ...state,
                universityInfo:state.universityInfo,
                facultyInfo:action.facultyInfo
            }
        default:
            return state;
    }
}