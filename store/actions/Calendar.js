import University from "./../../models/University";
export const GET_CALENDAR_OF_MONTH = "GET_CALENDAR_OF_MONTH";

export const getCalendarOfMonth = (data) => {
    return async dispatch =>{
        dispatch({
          type: GET_CALENDAR_OF_MONTH,
          activities:data
        })
      }
};