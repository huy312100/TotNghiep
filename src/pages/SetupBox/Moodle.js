import React , {useState, useEffect}from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Box, Button,TextField,Typography} from "@material-ui/core"
import { Alert } from 'react-native';
import VisibilityPasswordTextField from "../../components/shared/VisibilityPasswordTextField"
import LoadingScreen from "../../components/shared/LoadingScreen"
import { useHistory } from 'react-router-dom';
import checkTokenExpired from '../../ValidAccess/AuthToken';
const useStyles = makeStyles((theme) => ({
    root: {
      background: "#faf9e8", 
     boxShadow: "rgba(0, 0, 0, 0.1) 0px 1px 3px",
      borderRadius: "50px 50px 0 0",
    },
    is_grouped: {
        display: "inline-block",
        justifyContent:"space-between"
      },
    is_grouped____button_not__last_child: {
        marginRight: "10px"
    },

    centerBox: {
        justifyContent: "center",
        alignItems: "center"
      }
  }));

export default function Moodle()
{
    const classes = useStyles()
    const [website,setWebsite] = useState("");
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [loading,setLoading] = useState(true)
    const [isVisible,setVisible] = useState(true);
    const [cancelBtnActive,setCancelBtnActive] = useState(false);
    const history = useHistory();
    const handleVisible = () =>{
        setVisible(!isVisible);
    }
    const handleURL = (event) => {
            setWebsite(event.target.value)
        }
    const handleUsername = (event) => {
            setUsername(event.target.value);
        }
    const handlePassword = (event) => {
            setPassword(event.target.value);
        }
    
    const isEmpty = (obj)=> {
            for(var prop in obj) {
                if(obj.hasOwnProperty(prop))
                    return false;
            }
        
            return true;
        }
    const getMoodleInfo = async() => {
            if (checkTokenExpired()) {
            localStorage.clear()
            history.replace("/");
            return null
            }
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "bearer " + localStorage.getItem("token"));
    
            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };
    
            await fetch("https://hcmusemu.herokuapp.com/web/getcustomlink", requestOptions)
            .then((response) => {
                const statusCode = response.status;
                const dataRes = response.json();
                return Promise.all([statusCode, dataRes]);
              }).then(([statusCode, dataRes]) => {
                if (statusCode === 200){
                    dataRes = dataRes.filter(connection => connection.Type === 'Moodle');
                    if (isEmpty(dataRes)===false)
                    {
                        setWebsite(dataRes[0].Url);
                        setUsername(dataRes[0].Username)
                        setCancelBtnActive(false);
                    }
                    else{
                        setCancelBtnActive(true);
                    }
                }
                else{
                   setCancelBtnActive(true);
                }
                setLoading(false);
                })
                .catch(error => {
                    console.log('error', error)
                });
    
    
        }
    const deleteMoodleInfo = async() => {
        if (checkTokenExpired()) {
            localStorage.clear()
            history.replace("/");
            return null
            }
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "bearer " + localStorage.getItem("token"));
            myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

            var urlencoded = new URLSearchParams();
            urlencoded.append("typeUrl","Moodle");

            var requestOptions = {
                method: 'DELETE',
                headers: myHeaders,
                body: urlencoded,
                redirect: 'follow'
            };
    
            await fetch("https://hcmusemu.herokuapp.com/web/deleteaccount", requestOptions)
                .then(response => {
                    console.log(response.status)
                    if (response.status === 200) {
                        afterDelete();
                        return response.text();
                    }
                    else {
                        throw new Error("Có lỗi không xoá được");
                    };
                })
                .then((result) => {setCancelBtnActive(true);Alert.alert("Huỷ kết nối thành công")})
                .catch(error => {
                    console.log('error', error)
                });
    
    
    }
    const handleDeleteMoodle = () =>{
        deleteMoodleInfo();
    }
    const afterDelete = () =>{
        setWebsite("");
        setUsername("");
        setPassword("");
    }
    useEffect(()=>{
        getMoodleInfo();
    },[])
    const postMoodleLink = async() => {
        if (checkTokenExpired()) {
            localStorage.clear()
            history.replace("/");
            return null
            }
            setLoading(false);
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "bearer " + localStorage.getItem("token"));
            myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    
            var urlencoded = new URLSearchParams();
            urlencoded.append("typeUrl","Moodle");
            urlencoded.append("url", website);
            urlencoded.append("username", username);
            urlencoded.append("password", password);
            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: urlencoded,
                redirect: 'follow'
            };
    
            await fetch("https://hcmusemu.herokuapp.com/web/postaccountcustom", requestOptions)
                .then(response => {
                    console.log(response.status);
                    if (response.status === 201) {
                        alert("Custom link Moodle thành công")
                        return response.text();
                    }
                    else {
                        console.log(response.status,response.statusText)
                        alert("Custom link Moodle không thành công. Xin thử lại ")
                        throw new Error('Lưu thất bại');
                    }
                })
                .then((result)=>{setCancelBtnActive(false);Alert.alert("Kết nối thành công")})
                .catch(error => {
                    console.log('error', error)
                });
    
    
        }
 

    const hanldePostMoodle = ()=>{
        postMoodleLink();
       
    }

    if (loading === true){
        return(
        <div className={classes.root}>
            <LoadingScreen/>
        </div>
        )
    }
   else{
    return (
        <div className={classes.root}>
        <Box  container
              justifyContent="center"
              alignItems="left"
              background="dark"
              marginLeft="25%"
              className={classes.centerBox}
            >
                
            <Typography  style={{fontWeight:"bold",marginLeft:"12.5%",color:"blue"}}> Nhập URL Moodle ở đây </Typography>
            <TextField 
                    required
                    id = "user_link"
                    value={website}  
                    variant="outlined"   
                    margin="normal"  
                    style={{width:"50%"}}
                    onChange={handleURL}
                    size="medium"  />
            <Typography   style={{fontWeight:"bold",marginLeft:"10%",color:"blue"}}> Nhập tài khoản Moodle ở đây </Typography>
            <TextField 
                    required
                    id = "user_name"
                    value={username}  
                    variant="outlined"   
                    margin="normal"  
                    style={{width:"50%"}}
                    onChange={handleUsername}
                    size="medium"  />
            <Typography style={{fontWeight:"bold",marginLeft:"10%",color:"blue"}}> Nhập mật khẩu Moodle ở đây </Typography>
            <VisibilityPasswordTextField 
                    required
                    isVisible={isVisible}
                    onVisibilityChange = {handleVisible}
                    id = "user_pass"
                    value={password}  
                    variant="outlined"   
                    margin="normal"  
                    style={{width:"50%"}}
                    onChange={handlePassword}
                    size="medium"  />
            <br/>
            <div className="btn-toolbar" style={{marginLeft:"5%"}}>
                <Button style={{width:"auto",backgroundColor: cancelBtnActive===true ? "green": "#bbf2ca" ,color:"white"}} disabled={!cancelBtnActive} onClick={hanldePostMoodle}>
                    Kết nối
                </Button>
                <Button onClick={handleDeleteMoodle} disabled={cancelBtnActive} style={{width:"auto",backgroundColor: cancelBtnActive===false?"red":"#f0b3b3",color:"white",marginLeft: 175}} >
                   Huỷ kết nối
                </Button>
            </div>
        </Box>
        </div>
    )
   }
}
