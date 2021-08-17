import React , {useState, useEffect}from 'react';
import NavBar from '../../Navigation/NavBar'
import { makeStyles } from '@material-ui/core/styles';
import {Typography,Button,Toolbar,Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
      marginLeft: 200,
    },
    toolbar: {
      display: 'flex',
      alignItems: 'left',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    box: {
        height: 100,
        display: "flex",
        border: "1px solid black",
        padding: 8
      },
      centerBox: {
        justifyContent: "center",
        alignItems: "center"
      }
  }));
  

export default function Score(){

  const classes = useStyles()
  const [website,setWebsite] = useState("");

  const isEmpty = (obj)=> {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }

    return true;
    }

  const getPortalInfo = async() => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "bearer " + localStorage.getItem("token"));

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("https://hcmusemu.herokuapp.com/web/getcustomlink", requestOptions)
        .then(response => {
            console.log(response.status);
            if (response.status === 200) {
                return response.json();
            }
            else return [];
        })
        .then(result => {
            result = result.filter(connection => connection.Type === 'Portal');
            if (isEmpty(result)===false)
            {
                setWebsite(result[0].Url);
            }
            else{
                setWebsite("");
            }

        })
        .catch(error => {
            console.log('error', error)
        });
    }
  useEffect(()=>{
      getPortalInfo();
  })

  return (
      <div className={classes.root}>
      <NavBar/>
            <main className={classes.content}>
            <Toolbar/>
                <Box
                component="div"
                m={1} 
                className={`${classes.centerBox} ${classes.box}`}
                >
                {
                website !== "" ? 
                <Button 
                    variant="contained" 
                    color="primary" 
                    style={{ height: 80, width: "50%" }}
                    href={website}
                    rel="noopener noreferrer" 
                    target="_blank"
                    title= "Nhấn vào đây để truy cập bảng điểm"
                >
                    <Typography variant="h4">Xem bảng điểm</Typography>
                </Button>
                :
                <Typography>Bạn chưa custom Portal. Vui lòng custom link Portal và thử lại sau</Typography>
                }
                </Box>
            </main>
      </div>
  )};
  
