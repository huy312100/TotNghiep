import React, { Component} from 'react';
import {
    BrowserRouter,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import LogIn from '../pages/Authen/Login';
import Profile from "../pages/UserProfile";
import SignUp from "../pages/Authen/Signup"
import UniversityInfo from "../pages/UniversityInfo"
import News from "../pages/News/News"
import Homepage from "../pages/Homepage/Homepage"
import CalendarSchedule from '../pages/Calendar/Calendar';
import Forum from '../pages/Forum/Forum';
import DetailCourse from '../pages/Courses/DetailCourse';
import Chat from "../pages/Chat/Chat"
import SetupURL from '../pages/SetupBox/SetupURL';
import Forgot from "../pages/Authen/ForgotPW"
import Reset from "../pages/Authen/ResetPW"
import Score from "../pages/Scores/Score"
import Courses from '../pages/Courses/Courses';
import {CssBaseline } from "@material-ui/core";
import Notifications from '../pages/Notifications/Notifications';
//import checkTokenExpired from '../ValidAccess/AuthToken';
//import ConnectSocket from '../Hooks/socket';
class ReactRouter extends Component {
  render() {
      return (
        <BrowserRouter>
         {/*!checkTokenExpired() ? <ConnectSocket /> : null*/}
        <Route
        
              exact
              path="/"
              render={() =>
                localStorage.getItem("token") === null ? (
                  <Redirect to= "/login"/>
                ) : (
                  <Redirect to="/homepage" />
                )
              }
        />
        <Route exact path = "/login"> <LogIn/></Route>
        <CssBaseline />
          <Switch>
            <Route exact path = "/homepage"> <Homepage/> </Route>
            <Route exact path="/profile">  <Profile/> </Route> 
            <Route exact path="/signup"> <SignUp/> </Route>
            <Route exact path = "/contact" > <UniversityInfo/> </Route>
            <Route exact path = "/news" > <News/> /</Route>
            <Route exact path = "/calendar"> <CalendarSchedule/></Route>
            <Route exact path = "/forum"> <Forum/></Route>
            <Route exact path = "/chat"> <Chat/> </Route>
            <Route exact path = "/connection"><SetupURL/></Route>
            <Route exact path = "/changepassword"><Reset/></Route>
            <Route exact path = "/resetpassword"><Forgot/></Route>
            <Route exact path = "/score"> <Score/></Route>
            <Route exact path = "/course"><Courses/></Route>
            <Route exact path = "/course/:id" component={DetailCourse}/>
            <Route exact path = "/notifications"><Notifications/></Route>
          </Switch>
    </BrowserRouter>
    
       )
}
}
export default ReactRouter;