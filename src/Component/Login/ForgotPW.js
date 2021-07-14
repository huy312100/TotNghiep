import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const background = {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: "-15vw",
    marginLeft: "-15vw",
    width: "30vw",
    height: "30vw",
    border: "1px solid black",
    background:"#fff"
}

const header = {
    fontWeight: "600",
    fontSize: "20px",
    padding: "10px",
    textAlign:"center",
    color:"#434343"
}

const body ={
    padding:"10px"
}

const text = {
    padding:"10px"
}

const input = {
    margin:"auto",
    padding:"10px",
    width:"28vw"
}

const button = {
    background:"#3768a0",
    width:"20vw",
    margin:"10px auto",
    // padding:"10px",
    display:"block",
    color:"#fff",
    borderRadius:"10px"
}
const link = {
    padding:"10px",
}
//test

export default function Forgot() {

    const [email, setEmail] = useState("");
    const [success, setSuccess] = useState(0)

    const ForgetPW_API = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("emailApp", email);
        urlencoded.append("emailReset", email);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch("https://hcmusemu.herokuapp.com/account/forgotpassword", requestOptions)
            .then(response => response.text())
            .then(result => setSuccess(1))
            .catch(error => console.log('error', error));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!validateEmail(email)) {
            alert('Địa chỉ email: ' + email + ' không chính xác');
            return false;
        }
        ForgetPW_API()
    }

    const validateEmail = (inputemail) => {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(inputemail);
    }

    if (success === 0)
        return <div style={background}>
            <form onSubmit={handleSubmit}>
                <div style={header}>Quên mật khẩu</div>
                <div style={body}>
                    <div style={text}>Vui lòng nhập email đã đăng kí của bạn</div>
                    <input style={input} placeholder="Email" required onChange={(event) => setEmail(event.target.value)} />
                    <button style={button} type="submit">Tiếp tục</button>
                </div>
            </form>
        </div>
    else return <div style={background}>
        <div>
            <div style={header}>Thành công</div>
            <div style={text}>Nếu email của bạn đã được đăng kí, bạn sẽ nhận được email khôi phục mật khẩu trong vài phút</div>
        </div>
        <Link style={link} to="/">Trở về trang đăng nhập</Link>
    </div>
}