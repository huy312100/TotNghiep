import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

export default function LoginButton() {
    const [username, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loadding, setLoadding] = useState(0);
    const [success, setSuccess] = useState(0);

    let history = useHistory();
    useEffect(() => {
        if (localStorage.getItem("token") && success===1) {
            history.replace("/");
        }
    },[success])


    async function AcctionLogin() {
        setLoadding(1);

        console.log(username);
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("username", username);
        urlencoded.append("password", password);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        await fetch("https://hcmusemu.herokuapp.com/account/signin", requestOptions)
            .then(response => {
                console.log(response.clone)
                if (response.ok) {
                    return response.json()
                }
                throw Error(response.status)
                // return response.json();
            })
            .then(result => {
                console.log(result.token)
                if (result.token !== undefined) {
                    localStorage.setItem("token", result.token+"sT")
                    // localStorage.setItem("username", this.state.username)
                    // console.log(result.token)
                    
                    // console.log(username)
                    setSuccess(1)
                }
                // alert("Thanh cong")
            })
            .catch(error => {
                console.log('error', error)
                alert("Sai mat khau hoac tai khoan")
                // alert(localStorage.getItem("token"))
                setLoadding(0);
            });
        // return false;
    }

    function loaddingButton() {
        if (loadding===1){
        return (
            <button type="button" className="btnSubmit"><i className="fa fa-circle-o-notch fa-spin"></i>Loading</button>

        )}
        return (
            <button type="button" className="btnSubmit" onClick={AcctionLogin}>Đăng nhập</button>
        )
    }

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-8 info">
                    <img className="row" width="30%" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png" alt="logo"></img>
                    <h3 className="row">Ứng dụng kết nối và quản lý cổng học tập</h3>
                </div>
                <div className="col-md-4 login-form-1">
                    <form>
                        <h3>Đăng nhập</h3>
                        <div className="form-group">
                            <input  type="text" className="form-control" name="username" placeholder="Tài khoản" onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <input  type="password" className="form-control" name="password" placeholder="Mật khẩu" onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            {loaddingButton()}
                            <Link to="/signup" className="btnForgetPwd">Đăng kí</Link>
                        </div></form>
                </div>
            </div>
        </div>
    )
}