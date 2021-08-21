import React, {useState } from 'react';
import { useHistory } from 'react-router-dom';
import NavBar from '../../Navigation/NavBar';
import { Button,IconButton } from '@material-ui/core';
import checkTokenExpired from '../../ValidAccess/AuthToken';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
const background = {
    display: "block",
    position: "absolute",
    top: "25%",
    left: "50%",
    marginLeft: "-15vw",
    width: "30vw",
    background: "#fff",
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",

}


const header = {
    fontWeight: "600",
    fontSize: "2.5vw",
    marginTop: "4vw",
    textAlign: "center",
    color: "#434343"
}

const body = {
    padding: "0.8vw",
}

const text = {
    display: "block",
    margin: "auto",
    width: "27vw",
    fontSize: "1.2vw",
    padding: "0.8vw",
    color: "#686d70"
}

const input = {
    display: "block",
    margin: "auto",
    padding: "0.7vw",
    width: "27vw",
    background: "#eeeeef",
    border: 'none',
    fontSize: "1.2vw",

}

const button = {
    background: "#3768a0",
    width: "20vw",
    height: "3vw",
    margin: "1.5vw auto",
    // padding:"10px",
    display: "block",
    color: "#fff",
    borderRadius: "0.8vw",
    border: "none",
    fontSize: "1.3vw"
}

export default function Reset() {

    const [oldPw, setOldPw] = useState(null)
    const [newPw, setNewPw] = useState(null)
    const [visible,setVisible] = useState(false);
    const history = useHistory()

    const resetPassword_API = async() => {
        if (checkTokenExpired()) {
            localStorage.clear()
            history.replace("/");
            return null
        }
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "bearer " + localStorage.getItem("token"));
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("Oldpassword", oldPw);
        urlencoded.append("Newpassword", newPw);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };
        
        await fetch("https://hcmusemu.herokuapp.com/account/changepassword", requestOptions)
        .then((response) => {
            const statusCode = response.status;
            const dataRes = response.json();
            return Promise.all([statusCode, dataRes]);
          })
          .then(([statusCode, dataRes]) => {
                console.log(statusCode,dataRes); 
                if (statusCode === 200){
                    alert("Thay mặt khẩu thành công")
                    history.push("/")
                }
                else{
                    alert("Đổi mật khẩu thất bại")
                }
            })
            .catch(error => { console.log('error', error) });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (oldPw === newPw){
            alert("Mật khẩu cũ giống mật khẩu mới");
            return;
        }
        if (oldPw === "" || newPw === ""){
            alert("Không được bỏ trống ô mật khẩu");
            return;
        }
        resetPassword_API()
    }

    const renderVisible = () =>{
        if (visible){
            return <VisibilityIcon/>
        }
        return <VisibilityOffIcon/>
    }
    
    return(
        <div>
        <NavBar/>
        <div style={background}>
            <form >
                <div style={header}>Thay đổi mật khẩu </div>
                <div style={body}>
                    <IconButton onClick={()=>setVisible(!visible)} style={{float:"right"}}>
                        {renderVisible()}
                    </IconButton>
                    <div style={text}>Nhập mật khẩu cũ</div>
                    <input  style={input} type={visible === true ? "text" : "password"} onChange={(event) => setOldPw(event.target.value)} />
                    <div style={text}>Nhập mật khẩu mới</div>
                    <input  style={input} type={visible === true ? "text" : "password"} onChange={(event) => setNewPw(event.target.value)} />
                    <Button  onClick={(e)=>handleSubmit(e)} style={button}>Xác nhận </Button>
                </div>
            </form>
        </div>
    </div>
    )}