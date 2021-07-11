export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const REGISTER = 'REGISTER';
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
export const TOKEN_NOTIFICATION = 'TOKEN_NOTIFICATION';
export const CONNECT_TO_SOCKET = 'CONNECT_TO_SOCKET';

export const login = (token) => {
  return async dispatch => {
    dispatch({
      type: LOGIN,
      token: token,
    })
  }
};

export const register = () => {
  return async dispatch =>{
    dispatch({
      type: REGISTER,
    })
  }
};

export const logout = () => {
  return {type: LOGOUT};
};

export const changePassword =() => {
  return async dispatch =>{
    dispatch({
      type: CHANGE_PASSWORD,
    })
  }
};

export const storeTokenNotification = (data) => {
  return async dispatch => {
    dispatch({
      type: TOKEN_NOTIFICATION,
      tokenNotification:data
    })
  }
};

export const connectToSocket = (data) => {
  return async dispatch => {
    dispatch({
      type: CONNECT_TO_SOCKET,
      socket:data
    })
  }
}