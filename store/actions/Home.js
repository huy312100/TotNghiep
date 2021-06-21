export const GET_NEWEST_DEADLINE = "GET_NEWEST_DEADLINE";
export const VISIBLE_BOT_TAB = "VISIBLE_BOT_TAB";

export const NewestDeadline = (data) => {
  return async dispatch => {
    dispatch({
      type: GET_NEWEST_DEADLINE,
      newDeadline: data,
    });
  }
};

export const VisibleBotTab = (data) => {
  return async dispatch => {
    dispatch({
      type: VISIBLE_BOT_TAB,
      visibleBotTab: data,
    });
  }
};