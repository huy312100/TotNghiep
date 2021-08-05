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
                <ConnectSocket />
                <div className="col-12 home">
                    <div style={{
                        fontWeight: "500",
                        color: "#636363",
                        fontSize: "calc(12px + 1vw)",
                        borderRight: "1px solid #d6dce1",
                        paddingRight: "1vw",
                        marginBottom:"-15px",
                        paddingTop:"10px",
                    }}>Trang chủ</div>
                    <Home />
                    <NewsFac />
                    <CldAndDl />
                </div>
            </div>

        );
    }
}

export default Student;
