import React, { Component } from 'react';
import "../../../style/Student.css";
import Footer from '../../Footer';
import Navbar from './Navbar';

class Student extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: 0,
            users:[]
        }

    }

    


    renderCloseCollapse = () => (
        <div className="sidenav-content">
            <a href="#"><div className="nav-text"><img width="30vw" src={process.env.PUBLIC_URL + 'Icon/home.png'}></img><span className="sidenav-text">Trang chủ</span></div></a>
            <a href="#"><div className="nav-text"><img width="30vw" src={process.env.PUBLIC_URL + 'Icon/calendar.png'}></img><span className="sidenav-text">Lịch</span></div></a>
            <a href="#"><div className="nav-text"><img width="30vw" src={process.env.PUBLIC_URL + 'Icon/forum.png'}></img><span className="sidenav-text">Diễn đàn</span></div></a>
            <a href="#"><div className="nav-text"><img width="30vw" src={process.env.PUBLIC_URL + 'Icon/course.png'}></img><span className="sidenav-text">Khóa học</span></div></a>
        </div>
    )

    renderOpenCollapse = () => (
        <div className="sidenav-content">
            <a href="#"><div className="nav-text"><img width="30vw" src={process.env.PUBLIC_URL + 'Icon/home.png'}></img></div></a>
            <a href="#"><div className="nav-text"><img width="30vw" src={process.env.PUBLIC_URL + 'Icon/calendar.png'}></img></div></a>
            <a href="#"><div className="nav-text"><img width="30vw" src={process.env.PUBLIC_URL + 'Icon/forum.png'}></img></div></a>
            <a href="#"><div className="nav-text"><img width="30vw" src={process.env.PUBLIC_URL + 'Icon/course.png'}></img></div></a>
        </div>
    )

    collapseClick = () => {
        if (this.state.collapse === 0) {
            this.setState({ collapse: 1 })
        }
        else {
            this.setState({ collapse: 0 })
        }
    }

    collapseCheck = () => {
        if (this.state.collapse === 0) {
            return this.renderCloseCollapse();
        }
        else {
            return this.renderOpenCollapse();
        }
    }

    render() {
        var collapseClass = this.state.collapse ? 'sidenav-toggle' : 'sidenav';
        var mainClass = this.state.collapse ? 'main-toggle' : 'main';
        return (
            <div>
                <Navbar />
                {/* <!--Side bar--> */}
                {/* <div className={collapseClass}>
                    <div className="content-sidenav"> */}
                        {/* <div className="sidenav-content">
                        <a href="#"><img className="nav-text" width="30vw" src={process.env.PUBLIC_URL + 'Icon/collapse.png'} onClick={() => this.collapseClick()}></img></a> */}
                        {/* {this.collapseCheck()} */}
                        {/* </div> */}
                    {/* </div>
                </div> */}
                {/* <!-- Page Content --> */}
                {/* <div className={mainClass}>
                    <div style={{ flexFlow: "1" }}>
                        <div><table class="table" style={{ border: '1px solid black', marginTop: '40px' }}>
                            <thead>
                                <tr>
                                    <th class="table-info" style={{ textAlign: 'center' }}>Thông báo nhà trường</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><a href="#">Thông báo thời gian bắt đầu học môn Sinh đại cương 1</a></td>
                                </tr>
                                <tr>
                                    <td><a href="#">Thông báo nộp đơn xét Hoàn tất chương trình - đợt tháng 4/2021</a></td>
                                </tr>
                                <tr>
                                    <td><a href="#">Thông báo nghỉ học môn NM CNTT, lớp 20KDL1</a></td>
                                </tr>
                            </tbody>
                        </table>
                        </div>
                    </div>
                </div> */}
                <div>
                    {/* {this.renderUsers()} */}
                </div>
                <Footer />
            </div>

        );
    }
}

export default Student;
