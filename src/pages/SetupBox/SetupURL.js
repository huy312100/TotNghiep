import React , {useState}from 'react';
import NavBar from '../../Navigation/NavBar'
import { makeStyles } from '@material-ui/core/styles';
import { Tab, Tabs,Paper  } from '@material-ui/core';
import Moodle from './Moodle';
import Portal from './Portal';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
const useStyles = makeStyles((theme) => ({
    root: {
      marginLeft: 200,
      backgroundColor:"#fcfcfc"
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
    indicator: {
      background: "none"
    },
    tabs: {
      "& button[aria-selected='true']": {
        border: "3px solid red"
      }
    },
  }));
  

export default function SetupURL(){
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
            className={classes.tabs}
            classes={{ indicator: classes.indicator }}
          >
        <Tab icon={<AccountCircleIcon/>} label="Moodle"/>
        <Tab icon={<AccountCircleIcon/>} label="Portal"/>
      </Tabs>
      {value === 0 && <Moodle/>} 
      {value === 1 && <Portal/>} 
      </main>
      </Paper>
  )};
  
