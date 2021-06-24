import React, { Component } from 'react';
import ConnectSocket from '../../../hook/socket';
import "../../../style/Student.css";
// import Footer from '../../Footer';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

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
            </div>

        );
    }
}

export default Student;
