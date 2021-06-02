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
            calendar: [],
            event: [],

            listEvent: [],
            selectedDay: 0,

            loadcalendar: 1,
            loadevent: 1,


            add_fulldate: "2021 6 1",
            add_title: "Test 3",
            add_year: 2021,
            add_month: 1,
            add_day: 1,
            add_start: "23",
            add_startUNIX: 1621407600,
            add_end: "24",
            add_endUNIX: 1621422000,
            add_desc: "Nothing",
            add_color: "#fff",
            add_noti: 1621406700,

            popup: 0
        }
    }
    convertTimestamp = (timestamp) => {
        var d = new Date(timestamp * 1000),	// Convert the passed timestamp to milliseconds
            hh = d.getHours(),
            h = hh,
            min = ('0' + d.getMinutes()).slice(-2),		// Add leading 0.
            ampm = 'AM',
            time;

        if (hh > 12) {
            h = hh - 12;
            ampm = 'PM';
        } else if (hh === 12) {
            h = 12;
            ampm = 'PM';
        } else if (hh == 0) {
            h = 12;
        }

        // ie: 2013-02-18, 8:35 AM	
        time = h + ':' + min + ' ' + ampm;

        return time;
    }

    convertTime = (UNIX_timestamp) => {
        var a = new Date(UNIX_timestamp * 1000);
        var date = a.getDate();
        return date;
    }

    filterCalendar = () => {
        this.setState({
            loadevent: 1
        })
        let temp = Array.from({ length: 31 }, () => "");
        let listevent = Array.from({ length: 31 }, () => [""]);

        // console.log(this.state.calendar)
        this.state.calendar.forEach((value, index) => {

            if (value.duedate !== undefined) {
                // console.log(this.convertTime(value.duedate))
                let newevent;
                newevent = {
                    title: value.decription,
                    time: this.convertTimestamp(value.duedate),
                    id: ""
                }
                temp[this.convertTime(value.duedate)] = "moodle";
                if (listevent[this.convertTime(value.duedate)][0] === "") {
                    listevent[this.convertTime(value.duedate)][0] = newevent;
                }
                else {
                    listevent[this.convertTime(value.duedate)].push(newevent);
                }

            }

            if (value.Date !== undefined) {
                // console.log(value.Date.day)
                let newevent;
                newevent = {
                    title: value.Decription.text,
                    time: this.convertTimestamp(value.StartHour),
                    id: value._id
                }
                temp[value.Date.day] = "custom";
                if (listevent[value.Date.day][0] === "") {
                    listevent[value.Date.day][0] = newevent;
                }
                else {
                    listevent[value.Date.day].push(newevent);
                }
            }
        });
        // console.log(listevent[19].time)
        this.setState({
            event: temp,
            listEvent: listevent,
            loadevent: 0
        })
        // console.log("final",listevent)


    }



    convertAddingDate = () => {
        var fullday = new Date(this.state.add_fulldate);
        this.setState({
            add_day: fullday.getDate(),
            add_month: fullday.getMonth() + 1,
            add_year: fullday.getFullYear(),
            add_startUNIX: this.toTimestamp(this.state.add_fulldate + " " + this.state.add_start + ":00:00"),
            add_endUNIX: this.toTimestamp(this.state.add_fulldate + " " + this.state.add_end + ":00:00")
        })
    }

    async componentDidMount() {
        // console.log(new Date(this.state.add_fulldate + " " + this.state.add_start + ":00:00").getHours())
        await this.getCurrenDate();
        this.getCalendar();
    }

    removeEvent = (id) => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "bearer "+localStorage.getItem("token"));
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        // console.log("event key",event.target.key)
        var urlencoded = new URLSearchParams();
        urlencoded.append("id", id);

        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch("https://hcmusemu.herokuapp.com/calendar/delete", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }

    selectedDay = () => {
        if (this.state.loadcalendar === 0 && this.state.loadevent === 0) {
            // console.log("test",this.state.listEvent[13].time)
            var listE = this.state.listEvent[this.state.selectedDay].map((item) => {
                console.log(item);
                var remove = item.id === "" ? <></> : <i className="fa fa-trash" ></i>;
                return <tr>
                    <td className="time">{item.time}</td>
                    <td>{item === "" ? "" : "-"}</td>
                    <td>{item.title}</td>
                    <td type="button" onClick={() => this.removeEvent(item.id)}>{remove}</td>
                </tr>
            })
            return listE;
        }

    }

    getCalendar = () => {
        this.setState({
            loadcalendar: 1
        })
        var myHeaders = new Headers();
        // console.log(this.state.month)
        myHeaders.append("Authorization", "bearer " + localStorage.getItem("token"));
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
                // console.log(result)
                this.setState({
                    calendar: result
                })
            })
            .then(success => {
                // console.log("success")
                this.filterCalendar();
                this.setState({
                    loadcalendar: 0
                })
            })
            .catch(error => console.log('error', error));
    }

    // addEvent = () => {
    //     var myHeaders = new Headers();
    //     myHeaders.append("Authorization", "bearer " + localStorage.getItem("token"));
    //     myHeaders.append("Content-Type", "application/json");

    //     var raw = JSON.stringify({
    //         "Title": "None",
    //         "TypeEvent": "Công việc",
    //         "year": "2021",
    //         "month": "5",
    //         "day": "15",
    //         "StartHour": 1621407600,
    //         "EndHour": 1621422000,
    //         "desciptionText": "Mini test",
    //         "url": "https://www.google.com/",
    //         "UnderLine": false,
    //         "Italic": false,
    //         "Bold": false,
    //         "Color": "",
    //         "listguestEmail": [],
    //         "listguestName": [],
    //         "Notification": 1621406700
    //     });

    //     var requestOptions = {
    //         method: 'POST',
    //         headers: myHeaders,
    //         body: raw,
    //         redirect: 'follow'
    //     };

    //     fetch("https://hcmusemu.herokuapp.com/calendar/post", requestOptions)
    //         .then(response => response.text())
    //         .then(result => console.log(result))
    //         .catch(error => console.log('error', error));
    // }

    getCurrenDate = () => {
        var today = new Date();

        this.setState({
            month: today.getMonth() + 1,
            year: today.getFullYear()
        })
    }

    setSelecteday = async (value) => {
        await this.setState({
            loadevent: 1
        })
        // console.log(value)
        this.setState({
            selectedDay: value
        })
        this.filterCalendar()
    }

    renderCalendar = () => {
        if (this.state.loadcalendar === 0) {
            let daysofmonth = new Date(2021, this.state.month, 0).getDate();
            let ascen = Array.from({ length: daysofmonth }, (_, i) => i + 1);
            let dow = this.getDayOfWeek()
            let temp = Array.from({ length: dow }, () => "");
            var numbers = temp.concat(ascen)
            const listItems = numbers.map((number) => {
                if (this.state.event[number] === "moodle") {
                    return <li type="button" value={number} onClick={(e) => this.setSelecteday(e.currentTarget.value)}><span className="moodle">{number}</span></li>
                }
                if (this.state.event[number] === "custom") {
                    return <li type="button" value={number} onClick={(e) => this.setSelecteday(e.currentTarget.value)}><span className="custom">{number}</span></li>
                }
                return <li type="button" value={number} onClick={(e) => this.setSelecteday(e.currentTarget.value)}>{number}</li>
            }
            );
            return listItems;
        }
    }

    getDayOfWeek = () => {
        var now = new Date(2021, this.state.month - 1, 1, 0, 0, 0);

        var days = [6, 0, 1, 2, 3, 4, 5];

        var day = days[now.getDay()];
        // var month = months[now.getMonth()];

        // new Date(2020, 2, 0).getDate()
        // this.getDayOfWeek()

        return day;
    }

    changeMonth = async (i) => {
        var month = this.state.month += i;
        if (month > 12) { month = 1 }
        if (month < 1) { month = 12 }
        await this.setState({
            month: month,
            selectedDay: 0
        })

        this.getCalendar();
    }

    renderSchedule = () => {
        // console.log(this.state.selectedDay)
        if (this.state.selectedDay === 0) {
            return <div className="schedule" >
            </div>
        }
        else {
            return <div className="schedule" >
                <div className="date">{this.state.selectedDay + "/" + this.state.month + "/" + this.state.year}</div>
                <div className="event" id="style-3">
                    <table>
                        {this.selectedDay()}

                    </table>
                </div>
            </div>
        }

    }

    addEvent = async () => {
        await this.convertAddingDate();
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "bearer " + localStorage.getItem("token"));
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "Title": this.state.add_title,
            "TypeEvent": "Công việc",
            "year": this.state.add_year,
            "month": this.state.add_month,
            "day": this.state.add_day,
            "StartHour": this.state.add_startUNIX,
            "EndHour": this.state.add_endUNIX,
            "desciptionText": this.state.add_desc,
            "url": "https://www.google.com/",
            "UnderLine": false,
            "Italic": false,
            "Bold": false,
            "Color": this.state.add_color,
            "listguestEmail": [],
            "listguestName": [],
            "Notification": this.state.add_noti
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://hcmusemu.herokuapp.com/calendar/post", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }

    setParams = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    popupAddEvent = () => {
        if (this.state.popup === 1) {
            return (
                <div className="popup-event">
                    <input placeholder="Thêm tiêu đề" onChange={this.setParams} name="add_title" value={this.state.add_title}></input>
                    <div className="event">
                        <label>Thời gian</label>
                        <input onChange={this.setParams} name="add_fulldate" value={this.state.add_fulldate}></input>
                        <input placeholder="Bắt đầu" onChange={this.setParams} name="add_start" value={this.state.add_start}></input>
                        <input placeholder="Kết thúc" onChange={this.setParams} name="add_end" value={this.state.add_end}></input>
                    </div>
                    <div>
                        <label>Nội dung</label>
                        <input onChange={this.setParams} name="add_desc" value={this.state.add_desc}></input>
                    </div>
                    <div>
                        <label>Màu</label>
                        <input onChange={this.setParams} name="add_color" value={this.state.add_color}></input>
                    </div>
                    <div>
                        <label>Thời gian thông báo</label>
                        <input onChange={this.setParams} name="add_noti" value={this.state.add_noti}></input>
                    </div>
                    <div type="button" onClick={this.addEvent}>Thêm thông báo</div>
                    <div type="button" onClick={this.closePopup}>Hủy</div>
                </div>
            )
        }
    }

    closePopup = () => {
        this.setState({
            popup: 0
        })
    }

    openPopup = () => {
        this.setState({
            popup: 1
        })
    }

    toTimestamp = (strDate) => {
        var datum = Date.parse(strDate);
        return datum / 1000;
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
                        <ul className="days">
                            {this.renderCalendar()}
                        </ul>
                        {this.popupAddEvent()}

                    </div>
                    {this.renderSchedule()}
                </div>
                <div>
                    <div className="calendar-button">
                        <div type="button" className="btn" onClick={this.openPopup}>Thêm sự kiện</div><div type="button" className="btn">Xóa sự kiện</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Calendar;