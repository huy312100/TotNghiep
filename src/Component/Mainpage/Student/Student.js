import React, { Component } from 'react';
import ConnectSocket from '../../../hook/socket';
import Home from '../../../hook/student';
// import "../../../style/Student.css";
import "../../../style/Home.css";

// import Footer from '../../Footer';
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
                        marginBottom: "-15px",
                        paddingTop: "10px",
                    }}>Trang chủ</div>
                    <Home />
                    <NewsFac />
                    {/* <CldAndDl /> */}
                    <div className="news-page-uni">
                        <div className="header">Thông tin liên lạc</div>
                        {/* <div ><img className="col" src="https://www.hcmus.edu.vn/images/2020/04/07/bn2.jpg"></img></div> */}
                        <div style={{paddingTop:"10px"}}>Trường : Trường Đại học Khoa học Tự nhiên - ĐHQG TPHCM</div>
                        <div style={{paddingTop:"10px"}}>Email : bantin@hcmus.edu.vn</div>
                        <div style={{paddingTop:"10px"}}>SDT : 02838962823</div>
                        <div style={{paddingTop:"10px"}}>Địa chỉ : 227 Đường Nguyễn Văn Cừ, Phường 4, Quận 5, TP HCM</div>
                        <div style={{paddingTop:"10px"}}>Website : 
                            <a rel="noopener noreferrer" target="_blank" href="https://www.hcmus.edu.vn/"> https://www.hcmus.edu.vn/</a>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default Student;
