import React, {useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {Box,Typography,Button} from '@material-ui/core'
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import DeleteIcon from '@material-ui/icons/Delete';
import ConfirmDialog from "../../components/shared/ConfirmDialog"
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

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
function UserComment({id,email}) {
    const classes = useStyles();
    const [comment,getComment] = useState([]); 
    const [confirmDialog,setConfirmDialog] = useState({isOpen:false, title:"",subTitle:""})  
    const [list,setList] = useState([]);
    const [currentComment,setCurrentComment] = useState(null);
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
    const getLikedUser = async() => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "bearer " + localStorage.getItem("token")+ "tC");
        
        var urlencoded = new URLSearchParams();
        urlencoded.append("IDPost", id);
  
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };
        await fetch("https://hcmusemu.herokuapp.com/forum/viewlike", requestOptions)
            .then(response => {return response.json()})
            .then((result)=>{
              setList(result);
            })
            .catch(error => console.log('error', error));
      }
    useEffect(()=>{
      const timer = setTimeout(() => {
        getPostComment();
        getLikedUser();
      }, 3000);
      return () => clearTimeout(timer);
    },[])
    const handleDeleteComment = (id) => {
      setConfirmDialog({
        ...confirmDialog,
        isOpen: false
    })
    deleteComments(id);
    }
    const removeElementState =(id)=> {
      var array = [...comment];
      var index = array.findIndex(x=> x.ID === id);
      if (index !== -1) {
        array.splice(index, 1);
        getComment([...array]);
      }
    }
    const deleteComments = async(id) => {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "bearer " + localStorage.getItem("token")+ "tC");
      
      var urlencoded = new URLSearchParams();
      urlencoded.append("IDCmt", id);
      var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: urlencoded,
          redirect: 'follow'
      };
      await fetch("https://hcmusemu.herokuapp.com/forum/deletecmt", requestOptions)
      .then((response) => {
        const statusCode = response.status;
        const dataRes = response.json();
        return Promise.all([statusCode, dataRes]);
      }).then(([statusCode, dataRes]) => {
        if(statusCode === 200){
          console.log("Xoá thành công");
          removeElementState(id);
        }
        else{
          console.log(statusCode);
          console.log("loi");
        }
  
      }).catch((err) => console.log(err, "error"));
    }
    const renderImageUser = (item) =>{
        if (item.image != "")
        return(
              <Zoom>
                <img style={{height:"100px", width:"100px"}} src={item.image} alt="recipe thumbnail"/>  
              </Zoom> 
        )
        else return(
          <div>  
          </div>
        )
       }
    
    
    const totalProps = comment.reduce((a, obj) => a + Object.keys(obj).length, 0)/3;
    const totalLike = list.reduce((a, obj) => a + Object.keys(obj).length, 0)/3;
   

    const renderUserLike = () =>{
      if (totalLike == 0)
      return(
        <div></div>
      )
      else{
        return list.map((item, index) => {
          return (
              <div key={index} style={{ display: 'flex', alignItems: 'center',flexWrap: 'wrap',}}>
                    <Avatar src={item.Avart}/>  <span>&nbsp; {item.Name}</span>
              </div>
  
          )
      })}}
    const renderComment = () =>{
      
      return comment.map((item, index) => {
        return (
            <div key={index}>
                <Box border={0.1} borderColor="black" borderRadius="5px" width="100%" height="50%">
                  <CardHeader avatar={<Avatar src= {item.AvartOwn}/>} title={item.NameOwn} 
                   action={
                    <Button aria-label="settings" disabled={email==item.EmailOwn?false:true} onClick={()=>{
                      setCurrentComment(item.ID); 
                      setConfirmDialog({
                       isOpen: true,
                       title: 'Bạn muốn xoá bình luận này chứ',
                       subTitle: "Giao tác không thể hoàn",
                       onConfirm: () => {handleDeleteComment(currentComment);setConfirmDialog({isOpen: false,}); }
                   })}}>
                      <DeleteIcon />
                    </Button>               
                  }/>
                  {renderImageUser(item)}

                    <div>
                        <Typography style={{ marginLeft:"5%"}} >{item.comment}</Typography>
                    </div>
                    <ConfirmDialog
              confirmDialog={confirmDialog}
              setConfirmDialog={setConfirmDialog}
              />
                </Box>
            </div>

        )
    })}

   
    if (totalProps == 0){
      return null;
    }
    else{
        return(
          <div>
            <hr/>
            <Typography> Những người like bài viết:</Typography>
            {renderUserLike()}
            <hr/>
            <Typography>Bình luận ở dưới:</Typography>
            {renderComment()}
          </div>
        )
  }
}
    
  
  
 UserComment.propTypes = {
    id: PropTypes.any.isRequired,
    email: PropTypes.string.isRequired
  };

export default UserComment;