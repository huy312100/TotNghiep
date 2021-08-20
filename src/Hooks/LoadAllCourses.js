import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as courseActions from "../store/actions/courses";

export default function getAllCoursesData(){
    const dispatch = useDispatch();

    const getAllCourses = async () => {
        if (checkTokenExpired()) {
          localStorage.clear()
          history.replace("/");
          return null
          }
          setLoading(true);
          let details = {
            page: pageCurrent,
          };
      
          let formBody = [];
      
          for (let property in details) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
          }
          formBody = formBody.join("&");
      
          console.log(formBody);
      
          fetch("https://hcmusemu.herokuapp.com/studycourses/allcourses", {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: `bearer ${localStorage.getItem("token")}`,
            },
            body: formBody,
          })
          .then((response) => {
            const statusCode = response.status;
            const dataRes = response.json();
            return Promise.all([statusCode, dataRes]);
          })
            .then(([statusCode, dataRes]) => {
              console.log(dataRes)
              if(statusCode === 200){
                setData(data.concat(dataRes));
                dispatch(courseActions.getAllCourses(data.concat(dataRes)));
                setPageCurrent(pageCurrent+1);
              }
              else if (statusCode === 500){
                setLoadingAll(false);
              }
              setLoading(false);
            })
            .catch((err) => console.log(err, "error"));
        };
  
}
