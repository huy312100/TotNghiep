import React , {useState}from 'react';
import NavBar from '../../Navigation/NavBar'
import { makeStyles } from '@material-ui/core/styles';
import { Tab, Tabs,Paper  } from '@material-ui/core';
import Truong from './Truong';
import Khoa from "./Khoa"
import {useLocation} from "react-router-dom";
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import SchoolIcon from '@material-ui/icons/School';
import Footer from '../../components/footer/Footer';
const useStyles = makeStyles((theme) => ({
    root: {
      marginLeft: 200,
    },
    indicator: {
      background: "none"
    },
    tabs: {
      "& button[aria-selected='true']": {
        border: "3px solid red"
      }
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
  let { search } = useLocation();
  const query = new URLSearchParams(search);
  const paramValue = query.get('tag');
   //const paramValue = query.get('value');
   const valueParam = parseInt(paramValue)
  const classes = useStyles()
  const [value, setValue] = useState(valueParam);

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
            className={classes.tabs}
          classes={{ indicator: classes.indicator }}
          >
        <Tab icon={<AccountBalanceIcon/>} label="Tin tức trường"/>
        <Tab icon={<SchoolIcon/>} label="Tin tức khoa"/>
      </Tabs>
      {value === 0 && <Truong/>}  
      {value === 1 && <Khoa/>} 
      <Footer/>
      </main>
      </Paper>
  )};
  
