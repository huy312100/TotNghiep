import React from 'react';
import {useHistory } from 'react-router-dom';

export default function UserBox() {
    let history = useHistory();
    let logout = () => {
        localStorage.removeItem("token");
        history.replace("/");
        console.log(localStorage.getItem("token"))
    }

    return (
        <div type="button" className="user-link" style={{ textDecoration: 'none',fontWeight: 'bold' }} onClick={logout}>Đăng xuất</div>
    )
}