import React , {useState, useEffect}from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import LoadingScreen from '../../components/shared/LoadingScreen';
import checkTokenExpired from '../../ValidAccess/AuthToken';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';
const useStyles = makeStyles((theme) => ({

    course_tag: {
      background: "white", 
      boxShadow: "0 4px 24px 0 rgb(34 41 47 / 10%)"
    },
    course_tag__tag: {
      background: "white", 
      display: "flex", 
      justifyContent: "space-around", 
      textAlign: "center"
    },
    course: {
      marginTop: "10px", 
      padding: "30px 30px 5px 30px", 
      background: "white", 
      borderRadius: "5px", 
      boxShadow: "0 4px 24px 0 rgb(34 41 47 / 10%)"
    },
    course__title: {
      fontSize: "20px", 
      fontWeight: "500", 
      padding: "5px", 
      background: "#18468b", 
      borderRadius: "10px", 
      color: "white"
    },
    list_teacher: {
      margin: "10px 0", 
      borderRadius: "10px"
    },
    list_teacher__content: {
      padding: "10px"
    },
    course_tag__btn_course: {
      display: "inline-block", 
      padding: "15px", 
      width: "50vw", 
      fontSize: "16px", 
      fontWeight: "500"
    },
    course_tag__tag__current: {
      borderBottom: "2px solid rgb(125, 149, 255)", 
      color: "rgb(125, 149, 255)"
    },
    course_tag__tag__all: {
      borderBottom: "2px solid rgb(255, 116, 116)", 
      color: "rgb(255, 116, 116)"
    },
    loadding: {
      display: "flex", 
      justifyContent: "center", 
      padding: "10px"
    },
    course__direct: {
      textDecoration: "none", 
      display: "block"
    },
    course__link: {
      fontSize: "16px", 
      textAlign: "center", 
      width: "70vw", 
      padding: "5px", 
      borderRadius: "10px", 
      fontWeight: "450"
    },
    course__link_hover: {
      background: "rgb(243, 243, 243)"
    }
}));

function AllCourses(){
  const classes = useStyles();
  const [allCourse,setAllCourse] = useState([]);
  const [loading,setLoading] = useState(true);
  const [loadingAll,setLoadingAll] = useState(true);
  const [page,setPage] = useState(0);
  const history = useHistory();

  useEffect(() => {
    getAllCourse();
    return () => {
    };
  }, [page])
  const getAllCourse = () => {
    if (checkTokenExpired()) {
      localStorage.clear()
      history.replace("/");
      return null
      }
        setLoading(true);
        let details = {
          page: page,
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
            console.log(statusCode);
            if(statusCode === 200){
              console.log(dataRes);
              setAllCourse(allCourse.concat(dataRes));
              setPage(page+1);
            }
            if (statusCode === 500){
              setLoadingAll(false);
            }
            setLoading(false);
          })
          .catch((err) => console.log(err, "error"));
  }

 
  if (loadingAll === true){
    return(
        <div>
            <LoadingScreen/>
        </div>

      )
  }
  else{
    if (allCourse.length < 1 || allCourse === null){
                return <div className="text-center">
                    <div className="spinner-border" style={{ width: "3rem", height: "3rem" }} role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>}
    return (<div>
              {allCourse.map((c, index) => {
                    return (
                        <div key={index} className={classes.course}>
                            <Link to={"/course/" + c.IDCourses} className={clsx(classes.course__title,classes.course__direct)}>{c.name}</Link>
                            <div className={classes.list_teacher}>
                                {c.teacher.length > 1 ? c.teacher.map((tc, tindex) => (
                                    <div key={tindex} className={classes.list_teacher__content}>
                                        <span>Giáo viên: </span>
                                        <span>{tc}</span>
                                    </div>)) : null}
                            </div>
                        </div>
                    )
                })}
                {/*loadingAll === true ? <div className="text-center">
                    <div className="spinner-border" style={{ width: "3rem", height: "3rem" }} role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
              </div> : null*/}
            </div>
            )
  }
}

export default  AllCourses;