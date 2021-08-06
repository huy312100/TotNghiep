import React , {useState, useEffect}from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography} from '@material-ui/core';
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
    
    window.addEventListener("scroll", handleScroll);
    getAllCourse();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loadingAll])
  const getAllCourse = () => {
    if (checkTokenExpired()) {
      localStorage.clear()
      history.replace("/");
      return null
      }
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "bearer " + localStorage.getItem("token"));
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("page", page);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    fetch("https://hcmusemu.herokuapp.com/studycourses/allcourses", requestOptions)
        .then(response => response.json())
        .then(result => {
            //console.log(result)
            setAllCourse(result);
            setLoading(false);
            setLoadingAll(false);
            
        })
        .catch(error => console.log('error', error));
  }

  const getAllCourseScroll = () => {
    if (checkTokenExpired()) {
      localStorage.clear()
      history.replace("/");
      return null
      }
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "bearer " + localStorage.getItem("token"));
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("page", page);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    fetch("https://hcmusemu.herokuapp.com/studycourses/allcourses", requestOptions)
        .then(response => response.json())
        .then(result => {
            //console.log(result)
            let temp = allCourse;
            Array.prototype.push.apply(temp, result)
            console.log("temp:", temp)
            setAllCourse(temp);
            setLoadingAll(false);

        })
        .catch(error => console.log('error', error));
    }
    
    const handleScroll = () => {
      const windowHeight =
        'innerHeight' in window
            ? window.innerHeight
            : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
    );

    const windowBottom = Math.round(windowHeight + window.pageYOffset);
    if (windowBottom >= docHeight && loadingAll === false) {
      console.log("bottom")
      setLoadingAll(true);
      let newpage = page+1;
      setPage(newpage);
      getAllCourseScroll();
     }
    }

  if (loading === true){
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
                                {c.teacher.map((tc, tindex) => (
                                    <div key={tindex} className={classes.list_teacher__content}>
                                        <span>Giáo viên: </span>
                                        <span>{tc}</span>
                                    </div>))}
                            </div>
                        </div>
                    )
                })
                }
                {loadingAll === true ? <div className="text-center">
                    <div className="spinner-border" style={{ width: "3rem", height: "3rem" }} role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div> : null}
            </div>
            )
  }
}

export default  AllCourses;