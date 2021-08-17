import React, { useEffect, useRef, useState } from 'react';
import "../../../style/Navbar.css";
import { Link, useHistory } from "react-router-dom";
import UserBox from '../../../hook/userbox';
import { useDispatch, useSelector } from 'react-redux';
import { StoreEmail, StoreRole } from '../../../store/actions/authen';
import { storeOpensidebar } from '../../../store/actions/sidebar';
import checkTokenExpired from '../../../auth/auth.js';
import { storedMoodle } from '../../../store/actions/info';

function Navbar() {

    const dispatch = useDispatch();
    const [noti, setNoti] = useState({ noti: 0, user: 0 });
    const [username, setUsername] = useState("");
    const [image, setImage] = useState(process.env.PUBLIC_URL + 'Icon/user.png');
    const open = useSelector(state => state.sidebar.open);
    const role = useSelector(state => state.authen.role);

    const history = useHistory();

    const ref = useRef(null);

    useEffect(() => {
        getMoodleConnect()
        getInfo()
    }, [])

    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */

        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setNoti({ noti: 0, user: 0 });
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);

    const getMoodleConnect = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "bearer " + localStorage.getItem("token"));

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("https://hcmusemu.herokuapp.com/web/getcustomlink", requestOptions)
            .then(response => {
                if (response.ok)
                    return response.json()
                if (response.status === 500) {
                    const action = storedMoodle(false);
                    dispatch(action);
                }
                throw Error("Đã có lỗi xảy ra")
            })
            .then(result => {
                console.log(result.find(x => x.Type === "Moodle"))
                var action
                if (result.find(x => x.Type === "Moodle") === undefined)
                    action = storedMoodle(false);
                else action = storedMoodle(true);
                dispatch(action);
                // this.setState({
                //     connected: result,
                //     username:result.find(x=>x.Type==="Moodle").Username,
                //     url:result.find(x=>x.Type==="Moodle").Url
                // })

            })
            .catch(error => console.log('error', error));
    }

    const getInfo = () => {
        if (checkTokenExpired()) {
            localStorage.clear()
            history.replace("/");
            return null
        }
        else {
            if (role === null) {
                const action = StoreRole(localStorage.getItem("role"));
                dispatch(action);
            }
        }

        var myHeaders = new Headers();

        myHeaders.append("Authorization", "bearer " + localStorage.getItem("token"));

        // var urlencoded = new URLSearchParams();

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        var url
        if (localStorage.getItem("role") === "3")
            url = "https://hcmusemu.herokuapp.com/profile/view/parent"
        else url = "https://hcmusemu.herokuapp.com/profile/view"
        fetch(url, requestOptions)
            .then(response => {
                if (response.ok)
                    return response.json()
                if (response.status === 401) {
                    localStorage.clear()
                    history.replace("/");
                    // return null;
                }
                throw Error("Đã có lỗi")
            })
            .then(result => {
                console.log(result)
                setUsername(result[0].HoTen);
                setImage(result[0].AnhSV);
                const action = StoreEmail(result[0].Email);
                dispatch(action);
            })
            .catch(error => {
                console.log('error', error)
                // localStorage.removeItem("token");
                // window.location.replace("/");
            });
    }


    const ActionLogout = () => {
        localStorage.removeItem("token");
    }


    const renderUserBox = () => (
        <div ref={ref} className="action-box">
            {/* <div className="user-content">
                <img width="50vw" style={{ borderRadius: "100px" }} src="https://scontent.fsgn8-1.fna.fbcdn.net/v/t1.18169-1/c66.0.168.168a/10400818_1451280791797635_4493168487969578882_n.jpg?_nc_cat=109&ccb=1-3&_nc_sid=7206a8&_nc_ohc=oAkgwsQVYg0AX8VfWuz&_nc_ht=scontent.fsgn8-1.fna&tp=29&oh=68b00fe95981fb4da378346365a346d7&oe=60CA8C4F" alt=""></img>
                <h5 className="user-content-name">
                    {username}
                </h5>
            </div>
            <hr /> */}
            <Link to="/profile" className="user-link" style={{ textDecoration: 'none' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 28 26" fill="none" stroke="currentColor" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" className="mr-50 feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                <div >Thông tin cá nhân</div>
            </Link>
            <Link to={localStorage.getItem("role") === "3" ? "/changepw" : "/setting"} className="user-link" style={{ textDecoration: 'none' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-gear" viewBox="0 0 16 16">
                    <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
                    <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
                </svg>
                <div style={{ marginLeft: "5px" }}>Thiết lập</div>
            </Link>
            <UserBox />
        </div>
    )


    const renderNotiBox = () => (
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

    const NotiClick = () => {
        if (noti.noti === 0) {
            setNoti({ noti: 1, user: 0 });
        }
        else {
            setNoti({ noti: 0, user: 0 });
        }
    }

    const UserClick = () => {
        if (noti.user === 0) {
            setNoti({ noti: 0, user: 1 });
        }
        else {
            setNoti({ noti: 0, user: 0 });
        }
    }

    const ActionBoxCheck = () => {
        if (noti.noti === 1) {
            return renderNotiBox();
            // return (<div></div>);
        }
        if (noti.user === 1) {
            return renderUserBox();
        }
        else {
            return (<div></div>);
        }
    }

    return (
        <div>
            <nav className="navbar navbar-light fixed-top">
                {/* <div className="container"> */}
                <div style={{ marginLeft: "10px" }} className="navbar-brand" href="/home">
                    <span className="side-img">
                        <svg type="button" onClick={() => dispatch(storeOpensidebar(!open))} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                        </svg>
                    </span>

                    <span style={{ marginLeft: "10px" }}>
                        <img className="d-inline-block align-top" width="30w" src={process.env.PUBLIC_URL + 'logo.png'} alt="" />
                        EMU
                    </span>
                </div>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <div className="nav-link active">{username}</div>
                    </li>
                    {/* <li type="button" className="nav-item">
                        <img className="bg-icon" width="40vm" src={process.env.PUBLIC_URL + 'Icon/message.png'} alt="" />
                    </li>
                    <li type="button" className="nav-item" onClick={() => NotiClick()}>
                        <img className="bg-icon" width="40vm" src={process.env.PUBLIC_URL + 'Icon/noti.png'} alt="" />
                    </li> */}
                    <li type="button" className="nav-item" onClick={() => UserClick()}>
                        <img width="40px" height="40px" style={{ borderRadius: "100%", border: "1px solid #dfdfdf" }} src={image} alt="" />
                    </li>
                </ul>
                {/* </div> */}
            </nav>
            {ActionBoxCheck()}

        </div>
    );
}

export default Navbar;