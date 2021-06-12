import React, { Component } from 'react';
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
               <Sidebar/>
               {/* <img src="https://studenthcmusedu-my.sharepoint.com/personal/1753041_student_hcmus_edu_vn/Documents/73691.jpg"/> */}
                {/* <Footer /> */}
            </div>

        );
    }
}

export default Student;
