export const GET_ALL_INFO_UNIVERSITY = "GET_ALL_INFO_UNIVERSITY";

export const getAllInfoUniversity = (data) => {
  return async dispatch => {
    dispatch({
      type: GET_ALL_INFO_UNIVERSITY,
      universityInfo: data,
    });
  }
};

