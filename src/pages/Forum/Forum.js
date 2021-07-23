import React , {useState, useEffect}from 'react';
import NavBar from '../../Navigation/NavBar'
import { makeStyles } from '@material-ui/core/styles';
import { Tab, Tabs, Typography, Box,Paper  } from '@material-ui/core';
import PropTypes from "prop-types"
import Truong from './Truong/Truong';
import MonHoc from "./MonHoc/MonHoc"
import Khoa from "./Khoa/Khoa"
const useStyles = makeStyles((theme) => ({
    root: {
      marginLeft: 200,
      backgroundColor:"#faf9e8"
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
  }));
  

export default function News(){
  const classes = useStyles()
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  
  return (
      <Paper className={classes.root}>
          <NavBar/>
            <main className={classes.content}>
            <div className={classes.toolbar} />
            <Tabs
            value={value}
            onChange={handleChange}
           indicatorColor="primary"
           textColor="primary"
            variant = "fullWidth"
          >
        <Tab backgroundColo="#c5f0ca"  label="Diễn đàn trường"/>
        <Tab  label="Diễn đàn khoa"/>
        <Tab  label="Diễn đàn môn học"/>
      </Tabs>
      {value === 0 && <Truong/>} 
      {value === 1 && <Khoa/>} 
      {value === 2 && <MonHoc/>} 
      </main>
      </Paper>
  )};
  
