import {
  GET_ALL_INFO_UNIVERSITY,
} from "./../actions/University";

const initialState = {
  universityInfo: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_INFO_UNIVERSITY:
      //console.log(state);
      return {
        ...state,
        universityInfo: action.universityInfo,
      };
   
    default:
      return state;
  }
};
