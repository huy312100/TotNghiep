export const GET_PROFILE = 'GET_PROFILE';

export const getProfile = (data) => {
  return async dispatch =>{
    console.log(data);
    dispatch({
      type: GET_PROFILE,
      profile:data
    })
  }
};
