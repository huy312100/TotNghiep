import React from 'react';
import NavBar from '../../Navigation/NavBar'
import {makeStyles, Toolbar,Typography} from "@material-ui/core"
const border = 200;
const useStyles = makeStyles((theme)=>({
  root: {
    marginLeft: `${border}`,
    display: "flex",
    width: `100%-${border}`,
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
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
    margin: "66px 0 0 16vw", 
    justifyContent: "space-between"
  },
  listfriend_box: {
    width: "28vw", 
    height: "85vh", 
    background: "rgb(255, 255, 255)", 
    marginRight: "5px"
  },
  box_input: {
    display: "block", 
    margin: "1vw auto", 
    width: "25vw", 
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
}));
function Chat() {
  const classes = useStyles();
  return (
    <div className = {classes.root}> 
        <NavBar/>
        <main className={classes.content}>
            <div className={classes.toolbar} />

        </main>
    </div>
  );
}

export default Chat;
