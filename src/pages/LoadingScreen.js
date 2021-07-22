import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography,CircularProgress} from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    display: 'flex',
    '& > * + *': {
        marginLeft: theme.spacing(2),
    },
    size:"100",
    justifyContent: "center", 
    alignItems: "center",
    marginTop: "300px"
  },

}));

export default function LoadingScreen() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress/>
      <Typography> Xin vui lòng đợi dữ liệu được tải xong </Typography>
    </div>
  );
}