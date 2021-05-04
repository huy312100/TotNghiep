import University from "./../../models/University";
import Faculty from "./../../models/Faculty";
export const GET_ALL_INFO_UNIVERSITY = "GET_ALL_INFO_UNIVERSITY";
export const GET_ALL_FACULTY_OF_UNIVERSITY="GET_ALL_FACULTY_OF_UNIVERSITY";

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

export const getAllFacultyOfUniversity = (idUni) => {
  return async (dispatch) => {
    let details = {
      MaTruong: idUni,
    };

    let formBody = [];

    for (let property in details) {
      let encodedKey = encodeURIComponent(property);
      let encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

      fetch("https://hcmusemu.herokuapp.com/faculty/getname", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formBody,
      }).then((response) => {
          const statusCode = response.status;
          const dataRes = response.json();
          return Promise.all([statusCode, dataRes]);
      }).then(([statusCode, dataRes])=>{
        //console.log(dataRes);
        const dataFaculty = [];

        for (const key in dataRes) {
          dataFaculty.push(
            new Faculty(
              dataRes[key].MaKhoa,
              dataRes[key].TenKhoa)
          );
        };

        //console.log(dataFaculty);
        dispatch({
          type: GET_ALL_FACULTY_OF_UNIVERSITY,
          facultyInfo:dataFaculty
        })
      }).done();
    }
  };

