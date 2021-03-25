import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import Login from "../Component/Login/Login";
import Student from "../Component/Mainpage/Student/Student";

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
                        <Route exact path="/">
                            <Login />
                        </Route>
                        <Route path="/home">
                            <Student />
                        </Route>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default RouterMD;