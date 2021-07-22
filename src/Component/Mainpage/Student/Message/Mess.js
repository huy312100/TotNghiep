import React, { useEffect, useRef, useState } from 'react';
// import Footer from '../../../Footer';
import Navbar from './../Navbar';
import "../../../../style/Message.css"
import Sidebar from '../Sidebar';
import { useSelector } from 'react-redux';

// var socket = io("https://hcmusemu.herokuapp.com", { transports: ['websocket', 'polling', 'flashsocket'] });


function Message() {

    const [search, setSearch] = useState("");
    const [loadingSearch, setLoadingSearch] = useState(0)
    const [foundedUser, setFoundedUser] = useState(null)

    const [usermessage, setUsermessage] = useState([""]);
    const [selected, setSelected] = useState({ email: "", room: "", name: "" });

    const [selectedmessage, setSelectedmessage] = useState([]);
    const [newmessage, setNewmessage] = useState({ text: null, time: null });
    const [mess, setMess] = useState("");

    const divRef = useRef(null);

    const socket = useSelector(state => state.authen.socket)
    const email = useSelector(state => state.authen.email)
    // console.log(email)

    useEffect(() => {
        getMessage();

        socket.on('Private-Message-To-Client', (data) => {
            setSelectedmessage(selectedmessage => [...selectedmessage, {
                state: false,
                _id: data[0],
                from: selected.room,
                text: data[2],
                time: data[3]
            }]);
            setNewmessage({ text: data[2], time: data[3] })

            // socket.emit()

            console.log(data)
        })

        return () => {
            socket.off('Private-Message-To-Client');
        }
    }, []);

    useEffect(() => {
        if (search === "")
            setLoadingSearch(0)
    }, [search])

    useEffect(() => {
        if (usermessage !== [""]) {
            usermessage.sort((a, b) => {
                var keyA = a.time,
                    keyB = b.time;

                if (keyA < keyB) return 1;
                if (keyA > keyB) return -1;
                return 0;
            })
        }
    }, [usermessage]);


    useEffect(() => {
        divRef.current.scrollIntoView({ behavior: 'smooth' });
    }, [selectedmessage]);

    const convertTime = (UNIX_timestamp) => {
        var d = new Date(UNIX_timestamp);
        // console.log(d)
        var time = d.getHours() + ":" + d.getMinutes();
        return time;
    }

    const convertTimeAgo = (UNIX_timestamp) => {
        // var a = new Date(UNIX_timestamp);
        // var time = a.getHours() + ":" + a.getMinutes();
        // return time;
        var msPerMinute = 60 * 1000;
        var msPerHour = msPerMinute * 60;
        var msPerDay = msPerHour * 24;
        var msPerMonth = msPerDay * 30;
        var msPerYear = msPerDay * 365;

        var elapsed = Date.now() - UNIX_timestamp;

        if (elapsed < msPerMinute) {
            return '1 phút trước';
        }

        else if (elapsed < msPerHour) {
            return Math.round(elapsed / msPerMinute) + ' phút trước';
        }

        else if (elapsed < msPerDay) {
            return Math.round(elapsed / msPerHour) + ' giờ trước';
        }

        else if (elapsed < msPerMonth) {
            return Math.round(elapsed / msPerDay) + ' ngày trước';
        }

        else if (elapsed < msPerYear) {
            return Math.round(elapsed / msPerMonth) + ' tháng trước';
        }

        else {
            return Math.round(elapsed / msPerYear) + ' năm trước';
        }
    }

    useEffect(() => {
        if (selected.room !== "")
            viewChat();
    }, [selected])

    const selectUser = (room, email, name) => {
        // console.log(email)
        socket.emit('Return-Chat', [selected.room, selected.email]);
        socket.emit('Return-Chat', [room, email]);
        setSelected({ email: email, room: room, name: name })
    }

    useEffect(() => {
        if (newmessage.time !== null) {
            let temp = [...usermessage];
            temp.forEach(user => {
                if ((user.Email).match(selected.email)) {
                    user.text = newmessage.text;
                    user.time = newmessage.time;
                }
            })
            setUsermessage(temp);
        }
    }, [newmessage])


    const Messages = () => {

        var list = usermessage.map((messageList) => (
            <div type="button" className="message-content" onClick={() => selectUser(messageList.idRoom, messageList.Email, messageList.name)}>
                <img width="50vw" style={{ borderRadius: "50%", marginTop: "5px" }} src="https://1.bp.blogspot.com/-r8taaC_nv5U/XngOYFjbRVI/AAAAAAAAZnc/QjGkkHS78GMm6CocQ1OqrWGgQTkG1oQNACLcBGAsYHQ/s1600/Avatar-Facebook%2B%25281%2529.jpg" alt=""></img>
                <span className="message-content-text">
                    <div className="name">
                        {messageList.name}
                    </div>
                    <div className="text">
                        {messageList.text}
                    </div>
                    <div className="time">
                        {/* {console.log(convertTime(messageList.time))} */}
                        {convertTimeAgo(messageList.time)}
                    </div>
                </span>
            </div>
        ))
        return list;
    }

    const viewChat = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "bearer " + localStorage.getItem("token"));
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("IDRoom", selected.room);
        urlencoded.append("page", 0);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch("https://hcmusemu.herokuapp.com/chat/loadmessage", requestOptions)
            .then(response => response.json())
            .then(result => {

                var mess = result.reverse()
                // console.log(mess)
                setSelectedmessage(mess)
            })
            .catch(error => console.log('error', error));
    }

    const getMessage = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "bearer " + localStorage.getItem("token"));

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("https://hcmusemu.herokuapp.com/chat/findchat", requestOptions)
            .then(response => response.json())
            .then(result => {
                // console.log(result)
                setUsermessage(result);

                setSelected({
                    room: result[0].idRoom,
                    email: result[0].Email,
                    name: result[0].name
                })
            })
            .catch(error => console.log('error', error));
    }

    const searchUser = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "bearer " + localStorage.getItem("token"));
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("username", search);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch("https://hcmusemu.herokuapp.com/profile/findname", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                setFoundedUser(result);
                setLoadingSearch(1);
            })
            .catch(error => console.log('error', error));
    }

    const renderChatSelected = () => {
        return <div className="message">
            {selectedmessage.map(message => {
                if (message.from === email) {
                    return <div className="box-user">
                        {/* <div>{convertTime(message.time)}</div> */}
                        <div className="user">{message.text}</div>
                        {/* {console.log(message.time)} */}

                    </div>
                }

                else {

                    return <div className="box-friend">
                        <div className="friend">{message.text}</div>
                        {/* <div>{convertTime(message.time)}</div> */}
                    </div>
                }
            })
            }
            <div ref={divRef}></div>
        </div>

    }

    const sendMessage = () => {
        if (mess !== "") {
            console.log("Send message");
            socket.emit("Private-Message", [selected.room, selected.email, mess]);
            // var newm = selectedmessage;
            // Array.prototype.push.apply(newm, [{
            //     state: false,
            //     _id: selected.room,
            //     from: email,
            //     text: mess,
            //     time: Date.now()
            // }]);
            // console.log(newm)
            setSelectedmessage([...selectedmessage, {
                state: false,
                _id: selected.room,
                from: email,
                text: mess,
                time: Date.now()
            }]);
            console.log(selectedmessage)
            setNewmessage({ text: mess, time: Date.now() })
            setMess("");
        }
        // getMessage();
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    }

    const handleSearch = (event) => {
        if (event.key === 'Enter') {
            searchUser()
        }
    }

    const renderFoundedUser = () => {
        if (loadingSearch === 1) {
            const list = foundedUser.map((user) => {
                return <div className="search-user">
                    <div className="name">{user.HoTen}</div>
                    <div className="email">({user.Email})</div>
                </div>
            })
            return list;
        }
        return <div className="listfriend">
            <div>
                {Messages()}
            </div>
        </div>;
    }


    return (
        <div>
            <div className="wrap">
                <div className="listfriend-box">
                    <div>
                        <input className="box-input" type="text" placeholder="Tìm kiếm" name="search" value={search} required onChange={(e) => setSearch(e.target.value)} onKeyDown={handleSearch} />
                    </div>
                    {/* <div className="listfriend">
                        <div>
                            {Messages()}
                        </div>
                    </div> */}
                    {renderFoundedUser()}
                </div>
                <div className="message-box">
                    <div className="selected-user">
                        <img width="40vw" height="40vw" style={{ borderRadius: "50%" }} src="https://1.bp.blogspot.com/-r8taaC_nv5U/XngOYFjbRVI/AAAAAAAAZnc/QjGkkHS78GMm6CocQ1OqrWGgQTkG1oQNACLcBGAsYHQ/s1600/Avatar-Facebook%2B%25281%2529.jpg" alt=""></img>
                        <div className="infouser">
                            <div className="name">{selected.name}</div>
                            <div className="email">{selected.email}</div>
                        </div>
                    </div>
                    <hr />
                    {renderChatSelected()}
                    <div className="textbox-message">
                        <input value={mess} className="box-chat" type="text" placeholder="Nội dung tin nhắn" name="mess" onChange={(e) => setMess(e.target.value)} onKeyDown={handleKeyDown} />
                        <i type="button" className="enter fa fa-reply" onClick={sendMessage}></i>

                    </div>
                </div>
            </div>
            {/* <Footer /> */}
        </div >
    );
}

export default Message;