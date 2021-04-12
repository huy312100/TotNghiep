import React, { Component } from 'react';
import "../../../style/Navbar.css"
import { useHistory } from "react-router-dom";
import UserBox from '../../../hook/userbox';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            noti: 0,
            user: 0,
            username: ""
        }
    }

    async componentDidMount() {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("wstoken", localStorage.getItem("token"));
        urlencoded.append("wsfunction", "core_user_get_users_by_field");
        urlencoded.append("field", "username");
        urlencoded.append("values[0]", localStorage.getItem("username"));
        urlencoded.append("moodlewsrestformat", "json");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch("https://courses.ctda.hcmus.edu.vn/webservice/rest/server.php", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                this.setState({ username: result[0].fullname })
            })
            .catch(error => console.log('error', error));
    }



    ActionLogout = () => {
        localStorage.removeItem("token");
    }

    renderUserBox = () => (
        <UserBox/>
    )


    renderNotiBox = () => (
        <div className="action-box">
            <h4 style={{ fontWeight: 'bold', margin: "10px" }}>Thông báo</h4>
            <div className="message-content">
                <img width="50vw" style={{ borderRadius: "100px" }} src="https://scontent.fsgn2-4.fna.fbcdn.net/v/t1.0-1/c66.0.168.168a/10400818_1451280791797635_4493168487969578882_n.jpg?_nc_cat=109&ccb=1-3&_nc_sid=7206a8&_nc_ohc=LwcMpKKt09IAX_mc3do&_nc_ht=scontent.fsgn2-4.fna&tp=29&oh=97697f34d86e2c3d654570bb99ea2d71&oe=60801F67"></img>
                <span className="message-content-text">
                    <div className="text">
                        Nguyễn Quốc Duy đã gửi cho bạn một thông báo
                        </div>
                    <div className="time">
                        3 giờ trước
                        </div>
                </span>
            </div>
            <div className="message-content">
                <img width="50vw" style={{ borderRadius: "100px" }} src="https://scontent.fsgn2-4.fna.fbcdn.net/v/t1.0-1/c66.0.168.168a/10400818_1451280791797635_4493168487969578882_n.jpg?_nc_cat=109&ccb=1-3&_nc_sid=7206a8&_nc_ohc=LwcMpKKt09IAX_mc3do&_nc_ht=scontent.fsgn2-4.fna&tp=29&oh=97697f34d86e2c3d654570bb99ea2d71&oe=60801F67"></img>
                <span className="message-content-text">
                    <div className="text">
                        Nguyễn Quốc Duy đã gửi cho bạn một thông báo
                        </div>
                    <div className="time">
                        3 giờ trước
                        </div>
                </span>
            </div>
            <div className="message-content">
                <img width="50vw" style={{ borderRadius: "100px" }} src="https://scontent.fsgn2-4.fna.fbcdn.net/v/t1.0-1/c66.0.168.168a/10400818_1451280791797635_4493168487969578882_n.jpg?_nc_cat=109&ccb=1-3&_nc_sid=7206a8&_nc_ohc=LwcMpKKt09IAX_mc3do&_nc_ht=scontent.fsgn2-4.fna&tp=29&oh=97697f34d86e2c3d654570bb99ea2d71&oe=60801F67"></img>
                <span className="message-content-text">
                    <div className="text">
                        Nguyễn Quốc Duy đã gửi cho bạn một thông báo
                        </div>
                    <div className="time">
                        3 giờ trước
                        </div>
                </span>
            </div>
            <div style={{ textAlign: "center" }}>
                <a href="/message" >Xem tất cả</a>
            </div>
        </div>
    )

    NotiClick = () => {
        if (this.state.noti === 0) {
            this.setState({ noti: 1, user: 0 });
        }
        else {
            this.setState({ noti: 0, user: 0 });
        }
    }

    UserClick = () => {
        if (this.state.user === 0) {
            this.setState({ noti: 0, user: 1 });
        }
        else {
            this.setState({ noti: 0, user: 0 });
        }
    }

    ActionBoxCheck = () => {
        if (this.state.noti === 1) {
            return this.renderNotiBox();
            return (<div></div>);
        }
        if (this.state.user === 1) {
            return this.renderUserBox();
        }
        else {
            return (<div></div>);
        }
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-light bg-light">
                    {/* <div className="container"> */}
                    <a className="navbar-brand" href="/home">
                        <img className="d-inline-block align-top" width="10%" src={process.env.PUBLIC_URL + 'logo192.png'} />
                  APPNAME
                </a>
                    <ul className="navbar-nav">
                        <li className="nav-tem">
                            <p>{this.state.username}</p>
                        </li>
                        <li className="nav-item">
                            <img className="bg-icon" width="40vm" src={process.env.PUBLIC_URL + 'Icon/message.png'} />
                        </li>
                        <li className="nav-item" onClick={() => this.NotiClick()}>
                            <img className="bg-icon" width="40vm" src={process.env.PUBLIC_URL + 'Icon/noti.png'} />
                        </li>
                        <li className="nav-item" onClick={() => this.UserClick()}>
                            <img className="bg-icon" width="40vm" src={process.env.PUBLIC_URL + 'Icon/user.png'} />
                        </li>
                    </ul>
                    {/* </div> */}
                </nav>
                {this.ActionBoxCheck()}

            </div>
        );
    }
}

export default Navbar;