
import Category from "../Category";
import React,{useState,useEffect} from "react";
import NavBar from "../../Navigation/NavBar";
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { Toolbar, Typography } from "@material-ui/core";
import LoadingScreen from '../../components/shared/LoadingScreen';
import checkTokenExpired from "../../ValidAccess/AuthToken"
import { useHistory } from 'react-router-dom';
import AssignmentIcon from '@material-ui/icons/Assignment';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import WorkIcon from '@material-ui/icons/Work';
import DevicesOtherIcon from '@material-ui/icons/DevicesOther';
const useStyles = makeStyles((theme) => ({
    root: {
        marginLeft: 200,
      },
      toolbar: {
        display: 'flex',
        alignItems: 'left',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
      },
      content: {
        flexGrow: 1,
        padding: theme.spacing(3),
      },
    detail_course_page: {
        background: "white", 
        padding: "30px"
      },
      detail_course_page__name: {
        fontSize: "24px", 
        fontWeight: "700", 
        marginBottom: "10px", 
        background: "#18468b", 
        borderRadius: "1px", 
        padding: "5px", 
        color: "white"
      },
      detail_course_page__title: {
        fontSize: "20px", 
        fontWeight: "500", 
        color: "#c75e57"
      },
      detail_course_page__content: {
        margin: "10px", 
        color: "rgb(78, 78, 78)"
      },
      detail_course_page_hr: {
        padding: "0", 
        margin: "0"
      }
}))

function DetailCourse(props){
    const classes = useStyles();
    const [loading,setLoading] = useState(true);
    const [content,setContent] = useState([]);
    const [assign,setAssign] = useState([]);
    const [resource,setResource] = useState([]);
    const [url,setUrl] = useState([]);
    const [folder,setFolder] = useState([]);
    const history = useHistory();
    const getDetailCourse = () =>{
        if (checkTokenExpired()) {
            localStorage.clear()
            history.replace("/");
            return null
            }
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "bearer " + localStorage.getItem("token"));
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("IDCourses", props.match.params.id);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch("https://hcmusemu.herokuapp.com/coursescontent", requestOptions)
            .then(response => response.json())
            .then(result => {
                //console.log(result);
                setContent(result.listLabel);
                setAssign(result.listAssign);
                setResource(result.listResource);
                setUrl(result.listUrl);
                setFolder(result.listFolder)
                setLoading(false);
            })
            .catch(error => console.log('error', error));
    }

    useEffect(()=>{
        getDetailCourse();
    },[])

    const renderLabel = () => {
        if (content.length > 1) {
            var label = content.map((content) => {
                return <div className={classes.detail_course_page__content}>{content.name}</div>
            })
            return (
                <div>
                    <div className={classes.detail_course_page__title}>NỘI DUNG</div>
                    <hr />
                    {label}
                </div>
            )
        }
        return null
    }

    const renderResource = () => {
        if (resource.length > 1) {
            var label = resource.map((resource) => {
                return(
                <div style={{display: 'flex',alignItems: 'center',flexWrap: 'wrap',}} className={classes.detail_course_page__content}>
                    <FiberManualRecordIcon fontSize="inherit"/>
                    <a href={resource.url} target="_blank" rel="noopener noreferrer">{resource.name}
                    </a>
                </div>)
            })
            return (
                <div>
                    <div style={{display: 'flex',alignItems: 'center',flexWrap: 'wrap',}} className={classes.detail_course_page__title}><InsertDriveFileIcon/>TÀI LIỆU</div>
                    <hr />
                    {label}
                </div>
            )
        }
        return null
    }

    const renderAssign = () => {
        if (assign.length > 1) {
            var label = assign.map((assign) => {
                return <div style={{display: 'flex',alignItems: 'center',flexWrap: 'wrap',}} className={classes.detail_course_page__content}>
                    <FiberManualRecordIcon fontSize="inherit" />
                    <a href={assign.url} target="_blank" rel="noopener noreferrer">
                        {assign.name}
                    </a>
                </div>
            })
            return (
                <div>
                    <div style={{display: 'flex',alignItems: 'center',flexWrap: 'wrap',}} className={classes.detail_course_page__title}><AssignmentIcon/>BÀI TẬP</div>
                    <hr />
                    {label}
                </div>
            )
        }
        return(
            <div>
                <div style={{display: 'flex',alignItems: 'center',flexWrap: 'wrap',}} className={classes.detail_course_page__title}><AssignmentIcon/>BÀI TẬP</div>
                <hr />
                <Typography>Nội dung không tìm thấy</Typography>
            </div>
        )
    }

    const renderURL = () => {
        if (url.length > 1) {
            var label = url.map((url) => {
                return <div style={{display: 'flex',alignItems: 'center',flexWrap: 'wrap',}} className={classes.detail_course_page__content}>
                    <FiberManualRecordIcon fontSize="inherit"/>
                    <a href={url.url} target="_blank" rel="noopener noreferrer">
                        {url.name}
                    </a>
                </div>
            })
            return (
                <div>
                    <div style={{display: 'flex',alignItems: 'center',flexWrap: 'wrap',}} className={classes.detail_course_page__title}><WorkIcon/>THỰC HÀNH</div>
                    <hr />
                    {label}
                </div>
            )
        }
        return(
        <div>
             <div style={{display: 'flex',alignItems: 'center',flexWrap: 'wrap',}} className={classes.detail_course_page__title}><WorkIcon/>THỰC HÀNH</div>
            <hr />
            <Typography>Nội dung không tìm thấy</Typography>
        </div>
        )
    }

    const renderFolder = () => {
        if (folder.length > 1) {
            var label = folder.map((folder) => {
                return <div style={{display: 'flex',alignItems: 'center',flexWrap: 'wrap',}} className={classes.detail_course_page__content}><FiberManualRecordIcon fontSize="inherit" /><a href={folder.url} target="_blank" rel="noopener noreferrer">{folder.name}</a></div>
            })
            return (
                <div>
                    <div style={{display: 'flex',alignItems: 'center',flexWrap: 'wrap',}} className={classes.detail_course_page__title}><DevicesOtherIcon/> KHÁC</div>
                    <hr />
                    {label}
                </div>
            )
        }
        return(
            <div>
                <div style={{display: 'flex',alignItems: 'center',flexWrap: 'wrap',}} className={classes.detail_course_page__title}><DevicesOtherIcon/>KHÁC</div>
                <hr />
                <Typography>Nội dung không tìm thấy</Typography>
            </div>
        )
    }

    if (folder.length === 0 && content.length === 0 && resource.length === 0 && assign.length === 0 && url.length === 0){
            return (
                <div className={classes.root}>
                     <NavBar/>
            <main className={classes.content}>
            <Toolbar/>
            <div class="container">
            <div class="row">
            <div className="col-12" >
                <Link to="/course" style={{ background: "white", padding: "10px", boxShadow: "0 4px 24px 0 rgb(34 41 47 / 10%)", borderRadius: "7px" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-left-square" viewBox="0 0 16 17">
                        <path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm11.5 5.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
                    </svg><span style={{ margin: "0 10px" }}>Trở về</span>
                </Link>
                <Category current="Nội dung" sub1="Môn học" sub1link={"/course"} />

                <div className="col-12" style={{ textAlign: "center", margin: "20px", fontSize: "20px" }}>
                    Không có nội dung để hiển thị
                </div>
            </div>
            </div>
            </div>
            </main>
            </div>
            )}
        if (loading === false) {
            return (
                <div className={classes.root}>
                <NavBar/>
                <main className={classes.content}>
                <Toolbar/>
                <div className="col-12">
                    <Link to="/course" style={{ background: "white", padding: "10px", boxShadow: "0 4px 24px 0 rgb(34 41 47 / 10%)", borderRadius: "7px" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-left-square" viewBox="0 0 16 17">
                            <path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm11.5 5.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
                        </svg><span style={{ margin: "0 10px" }}>Trở về</span>
                    </Link>
                    <Category current="Nội dung" sub1="Môn học" sub1link={"/course"} />

                    <div className={classes.detail_course_page}>
                        {renderLabel()}
                        {renderAssign()}
                        {renderResource()}
                        {renderURL()}
                        {renderFolder()}
                    </div>
                </div>
                </main>
                </div>
            );
        }
        return (
            <div>
                <LoadingScreen/>
            </div>
        )
}

export default DetailCourse;