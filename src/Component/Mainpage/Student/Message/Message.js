import React, { Component } from 'react';
// import Footer from '../../../Footer';
import Navbar from './../Navbar';
import "../../../../style/Message.css"
import Sidebar from '../Sidebar';
import io from 'socket.io-client';

// var socket = io("https://hcmusemu.herokuapp.com", { transports: ['websocket', 'polling', 'flashsocket'] });
// console.log("Send message");
// this.setState({mess:""});
// socket.emit("Start",localStorage.getItem("token"));


class Message extends Component {
    constructor(props) {
        super(props);


        this.state = {
            usermessage: [],
            selectedchat: "",
            selectedmessage: [],
            newmessage:"",
            mess:""
        };

    }

    convertTime = (UNIX_timestamp) => {
        var a = new Date(UNIX_timestamp * 1000);
        var time = a.getHours() + ":" + a.getMinutes();
        return time;
    }

    selectUser = async (key) => {
        console.log(key)
        await this.setState({
            selectedchat: key
        })
        this.viewChat();
    }

    Messages = () => {

        var list = this.state.usermessage.map((messageList) => (
            <div type="button" className="message-content" onClick={() => this.selectUser(messageList.idRoom)}>
                <img width="50vw" style={{ borderRadius: "100px" }} src="https://1.bp.blogspot.com/-r8taaC_nv5U/XngOYFjbRVI/AAAAAAAAZnc/QjGkkHS78GMm6CocQ1OqrWGgQTkG1oQNACLcBGAsYHQ/s1600/Avatar-Facebook%2B%25281%2529.jpg" alt=""></img>
                <span className="message-content-text">
                    <div style={{ fontWeight: "Bold" }}>
                        {messageList.name}
                    </div>
                    <div className="text">
                        {messageList.text}
                    </div>
                    <div className="time">
                        {/* {console.log(this.convertTime(messageList.time))} */}
                        {this.convertTime(messageList.time)}
                    </div>
                </span>
            </div>
        ))
        return list;
    }

    viewChat = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "bearer " + localStorage.getItem("token"));
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("IDRoom", this.state.selectedchat);
        urlencoded.append("page", "0");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch("https://hcmusemu.herokuapp.com/chat/loadmessage", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                var mess = result.reverse()
                this.setState({
                    selectedmessage: mess
                })
            })
            .catch(error => console.log('error', error));
    }

    getMessage = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "bearer "+localStorage.getItem("token"));

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("https://hcmusemu.herokuapp.com/chat/findchat", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                this.setState({
                    usermessage: result
                })
            })
            .catch(error => console.log('error', error));
    }

    setParams = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    componentDidMount() {
        // this.socket.emit('Private-Message',["60c09349e6d56a002227b1ee","12345@gmail.com","test send mess"]);

        // this.socket.on("Private-Message-To-Client",(data)=>{
        //     this.setState({newmessage:data})
        //     console.log('check: ', this.socket.connected)
        // });
        this.getMessage();
    }

    renderChatSelected = () => {
        return <div className="message">
            <div>
            <img width="50vw" style={{ borderRadius: "100px" }} src="https://1.bp.blogspot.com/-r8taaC_nv5U/XngOYFjbRVI/AAAAAAAAZnc/QjGkkHS78GMm6CocQ1OqrWGgQTkG1oQNACLcBGAsYHQ/s1600/Avatar-Facebook%2B%25281%2529.jpg" alt=""></img>
            </div>
            {this.state.selectedmessage.map(message => {
                if (message.state === true) {
                    return <div className="box-friend">
                        <div className="friend">{message.text}</div>
                    </div>
                }

                else if (message.state === false) {
                    return <div className="box-user">
                        <div className="user">{message.text}</div>
                    </div>
                }
            })
            }

        </div>

    }

    sendMessage = () =>{
        console.log("Send message");
        // socket.emit("Private-Message",[this.state.selectedchat,"12345@gmail.com",this.state.mess]);
        this.setState({mess:""});
        this.getMessage();
    }

    render() {
        return (
            <div>
                <Navbar />
                <Sidebar />
                <div className="wrap">
                    <div className="listfriend-box">
                        <div>
                            <input className="box-input" type="text" placeholder="Tìm kiếm" name="search" required />
                        </div>
                        <div className="listfriend">
                            <div>
                                {this.Messages()}
                            </div>
                        </div>
                    </div>
                    <div className="message-box">
                        {this.renderChatSelected()}
                        <div className="textbox-message">
                            <input value={this.state.mess} className="box-chat" type="text" placeholder="Nội dung tin nhắn" name="mess" onChange={this.setParams}/>
                            <i type="button" className="enter fa fa-reply" onClick={this.sendMessage}></i>

                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

// export default Message;