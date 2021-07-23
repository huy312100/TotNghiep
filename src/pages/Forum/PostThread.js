import React, {useState,useEffect,Image} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {Button,Dialog,DialogActions,DialogContent,InputLabel,MenuItem,DialogTitle,IconButton,TextField,Input } from '@material-ui/core'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Select from '@material-ui/core/Select';
import defaultValue from "../../images/default.png"
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
        handleClose
    })=>{
    const classes  = useStyles();
    const [image,setImage] = useState("");
    const [upload,setUpload] = useState({uri:null});
    const [type,setType] = useState("");
    const [title,setTitle] = useState("");
    const [post, setPost] = useState(false);
    const handlePostClick = () => {
        setPost(true);
      };
    
      const handlePostClose = () => {
        setPost(false);
      };
    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }
    const postNewThread = async() => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "bearer " + localStorage.getItem("token")+ "tC");
        
        var formdata = new FormData();
        
        if(upload.uri !== "" && upload.uri !== null){
           // let localUri = upload.uri;
            //let filename = localUri.split('/').pop();

            formdata.append("title", title);
            formdata.append("image", upload.uri);
            formdata.append("scope", type);
        }
    
        else{
            formdata.append("title", title);
            formdata.append("scope", type);
        }
        
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };
        await fetch("https://hcmusemu.herokuapp.com/forum/post", requestOptions)
        .then((response) => {
            const statusCode = response.status;
            const dataRes = response.json();
            return Promise.all([statusCode, dataRes]);
          }).then(([statusCode, dataRes]) => {
            if(statusCode === 200){
            }
            else{
              console.log("loi");
            }
            setPost(true);
          }).catch((err) => console.log(err, "error"));
    }

    const handleImg = (event) => {
        setImage(URL.createObjectURL(event.target.files[0]))
          console.log(event.target.files[0])
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
        setType(event.target.value);
    }
    const renderImage = ()=>{
        if (image!=""){
            return(
                <div>
                <div class={classes.imgContainer}>
                    <img src={image} style={{height:"120px",width:"120px"}}/>       
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
                    <img style={{height:"160px",width:"160px"}} src={defaultValue}/>
                </div>
            )}
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
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={type}
                    onChange={handleChangeType}
                    required
                    defaultValue='u'
                    width= "200px"
                    >
                    <MenuItem value={'u'}>Trường</MenuItem>
                    <MenuItem value={'f'}>Khoa</MenuItem>
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
                <Button onClick={handleClose} onChange={resetImage} color="primary">
                    Huỷ
                </Button>
                <Snackbar open={post} autoHideDuration={3000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success">
                        Đăng bài viết thành công
                    </Alert>
                </Snackbar>
                <Button onClick={postNewThread}>
                    Đăng bài viết
                </Button>
            </DialogActions>
        </Dialog>      
    )
}

Dialog.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
}