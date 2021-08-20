import React , {useState, useEffect}from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Box, Button,TextField,Typography} from "@material-ui/core"
import LoadingScreen from "../../components/shared/LoadingScreen"
import {useHistory} from "react-router-dom"
import checkTokenExpired from "../../ValidAccess/AuthToken"
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
    }
  }));

export default function Portal()
{
    const classes = useStyles()
    const [website,setWebsite] = useState("");
    const [loading,setLoading] = useState(true)
    const [cancelBtnActive,setCancelBtnActive] = useState(false);
    const history = useHistory();
  
    const handleChangeURL = (event) => {
        setWebsite(event.target.value)
    }
   
    const isEmpty = (obj)=> {
            for(var prop in obj) {
                if(obj.hasOwnProperty(prop))
                    return false;
            }
        
            return true;
        }
    const getPortalInfo = async() => {
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
                    dataRes = dataRes.filter(connection => connection.Type === 'Portal');
                    if (isEmpty(dataRes)===false)
                    {
                        setWebsite(dataRes[0].Url);
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
    const deletePortalInfo = async() => {
        if (checkTokenExpired()) {
            localStorage.clear()
            history.replace("/");
            return null
            }
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "bearer " + localStorage.getItem("token"));
            
            //let urlencoded = new URLSearchParams();
            //urlencoded.append("typeUrl","Portal")
            var requestOptions = {
                method: 'DELETE',
                headers: myHeaders,
                redirect: 'follow'
            };
    
            await fetch("https://hcmusemu.herokuapp.com/web/deleteaccountportal", requestOptions)
            .then((response) => {
                const statusCode = response.status;
                const dataRes = response.json();
                return Promise.all([statusCode, dataRes]);
              }).then(([statusCode, dataRes]) => {
                  console.log(statusCode);
                    if (statusCode === 200) {
                        afterDelete();
                        setCancelBtnActive(true);
                        alert("Xoá Portal thành công");
                    }
                    else {
                        alert("Xoá Portal không thành công");
                        throw new Error("Có lỗi không xoá được");
                    };
                })
                .catch(error => {
                    console.log('error', error)
                });
    
    
    }
    const handleDeletePortal = () =>{
        deletePortalInfo();
    }
    const afterDelete = () =>{
        setWebsite("");
    }
    useEffect(()=>{
        getPortalInfo();
    })
    const postPortalLink = async() => {
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
            urlencoded.append("typeUrl","Portal");
            urlencoded.append("url", website);
            urlencoded.append("username","");
            urlencoded.append("password","");
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
                        alert("Custom link Portal thành công")
                        setCancelBtnActive(false);
                        return response.text();
                    }
                    else {
                        console.log(response.status,response.statusText)
                        alert("Custom link Portal không thành công. Xin thử lại sau.")
                        throw new Error('Lưu thất bại');
                    }
                })
                .then()
                .catch(error => {
                    console.log('error', error)
                });
    
    
        }
 

    const handlePostPortal = ()=>{
        postPortalLink();
       
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
            >
                
            <Typography  style={{fontWeight:"bold",marginLeft:"12.5%",color:"blue"}}> Nhập URL Portal ở đây </Typography>
            <TextField 
                    id = "user_link"
                    value={website}  
                    variant="outlined"   
                    margin="normal"  
                    style={{width:"50%"}}
                    onChange={handleChangeURL}
                    size="medium"  
            />
          
            <div className="btn-toolbar" style={{marginLeft:"5%"}}>
                <Button style={{width:"auto",backgroundColor: cancelBtnActive===true ? "green": "#bbf2ca" ,color:"white"}} disabled={!cancelBtnActive} onClick={handlePostPortal}>
                    Kết nối
                </Button>
                <Button onClick={handleDeletePortal} disabled={cancelBtnActive} style={{width:"auto",backgroundColor: cancelBtnActive===false?"red":"#f0b3b3",color:"white",marginLeft: 175}} >
                   Huỷ kết nối
                </Button>
            </div>
        </Box>
        </div>
    )
   }
}
