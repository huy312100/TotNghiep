import React, {useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {Button,Dialog,DialogActions,DialogContent,InputLabel,MenuItem,DialogTitle,IconButton,TextField,Input } from '@material-ui/core'
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import Photo from "../../images/default.png"
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Select from '@material-ui/core/Select';
import { ContactSupportOutlined } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    root: {
      margin: "auto",
      flexDirection: 'row',
      maxWidth: '75%',
      minHeight: "400px"
    },
  
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },
    input: {
        display: 'none'
    },
    imgContainer: {
        display: "inline",
        position: "relative"
    },
    close: {
        position: "absolute",
        right: "-35px",
    }
  }));

export const PostThread =  ({
        isOpen,
        handleClose
    })=>{
    const classes  = useStyles();
    const [images,setImages] = useState("");
    const [type,setType] = useState("");
    const [title,setTitle] = useState("");
    

    const postNewThread = async() => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "bearer " + localStorage.getItem("token")+ "tC");
        
        var urlencoded = new URLSearchParams();
        urlencoded.append("title",title);
        urlencoded.append("image",images);
        urlencoded.append("scope",type);
        console.log(urlencoded)
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };
        
        await fetch("https://hcmusemu.herokuapp.com/forum/post", requestOptions)
            .then(response => {return response.json()})
            .then(result => {console.log(result)})
            .catch(error => console.log(error));
    }

    const handleCapture = (e) => {
        let reader = new FileReader();
        reader.onload = function(e) {
            setImages(reader.result)
        }
        reader.readAsDataURL(e.target.files[0]);
      }

    const renderPicture = () => {
        return (
            <div class={classes.imgContainer}>
                
                <img style={{width:"80px", height:"80px"}} src={images}/>
                <IconButton className={classes.close} onClick={resetImage}>
                    <HighlightOffIcon/>
                </IconButton>
            </div>
        )
    }
    const resetImage = () => {
        setImages("");
        setTitle("");
    }
    const handleTitle = (event) => {
        setTitle(event.target.value);
    }
 
    const handleChangeType = (event) => {
        setType(event.target.value);
    }
    return(
        <Dialog
            className={classes.root}
            fullWidth
            maxWidth="md"
            open={isOpen}
            onClose={handleClose}
            aria-labelledby = "max-width-dialog-title">
            <DialogTitle  id="max-width-dialog-title">Đăng bài viết</DialogTitle>
          
            <DialogContent>
            <InputLabel id="demo-simple-select-label">Nơi đăng</InputLabel>
                <Select
                autoWidth
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
            <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <Input type="file" className={classes.input} id="icon-button-photo" onChange={handleCapture} accept="image/png, image/jpeg, image/jpg, img/tiff"/>
                <label htmlFor="icon-button-photo">
                    <IconButton color="primary" component="span">
                        <PhotoCameraIcon />
                    </IconButton>
                </label>
                <br/>
                <label> Nội dung thảo luận </label>
                <TextField className={classes.HeightTextField} required variant="outlined" value={title} onChange={handleTitle} margin="normal"  fullWidth size="medium" multiline placeholder="Nhập tiêu đề tại đây ^^"/>
                {renderPicture()}

            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} onChange={resetImage} color="primary">
                    Huỷ
                </Button>
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