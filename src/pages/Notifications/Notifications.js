import React, {useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {useHistory} from "react-router-dom"
import checkTokenExpired from '../../ValidAccess/AuthToken';
import NavBar from '../../Navigation/NavBar';
import { Toolbar,Button } from '@material-ui/core';
import LoadingScreen from "../../components/shared/LoadingScreen"
import FiberNewIcon from '@material-ui/icons/FiberNew';
import TimelapseIcon from '@material-ui/icons/Timelapse';
import DescriptionIcon from '@material-ui/icons/Description';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex-end',
      marginLeft:"200px"
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
      },
    news_page: {
        margin: "10px 0 0 16vw", 
        background: "#faf9e8", 
        width: "80vw", 
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 1px 3px",
        
      },
      news_page_a: {
        textDecoration: "none"
      },
      news_page__news: {
        padding: "20px 20px 0 20px"
      },
      news_page__news_hover__title: {
        color: "#3e50b5"
      },
      news_page__title: {
        fontSize: "23px", 
        fontWeight: "300", 
        color: "black"
      },
      news_page__data: {
        fontSize: "18px", 
        fontWeight: "300", 
        color: "black"
      },
      news_page__time: {
        color: "black", 
        fontSize: "18px"
      },
}))
export default function Notifications(){
    const history = useHistory();
    const classes = useStyles();
    const [listNoti,setListNoti] = useState([]);
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
        getNofiData();
    },[])
    const getNofiData = async() => {
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
    
        await fetch("https://hcmusemu.herokuapp.com/notification", requestOptions)
        .then((response) => {
          const statusCode = response.status;
          const dataRes = response.json();
          return Promise.all([statusCode, dataRes]);
        }).then(([statusCode, dataRes]) => {
          if(statusCode === 200){
            setListNoti(dataRes);
            setLoading(false);
          }
          else{
            console.log("loi");
          }
    
        }).catch((err) => console.log(err, "error"));
      }
      
    const changeNotiState = async(id) => {
        if (checkTokenExpired()) {
          localStorage.clear()
          history.replace("/");
          return null
          }
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "bearer " + localStorage.getItem("token"));
        
        var urlencoded = new URLSearchParams();
        urlencoded.append("IDNotification",id);
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };
    
        await fetch("https://hcmusemu.herokuapp.com/notification/changestate", requestOptions)
        .then((response) => {
          const statusCode = response.status;
          const dataRes = response.json();
          return Promise.all([statusCode, dataRes]);
        }).then(([statusCode, dataRes]) => {
          if(statusCode === 200){
            updateStateNoti(id,"State",true);
          }
          else{
            console.log("loi");
          }
    
        }).catch((err) => console.log(err, "error"));
    }

    const updateStateNoti =(id, whichvalue, newvalue)=> {
        var index = listNoti.findIndex(x=> x._id === id);
      
        let g = listNoti[index]
        g[whichvalue] = newvalue
        if (index === -1){
          console.log('no match')
        }
        else
          setListNoti([
            ...listNoti.slice(0,index),
            g,
            ...listNoti.slice(index+1)
          ]);
    }
    
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
    
    const handleNotiClick = (item) =>{
        changeNotiState(item._id);
        if (item.Title ===  "Tin Tức Khoa"){
         history.push("/news?tag=1")
        }
        else if  (item.Title ===  "Tin Tức Trường"){
         history.push("/news?tag=0")
        }
    }
    const renderNotify = () =>{
        return(
        <div>
          {listNoti.map((item,index) => {
            return (
                    <div key={index}>
                        <div className={classes.news_page__news} >
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                flexWrap: 'wrap',}}>
                                <FiberNewIcon style={{color:"red"}}/>
                                <span className={classes.news_page__title} >
                                    {item.Title}
                                </span>
                            </div>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                flexWrap: 'wrap',}}>
                                <DescriptionIcon style={{color:"#3a4ca0"}} />
                                <span className={classes.news_page__data} >
                                    {item.Data}
                                </span>
                            </div>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                flexWrap: 'wrap',}}>
                                <TimelapseIcon style={{color:"#3a4ca0"}} />
                                <span className={classes.news_page__time} >
                                    {convertTimeAgo(item.Date)}
                                </span>
                            </div>
                        </div>
                        <a classes={classes.news_page_a} href={item.Url} target="_blank" rel="noopener noreferrer">
                            <Button>
                                Xem thêm
                            </Button>
                        </a>
                    <hr/>
            </div>
            )})}
            </div>
        )
    }

    if (loading === true){
        return(
        <div className={classes.root}>
            <NavBar/>
            <Toolbar/>
             <LoadingScreen/>
        </div>)
    }
    else{
        return(
            <div className={classes.root}>
                <NavBar/>
                <Toolbar/>
                <main className={classes.content}>
                    {renderNotify()}
                </main>
        </div>)
    }
}