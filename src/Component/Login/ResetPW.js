import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

const background = {
    margin: "auto",
    width: "30vw",
    // height: "30vw",
    border: "1px solid black",
}

const header = {
    fontWeight: "bold",
    fontSize: "20px"
}

export default function Reset() {

    const [pw, setPw] = useState(null)
    const [rptpw, setRptpw] = useState(null)

    const location = useLocation()
    const token = new URLSearchParams(location.search).get('token')

    const history = useHistory()

    const resetPassword_API = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("tokenreset", token);
        urlencoded.append("passwordreset", pw);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch("https://hcmusemu.herokuapp.com/account/resetpassword", requestOptions)
            .then(response => {

                if (response.ok)
                    return response
                throw Error("Đã xảy ra lỗi,vui lòng thử lại")
            })
            .then(result => history.push("/"))
            .catch(error => { console.log('error', error) });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (pw !== rptpw) {
            alert('Nhập lại mật khẩu không chính xác');
            return false;
        }
        resetPassword_API()
    }

    return <div style={background}>
        <form onSubmit={handleSubmit}>
            <div style={header}>Khôi phục mật khẩu</div>
            <div>Nhập mật khẩu mới</div>
            <input required onChange={(event) => setPw(event.target.value)} />
            <div>Nhập lại mật khẩu mới</div>
            <input required onChange={(event) => setRptpw(event.target.value)} />
            <input type="submit" />
        </form>
    </div>
}