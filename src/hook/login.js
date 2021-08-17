import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { StoreRole } from '../store/actions/authen';

export default function     LoginButton() {
    const [username, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loadding, setLoadding] = useState(0);
    const [success, setSuccess] = useState(0);
    const dispatch = useDispatch();

    let history = useHistory();
    useEffect(() => {
        if (localStorage.getItem("token") && success === 1) {
            history.replace("/");
        }
    }, [success])


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
                // console.log(response.clone)
                if (response.ok) {
                    return response.json()
                }
                throw Error(response.status)
                // return response.json();
            })
            .then(result => {
                console.log(result.token)
                if (result.token !== undefined) {
                    if (result.role === "1")
                        localStorage.setItem("token", result.token + "sT")
                    else if (result.role === "2")
                        localStorage.setItem("token", result.token + "tC")
                    else localStorage.setItem("token", result.token + "pR")
                    localStorage.setItem("role", result.role)
                    localStorage.setItem("expired", (new Date).getTime() + 7200000)
                    const action = StoreRole(result.role);
                    dispatch(action);
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
        if (loadding === 1) {
            return (
                <button type="button" className="btnSubmit"><i className="fa fa-circle-o-notch fa-spin"></i>Loading</button>

            )
        }
        return (
            <button type="button" className="btnSubmit" onClick={AcctionLogin}>Đăng nhập</button>
        )
    }

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-8 info">
                    <img className="row" width="30%" src={process.env.PUBLIC_URL + 'logo.png'} alt="logo"></img>
                    <h3 className="row">Ứng dụng kết nối và quản lý cổng học tập</h3>
                </div>
                <div className="col-md-4 login-form-1">
                    <form>
                        <h3>Đăng nhập</h3>
                        <div className="form-group">
                            <input type="text" className="form-control" name="username" placeholder="Tài khoản" onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control" name="password" placeholder="Mật khẩu" onChange={(e) => setPassword(e.target.value)} />
                            <Link className="forgetPassword" to="/forgot">Bạn quên mật khẩu?</Link>

                        </div>



                        <div className="form-group">
                            {loaddingButton()}
                            <Link to="/signup" className="btnForgetPwd">Đăng kí</Link>

                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}