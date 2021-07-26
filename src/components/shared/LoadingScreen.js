import {CircularProgress, Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

export default function LoadingScreen() {
  const classes = useStyles();

  return (
    <div
    style={{
      position: "absolute",
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%)"
    }}
  >
    <div className={classes.root}>
      <CircularProgress />
      <Typography> Vui lòng chờ tải xong dữ liệu </Typography>
    </div>
  </div>
  );
}