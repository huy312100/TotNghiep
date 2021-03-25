import React, { Component } from 'react';
import Footer from '../Footer';
import '../../style/Login.css';


class Login extends Component {
    render() {
        return (
            <div>
                <div className="container login-container">
                    <div className="row">
                        <div className="col-md-8 info">
                            <img className="row" width="30%" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png"></img>
                            <h3 className="row">Ứng dụng kết nối và quản lý cổng học tập</h3>
                        </div>
                        <div className="col-md-4 login-form-1">
                            <h3>Đăng nhập</h3>
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Tài khoản" />
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control" placeholder="Mật khẩu" />
                            </div>
                            <div className="form-group">
                                <a href="/home"><button type="submit" className="btnSubmit">Đăng nhập</button></a>
                                <a href="#" className="btnForgetPwd">Đăng kí</a>
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