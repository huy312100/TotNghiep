export const GET_NEWEST_DEADLINE = "GET_NEWEST_DEADLINE";

export const NewestDeadline = () => {
  return async (dispatch,getState) => {
    const token = getState().authen.token;
    //console.log(token);
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `bearer ${token}`);

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    fetch("https://hcmusemu.herokuapp.com/deadlinemoodle/month",requestOptions)
      .then((response) => response.json())
      .then((json) => {
        //console.log(json);

        //console.log(dataUniversity);
        dispatch({
          type: GET_NEWEST_DEADLINE,
          newDeadline: json,
        });
      })
      .catch((err) => console.log(err, "error"));
  };
};