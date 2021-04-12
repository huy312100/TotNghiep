import React, { Component } from 'react';
import '../../style/Signup.css';


class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            pwrepeat: "",
        }
    }

    ActionSignup = () => {
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

        fetch("https://hcmusemu.herokuapp.com/account/signup", requestOptions)
            .then(response => {
                if (response.status == 409) {
                    alert("Tai khoan ton tai")
                    throw Error(response.status)
                }
                return response.json()
            })
            .then(result => {
                alert("Dang ki thanh cong")
            })
            .catch(error => console.log('error', error));
    }

    checkPasswordRepeat = () => {
        if (this.state.password === this.state.pwrepeat) {
            this.ActionSignup();
        }
        else {
            alert("Nhập lại mật khẩu sai")
        }
    }

    setParams = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    render() {
        return (
            <div className="signup-box">
                <form>
                    <div className="container">
                        <h1>Đăng kí</h1>
                        <hr />
                        <label htmlFor="email"><b>Tên đăng nhập</b></label>
                        <input type="text" placeholder="Nhập tên đăng nhập" name="username" onChange={this.setParams} />
                        <label htmlFor="psw"><b>Mật khẩu</b></label>
                        <input type="password" placeholder="Nhập mật khẩu" name="password" onChange={this.setParams} />
                        <label htmlFor="psw-repeat"><b>Nhập lại mật khẩu</b></label>
                        <input type="password" placeholder="Nhập lại mật khẩu" name="pwrepeat" onChange={this.setParams} />
                        <p>Bằng cách nhấp vào Đăng ký, bạn đồng ý với  <a href="#" style={{ color: 'dodgerblue' }}>Điều khoản &amp; Chính sách</a> của chúng tôi.</p>
                        <div className="clearfix">
                            <button type="button" className="signupbtn" onClick={() => this.checkPasswordRepeat()}>Đăng Kí</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default Signup;