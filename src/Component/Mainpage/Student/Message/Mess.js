import React, { useEffect, useRef, useState } from 'react';
// import Footer from '../../../Footer';
import "../../../../style/Message.css"
import { useDispatch, useSelector } from 'react-redux';
import Category from '../Category';
// import ConnectSocket from '../../../../hook/socket';
import { io } from 'socket.io-client';

// import { io } from 'socket.io-client';


// var socket = io("https://hcmusemu.herokuapp.com", { transports: ['websocket', 'polling', 'flashsocket'] });


function Message() {

    const [search, setSearch] = useState("");
    const [loadingSearch, setLoadingSearch] = useState(0)
    const [foundedUser, setFoundedUser] = useState(null)

    const [usermessage, setUsermessage] = useState(null);
    const [selected, setSelected] = useState(null);

    const [selectedmessage, setSelectedmessage] = useState([]);
    const [newmessage, setNewmessage] = useState({ text: null, time: null });
    const [mess, setMess] = useState("");

    const [awaitmess, setAwaitmess] = useState(null)
    const [acceptawaitmess, setAcceptAwaitmess] = useState(false)
    const [selectedawaitmess, setSelectedAwaitmess] = useState("")

    const [tag, setTag] = useState("0")

    const divRef = useRef(null);

    const [socket, setSocket] = useState(null)
    const email = useSelector(state => state.authen.email)

    // const [loaddingChatBox, setloaddingChatBox] = useState(false)

    const typing = useRef(null)

    const dispatch = useDispatch()
    // console.log(email)

    useEffect(() => {
        getMessage();
        viewChatAwait();

        // if (socket === null) {
        //     var newsocket = io("https://hcmusemu.herokuapp.com", { transports: ['websocket'] });
        //     newsocket.emit("Start", localStorage.getItem("token"));

        //     console.log("Connect socket");

        //     const action = connectSocket(newsocket)
        //     dispatch(action);
        // }

        // console.log(socket, "socket")

        // if (socket !== null)


        var newsocket = io("https://hcmusemu.herokuapp.com", {
            transports: ['websocket']
        });
        newsocket.emit("Start", localStorage.getItem("token"))

        setSocket(newsocket)

        newsocket.on('Private-Message-To-Client', (data) => {
            console.log(data)
            // console.log(checkReceiveMess(data[0]))


            setSelectedmessage(selectedmessage => [...selectedmessage, {
                state: false,
                _id: data[0],
                from: selected.email,
                text: data[2],
                time: data[3]
            }]);
            setNewmessage({ text: data[2], time: data[3] })
            // let temp = [...usermessage];
            // temp.forEach((user, index) => {
            //     if ((user.Email).match(selected.email)) {
            //         user.text = newmessage.text;
            //         user.time = newmessage.time;
            //         [temp[0], temp[index]] = [temp[index], temp[0]];
            //     }
            // })
            // setUsermessage(temp);
        })

        return () => {
            if (selected !== null)
                newsocket.emit('Return-Chat', [selected.room, selected.email]);
            newsocket.off('Private-Message-To-Client');
            console.log("Socket off")
        }
    }, []);

    useEffect(() => {
        if (search === "")
            setLoadingSearch(0)
    }, [search])

    useEffect(() => {
        if (usermessage !== null) {
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
        if (selected !== null)
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
        if (selected !== null && selected.room !== "" && acceptawaitmess === false)
            viewChat();
    }, [selected])

    const selectUser = (room, email, name, image) => {
        // console.log(email)
        socket.emit('Return-Chat', [room, email]);
        setSelected({ email: email, room: room, name: name, image: image })
        setAcceptAwaitmess(false)

    }

    useEffect(() => {
        if (newmessage.time !== null) {
            let temp = [...usermessage];
            temp.forEach((user, index) => {
                if ((user.Email).match(selected.email)) {
                    user.text = newmessage.text;
                    user.time = newmessage.time;
                    [temp[0], temp[index]] = [temp[index], temp[0]];
                }
            })
            setUsermessage(temp);
        }
    }, [newmessage])

    const AcceptAwaitMessage = (messageList, user) => {
        setSelectedmessage([messageList]);
        setSelected(user)
        setAcceptAwaitmess(true)
    }


    const Messages = () => {

        // if (tag === "0" && usermessage === null)
        //     return null;
        var listmess = usermessage;
        if (tag === "1") {
            if (awaitmess === null)
                return null
            listmess = awaitmess;

        }
        if (!(Array.isArray(listmess) && listmess.length > 0))
            return <div style={{ textAlign: 'center' }}>Không có tin nhắn</div>

        var list = listmess.map((messageList) => (
            <div type="button" className="message-content" onClick={() => tag === "0" ? selectUser(messageList.idRoom, messageList.Email, messageList.name, messageList.Anh) : AcceptAwaitMessage(messageList, { email: messageList.Email, room: messageList.idChatRoom, name: messageList.name, image: messageList.Anh })}>
                <div className="col-auto" style={{ padding: 0 }}>
                    {messageList.Anh === null || messageList.Anh === "" ? <div style={{ width: "50px", height: "50px", display: "block", borderRadius: "100%", border: "1px solid rgb(223, 223, 223)", marginTop: "5px", background: "white" }}></div> : <img width="50px" height="50px" style={{ borderRadius: "100%", border: "1px solid rgb(223, 223, 223)", marginTop: "5px" }} src={messageList.Anh} alt=""></img>}
                </div>
                <div className="col message-content-text" style={{ padding: 0 }}>
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
                </div>
            </div>
        ))
        return list;
    }

    const viewChatAwait = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "bearer " + localStorage.getItem("token"));

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("https://hcmusemu.herokuapp.com/chat/findchatawait", requestOptions)
            .then(response => response.json())
            .then(result => setAwaitmess(result))
            .catch(error => console.log('error', error));
    }

    const viewChat = () => {
        // setloaddingChatBox(true)
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
                // setloaddingChatBox(false)
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
                if (Array.isArray(result) && result.length > 0) {
                    if (result !== null) {
                        result.sort((a, b) => {
                            var keyA = a.time,
                                keyB = b.time;

                            if (keyA < keyB) return 1;
                            if (keyA > keyB) return -1;
                            return 0;
                        })
                    }
                    setUsermessage(result);

                    setSelected({
                        image: result[0].Anh,
                        room: result[0].idRoom,
                        email: result[0].Email,
                        name: result[0].name
                    })
                }
            })
            .catch(error => console.log('error', error));
    }

    const searchUser = (value) => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "bearer " + localStorage.getItem("token"));
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("HoTen", value);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch("https://hcmusemu.herokuapp.com/profile/findinfofromfullname", requestOptions)
            .then(response => {
                return response.json()
            })
            .then(result => {
                console.log(result)
                setFoundedUser(result);
            })
            .catch(error => console.log('error', error));
    }

    const renderChatSelected = () => {
        // if (loaddingChatBox)
        //     return <div class="text-center">
        //         <div class="spinner-border" role="status">
        //             <span class="sr-only">Loading...</span>
        //         </div>
        //     </div>
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

    const handleKeyDownAwaitmess = (event) => {
        if (event.key === 'Enter') {
            sendAwaitMessage();
        }
    }

    const handleSearch = (e) => {
        setSearch(e.target.value)

        if (e.target.value === "")
            setLoadingSearch(0);
        if (typing.current) {
            clearTimeout(typing.current)
        }

        typing.current = setTimeout(() => {
            console.log(e.target.value)
            if (e.target.value !== "") {
                setLoadingSearch(1);
                searchUser(e.target.value)
            }
        }, 300)

    }

    const SearchUserSelelected = (selecteduser) => {
        setSelected(selecteduser)
    }

    const renderFoundedUser = () => {
        if (loadingSearch === 1 && tag !== "1") {
            if (!Array.isArray(foundedUser) || foundedUser.length < 1)
                return <div style={{ textAlign: 'center' }}>Không tìm thấy người dùng</div>
            const list = foundedUser.map((user) => {
                return <div type="button" className="message-content" onClick={() => SearchUserSelelected({ email: user.Email, name: user.HoTen, image: user.AnhSV })}>
                    <img width="50px" height="50px" style={{ borderRadius: "100%", border: "1px solid rgb(223, 223, 223)", marginTop: "5px" }} src={user.AnhSV} alt=""></img>
                    <span className="message-content-text">
                        <div className="name">
                            {user.HoTen}
                        </div>
                        <div className="email">{user.Email}</div>
                    </span>
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

    const Btn_ClickAccept = () => {
        socket.emit("Accepted", selected.room)
        setAcceptAwaitmess(false)
        getMessage();
        setTag("0")
        viewChatAwait();

    }

    const sendAwaitMessage = () => {
        socket.emit('Create-Room', [localStorage.getItem("token"), selected.email]);
        socket.once('Reply-Create-Room', (data) => {
            console.log(data);
            console.log(selected.email)
            console.log(selectedawaitmess)
            socket.emit("Private-Message", [data, selected.email, selectedawaitmess]);
            socket.once("Request-Accept", (data) => {
                console.log(data)
            })

        });
        setSelectedAwaitmess("")
    }

    const renderMessage = () => {
        if (loadingSearch === 1 && tag === "0") {
            return <div>
                <div className="message"></div>
                {/* <div className="textbox-message"> */}
                <div className="row textbox-message" style={{ alignItems: "center" }}>
                    <input value={mess} className="col-10 box-chat" type="text" placeholder="Nội dung tin nhắn" name="mess" onChange={(e) => setMess(e.target.value)} onKeyDown={handleKeyDown} />
                    {/* <i type="button" className="enter fa fa-reply" onClick={sendMessage}></i> */}
                    <div className="col-2">
                        <div type="button" className="enter" onClick={() => sendAwaitMessage()}>Gửi</div>
                    </div>
                </div>
                {/* </div> */}
            </div>
        }
        if (acceptawaitmess)
            return <div><div className="row justify-content-center">
                <div type="button" className="col-6 btn-acceptawait" onClick={() => Btn_ClickAccept()}>Cho phép nhận tin nhắn</div>
            </div>
                {renderChatSelected()}
            </div>
        else if (!acceptawaitmess)
            return <div>
                {renderChatSelected()}
                <div className="row textbox-message" style={{ alignItems: "center" }}>
                    {/* <div className="col-12"> */}
                    <input value={mess} className="col-10 box-chat" type="text" placeholder="Nội dung tin nhắn" name="mess" onChange={(e) => setMess(e.target.value)} onKeyDown={handleKeyDown} />
                    {/* <i type="button" className="enter fa fa-reply" onClick={sendMessage}></i> */}
                    <div className="col-2">
                        <div type="button" className="enter" onClick={sendMessage}>Gửi</div>
                    </div>
                    {/* </div> */}
                </div>
            </div>
    }


    var messtag = tag === "0" ? "selected" : "btn-mess";
    var messawaittag = tag === "1" ? "selected" : "";
    return (
        <div className="mess">
            {/* <ConnectSocket /> */}
            <div className="col-12">
                <Category current="Tin nhắn" />
                <div className="col-md-6 mess-tag" style={{ padding: 0, background: "white" }}>
                    <div className="row">
                        <div type="button" className={"col-md-6 btn-mess " + messtag} onClick={() => setTag("0")}>Tin nhắn hiện tại
                        </div>
                        <div type="button" className={"col-md-6 btn-mess " + messawaittag} onClick={() => setTag("1")}>Tin nhắn chờ
                        </div>
                    </div>
                </div>
                <div className="row" style={{ boxShadow: "0 4px 24px 0 rgb(34 41 47 / 10%)" }}>
                    <div className="col-md-4 listfriend-box" style={{ padding: "10px 10px 10px 0px", background: "white" }}>
                        {<div style={{ overflowY: "auto", overflowX: "hidden", height: "70vh" }}>
                            {tag === "0" && <div>
                                <input className="col-11 box-input" type="text" placeholder="Tìm kiếm người dùng" name="search" value={search} required onChange={(e) => handleSearch(e)} />
                            </div>}
                            {renderFoundedUser()}
                        </div>}
                    </div>
                    <div className="col-md-8 message-box">
                        {selected !== null && <div>
                            <div className="selected-user">
                                {selected.image === null || selected.image === "" ? null : <img width="50px" height="50px" style={{ borderRadius: "100%", border: "1px solid rgb(223, 223, 223)" }} src={selected.image} alt=""></img>}
                                <div className="infouser">
                                    <div className="name">{selected.name}</div>
                                    <div className="email">{selected.email}</div>
                                </div>
                            </div>
                            <hr />
                            {renderMessage()}
                        </div>
                        }
                    </div>
                </div>
                {/* <Footer /> */}
            </div >
        </div>
    );
}

export default Message;