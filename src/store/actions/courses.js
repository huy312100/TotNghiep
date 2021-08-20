export const GET_ALL_COURSES = 'GET_ALL_COURSES';
export const GET_CURRENT_COURSES = 'GET_CURRENT_COURSES';
export const GET_INFO_COURSE_CHOOSE = 'GET_INFO_COURSE_CHOOSE';


export const getAllCourses = (data)=>{
  return async dispatch =>{
    dispatch({
      type: GET_ALL_COURSES,
      allCourses: data,
    });
  }     
};

export const getCurrentCourses =(data) => {
  return async dispatch =>{ 
    dispatch({
      type: GET_CURRENT_COURSES,
      curCourses: data,
    });
  } 
};

export const getInfoCourseChoose =(data) => {
  return async dispatch =>{
    dispatch({
      type:GET_INFO_COURSE_CHOOSE,
      infoCourseChoose: data,
    })
  }
}