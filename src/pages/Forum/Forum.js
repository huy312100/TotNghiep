import React , {useState, useEffect}from 'react';
import NavBar from '../../Navigation/NavBar'
import { makeStyles } from '@material-ui/core/styles';
import { Tab, Tabs, Typography, Box,Paper,Button  } from '@material-ui/core';
import PropTypes from "prop-types"
import Truong from './Truong/Truong';
import MonHoc from "./MonHoc/MonHoc"
import Khoa from "./Khoa/Khoa"
import { PostThread } from './PostThread';
import Category from '../Category';
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
    news_post:{
      marginTop:"30px",
    },
  }));
  

export default function Forum(){
  const classes = useStyles()
  const [value, setValue] = useState(0);
  const [isOpen,setIsOpen] = useState(false);
  const [selfpost,setSelfpost] = useState("all");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleDialogClose = () => {
    setIsOpen(false);
  }
  const handleDialogOpen = () =>{
    setIsOpen(true);
  }
  
  return (
      <Paper className={classes.root}>
        <NavBar/>
            <main className={classes.content}>
            <div className={classes.toolbar} />
            <Category current="Diễn đàn" currentlink="/forum" />
            <div style={{ display: "flex", alignItems: "center" }}>

                <div type="button" onClick={() => setSelfpost("all")} style={{ margin: "5px 10px 0 10px" }}>
                    <input type="radio" id="all" name="viewpost" value="all" checked={selfpost === "all"} />
                    <label type="button" style={{ fontSize: "16px", margin: "0 5px" }} for="all">Tất cả bài viết</label>
                </div>

                <div type="button" onClick={() => setSelfpost("self")} style={{ margin: "5px 10px 0 10px" }}>
                    <input type="radio" id="self" name="viewpost" value="self" checked={selfpost === "self"} />
                    <label type="button" style={{ fontSize: "16px", margin: "0 5px" }} for="self">Bài viết của bản thân</label>
                </div>
            </div>
            <Box style={{backgroundColor:"#b4cc37"}} className={classes.news_post} textAlign='center'>
              <Button style={{backgroundColor:"#b7e0eb"}} variant='contained' onClick={()=>handleDialogOpen()} textAlign="center">Tạo bài thảo luận</Button>
            </Box>
            <PostThread  isOpen={isOpen} handleClose={()=>handleDialogClose()}/>
            <Tabs
            value={value}
            onChange={handleChange}
           indicatorColor="primary"
           textColor="primary"
            variant = "fullWidth"
          >
        <Tab label="Diễn đàn trường"/>
        <Tab  label="Diễn đàn khoa"/>
        <Tab  label="Diễn đàn môn học"/>
      </Tabs>
      {value === 0 && <Truong self={selfpost}/>} 
      {value === 1 && <Khoa self={selfpost}/>} 
      {value === 2 && <MonHoc self={selfpost}/>} 
      </main>
      </Paper>
  )};
  
