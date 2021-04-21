import React from 'react';
import { Link,useHistory } from 'react-router-dom';

export default function UserBox() {
    let history = useHistory();
    let logout = () => {
        localStorage.removeItem("token");
        history.replace("/");
        console.log(localStorage.getItem("token"))
    }

    return (
        <Link className="user-link" style={{ textDecoration: 'none',fontWeight: 'bold' }} onClick={logout}>Đăng xuất</Link>
    )
}