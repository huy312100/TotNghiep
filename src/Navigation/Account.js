import React from 'react';

import HomeIcon from '@material-ui/icons/Home';
import {withStyles } from '@material-ui/core/styles';
import PersonOutlineRoundedIcon from '@material-ui/icons/PersonOutlineRounded';
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {ListItemText,MenuItem,List} from '@material-ui/core'
import MessageIcon from '@material-ui/icons/Message';
import {useHistory } from 'react-router-dom';

const StyledMenuItem = withStyles((theme) => ({
    root: {
      '&:focus': {
        backgroundColor: theme.palette.primary.light,
        '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
          color: theme.palette.common.white,
        },
      },
    },
  }))(MenuItem);
  export default function AccountMenu() {  
    let history = useHistory();
    let logout = () => {
        localStorage.removeItem("token");
        history.replace("/");
    }
    return (
      <List className= "Account_btn">
        <StyledMenuItem onClick={()=> history.push("/profile")}>
          <PersonOutlineRoundedIcon style={{minWidth: '40px'}}/>
          <ListItemText primary="Hồ sơ cá nhân" />
        </StyledMenuItem>
        <StyledMenuItem onClick={()=> history.push("/connection")}>
          <MessageIcon style={{minWidth: '40px'}}/>
          <ListItemText primary="Thiết lập kết nối" />
        </StyledMenuItem>
        <StyledMenuItem>
          <HelpOutlineOutlinedIcon style={{minWidth: '40px'}}/>
          <ListItemText primary="Trợ giúp" />
        </StyledMenuItem>
        <StyledMenuItem>
          <SettingsIcon style={{minWidth: '40px'}}/>
          <ListItemText primary="Cài đặt" />
        </StyledMenuItem>
        <StyledMenuItem  onClick = {logout}>
          <ExitToAppIcon style={{minWidth: '40px'}}/>
          <ListItemText primary="Thoát"  />
        </StyledMenuItem>
      </List>
      
);}
