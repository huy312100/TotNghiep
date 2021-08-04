import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import NavBar from '../../Navigation/NavBar';
import { Button } from '@material-ui/core';
const background = {
    display: "block",
    position: "absolute",
    top: "25%",
    left: "50%",
    // marginTop: "-15vw",
    marginLeft: "-15vw",
    width: "30vw",
    // minWidth:"300px",
    // height: "30vw",
    // border: "1px solid black",
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

   // const location = useLocation()
    //const token = new URLSearchParams(location.search).get("token")
    //onst token = localStorage.getItem("token");
    const history = useHistory()

    const resetPassword_API = () => {
        var myHeaders = new Headers();
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
        
        fetch("https://hcmusemu.herokuapp.com/account/changepassword", requestOptions)
            .then(response => {
                if (response.ok)
                    return response
                else{
                    console.log(response.status);
                    console.log(response.text());
                    throw Error("Đã xảy ra lỗi,vui lòng thử lại")
                }
            })
            .then(result => history.push("/"))
            .catch(error => { console.log('error', error) });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        resetPassword_API()
    }

    return(
        <div>
        <NavBar/>
        <div style={background}>
            <form >
                <div style={header}>Thay đổi mật khẩu </div>
                <div style={body}>
                    <div style={text}>Nhập mật khẩu cũ</div>
                    <input style={input} type="password" required onChange={(event) => setOldPw(event.target.value)} />
                    <div style={text}>Nhập mật khẩu mới</div>
                    <input style={input} type="password" required onChange={(event) => setNewPw(event.target.value)} />
                    <Button  onClick={(e)=>handleSubmit(e)} style={button}>Xác nhận </Button>
                </div>
            </form>
        </div>
    </div>
    )}