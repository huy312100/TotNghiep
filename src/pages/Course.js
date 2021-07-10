import react from "react"
import NavBar from "../Navigation/NavBar"
import { Toolbar, Typography } from "@material-ui/core"
import { makeStyles, withStyles } from "@material-ui/core"
const useStyles = makeStyles((theme) =>({
    root: {
        marginLeft: "200px",
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
export default function  Course(){{
    const classes = useStyles();
    return (
        <div className= {classes.root}>
            <NavBar/>
            <main className={classes.content}>
            <div className={classes.toolbar} />
            <Typography> Course </Typography>
            </main>
        </div>
    )
}}