import React, { useState } from "react";
import NavBar from "../Navigation/NavBar"
import {
  Grid,
  Paper,
  Typography,
  createMuiTheme,
  MuiThemeProvider,
  makeStyles,
  TextField,
  Button,
  Toolbar 
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

let theme = createMuiTheme();
theme.typography.h6 = {
  fontSize: "1rem",
  "@media (min-width:900px)": {
    fontSize: "1.05rem"
  },
  "@media (min-width:1000px)": {
    fontSize: "1.1rem"
  },
  "@media (min-width:1200px)": {
    fontSize: "1.2rem"
  },
  "@media (min-width:1300px)": {
    fontSize: "1.25rem"
  }
};

// dummy data
const data = {
  Name: "Trường Đại học Khoa học Tự nhiên - Đại học Quốc gia TPHCM",
  Website: "https://www.hcmus.edu.vn",
  Facebook: "https://www.facebook.com/us.vnuhcm/",
  Phone: "(84.8)38 353 193 - (028) 38 962 823",
  Address: "227 Đ. Nguyễn Văn Cừ, Phường 4, Quận 5, Thành phố Hồ Chí Minh",
  Email: "bantin@hcmus.edu.vn"
};

const mapInformation = {
  Name:"Trường",
  Website: "Địa chỉ web",
  Facebook: "Fanpage",
  Phone: "Điện thoại",
  Address: "Địa chỉ",
  Email: "Hộp thư"
};

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: "#594f8d",
    color: "white",
    padding: "0.5em",
    width: "80%",
    [theme.breakpoints.down(1200)]: {
      width: "70%"
    },
    [theme.breakpoints.down(1000)]: {
      width: "80%"
    },
    [theme.breakpoints.down(900)]: {
      width: "90%"
    },
    [theme.breakpoints.down(800)]: {
      width: "100%"
    }
  },
  form: {
    backgroundColor: "white",
    color: "#594f8d ",
    padding: "1em",
    width: "60%",
    [theme.breakpoints.down(1200)]: {
      width: "70%"
    },
    [theme.breakpoints.down(1000)]: {
      width: "80%"
    },
    [theme.breakpoints.down(900)]: {
      width: "90%"
    },
    [theme.breakpoints.down(800)]: {
      width: "100%"
    }
  },
  floatingMenu:{
      clear:"both",
      position:"fixed",
      width:"85%",
      backgroundColor:"#78AB46",
      top:"5px",
    },
    root:{
        marginLeft: "200px"
    }

}));


const DataInfoGridItem = (formState,propt, index) => {
  const classes = useStyles();
  return (
    <Grid
      item
      xs={6}
      key={`display-${index}`}
      container
      direction="column"
      alignItems="center"
     
    >
      <Paper className={classes.paper}>
        <Grid item xs={12}>
          <Typography variant="subtitle1">{mapInformation[propt]}</Typography>
        </Grid>
        <Grid item xs={12} align="normal">
            <Typography variant="h6">{formState[propt]}</Typography>
        </Grid>
      </Paper>
    </Grid>
  );
};


export default function UniversityInfo() {
 const [formInput, setFormInput] = useState(data);
  const classes = useStyles()
  const toggleRender = () => {
    return Object.keys(data).map((key, index) =>
      DataInfoGridItem(formInput,key, index)
    );
  };
  return (
    <div className={classes.root}>
    <NavBar className = {classes.floatingMenu}/>
    <Toolbar /> 
      <MuiThemeProvider theme={theme}>
        <Grid container spacing={2}>
          <Grid item xs={12} container spacing={2}>
            <Grid item sm={6} md={12} align="center">
                <Paper 
                circle= "true"
                style={{ border: "2px solid", height: "200px", width: "200px", borderRadius:'50%' }}
          >
              <img src = "" alt=""  style={{width:'100%', height:'100%',borderRadius:'50%'}} ></img>
        </Paper>
        <Typography variant="h4">{`${data.Name}`}</Typography>
            </Grid>
          </Grid>
          {toggleRender()}
        </Grid>
      </MuiThemeProvider>
    </div>
  );
}
