import React , {useState, useEffect}from 'react';
import { Typography,makeStyles, Button,Box,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle } from '@material-ui/core';
import clsx from 'clsx';
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
import Modal from '@material-ui/core/Modal';
import { PostThread } from '../PostThread';
import LinearProgress from '@material-ui/core/LinearProgress';


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
    marginTop:"30px"
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
  }

}));

export default function Truong()
{
    const classes = useStyles();
    const [forumPosts,setForumPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isOpen,setIsOpen] = useState(false);

    const handleDialogOpen = () =>{
      setIsOpen(true);
    }

    const handleDialogClose = () => {
      setIsOpen(false)
    }
    const convertTime = (UNIX_timestamp) => {
      var time = new Date(UNIX_timestamp).toLocaleDateString('en-US');
      return time;
    }

    const getForumPosts = async() => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "bearer " + localStorage.getItem("token")+ "tC");
    
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow'
        };
        await fetch("https://hcmusemu.herokuapp.com/forum/view", requestOptions)
            .then(response => {return response.json()})
            .then((result)=>{
              result = result.filter(forum => forum.scope == 'u');
              setForumPosts(result)
            })
            .catch(error => console.log('error', error),
            setLoading(false));
    }
    
    useEffect(() => {
       getForumPosts();
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
    const likePosts = async(id) => {
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
      await fetch("https://hcmusemu.herokuapp.com/forum/like", requestOptions)
          .then(response => {return response.json()})
          .then(
            updateState(id,"LikeByOwn",1)
            )
          .catch(error => console.log('error', error));
    }

    const unLikePosts = async(id) => {
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
      await fetch("https://hcmusemu.herokuapp.com/forum/unlike", requestOptions)
          .then(response => {return response.json()})
          .then(
            updateState(id,"LikeByOwn",0))
          .catch(error => console.log('error', error));
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
     const renderComment = (num) =>{
       return (
         <div>
           <UserComment id={num}/>
         </div>
       )
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
                        <IconButton aria-label="settings">
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
                          {convertTime(item.time)}
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
                    onClick= {()=>renderComment()}
                    >
                      {renderCommentCount(item)}
                    </IconButton>
                   
                </CardActions>

                  <UserComment></UserComment>

              </Card>
              <p/> <br/>
          </div>
        )
  })
     }
  if (loading == true){
    return(
      <div className={classes.loadingEffect}>
      <LinearProgress />
      <LinearProgress color="secondary" />
    </div>
    )
    }
   else{
    return(
          <div>
            <Box className={classes.news_post} textAlign='center'>
              <Button variant='contained' onClick={handleDialogOpen} textAlign="center">Tạo bài thảo luận</Button>
            </Box>
            <PostThread  isOpen={isOpen} handleClose={handleDialogClose}/>
            {renderForum()}
          </div>
  )}
}
