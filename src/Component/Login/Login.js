import React, { Component } from 'react';
import Footer from '../Footer';
import '../../style/Login.css';
import LoginButton from '../../hook/login';



class Login extends Component {
    
    render() {
        return (
            <div>
                <LoginButton/>
                {/* <Footer /> */}
            </div>
        );
    }
}

export default Login;