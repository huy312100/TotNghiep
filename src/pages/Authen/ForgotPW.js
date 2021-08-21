import React, {useState } from 'react';
import { Link } from 'react-router-dom';

const background = {
    display: "block",
    position: "absolute",
    top: "25%",
    left: "50%",
    marginLeft: "-15vw",
    width: "30vw",
    background: "#fff",
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",

}

const header = {
    fontWeight: "600",
    fontSize: "2.5vw",
    marginTop: "4vw",
    textAlign: "center",
    color: "#434343"
}

const body = {
    padding: "0.8vw",
}

const text = {
    display:"block",
    margin:"auto",
    width:"27vw",
    fontSize: "1.2vw",
    padding: "0.8vw",
    color: "#686d70"
}

const input = {
    display: "block",
    margin: "2vw auto",
    padding: "0.7vw",
    width: "27vw",
    background: "#eeeeef",
    border: 'none',
    fontSize: "1.2vw",

}

const button = {
    background: "#3768a0",
    width: "20vw",
    height: "3vw",
    margin: "0.8vw auto",
    // padding:"10px",
    display: "block",
    color: "#fff",
    borderRadius: "0.8vw",
    border: "none",
    fontSize: "1.3vw"
}
const link = {
    textAlign:"center",
    background: "#3768a0",
    width: "20vw",
    margin: "1.5vw auto",
    padding:"0.3vw",
    display: "block",
    color: "#fff",
    borderRadius: "0.8vw",
    border: "none",
    fontSize: "1.3vw",
    textDecoration: 'none'
}

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
                    <div style={text}>Vui lòng nhập email đã đăng kí của bạn,liên kết khôi phục mật khẩu sẽ được gửi về địa chỉ email đã đăng kí tài khoản</div>
                    <input style={input} placeholder="Email" required onChange={(event) => setEmail(event.target.value)} />
                    <input style={button} type="submit" value="Gửi"></input>
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