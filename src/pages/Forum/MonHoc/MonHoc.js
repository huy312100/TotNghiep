import React , {useState, useEffect}from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Grid} from "@material-ui/core"
import FiberNewIcon from '@material-ui/icons/FiberNew';
import TimelapseIcon from '@material-ui/icons/Timelapse';
const useStyles = makeStyles((theme) => ({
    news_page: {
      margin: "10px 0 0 16vw", 
      background: "white", 
      width: "80vw", 
      boxShadow: "rgba(0, 0, 0, 0.1) 0px 1px 3px"
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

export default function MonHoc()
{
    const classes = useStyles()
    const [newsfac,setNewsFac] = useState([]);

    const getNewsFaculty = async() => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "bearer " + localStorage.getItem("token") +"tC");
    
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
    
        await fetch("https://hcmusemu.herokuapp.com/forum/courses/viewtop", requestOptions)
            .then(response => {return response.json();})
            .then(result => {
              setNewsFac(result)
            })
            .catch(error => console.log('error', error));
        }
    useEffect(() => {
        getNewsFaculty();
     },[]);
     if (newsfac.length != undefined)
     {
        return newsfac.map((item, index) => {
            return (
              <Grid container
              justifyContent="center"
              alignItems="left"
              background="dark">

              <div key={index}>
                
              </div>
              </Grid>
            )
      })}
      else return(
        <div>
        </div>
      )
}
