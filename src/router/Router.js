import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Login from "../Component/Login/Login";
import Signup from "../Component/Login/Signup";
import Student from "../Component/Mainpage/Student/Student";
import Message from "../Component/Mainpage/Student/Message/Mess";
import Profile from '../Component/Mainpage/Student/Setting/EditProfile/Profile';
import SetURL from '../Component/Mainpage/Student/Setting/Config/SetURL';
import ChangePW from '../Component/Mainpage/Student/Setting/Config/ChangePW';
import Deadline from '../Component/Mainpage/Student/Sidebar/Deadline';
import Course from '../Component/Mainpage/Student/Sidebar/Course/Course';
import DetailCourse from '../Component/Mainpage/Student/Sidebar/Course/DetailCourse';
import Calendar from '../Component/Mainpage/Student/Sidebar/Calendar';
import ConnectSocket from '../hook/socket';
import Forum from '../Component/Mainpage/Student/Sidebar/Forum/Forum';
import ViewComment from '../Component/Mainpage/Student/Sidebar/Forum/ViewComment';
import Forgot from '../Component/Login/ForgotPW';
import Reset from '../Component/Login/ResetPW';
import Navbar from '../Component/Mainpage/Student/Navbar';
import Sidebar from '../Component/Mainpage/Student/Sidebar';
import { useSelector } from 'react-redux';
import ViewCourseCommemt from '../Component/Mainpage/Student/Sidebar/Forum/ViewCourseComment';
import ViewForumCourse from '../Component/Mainpage/Student/Sidebar/Forum/Courses/ViewForumCourse';
import checkTokenExpired from '../auth/auth';
import Logout from '../Component/Login/Logout';
import Parent from '../Component/Mainpage/Student/Setting/Config/Parent';





function RouterMD() {
    const open = useSelector(state => state.sidebar.open)
    const role = useSelector(state => state.authen.role)
    // localStorage.clear()

    return (
        <Router>


            {!checkTokenExpired() ? <ConnectSocket /> : null}

            <Route exect path="/" render={() => {
                // console.log(0)
                if (!localStorage.getItem("token"))
                    // return <Login />
                    return <Switch>
                        <Route path="/newpassword" >
                            <Reset />
                        </Route>
                        <Route path="/forgot" >
                            <Forgot />
                        </Route>
                        <Route path="/signup">
                            <Signup />
                        </Route>
                        <Route exect path="/" >
                            <Login />
                        </Route>
                    </Switch>
                else {
                    // if (role !== null)
                    return <div>
                        {/* {role === "1" || role === "2" ? <ConnectSocket /> : null} */}

                        <div>
                            <Navbar />
                            <Sidebar />
                        </div>
                        {role !== null && <div className="main" style={{ margin: `66px 0 20px ${open ? '260px' : '80px'}` }}>
                            <Switch>
                                <Route path="/newpassword" >
                                    <Reset />
                                </Route>
                                <Route path="/forgot" >
                                    <Forgot />
                                </Route>
                                {(role === "1" || role === "2") &&
                                    <Route exact path="/forum" >
                                        <Forum />
                                    </Route>}
                                {(role === "1" || role === "2") && <Route path="/forum/courses/post/:id" children={<ViewCourseCommemt />} />
                                }
                                {(role === "1" || role === "2") && <Route path="/forum/courses/:id" children={<ViewForumCourse />} />
                                }
                                {(role === "1" || role === "2") && <Route path="/forum/post/:id" children={<ViewComment />} />
                                }
                                {(role === "1" || role === "2") && <Route path="/calendar">
                                    <Calendar />

                                </Route>}
                                <Route path="/course/:id" component={DetailCourse} />
                                <Route path="/course">
                                    <Course />
                                </Route>
                                <Route path="/deadline" component={Deadline} />

                                <Route path="/profile">
                                    <Profile />
                                </Route>
                                <Route path="/home">
                                    <Student />
                                </Route>
                                {(role === "1" || role === "2") && <Route path="/message">
                                    <Message />
                                </Route>}
                                {(role === "1" || role === "2") && <Route path="/setting">
                                    <SetURL />
                                </Route>}
                                <Route path="/changepw">
                                    <ChangePW />
                                </Route>
                                <Route path="/parent">
                                    <Parent />
                                </Route>
                                <Route path="/logout">
                                    <Logout />
                                </Route>
                                <Route exect path="/" >
                                    <Student />
                                </Route>

                            </Switch>
                        </div>}
                    </div>
                    // <ConnectSocket/>
                    // <Student />
                }
            }}>
            </Route>



        </Router>
    );

}

export default RouterMD;