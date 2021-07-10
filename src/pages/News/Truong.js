import React , {useState, useEffect}from 'react';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    news_page: {
      margin: "10px 0 0 16vw", 
      background: "white", 
      width: "82vw", 
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
      fontSize: "18px", 
      fontWeight: "500", 
      color: "black"
    },
    news_page__time: {
      color: "gray", 
      fontSize: "14px"
    },
  }));

export default function Truong()
{
    const classes = useStyles()
    const [newsuni,setNewsUni] = useState([]);

    const getNewsUniversity = async() => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "bearer " + localStorage.getItem("token")+ "tC");
    
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
    
        await fetch("https://hcmusemu.herokuapp.com/info/newsuniversity", requestOptions)
            .then(response => {return response.json()})
            .then(result => {
                setNewsUni(result)
            })
            .catch(error => console.log('error', error));
    }

    useEffect(() => {
        getNewsUniversity();
     },[]);
        return newsuni.map((item, index) => {
            return (
              <div key={index}>
                 <a classes={classes.news_page_a} href={'//www.hcmus.edu.vn' + item.Link} target="_blank" rel="noopener noreferrer"> 
            <div className={classes.news_page__news}>
              <div className={classes.news_page__title}>
                  {item.Title}
              </div>
              <div className={classes.news_page__time}>
                  {item.Date}
              </div>
      
            </div>{}
            </a>
              </div>
            )
})}
