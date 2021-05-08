import React, { Component } from 'react';
import "../../../style/Navbar.css";
import { Link } from "react-router-dom";
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

        myHeaders.append("Authorization", "bearer " + localStorage.getItem("token"));

        // var urlencoded = new URLSearchParams();

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("https://hcmusemu.herokuapp.com/profile/view", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                this.setState({ username: result[0].HoTen })
            })
            .catch(error => console.log('error', error));
    }


    ActionLogout = () => {
        localStorage.removeItem("token");
    }


    renderUserBox = () => (
        <div className="action-box">
            <div className="user-content">
                <img width="50vw" style={{ borderRadius: "100px" }} src="https://scontent.fsgn2-4.fna.fbcdn.net/v/t1.0-1/c66.0.168.168a/10400818_1451280791797635_4493168487969578882_n.jpg?_nc_cat=109&ccb=1-3&_nc_sid=7206a8&_nc_ohc=LwcMpKKt09IAX_mc3do&_nc_ht=scontent.fsgn2-4.fna&tp=29&oh=97697f34d86e2c3d654570bb99ea2d71&oe=60801F67" alt=""></img>
                <h5 className="user-content-name">
                    {this.state.username}
                </h5>
            </div>
            {/* <hr/> */}
                <Link to="/profile" className="user-link" style={{ textDecoration: 'none' }}>Thông tin cá nhân</Link>
                <Link to="/setting" className="user-link" style={{ textDecoration: 'none' }}>Thiết lập</Link>
            <UserBox />
        </div>
    )


    renderNotiBox = () => (
        <div className="action-box">
            <h4 style={{ fontWeight: 'bold', margin: "10px" }}>Thông báo</h4>
            <div className="message-content">
                <img width="50vw" style={{ borderRadius: "100px" }} src="https://scontent.fsgn2-4.fna.fbcdn.net/v/t1.0-1/c66.0.168.168a/10400818_1451280791797635_4493168487969578882_n.jpg?_nc_cat=109&ccb=1-3&_nc_sid=7206a8&_nc_ohc=LwcMpKKt09IAX_mc3do&_nc_ht=scontent.fsgn2-4.fna&tp=29&oh=97697f34d86e2c3d654570bb99ea2d71&oe=60801F67" alt=""></img>
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
                <img width="50vw" style={{ borderRadius: "100px" }} src="https://scontent.fsgn2-4.fna.fbcdn.net/v/t1.0-1/c66.0.168.168a/10400818_1451280791797635_4493168487969578882_n.jpg?_nc_cat=109&ccb=1-3&_nc_sid=7206a8&_nc_ohc=LwcMpKKt09IAX_mc3do&_nc_ht=scontent.fsgn2-4.fna&tp=29&oh=97697f34d86e2c3d654570bb99ea2d71&oe=60801F67" alt=""></img>
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
                <img width="50vw" style={{ borderRadius: "100px" }} src="https://scontent.fsgn2-4.fna.fbcdn.net/v/t1.0-1/c66.0.168.168a/10400818_1451280791797635_4493168487969578882_n.jpg?_nc_cat=109&ccb=1-3&_nc_sid=7206a8&_nc_ohc=LwcMpKKt09IAX_mc3do&_nc_ht=scontent.fsgn2-4.fna&tp=29&oh=97697f34d86e2c3d654570bb99ea2d71&oe=60801F67" alt=""></img>
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
            // return (<div></div>);
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
                <nav className="navbar navbar-light bg-light fixed-top">
                    {/* <div className="container"> */}
                    <a className="navbar-brand" href="/home">
                        <img className="d-inline-block align-top" width="10%" src={process.env.PUBLIC_URL + 'logo192.png'} alt=""/>
                  APPNAME
                </a>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <div className="nav-link active">{this.state.username}</div>
                        </li>
                        <li className="nav-item">
                            <img className="bg-icon" width="40vm" src={process.env.PUBLIC_URL + 'Icon/message.png'} alt=""/>
                        </li>
                        <li className="nav-item" onClick={() => this.NotiClick()}>
                            <img className="bg-icon" width="40vm" src={process.env.PUBLIC_URL + 'Icon/noti.png'} alt=""/>
                        </li>
                        <li className="nav-item" onClick={() => this.UserClick()}>
                            <img className="bg-icon" width="40vm" src={process.env.PUBLIC_URL + 'Icon/user.png'} alt=""/>
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