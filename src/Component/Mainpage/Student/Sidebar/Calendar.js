import React, { Component } from 'react';
import "../../../../style/Calendar.css";
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';

class Calendar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            month: 1,
            year: 2021,
            calendar:[]
        }
    }

    componentDidMount() {
        this.getCurrenDate();

        var myHeaders = new Headers();
        myHeaders.append("Authorization", "bearer "+localStorage.getItem("token"));
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("year", this.state.year);
        urlencoded.append("month", this.state.month);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch("https://hcmusemu.herokuapp.com/calendar/getthismonth", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                this.setState({
                    calendar:[]
                })
            })
            .catch(error => console.log('error', error));
    }

    getCurrenDate = () => {
        var today = new Date();

        this.setState({
            month: today.getMonth() + 1,
            year: today.getFullYear()
        })
    }

    renderCalendar = () => {
        let daysofmonth = new Date(2021, 5, 0).getDate();
        let ascen = Array.from({ length: daysofmonth }, (_, i) => i + 1);
        let dow = this.getDayOfWeek()
        let temp = Array.from({ length: dow }, () => "");
        var numbers = temp.concat(ascen)
        const listItems = numbers.map((number) =>
            <li>{number}</li>
        );
        return listItems;
    }

    getDayOfWeek = () => {
        var now = new Date(2021, 4, 1, 0, 0, 0);

        var days = [6, 0, 1, 2, 3, 4, 5];

        var day = days[now.getDay()];
        // var month = months[now.getMonth()];

        // new Date(2020, 2, 0).getDate()
        // this.getDayOfWeek()

        return day;
    }

    changeMonth = (i) => {
        var month = this.state.month += i;
        if (month > 12) { month = 1 }
        if (month < 1) { month = 12 }
        this.setState({
            month: month
        })
    }

    render() {
        return (
            <div>
                <Navbar />
                <Sidebar />
                <div className="calendar-page">
                    <div className="calendar">
                        <div className="title">LỊCH CÁ NHÂN</div>
                        <div className="picker">
                            <div onClick={(i) => this.changeMonth(-1)}><i width="20vw" className="fa fa-angle-left fa-lg fa-fw" aria-hidden="true"></i></div>
                            <div>THÁNG {this.state.month}</div>
                            <div onClick={(i) => this.changeMonth(1)}><i width="20vw" className="fa fa-angle-right fa-lg fa-fw" aria-hidden="true"></i></div>
                        </div>
                        <hr />
                        <ul className="dayofweek">
                            <li>H</li>
                            <li>B</li>
                            <li>T</li>
                            <li>N</li>
                            <li>S</li>
                            <li>B</li>
                            <li>C</li>
                        </ul>
                        <ul class="days">
                            {this.renderCalendar()}
                        </ul>
                    </div>
                    <div className="schedule" >
                        <div className="date">{"28/5/2021"}</div>
                        {/* <ul className="event">
                            <li><div className="time">10 AM </div><div>-</div><div> Hoàn thành bài tập</div></li>
                            <li><div className="time">11 AM </div><div>-</div><div> Nộp bài tập</div></li>
                        </ul> */}
                        <div className="event" id="style-3">
                            <table>
                                <colgroup>
                                    {/* <col style={{ width: "20%" }} />
                                <col style={{ width: "5%" }} />
                                <col style={{ width: "75%" }} /> */}
                                </colgroup>
                                <tr>
                                    <td className="time">10 AM</td>
                                    <td>-</td>
                                    <td>Hoàn thành bài tập Hoàn thành bài tập Hoàn thành bài tập Hoàn thành bài tập Hoàn thành bài tập</td>
                                </tr>
                                <tr>
                                    <td>11 AM</td>
                                    <td>-</td>
                                    <td>Nộp bài tập</td>
                                </tr>
                                <tr>
                                    <td className="time">10 AM</td>
                                    <td>-</td>
                                    <td>Hoàn thành bài tập Hoàn thành bài tập Hoàn thành bài tập Hoàn thành bài tập Hoàn thành bài tập</td>
                                </tr>
                                <tr>
                                    <td className="time">10 AM</td>
                                    <td>-</td>
                                    <td>Hoàn thành bài tập Hoàn thành bài tập Hoàn thành bài tập Hoàn thành bài tập Hoàn thành bài tập</td>
                                </tr>
                                <tr>
                                    <td className="time">10 AM</td>
                                    <td>-</td>
                                    <td>Hoàn thành bài tập Hoàn thành bài tập Hoàn thành bài tập Hoàn thành bài tập Hoàn thành bài tập</td>
                                </tr>
                                <tr>
                                    <td className="time">10 AM</td>
                                    <td>-</td>
                                    <td>Hoàn thành bài tập Hoàn thành bài tập Hoàn thành bài tập Hoàn thành bài tập Hoàn thành bài tập</td>
                                </tr>
                                <tr>
                                    <td className="time">10 AM</td>
                                    <td>-</td>
                                    <td>Hoàn thành bài tập Hoàn thành bài tập Hoàn thành bài tập Hoàn thành bài tập Hoàn thành bài tập</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Calendar;