import React, {useState,useEffect,Image} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {Button,Dialog,DialogActions,Avatar,Popover,Typography  } from '@material-ui/core'
import ThumbUpIcon from '@material-ui/icons/ThumbUp';


const useStyles = makeStyles((theme) => ({
    root: {
      margin: "auto",
  
      flexDirection: 'column',
      maxWidth: '50%',
      height: '100%' 
    },

  }));

export const LikedUser =  ({
        isOpen,
        handleClose,
        id,
    })=>{
    const classes  = useStyles();
    const [list,setList] = useState([]);
    const [loading,setLoading] = useState(true);

    const getLikedUser = async(id) => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "bearer " + localStorage.getItem("token")+ "tC");
        
        var urlencoded = new URLSearchParams();
        urlencoded.append("IDPost", id);
  
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };
        await fetch("https://hcmusemu.herokuapp.com/forum/viewlike", requestOptions)
            .then(response => {return response.json()})
            .then((result)=>{
              setList(result);
            })
            .catch(error => console.log('error', error));
      }
    useEffect(()=>{
        if (loading == true){
            getLikedUser(id);
            setLoading(false);
        }
    },[])

    return(
        <div>
       
      </div>
    )
}
