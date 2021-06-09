export const FIRST_READ_MESSAGE = 'FIRST_READ_MESSAGE';

export const FirstReadMessage = (data) => {
  return async dispatch => {
    dispatch({
      type: FIRST_READ_MESSAGE,
      firstReadMsg: data,
    })
  }
};