export const GET_CALENDAR_OF_MONTH = "GET_CALENDAR_OF_MONTH";
export const GET_STATUS_OF_TITLE = "GET_STATUS_OF_TITLE";

export const getCalendarOfMonth = (data) => {
    return async dispatch =>{
        dispatch({
          type: GET_CALENDAR_OF_MONTH,
          activities:data
        })
      }
};

export const getStatusOfTitle = (data) => {
  return async dispatch =>{
    dispatch({
      type: GET_STATUS_OF_TITLE,
      statusTitle:data
    })
  }
}