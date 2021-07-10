import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import LogIn from "../../pages/Authen/Login";
import Main from "../../pages/Main"

function  RouterMD() {
        return (
            <Router>
                <div>
                    <Switch>
                    <Route path="/">
                            <LogIn/>
                        </Route>
                    </Switch>
                    <Route path="/homepage">
                            <Main />
                    </Route>
                </div>
            </Router>
        );
}

export default RouterMD;