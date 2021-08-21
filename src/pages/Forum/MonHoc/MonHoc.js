import React , {useState, useEffect,useCallback,useRef}from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LoadingScreen from "../../../components/shared/LoadingScreen"
import { Typography,Card,CardHeader,CardActions,CardContent,CardMedia,Avatar,Box,Menu,MenuItem,Select,ListItem } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import ConfirmDialog from "../../../components/shared/ConfirmDialog"
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import ViewComment from '../ViewComment';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CommentIcon from '@material-ui/icons/Comment';
import TimeAgo from '../../../components/functions/TimeAgo';
import checkTokenExpired from '../../../ValidAccess/AuthToken';
import { useHistory } from 'react-router-dom';


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
      wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
      },
      buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
      },
      buttonSuccess: {
        backgroundColor: green[500],
        '&:hover': {
          backgroundColor: green[700],
        },
      },
      like_dialog_popup: {
        display: "fixed", 
        background: "#e4e7af", 
        position: "fixed", 
        top: "50%", 
        left: "55%", 
        transform: "translate(-50%, -50%)", 
        width: "50%", 
        borderColor: "black"
      }
  }));

export default function MonHoc(props)
{
    const classes = useStyles();
    const [forumPosts,setForumPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingAll,setLoadingAll] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);
    const [currentPost,setCurrentPost] = useState(null);
    const [userMail,setUserMail] = useState(null);
    const [confirmDialog,setConfirmDialog] = useState({isOpen:false, title:"",subTitle:""})  
    const [popup,setPopUp] = useState(false);
    const [listLike,setListLike] = useState([]);
    const self = props.self;
    const unmounted = useRef(false);
    const [pageCurrent,setPageCurrent] = useState(0);
    const [data,setData] = useState([]);
    const [selectedCourse,setSelectedCourse] = useState("");
    const [section,setSection] = useState("Ứng dụng");
    const history = useHistory();
    const handleChangeSelectedCourse = (event) => {
       setSelectedCourse(event.currentTarget.value);
      };
    
    const handleSectionChange = (event) =>{
        setSection(event.currentTarget.value);
    }

    const getAllCourses = async () => {
      if (checkTokenExpired()) {
        localStorage.clear()
        history.replace("/");
        return null
        }
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
              setData(data.concat(dataRes));
              setPageCurrent(pageCurrent+1);            
            }
            if (statusCode === 500){
              setLoadingAll(false);
            }
            setLoading(false);
          })
          .catch((err) => console.log(err, "error"));
      };

    const getAllCoursePosts = async(id) => {
      if (checkTokenExpired()) {
        localStorage.clear()
        history.replace("/");
        return null
        }
        console.log(id);
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "bearer " + localStorage.getItem("token"));
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("IDCourses",id);
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
           
        };
        let url;
        if (section==="Ứng dụng"){
          url = "https://hcmusemu.herokuapp.com/forum/courses/viewone"
        }
        else if (section === "Moodle"){
          url = "https://hcmusemu.herokuapp.com/forummoodle"
        }
        await fetch(url, requestOptions)
        .then((response) => {
          const statusCode = response.status;
          const dataRes = response.json();
          return Promise.all([statusCode, dataRes]);
        }).then(([statusCode, dataRes]) => {
              console.log(statusCode,dataRes);
              if(statusCode === 200){
                if (self == "self" && dataRes.length >0 ){
                    dataRes = dataRes.filter(forum => forum.EmailOwn == userMail);
                }
                let data = [];
                for (var i=0;i< dataRes.length;i++){
                  data.push({
                    ID: dataRes[i].ID,
                    IDCourses: dataRes[i].IDCourses,
                    EmailOwn: dataRes[i].EmailOwn,
                    AvartaOwn: dataRes[i].AvartaOwn,
                    LikeByOwn: dataRes[i].LikeByOwn,
                    NameOwn: dataRes[i].NameOwn,
                    comment: dataRes[i].comment,
                    image: dataRes[i].image,
                    like: dataRes[i].like,
                    scope: dataRes[i].scope,
                    time: dataRes[i].time,
                    title: dataRes[i].title,
                    showcomment: false
                  })
                }
                setForumPosts(dataRes);
              }
              if (statusCode === 500){
                setForumPosts([]);
                
              }
            })
            .catch(error => console.log('error', error));
        }
    const handleOptionsClick = (e,id) => {
            setCurrentPost(id);
            setAnchorEl(e.currentTarget);
          };
        
          
    const handleOptionsClose = () => {
            setAnchorEl(null);
          };
      
      
          
    const getUserEmail = ()=>{
      if (checkTokenExpired()) {
        localStorage.clear()
        history.replace("/");
        return null
        }
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
    useEffect(()=>{
      if (loadingAll === false && (selectedCourse !== null || selectedCourse !== "")){
        getUserEmail();
        getAllCoursePosts(selectedCourse);
      }
    },[selectedCourse,section,self])
    useEffect(() => {
        getAllCourses();
        return()=>{
            unmounted.current = true;
        }
      }, [pageCurrent]);
     const Btn_ClickShowComment = (forum) => {
        let items = [...forumPosts];
    
        const index = items.findIndex(item => item.ID === forum.ID);
        if (items[index].showcomment === false){
        items[index].showcomment = true;
        }
        else{
          items[index].showcomment = false;
        }
        setForumPosts(items)
      
      }
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
        if (checkTokenExpired()) {
          localStorage.clear()
          history.replace("/");
          return null
          }
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
        await fetch("https://hcmusemu.herokuapp.com/forum/courses/like", requestOptions)
            .then(response => {return response.json()})
            .then(
              updateState(id,"LikeByOwn",1)
              )
            .catch(error => console.log('error', error));
      }
  
      const unLikePosts = async(id) => {
        if (checkTokenExpired()) {
          localStorage.clear()
          history.replace("/");
          return null
          }
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
        await fetch("https://hcmusemu.herokuapp.com/forum/courses/unlike", requestOptions)
            .then(response => {return response.json()})
            .then(
              updateState(id,"LikeByOwn",0)
              )
            .catch(error => console.log('error', error));
      }
  
      const deletePosts = async(id) => {
        if (checkTokenExpired()) {
          localStorage.clear()
          history.replace("/");
          return null
          }
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
        await fetch("https://hcmusemu.herokuapp.com/forum/courses/delete", requestOptions)
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
            {item.LikeByOwn === 0 ? <FavoriteIcon/> :<FavoriteIcon style={{ color: 'red' }} />}
            {item.like}
          </div>
        )}
      const getPostLiked = async(id) => {
        if (checkTokenExpired()) {
          localStorage.clear()
          history.replace("/");
          return null
          }
          let details = {
            IDPost: id
        }
        let formBody = [];
    
        for (let property in details) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        fetch("https://hcmusemu.herokuapp.com/forum/courses/viewlike", {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              "Authorization": `bearer ${localStorage.getItem("token")}`,
            },
            body: formBody,
        }) .then((response) => {
            const statusCode = response.status;
            const dataRes = response.json();
            return Promise.all([statusCode, dataRes]);
        }).then(([statusCode, dataRes]) => {
            console.log(statusCode,dataRes);
            if(statusCode === 200){
                setListLike(dataRes);
            }
        }).catch(error => console.log('error', error));
      }
      const renderSelectedCourse = () =>{
        let default_data = data[0].IDCourses;
        if (data.length> 0){
          return(
            <Select
            native
            value={selectedCourse}
            onChange={handleChangeSelectedCourse}
          >
              <option selected disabled>Chọn 1 môn để xem</option>
              {
              data.map((item, index) => {
                    return (
                        <option  key={index} value={item.IDCourses}>{item.name}</option>
                )})
              }
          
          </Select>
          )
      }
    }
      
      const renderSection = ()=>{
        return(
        <Select
        native
        value={section}
        onChange={handleSectionChange}
      
      >
        <option value="Ứng dụng" selected>Ứng dụng</option>
        <option value="Moodle">Moodle</option>
      </Select>)
      }

      const renderListUserLike = () =>{
        if (listLike.length === 0){
          return(<div>
            <Box style={{ padding: "20px", borderRadius: "7px",borderColor:"black" }} className={classes.like_dialog_popup}>
            <IconButton style={{position: "absolute",top: "0px",right: "0px",}}  onClick={() => {setListLike([]);setPopUp(false)}}><HighlightOffIcon/></IconButton>
            <Typography>Bạn hãy là người like bài viết đầu tiên ^^</Typography>
            </Box>
          </div>)
  
        }
        else{
          return(
            <div  onClick={() => setPopUp(false)}>
              <div style={{ padding: "20px", borderRadius: "10px" }} className={classes.like_dialog_popup}>
              <IconButton style={{position: "absolute",top: "0px",right: "0px",}}  onClick={() => setPopUp(false)}>
                <HighlightOffIcon/>
            </IconButton>
                {listLike.map((item, index) => {
                    return (
                      <div key={index}>
                          <CardHeader
                              avatar={
                                <Avatar
                                  src={item.Avart}
                                />
                              }
                              title={item.Name}
                            />
                      </div>
                )})}
              </div>
            </div>
         )
      }}
      const renderLikePopup = async(id) => {
          await getPostLiked(id);
          setPopUp(true);
      }
      const renderImage = (item) =>{
        if (item.image != "")
        return(
          <CardMedia
          className={classes.media}
          image={item.image}
          />
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
  
       const handleLike = async(item) =>
       {
          if (item.LikeByOwn != 0){
            await unLikePosts(item.ID);
            await updateNumberLike(item.ID,1)
          }
          else{
            await likePosts(item.ID);
            await updateNumberLike(item.ID,0)
          }
       }
  
      const handleDeletePost = (id) => {
        setConfirmDialog({
          ...confirmDialog,
          isOpen: false
      })
      deletePosts(id);
      }
      const getComments = useCallback((forum) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  
        var urlencoded = new URLSearchParams();
        urlencoded.append("IDPost", forum.ID);
  
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };
  
        return fetch("https://hcmusemu.herokuapp.com/forum/courses/viewcmt", requestOptions)
      }, [])
  
      const renderForum = () =>{
        if (loadingAll === false){
        if (forumPosts.length === 0){
          return(
            <Typography variant="h5" style={{textAlign:"center",marginTop:"5%"}}>
              Không có bài viết
            </Typography>
          )
        }
        else{
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
                          <Typography textAlign="center" variant="h6" style={{fontWeight:"bold"}}>
                            {item.NameOwn} 
                            <br/>
                            <span style={{fontWeight:"normal"}}>{TimeAgo(item.time)}</span>
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
                      onClick= {() => Btn_ClickShowComment(item)}
                      >
                        <CommentIcon/>
                      </IconButton>
                     
                  </CardActions>
                    {item.showcomment === true ? <ViewComment getComments={getComments} forum={item} email={userMail} /> : null}
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
                    : null
                    }
                    <MenuItem onClick={()=>{renderLikePopup(currentPost);setAnchorEl(null)}}> Người đã thích bài viết </MenuItem>  
                                  
                  </Menu>
                <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
                />
                </Card>
                {popup === true ? renderListUserLike() : null}
                <p/> <br/>
            </div>
          )})}
      }
    }
  
    if (loadingAll === true){
      return(
        <div>
          <LoadingScreen/>
        </div>
      )
      }
     else{
      return(
            <div>
                <span>
                {renderSelectedCourse()}
                &nbsp;&nbsp;&nbsp;&nbsp;
                {renderSection()}
                </span>

                <div>
                    <Typography>Bạn đang chọn xem diễn đàn: {selectedCourse} thuộc khu vực: {section} </Typography>
                </div>
                {renderForum()}
            </div>
    )}
}
