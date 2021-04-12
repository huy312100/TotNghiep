import React from 'react';
import { useHistory } from 'react-router';

export default function UserBox() {
    let history= useHistory();
    let logout = () => {
        localStorage.removeItem("token");
        history.replace("/");
    }
    return (
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
                <button onClick={logout}> Đăng xuất</button>
            </div>
        </div>
    )
}