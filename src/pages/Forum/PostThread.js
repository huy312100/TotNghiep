import React, {useState,useEffect,useRef} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {Button,Dialog,DialogActions,DialogContent,InputLabel,MenuItem,DialogTitle,IconButton,TextField,Input } from '@material-ui/core'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Select from '@material-ui/core/Select';
import PhotoCamera from '@material-ui/icons/PhotoCamera';


const useStyles = makeStyles((theme) => ({
    root: {
      margin: "auto",
  
      flexDirection: 'column',
      maxWidth: '50%',
      height: '100%' 
    },
  
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },
    imgContainer: {
        display: "inline",
        position: "relative"
    },
    close: {
        position: "absolute",
        right: "-35px",
    },
    largeIcon: {
        width: 60,
        height: 60,
      },
    someTextField: {
        minHeight: 50
      },
    uploadWrap: {
        position: "relative"
    },
    
    uploadBtn: {
        position: "absolute",
        left: 0,
        opacity: 0,
    }
  }));

export const PostThread =  ({
        isOpen,
        handleClose,
    })=>{
    const classes  = useStyles();
    const [image,setImage] = useState("");
    const [upload,setUpload] = useState({uri:null});
    const [type,setType] = useState("");
    const [title,setTitle] = useState("");
    const [post, setPost] = useState(false);
    const [success,setSuccess] = useState(null);
    const [visible,setVisible] = useState("none");
    const [loading,setLoading] = useState(true);
    const [loadingAll,setLoadingAll] = useState(true);
    const [pageCurrent,setPageCurrent] = useState(0);
    const [dataCourse,setDataCourse] = useState([]);
    const [courseSelected,setCourseSelected] = useState("");
    const unmounted = useRef(false);


    useEffect(()=>{
        if (type=== "c" && loadingAll === true){
            getAllCourses();
            return()=>{
                unmounted.current = true;
            }
        }
    },[pageCurrent])

    const handlePostClick = () => {
        setPost(true);
    };
    const handlePostClose = () => {
        setPost(false);
    };

    const handleChangeSelectedCourse = (e) =>{
        setCourseSelected(e.target.value)
    }
    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const getAllCourses = async () => {
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
            if(statusCode === 200){
            setDataCourse(dataCourse.concat(dataRes));
              setPageCurrent(pageCurrent+1);
            }
            else if (statusCode === 500){
              setLoadingAll(false);
            }
            setLoading(false);
          })
          .catch((err) => console.log(err, "error"));
      };

    const postNewThread = async() => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "bearer " + localStorage.getItem("token"));
        
        var formdata = new FormData();
        
        if(upload.uri !== "" && upload.uri !== null){

            formdata.append("title", title);
            formdata.append("image", upload.uri);
            if (type === "f" || type === "u"){
            formdata.append("scope", type);
            }
            else if (type === "c"){
                formdata.append("IDCourses", courseSelected);
            }
        }
    
        else{
            formdata.append("title", title);
            if (type === "f" || type === "u"){
                formdata.append("scope", type);
            }
            else if (type === "c"){
                    formdata.append("IDCourses", courseSelected);
            }
        }
        let url;
        if (type === "c"){
            url = "https://hcmusemu.herokuapp.com/forum/courses/post";
        }
        else if (type === "f" || type ===  "u"){
            url = "https://hcmusemu.herokuapp.com/forum/post";
        }
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };
        await fetch(url, requestOptions)
        .then((response) => {
            const statusCode = response.status;
            const dataRes = response.json();
            return Promise.all([statusCode, dataRes]);
          }).then(([statusCode, dataRes]) => {
            if(statusCode === 200){
                setSuccess(true);
            }
            else{
                setSuccess(false);
            }
            setPost(true);
          }).catch((err) => console.log(err, "error"));
    }

    const handleImg = (event) => {
        setImage(URL.createObjectURL(event.target.files[0]))
        setUpload({uri:event.target.files[0]});
    }
    const resetImage = () => {
        setImage("");
        setUpload("");
        setTitle("");
    }
    
    const handleTitle = (event) => {
        setTitle(event.target.value);
    }
    
    const handleChangeType = (event) => {
        if (event.target.value !== "c"){
            setVisible("none");
        }
        else{
            setVisible("flex");
        }
        setType(event.target.value);
    }
    const renderImage = ()=>{
        if (image!==""){
            return(
                <div>
                <div class={classes.imgContainer}>
                    <img src={image} alt="" style={{height:"120px",width:"120px"}}/>       
                    <IconButton className={classes.close} onClick={resetImage}>
                        <HighlightOffIcon/>
                    </IconButton>
                </div>
                </div>
            )
        }
        else{
            return(
                <div>
                    
                </div>
            )}
    }
    const renderSuccess = () =>{
        if (success === true){
            return(
                <Snackbar open={post} autoHideDuration={3000} onClose={handleClose}>
                    <Alert oonClose={handleClose} severity="success">
                        Đăng bài viết thành công
                    </Alert>
                </Snackbar>
            )
        }
        else{
            return(
                <Snackbar open={post} autoHideDuration={3000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error">
                        Đăng bài viết không thàn thành công. Vui lóng thử lại 
                    </Alert>
                </Snackbar>
            )
        }
    }

    const renderListCourse = ()=>{
        if (dataCourse.length === 0){
            return(
                <MenuItem></MenuItem>
            )
        }
        else{
            return(
                dataCourse.map((item,index)=>{
                    return(
                        <MenuItem key={index} value={item.IDCourses}>{item.name}</MenuItem>
                    )
                }
            ))
        }
    }

    return(
        <Dialog
            className={classes.root}
            fullWidth
            maxWidth="lg"
            open={isOpen}
            onClose={handleClose}
            aria-labelledby = "max-width-dialog-title">
            <DialogTitle  id="max-width-dialog-title">Đăng bài viết</DialogTitle>
          
            <DialogContent  style={{height:'300px'}}> 

                <InputLabel id="demo-simple-select-label">Nơi đăng</InputLabel>
                    <Select
                    style={{width:"150px"}}
                    labelId="demo-type-select-label"
                    id="demo-type-select"
                    value={type}
                    onChange={handleChangeType}
                    required
                    defaultValue='u'
                    width= "200px"
                    >
                    <MenuItem value={'u'}>Trường</MenuItem>
                    <MenuItem value={'f'}>Khoa</MenuItem>
                    <MenuItem value={'c'}>Môn học</MenuItem>
                    </Select>

                    <Select
                    labelId="course-select"
                    id="demo-course-select"
                    value={courseSelected}
                    onChange={handleChangeSelectedCourse}
                    required
                    width= "200px"
                    style = {{display: visible}}
                    >
                        {renderListCourse()}
                    </Select>
               
                <TextField 
                    className={classes.someTextField}
                    required 
                    variant="outlined" 
                    value={title} 
                    onChange={handleTitle} 
                    margin="normal"  
                    fullWidth 
                    size="medium" 
                    multiline 
                    style={{minHeight:"50px"}}
                    placeholder="Nhập tiêu đề tại đây ^^"/>
                    <div className={classes.uploadWrap}>
                    <label htmlFor="icon-button-file">
                        <IconButton color="primary" aria-label="upload picture"  component="span"  >
                            <PhotoCamera />
                        </IconButton>
                        <Input   
                                autoWidth
                                type="file" 
                                id="photo" 
                                onChange={handleImg} 
                               className={classes.uploadBtn}
                                accept=".png, .jpg, .jpeg, .gif"  
                            />
                       
                    </label>
                    </div>
                    {renderImage()}
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose} onChange={()=>{resetImage();handlePostClose()}} color="primary">
                    Huỷ
                </Button>

                <Button onClick={()=>{postNewThread();handlePostClick();}}>
                    Đăng bài viết
                </Button>
                {success === true ? renderSuccess() : null}
            </DialogActions>
        </Dialog>      
    )
}

Dialog.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
}