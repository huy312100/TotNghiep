import React, {useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {Box,Typography, IconButton,Input,TextField} from '@material-ui/core'
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import DeleteIcon from '@material-ui/icons/Delete';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';



const useStyles = makeStyles((theme) => ({
    root: {
      margin:'auto',
      flexDirection: 'column',
      maxWidth: '75%',
    },
    media: {
      height: 0,
      paddingTop: '10%',
    },
    avatar: {
      backgroundColor: "#f44336",
    },
    input: {
      display: 'none'
  },
  }));
function UserComment({id}) {
    const classes = useStyles();
    const [comment,getComment] = useState([]); 
    const [images,setImages] = useState("")
    const [title,setTitle] = useState("")
    const getPostComment = async() => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "bearer " + localStorage.getItem("token")+ "tC");
        var urlencoded = new URLSearchParams();
        urlencoded.append("IDPost",id);
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };
        await fetch("https://hcmusemu.herokuapp.com/forum/viewcmttop", requestOptions)
            .then((response) => {
              return response.json()})
            .then(result=>{
                getComment(result);
            })
            .catch(error => console.log('error', error));
      }
    useEffect(()=>{
        getPostComment();
    },[])

    const handleTitle = (event) => {
      setTitle(event.target.value);
    }

    const handleCapture = (e) => {
      const reader = new FileReader();
      reader.onload = function() {
          console.log(reader.result)
          setImages(reader.result)
      }
      reader.readAsDataURL(e.target.files[0]);
    }
    const renderImage = (item) =>{
        if (item.image != "")
        return(
              <img style={{height:"100px", width:"100px"}} src={item.image} alt="recipe thumbnail"/>   
        )
        else return(
          <div>  
          </div>
        )
       }
    const totalProps = comment.reduce((a, obj) => a + Object.keys(obj).length, 0);

    const renderBoxPostComment = () =>{
      return(
        <Box border={0.1} borderColor="black" borderRadius="5px" width="100%" height="50%">
            <Input type="file" className={classes.input} id="icon-button-photo" onChange={handleCapture} accept="image/png, image/jpeg, image/jpg, img/tiff"/>
                <label htmlFor="icon-button-photo">
                    <IconButton color="primary" component="span">
                        <PhotoCameraIcon />
                    </IconButton>
                </label>
                <TextField className={classes.HeightTextField} required variant="outlined" value={title} onChange={handleTitle} margin="normal"  fullWidth size="small" multiline placeholder="Nhập bình luận của bạn tại đây ^^"/>
        </Box>
      )
    }

    const renderComment = () =>{
      return comment.map((item, index) => {
        return (
            <div key={index}>
                <Box border={0.1} borderColor="black" borderRadius="5px" width="100%" height="50%">
                  <CardHeader avatar={<Avatar src= {item.AvartOwn}/>} title={item.NameOwn} 
                   action={
                    <IconButton aria-label="settings">
                      <DeleteIcon />
                    </IconButton>
                  }/>
                  {renderImage(item)}
                    <div>
                        <Typography style={{ marginLeft:"5%"}} >{item.comment}</Typography>
                    </div>
                </Box>
            </div>

        )
    })
    }
    if (totalProps == 0){
      return(
        <div>
          {renderBoxPostComment()}
        </div>
      )
    }
    else{
        return(
          <div>
            {renderBoxPostComment()}
            {renderComment()}
          </div>
        )
  }
}
    
  
  
 UserComment.propTypes = {
    id: PropTypes.any.isRequired,
  };

export default UserComment;