import React, {useState, useEffect, useRef} from 'react';
import {makeStyles} from "@material-ui/core"
import NavBar from "../../Navigation/NavBar"
import clsx from "clsx";
import io from "socket.io-client";
import { Tab,Tabs,InputAdornment,TextField,IconButton,Box  } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { useHistory } from 'react-router-dom';
import checkTokenExpired from '../../ValidAccess/AuthToken';
const useStyles = makeStyles((theme)=>({
  root: {
    marginLeft: "200px"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: {
    display: 'flex',
    alignItems: 'left',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  info: {
    width: 0,
    flexGrow: 1,
  },
  div: {
      maxWidth: "100%",
      height: "auto",
      textOverflow: "clip",
      whiteSpace: "normal",
  },
  wrap: {
    display: "flex", 
    width: "82vw", 
    justifyContent: "space-between",
  },
  listfriend_box: {
    width: "28vw",
    height: "85vh", 
    background: "rgb(255, 255, 255)", 
    marginRight: "5px"
  },
  box_input: {
    flexGrow: 1,
    display: "table-cell", 
    margin: "1vw auto", 
    height: "40px"
  },
  listfriend: {
    overflow: "auto"
  },
  wrap__message_box: {
    height: "85vh", 
    width: "53vw", 
    background: "white", 
    padding: "0 10px"
  },
  wrap__message_tab: {
    height: "10vh", 
    width: "35vw", 
    background: "white", 
    padding: "0 10px"
  },
  message_box__message: {
    overflow: "auto", 
    height: "65vh"
  },
  message_box__message__box_friend: {
    margin: "5px", 
    marginLeft: "15px"
  },
  message_box__message__box_user: {
    display: "flex", 
    margin: "5px", 
    marginRight: "15px", 
    justifyContent: "flex-end"
  },
  message_box__friend: {
    display: "inline-block", 
    background: "rgb(214, 214, 214)", 
    borderRadius: "5px", 
    fontSize: "14px", 
    padding: "5px"
  },
  message_box__user: {
    display: "inline-block", 
    background: "#18468b", 
    borderRadius: "5px", 
    fontSize: "14px", 
    padding: "5px", 
    color: "white"
  },
  message_box__textbox_message: {
    display: "flex", 
    justifyContent: "space-between", 
    margin: "5px"
  },
  message_box__box_chat: {
    borderRadius: "20px", 
    border: "none", 
    background: "wheat", 
    padding: "10px", 
    width: "47vw", 
    fontSize: "14px"
  },
  message_box__box_chat_focus: {
    outline: "none"
  },
  message_box__enter: {
    color: "white", 
    height: "3vw", 
    background: "rgb(230, 155, 85)", 
    width: "3vw", 
    lineHeight: "3vw", 
    borderRadius: "50%", 
    textAlign: "center", 
    margin: "auto 0", 
    fontSize: "16px"
  },
  message_box__selected_user: {
    margin: "10px", 
    display: "flex", 
    width: "20vh"
  },
  message_box_hr: {
    margin: "10px 0 0 0"
  },
  message_box__selected_user__infouser: {
    padding: "0 10px"
  },
  message_box__selected_user__infouser__name: {
    whiteSpace: "nowrap"
  },
  message_box__selected_user__infouser__email: {
    fontSize: "10px", 
    color: "grey"
  },
  listfriend_box__message_content: {
    padding: "5px 0 0px 5px", 
    margin: "5px 5px 10px 15px", 
    display: "flex", 
    alignItems: "flex-start"
  },
  listfriend_box__message_content_hover: {
    background: "rgb(243, 243, 243)", 
    borderRadius: "10px"
  },
  listfriend_box__message_content_text: {
    marginTop: "0", 
    marginLeft: "10px", 
    display: "inline-block", 
    verticalAlign: "text-top"
  },
  listfriend_box__message_content_text__name: {},
  listfriend_box__message_content_text__time: {
    fontWeight: "100", 
    fontSize: "11px"
  },
  listfriend_box__message_content_text__text: {
    paddingTop: "0", 
    width: "18vw", 
    overflow: "hidden", 
    fontSize: "13px", 
    color: "rgb(92, 92, 92)", 
    fontWeight: "400"
  },
  search_user: {
    padding: "10px", 
    marginLeft: "10px", 
    cursor: "pointer"
  },
  search_user_hover: {
    background: "#f1f2f4"
  },
  search_user__name: {
    fontSize: "14px"
  },
  search_user__email: {
    fontSize: "12px"
  },
  box: {
    display: "flex",
    border: "1px solid black",
    padding: 8
  },
  centerBox: {
    justifyContent: "center",
    alignItems: "center"
  },
  indicator: {
    background: "none"
  },
  tabs: {
    "& button[aria-selected='true']": {
      border: "3px solid red"
    }
  },
}));
function Chat() {
  const classes = useStyles();
  const history = useHistory();
  const [search, setSearch] = useState("");
  const [loadingSearch, setLoadingSearch] = useState(0);
  const [userMail,setUserMail] = useState(null);
  const [value, setValue] = useState(0);

  const [foundedUser, setFoundedUser] = useState(null)

  const [usermessage, setUsermessage] = useState([""]);
  const [awaitMessage,setAwaitMessage] = useState([""])
  const [selected, setSelected] = useState({ email: "", room: "", name: "" });

  const [selectedmessage, setSelectedmessage] = useState([]);
  const [newmessage, setNewmessage] = useState({ text: null, time: null });
  const [mess, setMess] = useState("");
  const [avatar,setAvatar] = useState("");
  const divRef = useRef(null);


  const [socket,setSocket] = useState(io("https://hcmusemu.herokuapp.com", { transports: ['websocket'] })); 

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(()=>{
    getUserEmail();
  })
  useEffect(() => {
    getMessage();
    getAwaitMessage();

    socket.on('Private-Message-To-Client', (data) => {
        setSelectedmessage(selectedmessage => [...selectedmessage, {
            state: false,
            _id: data[0],
            from: selected.room,
            text: data[2],
            time: data[3]
        }]);
        setNewmessage({ text: data[2], time: data[3] })
    })

    return () => {
        socket.off('Private-Message-To-Client');
    }
  });

  const getUserEmail = async()=>{
    if (checkTokenExpired()) {
      localStorage.clear()
      history.replace("/");
      return null
      }
    var myHeaders = new Headers();
      myHeaders.append("Authorization", "bearer " + localStorage.getItem("token"));

      var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
      };

      await fetch("https://hcmusemu.herokuapp.com/profile/view", requestOptions)
          .then(response => response.json())
          .then(result => {setUserMail(result[0].Email)})
          .catch(error => console.log('error', error));
  }
  useEffect(() => {
      if (search === "")
          setLoadingSearch(0)
  })

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
    if (awaitMessage !== [""]) {
        awaitMessage.sort((a, b) => {
            var keyA = a.time,
                keyB = b.time;

            if (keyA < keyB) return 1;
            if (keyA > keyB) return -1;
            return 0;
        })
    }
  }, [awaitMessage]); 

  useEffect(() => {
      divRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [selectedmessage]);


  const convertTimeAgo = (UNIX_timestamp) => {
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
        <Box borderRadius="10px" border={1} color="black">
          <div type="button" className={classes.listfriend_box__message_content} onClick={() => {setAvatar(messageList.Anh);selectUser(messageList.idRoom, messageList.Email, messageList.name)}}>
              <img width="50vw" style={{ borderRadius: "50%", marginTop: "5px" }} src={messageList.Anh} alt=""></img>
              <span className={classes.listfriend_box__message_content_text}>
                  <div style={{fontSize: "18px"}} className={classes.listfriend_box__message_content_text__name}>
                      {messageList.name}
                  </div>
                  <div style={{fontSize:"13px"}} className={classes.listfriend_box__message_content_text__time}>
                      {convertTimeAgo(messageList.time)}
                  </div>
              </span>
          </div>
        </Box>
      ))
      return list;
  }

  const renderAwaitUser = () => {

    var list = awaitMessage.map((messageList) => (
      <Box borderRadius="10px" border={1} color="black">
        <div type="button" className={classes.listfriend_box__message_content} onClick={() => {setAvatar(messageList.Anh);selectUser(messageList.idRoom, messageList.Email, messageList.name)}}>
            <img width="50vw" style={{ borderRadius: "50%", marginTop: "5px" }} src={messageList.Anh} alt=""></img>
            <span className={classes.listfriend_box__message_content_text}>
                <div style={{fontSize: "18px"}} className={classes.listfriend_box__message_content_text__name}>
                    {messageList.name}
                </div>
                <div style={{fontSize:"13px"}} className={classes.listfriend_box__message_content_text__time}>
                    {convertTimeAgo(messageList.time)}
                </div>
            </span>
        </div>
      </Box>
    ))
    return list;
  }

  const viewChat = async() => {
    if (checkTokenExpired()) {
      localStorage.clear()
      history.replace("/");
      return null
      }
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

      await fetch("https://hcmusemu.herokuapp.com/chat/loadmessage", requestOptions)
          .then(response => response.json())
          .then(result => {
               var mess = [];
               if (result.length > 0){
                 mess = result.reverse();
               }             
              setSelectedmessage(mess)
          })
          .catch(error => console.log('error', error));
  }

  const getMessage = async() => {
    if (checkTokenExpired()) {
      localStorage.clear()
      history.replace("/");
      return null
      }
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "bearer " + localStorage.getItem("token"));

      var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
      };
      await fetch("https://hcmusemu.herokuapp.com/chat/findchat", requestOptions)
      .then((response) => {
        const statusCode = response.status;
        const dataRes = response.json();
        return Promise.all([statusCode, dataRes]);
    }).then(([statusCode, dataRes]) => {
              if (statusCode === 200){
              setUsermessage(dataRes);
              setSelected({
                  room: dataRes[0].idRoom,
                  email: dataRes[0].Email,
                  name: dataRes[0].name
              })
              }
          })
          .catch(error => console.log('error', error));
  }

  const getAwaitMessage = async() => {
    if (checkTokenExpired()) {
      localStorage.clear()
      history.replace("/");
      return null
      }
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "bearer " + localStorage.getItem("token"));

      var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
      };
      await fetch("https://hcmusemu.herokuapp.com/chat/findchatawait", requestOptions)
      .then((response) => {
        const statusCode = response.status;
        const dataRes = response.json();
        return Promise.all([statusCode, dataRes]);
    }).then(([statusCode, dataRes]) => {
              console.log(dataRes);
              if (statusCode === 200){
                setAwaitMessage(dataRes);
              }
          })
          .catch(error => console.log('error', error));
    }

  const searchUser = async() => {
    if (checkTokenExpired()) {
      localStorage.clear()
      history.replace("/");
      return null
      }
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "bearer " + localStorage.getItem("token"));
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
      console.log(search);
      var urlencoded = new URLSearchParams();
      urlencoded.append("username", search);

      var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: urlencoded,
          redirect: 'follow'
      };

      await fetch("https://hcmusemu.herokuapp.com/profile/findname", requestOptions)
          .then(response => response.json())
          .then(result => {
              console.log(result)
              setFoundedUser(result);
              setLoadingSearch(1);
          })
          .catch(error => console.log('error', error));
  }

  const renderChatSelected = () => {
      return <div className={classes.message_box__message}>
          {selectedmessage.map(message => {
              if (message.from === userMail) {
                  return <div className={classes.message_box__message__box_user}>
                      <div className={classes.message_box__user}>{message.text}</div>
                  </div>
              }
              else {

                  return <div className={classes.message_box__message__box_friend}>
                      <div className={classes.message_box__friend}>{message.text}</div>
                  </div>
              }
          })
          }
          <div ref={divRef}></div>
      </div>

  }

  const sendMessage = () => {
      if (mess !== "") {
          socket.emit("Private-Message", [selected.room, selected.email, mess]);
          setSelectedmessage([...selectedmessage, {
              state: false,
              _id: selected.room,
              from: userMail,
              text: mess,
              time: Date.now()
          }]);
          setNewmessage({ text: mess, time: Date.now() })
          setMess("");
      }
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

  const handleSearchClicked = ()=>{
    searchUser();
  }

  const renderFoundedUser = () => {
      if (loadingSearch === 1) {
          const list = foundedUser.map((user) => {
              return( 
              <Box border={1} background="white" borderColor="red" textAlign="center" className={classes.search_user}>
                  <div className={classes.search_user__name}>{user.HoTen}</div>
                  <div className={classes.search_user__email}>({user.Email})</div>
              </Box>
              )
          })
          return(
            <div style={{backgroundColor: "white"}}>
              {list}
            </div>
          );
      }
      return;
  }

  console.log(search);
  return (
    <div className = {classes.root}> 
        <NavBar/>
        <main className={classes.content}>
        <div className={classes.toolbar} />
            <div className={classes.wrap}>
              
                <div className={classes.listfriend_box}>
                    <Box className={classes.box_input} textAlign="center" justifyContent="center" border={1} borderColor="blue">
                        <TextField    
                          style = {{width: "28vw"}}                   
                          label="Nhập tên người dùng"
                          name = "search"
                          value = {search}
                          required
                          onChange = {(e) => setSearch(e.target.value)}
                          onKeyDown={handleSearch}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment>
                                <IconButton onClick={handleSearchClicked}>
                                  <SearchIcon />
                                </IconButton>
                              </InputAdornment>
                            )
                          }}
                        />
                    </Box>
                    {search.length > 0 && renderFoundedUser()}
                    <br/>
                    <Tabs
                              variant="fullWidth"
                              value={value}
                              onChange={handleChange}
                              indicatorColor="primary"
                              textColor="primary"
                              className={classes.tabs}
                              classes={{ indicator: classes.indicator }}
                              >
                            <Tab fullWidth label="Tin nhắn"/>
                            <Tab fullWidth label="Tin nhắn chờ"/>
                      </Tabs>
                      <div className={classes.listfriend}>
                        <div>
                            {value === 0 && Messages()}
                            {value === 1 && renderAwaitUser() }
                        </div>
                    </div>;
                </div>
                 
                <div className={classes.wrap__message_box}>
                   <div className={classes.message_box__selected_user}>

                    <img width="40vw" height="40vw" style={{ borderRadius: "50%" }} src={avatar} alt=""></img>
                    <div className={classes.message_box__selected_user__infouser}>
                        <div className={classes.message_box__selected_user__infouser__name}>{selected.name}</div>
                        <div className={classes.message_box__selected_user__infouser__email}>{selected.email}</div>
                    </div>
                    </div>
                <hr />
                  {renderChatSelected()}
                  <div className={classes.message_box__textbox_message}>
                      <input value={mess} className={classes.message_box__box_chat} type="text" placeholder="Nội dung tin nhắn" name="mess" onChange={(e) => setMess(e.target.value)} onKeyDown={handleKeyDown} />
                      <i type="button" className={clsx(classes.message_box__enter,"fa","fa-reply")} onClick={sendMessage}></i>

                  </div>
                </div>
            </div>
            </main>
    </div>
  );
}

export default Chat;
