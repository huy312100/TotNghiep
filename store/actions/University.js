import University from "./../../models/University";
export const GET_ALL_INFO_UNIVERSITY = "GET_ALL_INFO_UNIVERSITY";

export const getAllInfoUniversity = () => {
  return async (dispatch) => {
    fetch("https://hcmusemu.herokuapp.com/university/getname")
      .then((response) => response.json())
      .then((json) => {
        //console.log(json);
        const dataUniversity = [];

        for (const key in json) {
          dataUniversity.push(
            new University(
              json[key].MaTruong,
              json[key].TenTruongDH)
          );
        }
        //console.log(dataUniversity);
        dispatch({
          type: GET_ALL_INFO_UNIVERSITY,
          universityInfo: dataUniversity,
        });
      })
      .catch((err) => console.log(err, "error"));
  };
};

