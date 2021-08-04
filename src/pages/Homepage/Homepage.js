//import logo from './logo.svg';

import React,{useState,useEffect} from 'react';
import NavBar from '../../Navigation/NavBar'
import {makeStyles, Toolbar,Typography, Grid,Box, Button,Paper} from "@material-ui/core"
import FiberNewIcon from '@material-ui/icons/FiberNew';
import TimelapseIcon from '@material-ui/icons/Timelapse'; 
import {useHistory} from "react-router-dom"
import Footer from '../../components/footer/Footer';
import LoadingScreen from '../../components/shared/LoadingScreen';
import CircularProgress from '@material-ui/core/CircularProgress';

const border = 200;
const useStyles = makeStyles((theme)=>({
  root: {
    marginLeft: `${border}+10px`,
    display: "flex",
    backgroundColor: "#faf9e8"

  },
  loadingIcon:{
      display: 'flex',
      '& > * + *': {
        marginLeft: theme.spacing(2),
      },
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
  news_page: {
    margin: "10px 0 0 16vw", 
    background: "white", 
    width: "80vw", 
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 1px 3px"
  },
  news_page_a: {
    textDecoration: "none",
    color: "orange !important"
  },
  news_page__news: {
    padding: "20px 20px 0 20px"
  },
  news_page__news_hover__title: {
   
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
function Homepage() {
  let history = useHistory();

  const classes = useStyles();
  const [newsfac,setNewsFac] = useState([]);
  const [newsuni,setNewsUni] = useState([]);
  const [loading,setLoading] = useState(true);
  const [loaduni,setLoadUni] = useState(true);
  const [loadfac,setLoadFac] = useState(true);
  const [info, setInfo] = useState([{
  TenTruongDH: "Trường Đại học Khoa học Tự nhiên - ĐHQG TPHCM",
  WebSite: "https://www.hcmus.edu.vn/",
  Email: "bantin@hcmus.edu.vn",
  SDT: "02838962823",
  FanFage: "https://www.facebook.com/us.vnuhcm/",
  TenDiaChi: " 227 Đường Nguyễn Văn Cừ, Phường 4, Quận 5, TP HCM; Khu đô thị Đại học Quốc Gia P.Linh Trung Quận Thủ Đức, TP HCM",
  TenKhoa: "Khoa Địa chất",
  Website: "https://phys.hcmus.edu.vn/",
  Images: "https://www.hcmus.edu.vn/images/2020/04/07/bn2.jpg"}]);
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
          .then(result => {setNewsUni(result.slice(0,5));setLoadUni(false)})
          .catch(error => console.log('error', error));
  }


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
              setNewsFac(result.slice(0,5)); setLoadFac(false);
            })
            .catch(error => console.log('error', error));
        }
    const getInfoUni = async() => {
          var myHeaders = new Headers();
          myHeaders.append("Authorization", "bearer " + localStorage.getItem("token") +"tC");
      
          var requestOptions = {
              method: 'GET',
              headers: myHeaders,
              redirect: 'follow'
          };
      
          await fetch("https://hcmusemu.herokuapp.com/info/getinfo", requestOptions)
              .then(response => {return response.json();})
              .then(result => {
               setInfo(result);
              })
              .catch(error => console.log('error', error));
          }
    useEffect(() => {

        getNewsFaculty();
        getNewsUniversity();
        getInfoUni();
        setLoading(false);
     },[]);
     const renderNewsComponent = (id) => {
        if (id==1){
          return newsfac.map((item, index) => {
            return (
              <Box border={1} borderRadius="10px" color="white" width="100%">
              <Grid container
              justifyContent="center"
              alignItems="left">
    
              <div key={index}>
                <a classes={classes.news_page_a} href={item.Link} target="_blank" rel="noopener noreferrer">
              <div className={classes.news_page__news}>
              <div style={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',}}>
              <FiberNewIcon/>
              <span className={classes.news_page__title}>
                  {item.Title}
              </span>
              </div>
              <br/>
              <div style={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',}}>
              <TimelapseIcon/>
              <span TimelapseIcon className={classes.news_page__time}>
                  {item.Date}
              </span>
              </div>
            </div>
            </a>
              </div>
              </Grid>
              </Box>
            )
          })
        }
        else if (id==0){
          return newsuni.map((item, index) => {
            return (
              <Box border={1} borderRadius="10px" color="white" width="100%">
              <Grid container
              justifyContent="center"
              alignItems="left"
              background="dark"
              marginLeft="">
    
              <div key={index}>
                <a classes={classes.news_page_a} href={item.Link} target="_blank" rel="noopener noreferrer">
              <div className={classes.news_page__news}>
              <div style={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',}}>
              <FiberNewIcon/>
              <span className={classes.news_page__title}>
                  {item.Title}
              </span>
              </div>
              <br/>
              <div style={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',}}>
              <TimelapseIcon/>
              <span TimelapseIcon className={classes.news_page__time}>
                  {item.Date}
              </span>
            </div>
            </div>
            </a>
              </div>
              <br/>
              </Grid>
              </Box>
            )
          })
        }
     }
     const renderNewsFac = () => {
       
      return (
        <Box width="80%" border={4} borderRadius="25px" justifyContent="center" width="100%">
          <Typography align="center" variant="h4" style={{color: "red"}}>
            Tin tức khoa
          </Typography>
          {renderNewsComponent(0)}
          <a>
          <Button  width="80%" onClick={()=> history.push("/news?tag=1")}>
            <Typography variant="h6" color="blue"> Xem thêm</Typography>
          </Button>
          </a>
        </Box>
        )
      }

      const renderNewsUni = () => {
       
        return (
          <Box width="80%" border={4} borderRadius="25px" justifyContent="center" width="100%">
            <Typography align="center" variant="h4" style={{color: "red"}}>
              Tin tức trường
            </Typography>
            {renderNewsComponent(1)}
            <a>
            <Button  width="80%" onClick={()=> history.push("/news?tag=0")}>
              <Typography variant="h6" color="blue"> Xem thêm</Typography>
            </Button>
            </a>
            <br/>
          </Box>
        
          )
        }
      const renderImage = () => {
        return (
          <img src={info[0].Images} alt="" width="100%"/>
        )
      }
      const renderDeadline = () => {
       
        return (
          <Box width="80%" border={4} borderRadius="25px" justifyContent="center" width="100%">
            <Typography align="center" variant="h4" style={{color: "red"}}>
              Deadline trong tháng
            </Typography>
            <Typography align="center" variant="h5">
              Chưa có deadline nào trong tháng
            </Typography>
            {}
          </Box>
          )
        }
        const renderCalendarEvent = () => {
       
          return (
            <Box width="80%" border={4} borderRadius="25px" justifyContent="center" width="100%">
              <Typography align="center" variant="h4" style={{color: "red"}}>
                Lịch trong tháng
              </Typography>
              <Typography align="center" variant="h5">
              Chưa có deadline nào trong tháng
              </Typography>
              {}
            </Box>
            )
          }
    if (loading == true){
      return (
        <LoadingScreen/>
      )
    }
    else{
    return (
    <div className = {classes.root}> 
        <NavBar/>
        <main className={classes.content}>
        <div className={classes.toolbar} />
        <div>
            <Typography variant="h4" align="center"> {info[0].TenTruongDH}</Typography>
            <br/> <br/> <br/>
            {renderImage()}
            <br/><br/> <br/>
            {renderDeadline()}
            <br/> <br/><br/>
            {renderCalendarEvent()}
            <br/> <br/><br/>
            {loadfac === true ?  <CircularProgress /> : renderNewsFac()}
            <br/><br/> <br/>
            {loaduni === true ? <CircularProgress/> : renderNewsUni()}
            <Footer/>
        </div>
      </main>
    </div>
  );
    }
}

export default Homepage;
