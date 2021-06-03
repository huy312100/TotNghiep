export const GET_NEWEST_DEADLINE = "GET_NEWEST_DEADLINE";

export const NewestDeadline = (data) => {
  return async dispatch => {
    dispatch({
      type: GET_NEWEST_DEADLINE,
      newDeadline: data,
    });
  }
};