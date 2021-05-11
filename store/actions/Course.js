export const GET_ALL_COURSES = 'GET_ALL_COURSES';
export const GET_CURRENT_COURSES = 'GET_CURRENT_COURSES';

export const getAllCourses = ()=>{
  return async (dispatch,getState) =>{
      const token = getState().authen.token;
      //console.log(token);
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `bearer ${token}`);
  
      var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
      };
  
      fetch("https://hcmusemu.herokuapp.com/studycourses/allcourses",requestOptions)
        .then((response) => response.json())
        .then((json) => {
          //console.log(json);
  
          //console.log(dataUniversity);
          dispatch({
            type: GET_ALL_COURSES,
            allCourses: json,
          });
        })
        .catch((err) => console.log(err, "error"));
  }
}

export const getCurrentCourses =() => {
  return async (dispatch,getState) =>{
    const token = getState().authen.token;
    //console.log(token);
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `bearer ${token}`);

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    fetch("https://hcmusemu.herokuapp.com/studycourses/currentcourses",requestOptions)
      .then((response) => response.json())
      .then((json) => {
        //console.log(json);

        //console.log(dataUniversity);
        dispatch({
          type: GET_CURRENT_COURSES,
          curCourses: json,
        });
      })
      .catch((err) => console.log(err, "error"));
  } 
}