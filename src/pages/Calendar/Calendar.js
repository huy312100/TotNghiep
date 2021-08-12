import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import { registerLocale } from "react-datepicker";
import vi from 'date-fns/locale/vi';
import "./Calendar.css";
import NavBar from '../../Navigation/NavBar';
import "react-datepicker/dist/react-datepicker.css";
import { CirclePicker } from 'react-color';
import {makeStyles} from "@material-ui/core"
import clsx from 'clsx';
import 'font-awesome/css/font-awesome.min.css';
import {Button,TextField,Input } from "@material-ui/core"
import 'date-fns'
import TitleIcon from '@material-ui/icons/Title';

import TimelapseIcon from '@material-ui/icons/Timelapse';
import DescriptionIcon from '@material-ui/icons/Description';
import CategoryIcon from '@material-ui/icons/Category';
import LinkIcon from '@material-ui/icons/Link';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import LoadingScreen from '../../components/shared/LoadingScreen';
const useStyles = makeStyles(() => ({
  "calendar_page": {
    "width": "81vw",
    "margin": "66px 17vw",
    "display": "flex",
    "background": "white",
    "padding": "10px",
    "justifyContent": "space-between"
  },
  "calendar_page__calendar": {
    "width": "50vw"
  },
  "calendar_page__calendar__title": {
    "fontSize": "20px",
    "fontWeight": "700",
    "color": "#18468b",
    "padding": "5px"
  },
  "calendar_page_ul": {
    "listStyleType": "none",
    "padding": "0"
  },
  "calendar_page__calendar__picker": {
    "display": "flex",
    "justifyContent": "space-around",
    "color": "#18468b",
    "fontWeight": "500",
    "padding": "5px",
    "fontSize": "18px"
  },
  "calendar_page__calendar__picker_i": {
    "fontWeight": "1000"
  },
  "calendar_page__calendar_hr": {
    "padding": "0",
    "margin": "2px"
  },
  "calendar_page__dayofweek": {
    "margin": "0",
    "padding": "10px 0"
  },
  "calendar_page__dayofweek_li": {
    "display": "inline-block",
    "width": "7vw",
    "textAlign": "center",
    "fontWeight": "500"
  },
  "calendar_page__days_li": {
    "display": "inline-block",
    "width": "7vw",
    "margin": "10px 0",
    "fontSize": "12px",
    "textAlign": "center"
  },
  "days_li__color_event": {
    "width": "3vw",
    "height": "3vw",
    "lineHeight": "3vw",
    "borderRadius": "50%",
    "textAlign": "center",
    "margin": "auto",
    "fontSize": "15px"
  },
  "days": {
    "padding": "10px 0",
    "margin": "0"
  },
  "calendar_page__schedule": {
    "width": "28vw",
    "background": "#3a7cdf",
    "color": "white",
    "borderRadius": "10px",
    "padding": "10px"
  },
  "calendar_page__schedule__date": {
    "fontSize": "16px",
    "fontWeight": "500",
    "margin": "10px 5px",
    "background": "white",
    "color": "rgb(97, 97, 97)",
    "padding": "2px 5px",
    "width": "22vw"
  },
  "calendar_page__schedule__event": {
    "maxHeight": "55vh"
  },
  "calendar_page__schedule_td": {
    "padding": "5px",
    "verticalAlign": "top"
  },
  "calendar_page__schedule__time": {
    "whiteSpace": "nowrap",
    "fontSize": "18px",
    "fontWeight": "600"
  },
  "style_3___webkit_scrollbar_track": {
    "WebkitBoxShadow": "inset 0 0 6px rgba(0, 0, 0, 0.3)",
    "boxShadow": "inset 0 0 6px rgba(0, 0, 0, 0.1)",
    "backgroundColor": "#F5F5F5"
  },
  "style_3___webkit_scrollbar": {
    "width": "6px",
    "backgroundColor": "#F5F5F5"
  },
  "style_3___webkit_scrollbar_thumb": {
    "backgroundColor": "#000000"
  },
  "calendar_button": {
    "display": "flex",
    "justifyContent": "space-between"
  },
  "calendar_button__btn_add": {
    "color": "rgb(44, 44, 44)",
    "height": "3vw",
    "background": "#ffffff",
    "width": "3vw",
    "lineHeight": "3vw",
    "borderRadius": "50%",
    "textAlign": "center",
    "margin": "auto 0",
    "fontSize": "20px"
  },
  "calendar_button__btn_add_hover": {
    "background": "#eef1f5"
  },
  "calendar_page__popup_event": {
    "position": "fixed",
    "width": "35vw",
    "height": "70vh",
    "top": "50%",
    "left": "50%",
    "marginTop": "-30vh",
    "marginLeft": "-17vw",
    "background": "rgb(255, 255, 255)",
    "border": "1px solid black",
    "boxShadow": "2px 2px 10px 0px rgb(197, 197, 197)",
    "overflow": "hidden",
    "padding": "20px"
  },
  "calendar_page__popup_event__event_input": {
    "fontSize": "16px",
    "height": "30px",
    "background": "white",
    "border": "1px solid black",
    "borderRadius": "10px",
    "margin": "0",
    "padding": "5px"
  },
  "calendar_page__popup_event__event_input_label": {
    "fontWeight": "500"
  },
  "calendar_page__popup_event__event_input__inputops": {
    "width": "40vw",
    "fontSize": "16px",
    "height": "30px"
  },
  "popup_event__add_title": {
    "borderWidth": "0 0 2px",
    "outline": "none",
    "display": "block",
    "width": "30vw",
    "margin": "10px"
  },
  "add_title_focus": {
    "borderWidth": "0 0 2px",
    "outline": "none",
    "display": "block",
    "width": "30vw",
    "margin": "10px"
  },
  "popup_event__event": {
    "margin": "20px 10px"
  },
  "popup_event__content": {
    "borderWidth": "0 0 2px",
    "outline": "none",
    "display": "block",
    "width": "30vw",
    "margin": "10px"
  },
  "content_focus": {
    "borderWidth": "0 0 2px",
    "outline": "none",
    "display": "block",
    "width": "30vw",
    "margin": "10px"
  },
  "popup_event__time": {
    "margin": "10px",
    "borderWidth": "0 0 2px",
    "outline": "none",
    "width": "15vw"
  },
  "time_focus": {
    "margin": "10px",
    "borderWidth": "0 0 2px",
    "outline": "none",
    "width": "15vw"
  },
  "popup_event__color": {
    "margin": "10px"
  },
  "event_clock": {
    "margin": "10px",
    "width": "30vw",
    "display": "flex",
    "justifyContent": "space-between",
    "alignItems": "center"
  },
  "event_clock__clock": {
    "width": "10vw",
    "display": "inline-block",
    "padding": "3px"
  },
  "popup_event__btn_box": {
    "display": "flex",
    "justifyContent": "space-between",
    "marginTop": "20px"
  },
  "popup_event__btn_add": {
    "background": "rgb(100, 233, 122)",
    "width": "15vw"
  },
  "popup_event__btn_cancel": {
    "background": "rgb(255, 214, 180)",
    "width": "15vw"
  },
  "react_datepicker__input_container_input": {
    "display": "block",
    "borderWidth": "0 0 2px",
    "outline": "none",
    "width": "30vw",
    "margin": "10px"
  },
  "calendar_page__schedule__remove": {
    "padding": "5px",
    "background": "white",
    "color": "black",
    "borderRadius": "10%"
  },
  "calendar_page__schedule__remove_hover": {
    "background": "#eef1f5"
  },
  "calendar_page__schedule__event_tr": {
    "cursor": "pointer"
  }
}));
registerLocale('vi', vi)

class Calendar extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            month: 7,
            year: 2021,
            calendar: [],
            event: [],

            listEvent: [],
            selectedDay: 0,
            selectedEvent: null,

            loadcalendar: 1,
            loadevent: 1,

            edit_id: null,
            add_title: "",
            add_year: 2021,
            add_type_event: "Công việc",
            add_month: 1,
            add_day: 1,
            add_start: "1",
            add_startUNIX: 1621407600,
            add_end: "23",
            add_endUNIX: 1621422000,
            add_desc: "",
            add_color: "rgb(244, 67, 54)",
            add_noti: 1621406700,
            add_date: new Date(),
            add_listguestEmail: [],
            add_listguestName: [],
            add_url: "",

            add_temp_user: "",
            popup: 0,
            popupview: 0,
            
            loadding: 1

        }

        this.handleChange = this.handleChange.bind(this);
        this.handleEventChange = this.handleEventChange.bind(this);
        this.timeclock = Array.from(Array(24).keys());
        this.TypeEvent = ["Công việc","Cá nhân", "Gia đình", "Khác"]

    }
    convertTimestamp = (timestamp) => {
        var d = new Date(timestamp * 1000),	
            hh = d.getHours(),
            h = hh,
            min = ('0' + d.getMinutes()).slice(-2),		
            ampm = 'AM',
            time;

        if (hh > 12) {
            h = hh - 12;
            ampm = 'PM';
        } else if (hh === 12) {
            h = 12;
            ampm = 'PM';
        } else if (hh === 0) {
            h = 12;
        }
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


        if (this.state.calendar.length != undefined){
        this.state.calendar.forEach((value, index) => {

            if (value.duedate !== undefined) {
                let newevent;
                newevent = {
                    title: value.decription,
                    time: this.convertTimestamp(value.duedate),
                    id: "",
                }
                temp[this.convertTime(value.duedate)] = "black";
                if (listevent[this.convertTime(value.duedate)][0] === "") {
                    listevent[this.convertTime(value.duedate)][0] = newevent;
                }
                else {
                    listevent[this.convertTime(value.duedate)].push(newevent);
                }

            }

            if (value.Date !== undefined) {
                let newevent;
                newevent = {
                    title: value.Title,
                    time: this.convertTimestamp(value.StartHour),
                    id: value._id,
                    value: value
                }

                temp[value.Date.day] = value.Color;
                if (listevent[value.Date.day][0] === "") {
                    listevent[value.Date.day][0] = newevent;
                }
                else {
                    listevent[value.Date.day].push(newevent);
                }
            }
        });
      }
        this.setState({
            event: temp,
            listEvent: listevent,
            loadevent: 0
        })


    }



    convertAddingDate = () => {
        var fullday = new Date(this.state.add_date);
        this.setState({
            add_day: fullday.getDate(),
            add_month: fullday.getMonth() + 1,
            add_year: fullday.getFullYear(),
            add_startUNIX: this.toTimestamp(this.state.add_fulldate + " " + this.state.add_start+":00:00"),
            add_endUNIX: this.toTimestamp(this.state.add_fulldate + " " + this.state.add_end+":00:00")
        })
    }

    async componentDidMount() {
        await this.getCurrenDate();
        this.getCalendar();
    }

    removeEvent = async (id) => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "bearer " + localStorage.getItem("token")+"tC");
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("id", id);

        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        await fetch("https://hcmusemu.herokuapp.com/calendar/delete", requestOptions)
            .then(response => response.text())
            .then()
            .catch(error => console.log('error', error));

        this.getCalendar()
    }

    selectedEventClick = (index) => {

        var viewevent = this.state.listEvent[this.state.selectedDay][index]
        const date = new Date(viewevent.value.Date.month + "/" + viewevent.value.Date.day + "/" + viewevent.value.Date.year)
        this.setState({
            add_title: viewevent.value.Title,
            add_date: date,
            add_start: new Date(viewevent.value.StartHour * 1000).getHours(),
            add_end: new Date(viewevent.value.EndHour * 1000).getHours(),
            add_desc: viewevent.value.Decription.text,
            add_color: viewevent.value.Color,
            edit_id: viewevent.value._id,
            add_fulldate: date.toDateString(),
            popupview: 1
        })
    }

    selectedDay = () => {
        if (this.state.loadcalendar === 0 && this.state.loadevent === 0) {
            var listE = this.state.listEvent[this.state.selectedDay].map((item, index) => {
                console.log(item)
                if (item === "")
                    return <></>
                if (item.id !== "") return <tr style={{'background-color': item.value.Color}} onClick={() => this.selectedEventClick(index)}>
                    <td className="time">{item.value.StartHour != null ? this.convertTimestamp(item.value.StartHour): "12 AM"}</td>
                    <td>{item === "" ? "" : "-"}</td>
                    <td className="time">{item.value.EndHour != null ? this.convertTimestamp(item.value.EndHour): "11 PM"}</td>
                    <td>{item.title}</td>
                    <Button onClick={() => this.removeEvent(item.id)}><i className="remove fa fa-trash" ></i></Button>
                </tr>
                else
                    return <tr style={{'background-color': item.value.Color}} >
                       <td className="time">{item.value.StartHour != null ? this.convertTimestamp(item.value.StartHour): ""}</td>
                       <td>{item === "" ? "" : "-"}</td>
                       <td className="time">{item.value.EndHour != null ? this.convertTimestamp(item.value.EndHour): ""}</td>
                       <td>{item.title}</td>
                        <td ></td>
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
        myHeaders.append("Authorization", "bearer " + localStorage.getItem("token")+"tC");
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

        fetch("https://hcmusemu.herokuapp.com/calendar/getthismonthwithout", requestOptions)
            .then(response => response.json())
            .then(result => {
                this.setState({
                    calendar: result
                })
            })
            .then(success => {
                this.filterCalendar();
                this.setState({
                    loadcalendar: 0,
                    loadding: 0
                })
            })
            .catch(error => console.log('error', error));
    }

    getCurrenDate = () => {
        var today = new Date();

        this.setState({
            selectedDay: today.getDate(),
            month: today.getMonth() + 1,
            year: today.getFullYear()
        })
    }

    setSelecteday = async (value) => {
        await this.setState({
            loadevent: 1
        })
        this.setState({
            selectedDay: value
        })
        this.filterCalendar()
    }

    renderCalendar = () => {
      if (this.state.loadcalendar === 0) {
        let daysofmonth = new Date(this.state.year, this.state.month, 0).getDate();
        let ascen = Array.from({ length: daysofmonth }, (_, i) => i + 1);
        let dow = this.getDayOfWeek()
        let temp = Array.from({ length: dow }, () => "");
        var numbers = temp.concat(ascen)
        const listItems = numbers.map((number) => {
            if (number === "")
                return <li></li>
            else if (this.state.event[number] !== "") {
                return <li key={number} type="button" value={number} onClick={(e) => this.setSelecteday(e.currentTarget.value)}><div className="color-event" style={{ background: this.state.event[number], color: "white" }} >{number}</div></li>
            }
            return <li key={number} type="button" value={number} onClick={(e) => this.setSelecteday(e.currentTarget.value)}><span className="color-event">{number}</span></li>
        }
        );
        return listItems;
    }
    }

    getDayOfWeek = () => {
        var now = new Date(2021, this.state.month - 1, 1, 0, 0, 0);

        var days = [6, 0, 1, 2, 3, 4, 5];

        var day = days[now.getDay()];

        return day;
    }

    changeMonth = async (i) => {
        var month = this.state.month += i;
        if (month > 12) { month = 1 }
        if (month < 1) { month = 12 }
        await this.setState({
            month: month,
            selectedDay: 1
        })

        this.getCalendar();
    }

    renderSchedule = () => {
      return <div className="schedule" >
      <div className="calendar-button">

          <div className="date">{this.state.selectedDay + "/" + this.state.month + "/" + this.state.year}</div>
          <Button className="btn-add" onClick={this.openPopup}><i className="fa fa-plus" ></i></Button>
      </div>
      <div className="event" id="style-3">
          <table>
              <colgroup>
                  <col span="1" style={{ width: "22%" }} />
                  <col span="1" style={{ width: "1%" }} />
                  <col span="1" style={{ width: "22%" }} />
                  <col span="1" style={{ width: "85%" }} />
                  <col span="1" style={{ width: "5%" }} />
              </colgroup>
              <tbody>
                  {this.selectedDay()}
              </tbody>
          </table>
      </div>
      {this.viewDetailEvent()}
  </div>

    }

    addEvent = async () => {
        this.setState({ popup: 0 })
        await this.convertAddingDate();
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "bearer " + localStorage.getItem("token")+"tC");
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
            "Title": this.state.add_title,
            "TypeEvent": this.state.add_type_event,
            "year": this.state.add_year,
            "month": this.state.add_month,
            "day": this.state.add_day,
            "StartHour": this.state.add_startUNIX,
            "EndHour": this.state.add_endUNIX,
            "desciptionText": this.state.add_desc,
            "url": this.add_url,
            "UnderLine": false,
            "Italic": false,
            "Bold": false,
            "Color": this.state.add_color,
            "listguestEmail": [],
            "listguestName": [],
            "Notification": this.state.add_noti
        });
        console.log(raw)
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        await fetch("https://hcmusemu.herokuapp.com/calendar/post", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

        this.getCalendar();
    }
    
    setParams = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    async handleChange(event) {
        await this.setState({ [event.target.name]: event.target.value });
        await this.setState({
            add_startUNIX: this.toTimestamp(this.state.add_fulldate + " " + this.state.add_start + ":00:00"),
            add_endUNIX: this.toTimestamp(this.state.add_fulldate + " " + this.state.add_end + ":00:00")
        });
    }
    handleEventChange(e){
        this.setState({
            add_type_event: e.target.value
        });
    }
    renderTypeWork = () => {
        var TypeEventPicker = this.TypeEvent.map((value) => {
           return <option value={value}>{value}</option>
        })
       
        return TypeEventPicker;
    }
    renderClockPicker = () => {
        var timepicker = this.timeclock.map((num) => {
            if (num === 0) {
                return <option value={num}>12 AM</option>
            }
            else if (num === 12) {
                return <option value={num}>12 PM</option>
            }
            else if (num > 12) {
                return <option value={num}>{num - 12} PM</option>
            }

            else return <option value={num}>{num} AM</option>
        })
       
        return timepicker;
    }

    renderDatepicker = (date) => {
        this.setState({
            add_date: date,
            add_fulldate: date.toDateString()
        })
    }

    handleChangeComplete = (color, event) => {
        this.setState({ add_color: color.hex });
    };

    editEvent = async () => {
        this.setState({ popupview: 0 })
        await this.convertAddingDate();
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "bearer " + localStorage.getItem("token")+"tC");
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "id": this.state.edit_id,
            "Title": this.state.add_title,
            "TypeEvent": this.add_type_event,
            "year": this.state.add_year,
            "month": this.state.add_month,
            "day": this.state.add_day,
            "StartHour": this.state.add_startUNIX,
            "EndHour": this.state.add_endUNIX,
            "desciptionText": this.state.add_desc,
            "url": this.add_url,
            "UnderLine": "",
            "Italic": "",
            "Bold": "",
            "Color": this.state.add_color,
            "listguestEmail": this.listguestEmail,
            "listguestName": this.listguestName,
            "Notification": "1800"
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        await fetch("https://hcmusemu.herokuapp.com/calendar/edit", requestOptions)
            .then(response => response.text())
            .then()
            .catch(error => console.log('error', error));

        this.getCalendar();
    }

    getName = (item) => {
        this.setState({
            loadcalendar: 1
        })
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "bearer " + localStorage.getItem("token")+"tC");
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");


        var urlencoded = new URLSearchParams();
        urlencoded.append("username", item);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch("https://hcmusemu.herokuapp.com/profile/findname", requestOptions)
            .then(response => response.json())
            .then(result => {
                this.setState({
                    add_listguestEmail:[...this.state.add_listguestEmail, result[0]]
                })
            })
            .then()
            .catch(error => console.log('error', error));
    }

    renderAddedUser = () => {
        //console.log(localStorage.getItem("token"))
        
        this.state.add_listguestEmail.map((item, i)=> {
            var  result = this.getName()
            return (
              <TextField id={'userss['+i+']'} label={'user '+i} key={i} onChange={this.handleChange('roles['+i+']')}  />
            )
          })
    }
    viewDetailEvent = () => {
      if (this.state.popupview === 1) {
        return (
            <div className="popup-event">
                <span style={{color: "black"}}>  <TitleIcon/> Tiêu đề    </span>
                <input className="add-title" placeholder="Thêm tiêu đề" onChange={this.setParams} name="add_title" value={this.state.add_title}></input>
                <div>
                       <span style={{color: "black"}}> <CategoryIcon/> Xếp loại lịch hẹn    </span>
                    <span> </span>
                    <select fontSize="20px" onChange={this.handleChange} value={this.state.add_type_event}>
                            {this.renderTypeWork()}
                        </select>
                    </div>
                <DatePicker dateFormat="dd/MM/yyyy" locale="vi" selected={this.state.add_date} onChange={(date) => this.renderDatepicker(date)} />
                <div className="event-clock">
                    <span style={{ color: "black" }}><TimelapseIcon/>Thời gian</span>
                    <select className="clock" name="add_start" onChange={this.handleChange} value={this.state.add_start}>
                        {this.renderClockPicker()}
                    </select>
                    <span>-</span>
                    <select className="clock" name="add_end" onChange={this.handleChange} value={this.state.add_end}>
                        {this.renderClockPicker()}
                    </select>
                </div>
                <div>
                    <span style={{ color: "black" }}><DescriptionIcon/>Nội dung</span>
                    <textarea className="content" placeholder="Xem nội dung" onChange={this.setParams} name="add_desc" value={this.state.add_desc}></textarea>
                </div>
                <div className="useradd">
                    <span style={{ color: "black" }}><PersonAddIcon/> Thêm người dự </span>
                    <TextField type="email" required width="30px" placeholder="Thêm người dùng" onChange={this.setParams} name="add_user_list"> </TextField>                
                </div>
                <div className="event">
                    <span style={{ color: "black" }}><ColorLensIcon/> Màu đánh dấu</span>
                    <CirclePicker color={this.state.add_color} width="32vw" onChangeComplete={this.handleChangeComplete} circleSize={28}></CirclePicker>
                </div>
                <div className="btn-box">
                    <Button class="btn add" onClick={this.editEvent}>Chỉnh sửa</Button>
                    <Button class="btn cancel"  onClick={this.closePopup}>Hủy</Button>
                </div>
            </div>
        )
    }
    }

    popupAddEvent = () => {
        if (this.state.popup === 1) {
            return (
                <div className="popup-event">
                    <TitleIcon/>
                    <label fontSize="20" color="black"> Tiêu đề    </label>
                    <input type="text" className="add-title" placeholder="Thêm tiêu đề" onChange={this.setParams} name="add_title" value={this.state.add_title}>
                    </input>
                    <div className="event-type">
                        <span> <CategoryIcon/> Xếp loại lịch hẹn    </span>
                        <select className="clock" onChange={this.handleEventChange} value={this.state.add_type_event}>
                            {this.renderTypeWork()}
                        </select>
                    </div>
                    <DatePicker dateFormat="dd/MM/yyyy" placeholderText="Ngày lên lịch" locale="vi" selected={this.state.add_date} onChange={(date) => this.renderDatepicker(date)} />
                    <div className="event-clock">
                        <span>  <TimelapseIcon/>Thời gian: &nbsp; &nbsp; </span>
                        <select borderRadius="50%" className="clock" name="add_start" onChange={this.handleChange} value={this.state.add_start}>
                            {this.renderClockPicker()}
                        </select>
                        <span>&nbsp; - &nbsp;</span>
                        <select borderRadius="50%" className="clock" name="add_end" onChange={this.handleChange} value={this.state.add_end}>
                            {this.renderClockPicker()}
                        </select>
                    </div>
                    <div>
                         <span> <DescriptionIcon/>Mô tả lịch hẹn</span>
                        <textarea className="content" placeholder="Thêm nội dung" onChange={this.setParams} name="add_desc" value={this.state.add_desc}></textarea>
                    </div>
                    <div>
                        <LinkIcon verticalAlign="center"/>
                        <span>Link</span>
                        <input type="text" className="add-title" placeholder="Thêm url tuỳ chọn" onChange={this.setParams} name="add_url" value={this.state.add_url}></input>
                    </div>
                    <div className="useradd">
                        <PersonAddIcon/> <span> Thêm người dùng</span>
                        <TextField  height="50px" type="email" placeholder="Thêm người dùng" onChange={this.setParams} name="add_user_list"> </TextField>
                        {this.renderAddedUser()}
                    </div>
                    <div className="event">
                        <ColorLensIcon/>
                        <label>Màu đánh dấu</label>
                        <CirclePicker color={this.state.add_color} width="30vw" onChangeComplete={this.handleChangeComplete} circleSize={28}></CirclePicker>
                    </div>
                    
                    <div className="btn-box">
                        <Button class="btn add" onClick={this.addEvent}>Thêm thông báo</Button>
                        <span>&nbsp;&nbsp;&nbsp; </span>
                        <Button class="btn cancel" onClick={this.closePopup}>Hủy</Button>
                    </div>
                </div>
            )
        }
    }

    closePopup = () => {
        this.setState({
            popup: 0,
            popupview: 0
        })
    }

    openPopup = () => {
        this.setState({
            popup: 1
        })
    }

    toTimestamp = (strDate) => {
        var datum = new Date(strDate).getTime();
        return datum / 1000;
    }


    render() {
        if (this.state.loadding === 0)
            return (
                <div style={{marginLeft:10}}>
                    <NavBar />
                    <div className="calendar-page">
                        <div className="calendar">
                            <div className="title">LỊCH CÁ NHÂN</div>
                            <div className="picker">
                                <div onClick={(i) => this.changeMonth(-1)}><Button  width="20vw" className="fa fa-angle-left fa-lg fa-fw" aria-hidden="true"> {"<<"} </Button></div>
                                <div>THÁNG {this.state.month}</div>
                                <div onClick={(i) => this.changeMonth(1)}><Button  width="20vw" className="fa fa-angle-right fa-lg fa-fw" aria-hidden="true"> {">>"} </Button></div>
                            </div>
                            <hr />
                            <ul className="dayofweek">
                                <li key="H">Hai</li>
                                <li key="BA">Ba</li>
                                <li key="T">Tư</li>
                                <li key="N">Năm</li>
                                <li key="S">Sáu</li>
                                <li key="B">Bảy</li>
                                <li key="C">CN</li>
                            </ul>
                            <ul className="days">
                                {this.renderCalendar()}
                            </ul>
                            {this.popupAddEvent()}

                        </div>
                        {this.renderSchedule()}
                    </div>

                </div>
            );
        else return (
            <div style={{marginLeft: 200}}>
                <NavBar/>
                <LoadingScreen/>
            </div>
        );

    }
}

export default Calendar;