import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import "../../../style/Sidebar.css";



class Sidebar extends Component {
    render() {
        return (
            <div id="sidebar-container" className="sidenav sticky-top">
                <div className="sidenav">
                    <NavLink to="/home" className="content-sidenav" activeClassName="selected">
                        <div className="nav-text">
                            <img width="30vw" src={process.env.PUBLIC_URL + 'Icon/home.png'} alt=""></img>
                            <div className="side-text">Trang chủ</div>
                        </div>
                    </NavLink>
                    <NavLink to="/deadline" className="content-sidenav" activeClassName="selected">
                        <div className="nav-text">
                            <img width="30vw" src={process.env.PUBLIC_URL + 'Icon/event.png'} alt=""></img>
                            <div className="side-text">Sự kiện</div>
                        </div>
                    </NavLink>
                    <NavLink to="/course" className="content-sidenav" activeClassName="selected">
                        <div className="nav-text">
                            <img width="30vw" src={process.env.PUBLIC_URL + 'Icon/course.png'} alt=""></img>
                            <div className="side-text">Môn học</div>
                        </div>
                    </NavLink>
                    <NavLink to="/friend" className="content-sidenav" activeClassName="selected">
                        <div className="nav-text">
                            <img width="30vw" src={process.env.PUBLIC_URL + 'Icon/friend.png'} alt=""></img>
                            <div className="side-text">Bạn bè</div>
                        </div>
                    </NavLink>
                    <NavLink to="/forum" className="content-sidenav" activeClassName="selected">
                        <div className="nav-text">
                            <img width="30vw" src={process.env.PUBLIC_URL + 'Icon/forum.png'} alt=""></img>
                            <div className="side-text">Diễn đàn</div>
                        </div>
                    </NavLink>
                    <NavLink to="/calendar" className="content-sidenav" activeClassName="selected">
                        <div className="nav-text">
                            <img width="30vw" src={process.env.PUBLIC_URL + 'Icon/calendar.png'} alt=""></img>
                            <div className="side-text">Lịch</div>
                        </div>
                    </NavLink>
                </div>
            </div>
        );
    }
}

export default Sidebar;
