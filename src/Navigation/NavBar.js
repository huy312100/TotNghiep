
import React, {useState,useEffect} from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/Home';
import DateRangeIcon from '@material-ui/icons/DateRange';
import SchoolIcon from '@material-ui/icons/School';
import ForumIcon from '@material-ui/icons/Forum';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import Notifications from "react-notifications-menu";
import AlignItemsList from "./Message"
import AccountMenu from "./Account"
import AccountCircle from '@material-ui/icons/AccountCircle';
import MessageIcon from '@material-ui/icons/Message';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import logo from "../images/logo.jpg"
//import NotificationsIcon from '../images/notification.jpg';
import {useHistory} from "react-router-dom"
import {List,Toolbar,Typography,ListItem,ListItemIcon,IconButton,ListItemText,Menu,Badge,Hidden,Drawer,Divider,CssBaseline,AppBar} from "@material-ui/core"


const drawerWidth = 200;
const AppBarHeight = 60
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: "100%",
      marginLeft: 0,
      height: AppBarHeight
    },
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  toolbarButtons: {
    marginLeft: 'auto',
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  drawerPaper: {
    width: drawerWidth,
    marginTop: AppBarHeight,
    backgroundColor:"#e4edf5"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));
const StyledMenu = withStyles({
  paper: {
    border: '0.5px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

function NavBar() {
  let history = useHistory();
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userInfo, setUserInfo] = useState([{
    HoTen: "",
    AnhSV: "",
    Email: "",
    MaTruong: "",
    TenTruongDH: "",
    MaKhoa: "",
    TenKhoa: ""

  }])
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  


  const [anchorEl, setAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleMenuProfileOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuProfileClose = () => {
    setAnchorEl(null);
  };

  const [message_anchorEl, message_setAnchorEl] = React.useState(null);
  const isMessageOpen = Boolean(message_anchorEl);

  const handleMessageOpen = (event) => {
    message_setAnchorEl(event.currentTarget);
  };

  const handleMessageClose = () => {
    message_setAnchorEl(null);
  };

  const getInfoUser = async() => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "bearer " + localStorage.getItem("token") +"tC");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    await fetch("https://hcmusemu.herokuapp.com/profile/view", requestOptions)
        .then(response => {return response.json();})
        .then(result => {
         setUserInfo(result)
        })
        .catch(error => console.log('error', error));
    }
useEffect(() => {
  getInfoUser();
},[]);

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuProfileClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
      <AccountMenu/>
      </StyledMenu>
  );
  const messageMenu = (<StyledMenu
    id="customized-menu"
    anchorEl={message_anchorEl}
    keepMounted
    open={Boolean(message_anchorEl)}
    onClose={handleMessageClose}
    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
  >
    <AlignItemsList/>
    </StyledMenu>);
  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
      <ListItem button onClick={()=> history.push("/")} >
      <ListItemIcon>
        <HomeIcon style={{ color: 'dark' }}  />
      </ListItemIcon>
      <ListItemText  primary="Trang chủ" />
    </ListItem>
    <Divider light />
    <ListItem button onClick={()=> history.push("/news")}>
      <ListItemIcon>
        <DateRangeIcon style={{ color: 'dark' }} />
      </ListItemIcon>
      <ListItemText  primary="Tin tức" />
    </ListItem>
    <Divider light />
    <ListItem button  onClick={()=> history.push("/forum")}>
      <ListItemIcon>
        <ForumIcon style={{ color: 'dark' }} />
      </ListItemIcon>
      <ListItemText primary="Diễn đàn" />
    </ListItem>
    <Divider  light />
    <ListItem button onClick={()=> history.push("/chat")}>
      <ListItemIcon >
        <SchoolIcon style={{ color: 'dark' }}/>
      </ListItemIcon>
      <ListItemText primary="Chat" />
    </ListItem>
    <Divider light />
    <ListItem button onClick={()=> history.push("/calendar")}>
      <ListItemIcon>
        <CalendarTodayIcon style={{ color: 'dark' }} />
      </ListItemIcon>
      <ListItemText primary="Lịch" />
    </ListItem>
    <Divider light />
    <ListItem button onClick={()=> history.push("/contact")}>
      <ListItemIcon >
        <SchoolIcon style={{ color: 'dark' }}/>
      </ListItemIcon>
      <ListItemText primary="Thông tin trường" />
    </ListItem>
    <Divider light />
    
      </List>
      
    </div>
  );


  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography fontWeight="normal" variant="h4" noWrap style={{color: "#f5f5f5"}}>
            Hệ thống phục vụ học tập cho giảng viên
          </Typography>
          <div className={classes.grow} />
          <div className={classes.toolbarButtons}>
            <IconButton 
            edge="end"
            aria-label="message of current user"
            className = "message_btn"
            aria-haspopup="true"
            onClick={handleMessageOpen}
            color="inherit"
            >
              <Badge badgeContent={5} color="secondary">
                <MessageIcon />
              </Badge>
            </IconButton>
            <IconButton 
            color="inherit"
            edge="end"
            aria-label="notification of current user"
            className = "notifi_btn"
            aria-haspopup="true"
            >
              <Badge badgeContent={5} color="secondary">
                <NotificationsActiveIcon />
               
              </Badge>
            </IconButton>
          
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleMenuProfileOpen}
              color="inherit"
            >
             <Typography  variant="h6" adjustsfontsizetofit="true" component="span" color="inherit"> {userInfo[0].HoTen} </Typography>

              <AccountCircle />       
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {messageMenu}
      {renderMenu}
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
}

export default NavBar;
