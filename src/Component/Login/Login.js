import React, { Component } from 'react';
import Footer from '../Footer';
import '../../style/Login.css';
import { Link, useHistory } from "react-router-dom";



class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        }
    }

    AcctionLogin = () =>{
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("username", this.state.username);
        urlencoded.append("password", this.state.password);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

         fetch("https://hcmusemu.herokuapp.com/account/signin", requestOptions)
            .then(response => {
                // console.log(response.clone)
                if (response.ok) {
                    return response.json()
                }
                throw Error(response.status)
                // return response.json();
            })
            .then(result => {
                // console.log(result.token)
                if (result.token !== undefined) {
                    localStorage.setItem("token", result.token)
                    // localStorage.setItem("username", this.state.username)
                    console.log(result.token)
                    console.log(this.state.username)
                }
                // alert("Thanh cong")
            })
            .catch(error => {
                alert("Sai mat khau hoac tai khoan")
                console.log('error', error)
                // alert(localStorage.getItem("token"))
            });
            // return false;
    }

    setParams = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }


    render() {
        return (
            <div>
                <div className="container login-container">
                    <div className="row">
                        <div className="col-md-8 info">
                            <img className="row" width="30%" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png" alt="logo"></img>
                            <h3 className="row">Ứng dụng kết nối và quản lý cổng học tập</h3>
                        </div>
                        <div className="col-md-4 login-form-1">
                            <h3>Đăng nhập</h3>
                            <div className="form-group">
                                <input type="text" className="form-control" name="username" placeholder="Tài khoản" onChange={this.setParams} />
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control" name="password" placeholder="Mật khẩu" onChange={this.setParams} />
                            </div>
                            <div className="form-group">
                                <a><button type="button" className="btnSubmit" onClick={this.AcctionLogin}>Đăng nhập</button></a>
                                <a href="/signup" className="btnForgetPwd">Đăng kí</a>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default Login;