export const GET_CALENDAR_OF_MONTH = "GET_CALENDAR_OF_MONTH";
export const ADD_NEW_EVENT_TO_CALENDAR = "ADD_NEW_EVENT_TO_CALENDAR";
export const ADD_PEOPLE_TO_CALENDAR = "ADD_PEOPLE_TO_CALENDAR";


export const getCalendarOfMonth = (data) => {
    return async dispatch =>{
        dispatch({
          type: GET_CALENDAR_OF_MONTH,
          activities:data
        })
      }
};

export const addNewEventToCalendar = () => {
  return async dispatch =>{
    dispatch({
      type: ADD_NEW_EVENT_TO_CALENDAR,
    })
  }
};

export const addPeopleToCalendar = (data) => {
  return async dispatch =>{
    dispatch({
      type: ADD_PEOPLE_TO_CALENDAR,
      allUserChoose:data
    })
  }
};

