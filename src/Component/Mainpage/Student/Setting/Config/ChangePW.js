import React, { Component } from 'react';
import Navbar from '../../Navbar';
import NavSetting from './NavSetting';
import "../../../../../style/ChangePW.css"


class ChangePW extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pw: "",
            newpw: "",
            reptnewpw: "",
            loadding: 0,
            success: -1,
            repeat: 0
        }

    }

    changePassword = () => {
        this.setState({ loadding: 1 })
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "bearer " + localStorage.getItem("token"));
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("Oldpassword", this.state.pw);
        urlencoded.append("Newpassword", this.state.newpw);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch("https://hcmusemu.herokuapp.com/account/changepassword", requestOptions)
            .then(response => {
                if (response.ok) {
                    return response.text()
                }
                throw Error("Không thể đổi mật khẩu")
            }
            )
            .then(result => {
                console.log(result)
                this.setState({
                    loadding: 0,
                    success: 1
                })
            })
            .catch(error => {
                console.log('error', error)
                this.setState({
                    loadding: 0,
                    success: 0
                })
            });
    }

    setParams = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    checkSuccess = () => {
        if (this.state.success === 1) {
            return <div className="btnconnect-box">
                <label className="connect-status success">
                    Đổi thành công
                </label>
                {this.checkLoadding()}
            </div>
        }
        if (this.state.repeat === 1) {
            return <div className="btnconnect-box">
                <label className="connect-status fail">
                    Nhập lại mật khẩu mới sai
                </label>
                {this.checkLoadding()}
            </div>
        }
        if (this.state.repeat === 0 && this.state.success === 0) {
            return <div className="btnconnect-box">
                <label className="connect-status fail">
                    Mật khẩu sai
                </label>
                {this.checkLoadding()}
            </div>
        }
        else {
            return <div className="btnconnect-box">
                <div></div>
                {this.checkLoadding()}
            </div>
        }
    }

    checkRepeatPassword = () => {
        if (this.state.newpw === this.state.reptnewpw) {
            this.setState({ repeat: 0, success: -1 })
            this.changePassword();
        }
        else {
            this.setState({ repeat: 1 })
        }

    }

    checkLoadding = () => {
        if (this.state.loadding === 0) {
            return <div className="btnconnect" type="button" onClick={this.checkRepeatPassword}>Đổi mật khẩu</div>
        }
        else {
            return <div className="btnconnect" type="button" ><i class="fa fa-circle-o-notch fa-spin"></i>Đổi mật khẩu</div>
        }
    }


    render() {
        return (
            <div>
                {/* <Navbar /> */}
                <NavSetting />
                <div style={{ margin: "auto" }} className="col col-12 col-md-6">
                    <div className="change-pw">
                        <div className="pw-input">
                            <label>Mật khẩu hiện tại</label>
                            <input type="password" className="inputops inputpw" name="pw" onChange={this.setParams} value={this.state.pw} />
                        </div>
                        <div className="pw-input">
                            <label>Mật khẩu mới</label>
                            <input type="password" className="inputops inputpw" name="newpw" onChange={this.setParams} value={this.state.newpw} />
                        </div>
                        <div className="pw-input">
                            <label>Nhập lại mật khẩu mới</label>
                            <input type="password" className="inputops inputpw" name="reptnewpw" onChange={this.setParams} value={this.state.reptnewpw} />
                        </div>
                        <div className="connect-box">
                            {this.checkSuccess()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ChangePW;
