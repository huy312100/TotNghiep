import React , {useState, useEffect}from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Box, Grid} from "@material-ui/core"
import FiberNewIcon from '@material-ui/icons/FiberNew';
import TimelapseIcon from '@material-ui/icons/Timelapse';
import LoadingScreen from '../LoadingScreen';
const useStyles = makeStyles((theme) => ({
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
      fontSize: "20px", 
      fontWeight: "300", 
      color: "black"
    },
    news_page__time: {
      color: "orange", 
      fontSize: "18px"
    },
  }));

export default function Khoa()
{
    const classes = useStyles()
    const [newsfac,setNewsFac] = useState([]);
    const [loading,setLoading] = useState(true);
    const getNewsFaculty = async() => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "bearer " + localStorage.getItem("token") +"tC");
    
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
    
        await fetch("https://hcmusemu.herokuapp.com/info/newsfaculty", requestOptions)
            .then(response => {return response.json();})
            .then(result => {
              setNewsFac(result)
            })
            .catch(error => console.log('error', error));
        }
    useEffect(() => {
        getNewsFaculty();
        setLoading(false);
     },[]);
     if (loading==true) {
       return(
      <LoadingScreen/>
    )}
     else
     {
        return newsfac.map((item, index) => {
            return (
              <Box container
              justifyContent="center"
              alignItems="left"
              background="dark">

              <div key={index}>
                <a classes={classes.news_page_a} href={item.Link} target="_blank" rel="noopener noreferrer">
              <div className={classes.news_page__news}>
              <FiberNewIcon/>
              <span className={classes.news_page__title}>
                  {item.Title}
              </span>
              <br/>
              <TimelapseIcon/>
              <span TimelapseIcon className={classes.news_page__time}>
                  {item.Date}
              </span>
            </div>
            </a>
              </div>
              </Box>
            )
      })}
}
