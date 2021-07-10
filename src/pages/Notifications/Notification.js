import React from 'react';
import NavBar from '../../Navigation/NavBar'
import {makeStyles, Toolbar,Typography} from "@material-ui/core"
const border = 200;
const useStyles = makeStyles((theme)=>({
  root: {
    marginLeft: `${border}`,
    display: "flex",
    width: `100%-${border}`,
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
}));

function Notifications() {
    const classes = useStyles();
    return (
      <div className = {classes.root}> 
          <NavBar/>
          <main className={classes.content}>
              <div className={classes.toolbar} />
              <Typography > Test</Typography>
          </main>
      </div>
    );
  }
  
  export default Notifications;