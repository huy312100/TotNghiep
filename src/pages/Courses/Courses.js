import React , {useState, useEffect}from 'react';
import NavBar from '../../Navigation/NavBar'
import { makeStyles } from '@material-ui/core/styles';
import { Tab, Tabs, Typography, Box,Paper  } from '@material-ui/core';
import CurrentCourse from './CurrentCourse';
import AllCourses from './AllCourses';
import Category from "./Category"
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
  }));
  

export default function Courses(){
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
            <div style={{backgroundColor:"#c8d1db",borderRadius:"25px"}}>
            <Category current="Môn học"/>
            </div>
            <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant = "fullWidth"
                >
                <Tab  label="Môn học hiện tại"/>
                <Tab  label="Tất cả môn học"/>
            </Tabs>
            {value === 0 && <CurrentCourse/>}  
            {value === 1 && <AllCourses/>}
      </main>
      </Paper>
  )};
  
