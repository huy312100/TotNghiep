import React, { Component } from 'react';
import "../../../style/Student.css";
import Footer from '../../Footer';
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
               <Sidebar/>
                {/* <Footer /> */}
            </div>

        );
    }
}

export default Student;
