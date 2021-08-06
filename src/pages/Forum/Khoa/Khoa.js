import React , {useState, useEffect}from 'react';
import { Typography,makeStyles, Button,Box,Menu,MenuItem,Input,TextField } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CommentIcon from '@material-ui/icons/Comment';
import UserComment from "../Comment"
import { PostThread } from '../PostThread';
import TimeAgo from '../../../components/functions/TimeAgo';
import ConfirmDialog from "../../../components/shared/ConfirmDialog"
import LoadingScreen from '../../../components/shared/LoadingScreen';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import defaultValue from "../../../images/default.png"
import SendIcon from '@material-ui/icons/Send';
const useStyles = makeStyles((theme) => ({
  root: {
    margin:'auto',
    flexDirection: 'column',
    maxWidth: '75%',
    backgroundColor: "#f5f8fa"
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
  avatar: {
    backgroundColor: "#f44336",
  },
  news_post:{
    marginTop:"30px",
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  loadingEffect:{
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
    },
  },
  dropdown: {
    position: "relative",
    display: "inline-block"
  },
  dropdown_content: {
    display: "none",
    position: "absolute",
    backgroundColor: "#f9f9f9",
    minWidth: "160px",
    boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)",
    padding: "12px 16px",
    zIndex: "1"
  },
  dropdown_hover__dropdown_content: {
    display: "block"
  },
  uploadBtn: {
    position: "absolute",
    left: 0,
    opacity: 0,
  },
  uploadWrap: {
    position: "relative"
  },

}));



export default function Truong()
{
    const classes = useStyles();
    const [forumPosts,setForumPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isOpen,setIsOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [currentPost,setCurrentPost] = useState(null);
    const [userMail,setUserMail] = useState(null);
    const [confirmDialog,setConfirmDialog] = useState({isOpen:false, title:"",subTitle:""})  
    const [mounted, setMounted] = useState(false);
    const [image,setImage] = useState("")
    const [upload,setUpload] = useState(null);
    const [title,setTitle] = useState("")
    const [previewComment,setPreViewComment] = useState({IDPost:"",Comment: "", Image:""})
    const [sent,setSent] = useState(false);

    const handleTitle = (event,id) => {
      setCurrentPost(id);
      setTitle(event.target.value);
    }
    const handleCommentPosted = () =>{
      setSent(true);
    }
    const handleOptionsClick = (e,id) => {
      setCurrentPost(id);
      setAnchorEl(e.currentTarget);
    };
    
    const handleOptionsClose = () => {
      setAnchorEl(null);
    };

    const handleDialogOpen = () =>{
      setIsOpen(true);
    }

    const handleDialogClose = () => {
      setIsOpen(false);
    }

    const getUserEmail = ()=>{
      var myHeaders = new Headers();
        myHeaders.append("Authorization", "bearer " + localStorage.getItem("token") );

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("https://hcmusemu.herokuapp.com/profile/view", requestOptions)
            .then(response => response.json())
            .then(result => {setUserMail(result[0].Email)})
            .catch(error => console.log('error', error));
    }
    const getForumPosts = async() => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "bearer " + localStorage.getItem("token"));
    
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow'
        };
        await fetch("https://hcmusemu.herokuapp.com/forum/view", requestOptions)
            .then(response => {return response.json()})
            .then((result)=>{
              result = result.filter(forum => forum.scope == 'f');
              setForumPosts(result)
            })
            .catch(error => console.log('error', error));
    }
    
    const postNewComment = async() => {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "bearer " + localStorage.getItem("token"));
      
      var formdata = new FormData();
      
      if(upload !== "" && upload !== null){


          formdata.append("IDPost", currentPost);
          formdata.append("comment", title);
          formdata.append("image", upload);
      }
  
      else{
          formdata.append("IDPost", currentPost);
          formdata.append("comment", title);
      }
      
      var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: formdata,
          redirect: 'follow'
      };
      await fetch("https://hcmusemu.herokuapp.com/forum/cmt", requestOptions)
      .then((response) => {
          const statusCode = response.status;
          const dataRes = response.json();
          return Promise.all([statusCode, dataRes]);
        }).then(([statusCode, dataRes]) => {
          if(statusCode === 200){
            console.log("Comment thanh cong")
            if(upload !== "" && upload !== null){
            setPreViewComment({IDPost:currentPost,Comment:title,Image:image})}
            else{
              setPreViewComment({IDPost:currentPost,Comment:title,Image:""})}
            }
          else{
            console.log(statusCode);
            console.log("loi");
          }
        }).catch((err) => console.log(err, "error"));
  }

    useEffect(() => {
       getForumPosts();
       getUserEmail();
       setLoading(false);

     },[]);

    
    const updateNumberLike = (id,type) => {
      if (type==1){
          var index = forumPosts.findIndex(x=> x.ID === id);
          let g = forumPosts[index]
          g['like']-=1
          let value = g['like'];
          updateState(id,"like",value)
      }
      else{
        var index = forumPosts.findIndex(x=> x.ID === id);
        let g = forumPosts[index]
        g['like']+=1
        let value = g['like'];
        updateState(id,"like",value)
      }
    }
    const updateState =(id, whichvalue, newvalue)=> {
      var index = forumPosts.findIndex(x=> x.ID === id);
    
      let g = forumPosts[index]
      g[whichvalue] = newvalue
      if (index === -1){
        console.log('no match')
      }
      else
        setForumPosts([
          ...forumPosts.slice(0,index),
          g,
          ...forumPosts.slice(index+1)
        ]);
    }

    const removeElementState =(id)=> {
      var array = [...forumPosts];
      var index = array.findIndex(x=> x.ID === id);
      if (index !== -1) {
        array.splice(index, 1);
        setForumPosts([...array]);
      }
    }


    const likePosts = async(id) => {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "bearer " + localStorage.getItem("token"));
      
      var urlencoded = new URLSearchParams();
      urlencoded.append("IDPost", id);
      var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: urlencoded,
          redirect: 'follow'
      };
      await fetch("https://hcmusemu.herokuapp.com/forum/like", requestOptions)
          .then(response => {return response.json()})
          .then(
            updateState(id,"LikeByOwn",1)
            )
          .catch(error => console.log('error', error));
    }

    const unLikePosts = async(id) => {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "bearer " + localStorage.getItem("token"));
      
      var urlencoded = new URLSearchParams();
      urlencoded.append("IDPost", id);
      var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: urlencoded,
          redirect: 'follow'
      };
      await fetch("https://hcmusemu.herokuapp.com/forum/unlike", requestOptions)
          .then(response => {return response.json()})
          .then(
            updateState(id,"LikeByOwn",0))
          .catch(error => console.log('error', error));
    }

    const deletePosts = async(id) => {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "bearer " + localStorage.getItem("token"));
      
      var urlencoded = new URLSearchParams();
      urlencoded.append("IDPost", id);
      var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: urlencoded,
          redirect: 'follow'
      };
      await fetch("https://hcmusemu.herokuapp.com/forum/delete", requestOptions)
      .then((response) => {
        const statusCode = response.status;
        const dataRes = response.json();
        return Promise.all([statusCode, dataRes]);
      }).then(([statusCode, dataRes]) => {
        if(statusCode === 200){
          removeElementState(id);
        }
        else{
          console.log("loi");
        }
  
      }).catch((err) => console.log(err, "error"));
    }

    const renderLike = (item) => {
      return(
        <div>
          {item.LikeByOwn == 0 ? <FavoriteIcon/> :<FavoriteIcon style={{ color: 'red' }} />}
          {item.like}
        </div>
      )}
    const renderCommentCount = (item) => {
       return(
         <div>
            <CommentIcon/>
            {item.comment}
         </div>
       )
     }
    const renderImage = (item) =>{
      if (item.image != "")
      return(
        <CardMedia
        className={classes.media}
        image={item.image}
        />
      )
      else return(
        <div>
          
        </div>
      )
     }
     
    const getCurrentMail = (id) => {
      var array = [...forumPosts];
      var index = array.findIndex(x=> x.ID === id);
      if (index != -1){
        return array[index].EmailOwn;
      }
      return "";
    }

     const handleLike = (item) =>
     {
        if (item.LikeByOwn != 0){
          unLikePosts(item.ID);
          updateNumberLike(item.ID,1)
        }
        else{
          likePosts(item.ID);
          updateNumberLike(item.ID,0)
        }
     }

    const handleDeletePost = (id) => {
      setConfirmDialog({
        ...confirmDialog,
        isOpen: false
    })
    deletePosts(id);
    }
    const renderForum = () =>{
      return forumPosts.map((item, index) => {
        return (
          <div key={index}>
                <Card className={classes.root}>
                    <CardHeader
                      avatar={
                        <Avatar aria-label="recipe" className={classes.avatar} src={item.AvartaOwn}/>
                      }
                      action={
                        <IconButton aria-label="settings" onClick={(e) => {
                          handleOptionsClick(e, item.ID);
                       }}>
                          <MoreVertIcon />
                        </IconButton>
                      }
                      title= {
                       <Typography variant="h6"></Typography>  
                      }
                      subheader= {
                        <Typography textAlign="center" variant="h7">
                          {item.NameOwn} 
                          <br/>
                          {TimeAgo(item.time)}
                        </Typography>
                      }
                      
                    />
                {renderImage(item)}
                <CardContent>
                 <Typography variant="h6"> {item.title}</Typography> 
                </CardContent>
                <CardActions disableSpacing>

                    <IconButton 
                    aria-label="like the post"
                    onClick= {() => handleLike(item)}
                    >
                      {renderLike(item)}
                    </IconButton>
                    <IconButton 
                    aria-label="Comment the post"
                    onClick= ""
                    >
                      {renderCommentCount(item)}
                    </IconButton>
                   
                </CardActions>
                  {renderBoxPostComment(item)}
                  {console.log(previewComment.IDPost)}
                   <UserComment 
                    id={item.ID} 
                    email = {userMail}
                    />
                   <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleOptionsClose}
                >
                  {userMail === getCurrentMail(currentPost) ?
                  <MenuItem onClick={()=>{
                       setConfirmDialog({
                        isOpen: true,
                        title: 'Bạn muốn xoá tin này chứ',
                        subTitle: "Giao tác không thể hoàn",
                        onConfirm: () => { handleDeletePost(currentPost);setConfirmDialog({isOpen: false,});setAnchorEl(null); }
                    })
                  }}>Xoá post</MenuItem>
                  :
                 <MenuItem> </MenuItem>
                }
                
                </Menu>
              <ConfirmDialog
              confirmDialog={confirmDialog}
              setConfirmDialog={setConfirmDialog}
              />
              </Card>

              <p/> <br/>
          </div>
        )
  })
     }
     const resetImage = () => {
      setImage("");
      setUpload("");
      setTitle("");
   }
   const handleImg = (event,id) => {
    setCurrentPost(id);
    setUpload(event.target.files[0]);
}
  const renderImageUploadComment = (item)=>{
      if (image!="" && item.ID == currentPost){
          return(
              <div>
              <div class={classes.imgContainer}>
                  <img src={image} style={{height:"80px",width:"80px"}}/>       
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
                  <img style={{height:"80px",width:"80px"}} src={defaultValue}/>
              </div>
          )}
  }

  const postMySelfComment = () =>{
    postNewComment();
    handleCommentPosted();
    setPreViewComment({IDPost:"",Comment:"",Image:""});
    resetImage();
    
    }
  const renderBoxPostComment = (item) =>{
      return(
        <Box border={0.1} borderColor="black" borderRadius="5px" width="100%" height="75%">
           <div className={classes.uploadWrap}>
             <label htmlFor="icon-button-file">
                        <IconButton color="primary" aria-label="upload picture"  component="span"  >
                            <PhotoCameraIcon />
                        </IconButton>
                        <Input   
                                autoWidth
                                type="file" 
                                id="photo" 
                                onChange={(e)=> {handleImg(e,item.ID)}} 
                               className={classes.uploadBtn}
                                accept=".png, .jpg, .jpeg, .gif"  
                            />
                    </label>
                    {renderImageUploadComment(item)}
                  </div>
                <TextField style={{width:"90%"}} className={classes.HeightTextField} required variant="outlined" value={title} onChange={(e)=>{handleTitle(e,item.ID)}} margin="normal"  fullWidth size="small" multiline placeholder="Nhập bình luận của bạn tại đây ^^"/>
                <Button style={{height:50, width:50}} variant="contained"  onClick={postMySelfComment} >
                  <SendIcon  style={{color:"blue",width: 30,height: 30,}}/>
                </Button>
        </Box>
      )
    }
  if (loading == true){
    return(
      <div>
        <LoadingScreen/>
      </div>
    )
    }
   else{
    return(
          <div>
            <Box style={{backgroundColor:"#b4cc37"}} className={classes.news_post} textAlign='center'>
              <Button style={{backgroundColor:"#b7e0eb"}} variant='contained' onClick={handleDialogOpen} textAlign="center">Tạo bài thảo luận</Button>
            </Box>
            <PostThread  isOpen={isOpen} handleClose={handleDialogClose}/>
            {renderForum()}
          </div>
  )}
}
