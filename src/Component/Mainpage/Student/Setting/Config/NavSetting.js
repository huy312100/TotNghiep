import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import "../../../../../style/NavSetting.css"

class NavSetting extends Component {
    render() {
        return (
            <div className="sidenav">
                <div className="content-sidenav">
                <NavLink className="sidelink" to="home" activeClassName="selected">
                        <div className="nav-text">
                            <img width="30vw" src={process.env.PUBLIC_URL + 'Icon/home.png'}></img>
                            <div className="side-text">Trang chủ</div>
                        </div>
                    </NavLink>
                    <NavLink className="sidelink" to="setting" activeClassName="selected">
                        <div className="nav-text">
                            <img width="30vw" src={process.env.PUBLIC_URL + 'Icon/connect.png'}></img>
                            <div className="side-text">Kết nối</div>
                        </div>
                    </NavLink>
                    <NavLink className="sidelink" to="changepw" activeClassName="selected">
                        <div className="nav-text">
                            <img width="30vw" src={process.env.PUBLIC_URL + 'Icon/pw.png'}></img>
                            <div className="side-text">Đổi mật khẩu</div>
                        </div>
                    </NavLink>
                </div>
            </div>
        );
    }
}

export default NavSetting;