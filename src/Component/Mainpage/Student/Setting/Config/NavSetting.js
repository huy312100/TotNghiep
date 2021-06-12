import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
// import "../../../../../style/NavSetting.css"

class NavSetting extends Component {
    render() {
        return (
            <div id="sidebar-container" className="sidenav sticky-top">
                <div className="sidenav">
                    <NavLink className="content-sidenav" to="home" activeClassName="selected">
                        <div className="nav-text">
                            <img width="30vw" src={process.env.PUBLIC_URL + 'Icon/home.png'} alt=""></img>
                            <div className="side-text">Trang chủ</div>
                        </div>
                    </NavLink>
                    <NavLink className="content-sidenav" to="setting" activeClassName="selected">
                        <div className="nav-text">
                            <img width="30vw" src={process.env.PUBLIC_URL + 'Icon/connect.png'} alt=""></img>
                            <div className="side-text">Kết nối</div>
                        </div>
                    </NavLink>
                    <NavLink className="content-sidenav" to="changepw" activeClassName="selected">
                        <div className="nav-text">
                            <img width="30vw" src={process.env.PUBLIC_URL + 'Icon/pw.png'} alt=""></img>
                            <div className="side-text">Đổi mật khẩu</div>
                        </div>
                    </NavLink>
                </div>
            </div>
        );
    }
}

export default NavSetting;