import React, { Component } from 'react';
// import Footer from '../../../Footer';
import Navbar from './../Navbar';
import "../../../../style/Message.css"

const messageList = ["Nguyen Quoc Duy", "Nguyen Trong Dat", "Cao Hoang Huy", "Nguyen Ngoc Duc Huy", "Nguyen Quoc Duy", "Nguyen Trong Dat", "Cao Hoang Huy", "Nguyen Ngoc Duc Huy", "Nguyen Quoc Duy", "Nguyen Trong Dat", "Cao Hoang Huy", "Nguyen Ngoc Duc Huy"];

class Message extends Component {
    constructor(props) {
        super(props);
        this.Messages = messageList.map((messageList) => (
            <div className="message-content">
                <img width="50vw" style={{ borderRadius: "100px" }} src="https://scontent.fsgn2-4.fna.fbcdn.net/v/t1.0-1/c66.0.168.168a/10400818_1451280791797635_4493168487969578882_n.jpg?_nc_cat=109&ccb=1-3&_nc_sid=7206a8&_nc_ohc=LwcMpKKt09IAX_mc3do&_nc_ht=scontent.fsgn2-4.fna&tp=29&oh=97697f34d86e2c3d654570bb99ea2d71&oe=60801F67" alt=""></img>
                <span className="message-content-text">
                    <div style={{ fontWeight: "Bold" }}>
                        {messageList}
                    </div>
                    <div className="text">
                        Nội dung tin nhắn abcdefgikl
                                        </div>
                    <div className="time">
                        3 giờ trước
                                        </div>
                </span>
            </div>
        ))
    }

    render() {
        return (
            <div>
                <Navbar />
                <div className="wrap">
                    <div className="listfriend-box">
                        <div>
                            <input className="box-input" type="text" placeholder="Tìm kiếm" name="search" required />
                        </div>
                        <div className="listfriend">
                            <div style={{ color: "white" }}>
                                {this.Messages}
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="message-box">
                            <div className="box-friend">
                                <div className="friend">!$!@$@!%#$#^^#$$^$#^@#$!</div>
                            </div>
                            <div className="box-user">
                                <div className="user">!$!@$@!%#$#^^#$$^$#^@#$!</div>
                            </div>
                            <div className="box-friend">
                                <div className="friend">!$!@$@!%#$#^^#$$^$#^@#$!</div>
                            </div>
                            <div className="box-user">
                                <div className="user">!$!@$@!%#$#^^#$$^$#^@#$!</div>
                            </div>
                            <div className="box-friend">
                                <div className="friend">!$!@$@!%#$#^^#$$^$#^@#$!</div>
                            </div>
                            <div className="box-user">
                                <div className="user">!$!@$@!%#$#^^#$$^$#^@#$!</div>
                            </div>
                            <div className="box-friend">
                                <div className="friend">!$!@$@!%#$#^^#$$^$#^@#$!</div>
                            </div>
                            <div className="box-user">
                                <div className="user">!$!@$@!%#$#^^#$$^$#^@#$!</div>
                            </div>
                            <div className="box-friend">
                                <div className="friend">!$!@$@!%#$#^^#$$^$#^@#$!</div>
                            </div>
                            <div className="box-user">
                                <div className="user">!$!@$@!%#$#^^#$$^$#^@#$!</div>
                            </div>
                            <div className="box-friend">
                                <div className="friend">!$!@$@!%#$#^^#$$^$#^@#$!</div>
                            </div>
                            <div className="box-user">
                                <div className="user">!$!@$@!%#$#^^#$$^$#^@#$!</div>
                            </div>
                            <div className="box-friend">
                                <div className="friend">!$!@$@!%#$#^^#$$^$#^@#$!</div>
                            </div>
                            <div className="box-user">
                                <div className="user">!$!@$@!%#$#^^#$$^$#^@#$!</div>
                            </div>
                            <div className="box-friend">
                                <div className="friend">!$!@$@!%#$#^^#$$^$#^@#$!</div>
                            </div>
                            <div className="box-user">
                                <div className="user">!$!@$@!%#$#^^#$$^$#^@#$!</div>
                            </div>
                            <div className="box-friend">
                                <div className="friend">!$!@$@!%#$#^^#$$^$#^@#$!</div>
                            </div>
                            <div className="box-user">
                                <div className="user">!$!@$@!%#$#^^#$$^$#^@#$!</div>
                            </div>
                            <div className="box-friend">
                                <div className="friend">!$!@$@!%#$#^^#$$^$#^@#$!</div>
                            </div>
                            <div className="box-user">
                                <div className="user">!$!@$@!%#$#^^#$$^$#^@#$!</div>
                            </div>
                            <div className="box-friend">
                                <div className="friend">!$!@$@!%#$#^^#$$^$#^@#$!</div>
                            </div>
                            <div className="box-user">
                                <div className="user">!$!@$@!%#$#^^#$$^$#^@#$!</div>
                            </div>
                            <div className="box-friend">
                                <div className="friend">!$!@$@!%#$#^^#$$^$#^@#$!</div>
                            </div>
                            <div className="box-user">
                                <div className="user">!$!@$@!%#$#^^#$$^$#^@#$!</div>
                            </div>
                        </div>
                        <div>
                            <input className="box-input" type="text" placeholder="Nội dung tin nhắn" name="mess" required />
                        </div>
                    </div>
                </div>
                {/* <Footer /> */}
            </div >
        );
    }
}

export default Message;