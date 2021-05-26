import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Login from "../Component/Login/Login";
import Signup from "../Component/Login/Signup";
import Student from "../Component/Mainpage/Student/Student";
import Message from "../Component/Mainpage/Student/Message/Message";
import Profile from '../Component/Mainpage/Student/Setting/EditProfile/Profile';
import SetURL from '../Component/Mainpage/Student/Setting/Config/SetURL';
import ChangePW from '../Component/Mainpage/Student/Setting/Config/ChangePW';
import Deadline from '../Component/Mainpage/Student/Sidebar/Deadline';
import Course from '../Component/Mainpage/Student/Sidebar/Course/Course';
import DetailCourse from '../Component/Mainpage/Student/Sidebar/Course/DetailCourse';
import Calendar from '../Component/Mainpage/Student/Sidebar/Calendar';


class RouterMD extends Component {
    render() {
        return (
            <Router>
                <div>
                    {/* <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/home">About</Link>
                        </li>
                        <li>
                            <Link to="/dashboard">Dashboard</Link>
                        </li>
                    </ul> */}


                    <Switch>
                        <Route path="/calendar">
                            <Calendar />
                        </Route>
                        <Route path="/course/:id" component={DetailCourse} />
                        <Route path="/course">
                            <Course />
                        </Route>
                        <Route path="/deadline">
                            <Deadline />
                        </Route>
                        <Route path="/profile">
                            <Profile />
                        </Route>
                        <Route path="/signup">
                            <Signup />
                        </Route>
                        <Route path="/home">
                            <Student />
                        </Route>
                        <Route path="/message">
                            <Message />
                        </Route>
                        <Route path="/setting">
                            <SetURL />
                        </Route>
                        <Route path="/changepw">
                            <ChangePW />
                        </Route>
                        <Route exect path="/" render={() => {
                            return localStorage.getItem("token") ? <Student /> : <Login />
                        }}>
                        </Route>

                    </Switch>
                </div>
            </Router>
        );
    }
}

export default RouterMD;