export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const REGISTER = 'REGISTER';
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';

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
}



