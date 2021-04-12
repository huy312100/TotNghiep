import React from 'react';
import { useHistory } from 'react-router';

export default function LoginButton() {
    let history= useHistory();
    let login = () => {
        localStorage.setItem("token",true);
        history.replace("/");
    }
    return (
        <a><button type="button" className="btnSubmit" onClick={login}>Đăng nhập</button></a>
    )
}

