export const CONNECT_APPLICATION = 'CONNECT_APPLICATION';
export const GET_ALL_WEB_CUSTOMED = 'GET_ALL_WEB_CUSTOMED';
export const GET_PROFILE = 'GET_PROFILE';



export const connectApplication = () =>{
  return async dispatch=>{
    dispatch({
        type: CONNECT_APPLICATION,
    })    
  }
};


export const getAllWebCustomed = (data) => {
  return async dispatch =>{
    dispatch({
      type: GET_ALL_WEB_CUSTOMED,
      allWebCustomed:data
    })
  }
};

export const getProfile = (data) => {
  return async dispatch =>{
    console.log(data);
    dispatch({
      type: GET_PROFILE,
      profile:data
    })
  }
};
