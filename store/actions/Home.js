export const GET_NEWEST_DEADLINE = "GET_NEWEST_DEADLINE";
export const VISIBLE_BOT_TAB = "VISIBLE_BOT_TAB";
export const NOTIFICATION_NOT_READ = "NOTIFICATION_NOT_READ";
export const MESSAGE_NOT_READ = "MESSAGE_NOT_READ";


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

export const NotiNotRead =(data) => {
  return async dispatch => {
    dispatch({
      type: NOTIFICATION_NOT_READ,
      notiNotRead: data
    });
  }
};

export const MessageNotRead =(data) => {
  return async dispatch => {
    dispatch({
      type: MESSAGE_NOT_READ,
      messNotRead: data
    });
  }
}