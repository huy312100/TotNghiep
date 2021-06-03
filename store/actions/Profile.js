export const CONNECT_APPLICATION = 'CONNECT_APPLICATION';
export const DELETE_URL = 'DELETE_URL';
export const GET_ALL_WEB_CUSTOMED = 'GET_ALL_WEB_CUSTOMED';
export const GET_PROFILE = 'GET_PROFILE';
export const EDIT_PROFILE = 'EDIT_PROFILE';


export const connectApplication = () =>{
  return async dispatch=>{
    dispatch({
        type: CONNECT_APPLICATION,
    })    
  }
};

export const deleteUrl = () =>{
  return async dispatch =>{
      //console.log(token);     
          dispatch({
            type: DELETE_URL,        
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

export const editProfile = () =>{
  return async dispatch =>{
    dispatch({
      type: EDIT_PROFILE,
    })
  }
}