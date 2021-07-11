export const GET_ALL_UNIVERSITY_NEWS = 'GET_ALL_UNIVERSITY_NEWS';
export const GET_ALL_FACULTY_NEWS = 'GET_ALL_FACULTY_NEWS';


export const getUniNews = (data)=>{
  return async dispatch =>{
    dispatch({
      type: GET_ALL_UNIVERSITY_NEWS,
      uniNews: data,
    });
  }     
}

export const getFacultNews =(data) => {
  return async dispatch =>{ 
    dispatch({
      type: GET_ALL_FACULTY_NEWS,
      facultNews: data,
    });
  } 
}