import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';


class Sidebar extends Component {
    render() {
        return (
            <div id="sidebar-container" className="sidenav sticky-top">
                <div className="content-sidenav">
                    <NavLink to="/home" activeClassName="selected">
                        <div className="nav-text">
                            <img width="30vw" src={process.env.PUBLIC_URL + 'Icon/home.png'}></img>
                            <div className="side-text">Trang chủ</div>
                        </div>
                    </NavLink>
                    <a href="#">
                        <div className="nav-text">
                            <img width="30vw" src={process.env.PUBLIC_URL + 'Icon/calendar.png'}></img>
                            <div className="side-text">Sự kiện</div>
                        </div>
                    </a>
                    <a href="#">
                        <div className="nav-text">
                            <img width="30vw" src={process.env.PUBLIC_URL + 'Icon/course.png'}></img>
                            <div className="side-text">Môn học</div>
                        </div>
                    </a>
                    <a href="#">
                        <div className="nav-text">
                            <img width="30vw" src={process.env.PUBLIC_URL + 'Icon/friend.png'}></img>
                            <div className="side-text">Bạn bè</div>
                        </div>
                    </a>
                    <a href="#">
                        <div className="nav-text">
                            <img width="30vw" src={process.env.PUBLIC_URL + 'Icon/forum.png'}></img>
                            <div className="side-text">Diễn đàn</div>
                        </div>
                    </a>
                </div>
            </div>
        );
    }
}

export default Sidebar;
