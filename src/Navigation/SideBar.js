import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import DateRangeIcon from '@material-ui/icons/DateRange';
import SchoolIcon from '@material-ui/icons/School';
import ForumIcon from '@material-ui/icons/Forum';
import EmailIcon from '@material-ui/icons/Email';
import Divider from '@material-ui/core/Divider';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import ClassIcon from '@material-ui/icons/Class';
import SubjectIcon from '@material-ui/icons/Subject';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
 export  const SideBar = (
  <div >
    <ListItem button >
      <ListItemIcon>
        <HomeIcon style={{ color: 'white' }}  />
      </ListItemIcon>
      <ListItemText  primary="Trang chủ" />
    </ListItem>
    <Divider light />
    <ListItem button>
      <ListItemIcon>
        <DateRangeIcon style={{ color: 'white' }} />
      </ListItemIcon>
      <ListItemText  primary="Sự kiện" />
    </ListItem>
    <Divider light />
    <ListItem button>
      <ListItemIcon>
        <SchoolIcon style={{ color: 'white' }} />
      </ListItemIcon>
      <ListItemText primary="Môn học" />
    </ListItem>
    <Divider light />
    <ListItem button>
      <ListItemIcon>
        <ForumIcon style={{ color: 'white' }} />
      </ListItemIcon>
      <ListItemText primary="Diễn đàn" />
    </ListItem>
    <Divider  light />
    <ListItem button>
      <ListItemIcon>
        <EmailIcon style={{ color: 'white' }} />
      </ListItemIcon>
      <ListItemText primary="Thư điện tử" />
    </ListItem>
    <Divider light />
    <ListItem button>
      <ListItemIcon>
        <CalendarTodayIcon style={{ color: 'white' }} />
      </ListItemIcon>
      <ListItemText primary="Lịch" />
    </ListItem>
    <Divider light />
    <ListItem button>
      <ListItemIcon>
        <ClassIcon style={{ color: 'white' }} />
      </ListItemIcon>
      <ListItemText primary="Lớp dạy" />
    </ListItem>
    <Divider light />
    <ListItem button>
      <ListItemIcon>
        <SubjectIcon style={{ color: 'white' }} />
      </ListItemIcon>
      <ListItemText primary="Tài liệu" />
    </ListItem>
    <Divider light />
    <ListItem button>
      <ListItemIcon>
        <QuestionAnswerIcon style={{ color: 'white' }} />
      </ListItemIcon>
      <ListItemText primary="Quiz" />
    </ListItem>
    <Divider light />
    <ListItem button>
      <ListItemIcon>
        <SchoolIcon style={{ color: 'white' }} />
      </ListItemIcon>
      <ListItemText primary="Thông tin trường" />
    </ListItem>
    <Divider light />
  </div>
);

