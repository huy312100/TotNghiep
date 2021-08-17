import React, { useEffect, useRef, useState } from 'react';
import NavSetting from './NavSetting';

function Parent() {
    const [username, setUsername] = useState("")
    const [pw, setPW] = useState("")
    const [rppw, setRPPW] = useState("")
    const [name, setName] = useState("")
    const [success, setSuccess] = useState(-1)
    const [repeat, setRepeat] = useState(false)
    const [loadding, setLoadding] = useState(0)

    const SignupParent = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "bearer " +localStorage.getItem("token"));
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("username", username);
        urlencoded.append("password", pw);
        urlencoded.append("HoTen", name);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch("https://hcmusemu.herokuapp.com/account/signupparent", requestOptions)
        .then(response => {
            if (response.ok) {
                return response.text()
            }
            throw Error("Không thể đăng kí")
        }
        )
        .then(result => {
            console.log(result)
            setLoadding(0)
            setSuccess(1)
        })
        .catch(error => {
            console.log('error', error)
            setLoadding(0)
            setSuccess(0)
        });
    }

    const checkSuccess = () => {
        if (success === 1) {
            return <div className="btnconnect-box">
                <label className="connect-status success">
                    Đăng kí thành công
                </label>
                {checkLoadding()}
            </div>
        }
        else if (repeat) {
            return <div className="btnconnect-box">
                <label className="connect-status fail">
                    Nhập lại mật khẩu sai
                </label>
                {checkLoadding()}
            </div>
        }
        else if (!repeat && success === -2) {
            return <div className="btnconnect-box">
                <label className="connect-status fail">
                    Vui lòng nhập mật khẩu
                </label>
                {checkLoadding()}
            </div>
        }
        else if (!repeat && success === 0) {
            return <div className="btnconnect-box">
                <label className="connect-status fail">
                    Đã có lỗi
                </label>
                {checkLoadding()}
            </div>
        }
        else {
            return <div className="btnconnect-box">
                <div></div>
                {checkLoadding()}
            </div>
        }
    }

    const checkRepeatPassword = () => {
        if (pw==="")
        {
            setRepeat(false)
            setSuccess(-2)
        }
        else if (pw === rppw) {
            // this.setState({ repeat: 0, success: -1 })
            setRepeat(false)
            setSuccess(-1)
            // this.changePassword();
            SignupParent()
        }
        else {
            setRepeat(1)
            // this.setState({ repeat: 1 })
        }

    }

    const checkLoadding = () => {
        if (loadding === 0) {
            return <div className="btnconnect" type="button" onClick={checkRepeatPassword}>Đăng kí</div>
        }
        else {
            return <div className="btnconnect" type="button" ><i class="fa fa-circle-o-notch fa-spin"></i>Đăng kí</div>
        }
    }

    return (
        <div>
            <NavSetting />
            <div style={{ margin: "auto" }} className="col col-12 col-md-6">
                <div className="change-pw">
                    <div className="pw-input">
                        <label>Tài khoản phụ huynh</label>
                        <input className="inputops inputpw" onChange={(e) => setUsername(e.target.value)} value={username} />
                    </div>
                    <div className="pw-input">
                        <label>Mật khẩu phụ huynh</label>
                        <input type="password" className="inputops inputpw" onChange={(e) => setPW(e.target.value)} value={pw} />
                    </div>
                    <div className="pw-input">
                        <label>Nhập lại mật khẩu phụ huynh</label>
                        <input type="password" className="inputops inputpw" onChange={(e) => setRPPW(e.target.value)} value={rppw} />
                    </div>
                    <div className="pw-input">
                        <label>Tên người dùng(phụ huynh)</label>
                        <input className="inputops inputpw" onChange={(e) => setName(e.target.value)} value={name} />
                    </div>

                    <div className="connect-box">
                        {checkSuccess()}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Parent;