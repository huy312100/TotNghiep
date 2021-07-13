import React, { Component } from 'react';
import ConnectSocket from '../../../hook/socket';
import Home from '../../../hook/student';
// import "../../../style/Student.css";
import "../../../style/Home.css";

// import Footer from '../../Footer';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import NewsFac from '../../../hook/home/NewsFac';
import CldAndDl from '../../../hook/home/CalendarAndDeadline';

class Student extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }

    }

    render() {
        return (
            <div>
                <Navbar />
                <Sidebar />
                <ConnectSocket />
                <div className="home">
                    <Home />
                    <NewsFac/>
                    <CldAndDl/>
                </div>
            </div>

        );
    }
}

export default Student;
