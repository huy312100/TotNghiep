import React, { Component,useEffect,useState } from 'react';
import DatePicker from 'react-datepicker';
import { registerLocale } from "react-datepicker";
import vi from 'date-fns/locale/vi';
import "./Calendar.css";
import NavBar from '../../Navigation/NavBar';
import "react-datepicker/dist/react-datepicker.css";
import { CirclePicker } from 'react-color';
import {makeStyles, Typography} from "@material-ui/core"
import clsx from 'clsx';
import 'font-awesome/css/font-awesome.min.css';
import {Button,TextField,Input,Toolbar,Select,ListItem,Box,InputAdornment,IconButton} from "@material-ui/core"
import 'date-fns'
import LoadingScreen from '../../components/shared/LoadingScreen';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ConfirmDialog from "../../components/shared/ConfirmDialog"
import ColorLensIcon from '@material-ui/icons/ColorLens';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import LinkIcon from '@material-ui/icons/Link';
import DescriptionIcon from '@material-ui/icons/Description';
import TimelapseIcon from '@material-ui/icons/Timelapse';
import CategoryIcon from '@material-ui/icons/Category';
import TitleIcon from '@material-ui/icons/Title';
import checkTokenExpired from "../../ValidAccess/AuthToken"
import { useHistory } from 'react-router-dom';
import ClearIcon from '@material-ui/icons/Clear';
import Draggable from 'react-draggable';
import { ThumbDownSharp } from '@material-ui/icons';


registerLocale('vi', vi)

export default class Calendar extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            month: 7,
            year: 2021,
            calendar: [],
            event: [],

            listEvent: [],
            foundedUser: [],
            selectedDay: 0,
            selectedEvent: null,
            search: "",

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
            
            loadding: 1,
            confirmDialog: {isOpen:false, title:"",subTitle:""}

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
        this.setState({loadding: 0})
        this.getCalendar();
    }

    removeEvent = async (id) => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "bearer " + localStorage.getItem("token"));
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

    handleRemoveEvent = (id) =>{
       this.setState({
           confirmDialog: {
            ...this.state.confirmDialog,
            isOpen: false
           }
      })
      this.removeEvent(id);
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
                    <td>-</td>
                    <td className="time">{item.value.EndHour != null ? this.convertTimestamp(item.value.EndHour): "11 PM"}</td>
                    <td>{item.title}</td>
                    <td></td>
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
        myHeaders.append("Authorization", "bearer " + localStorage.getItem("token"));
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
            "url": this.state.add_url,
            "UnderLine": false,
            "Italic": false,
            "Bold": false,
            "Color": this.state.add_color,
            "listguestEmail": this.state.add_listguestEmail,
            "listguestName": this.state.add_listguestName,
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
        .then((response) => {
            const statusCode = response.status;
            const dataRes = response.json();
            return Promise.all([statusCode, dataRes]);
          })
          .then(([statusCode, dataRes]) => {
              console.log(statusCode,dataRes);
          })
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
           return <ListItem value={value}>{value}</ListItem>
        })
       
        return TypeEventPicker;
    }
    renderClockPickerStart = () => {
        let now = new Date();
        var timepicker = this.timeclock.map((num) => {
            if (num === 0) {
                return <ListItem  value={num}>12 AM</ListItem>
            }
            else if (num === 12) {
                return <ListItem value={num}>12 PM</ListItem>
            }
            else if (num > 12) {
                return <ListItem  value={num}>{num - 12} PM</ListItem>
            }

            else return <ListItem value={num}>{num} AM</ListItem>
        })
       
        return timepicker;
    }

    renderClockPickerEnd = () => {
        var timepicker = this.timeclock.map((num) => {
            if (num === 0) {
                return <ListItem disabled={num >= this.state.add_start ? false : true} value={num}>12 AM</ListItem>
            }
            else if (num === 12) {
                return <ListItem disabled={num >= this.state.add_start ? false : true } value={num}>12 PM</ListItem>
            }
            else if (num > 12) {
                return <ListItem disabled={num >= this.state.add_start ? false : true } value={num}>{num - 12} PM</ListItem>
            }

            else 
                return <ListItem disabled={num >= this.state.add_start ? false : true } value={num}>{num} AM</ListItem>
        })
       
        return timepicker;
    }

    renderDatepicker = (date) => {
        console.log(date.toDateString());
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
        myHeaders.append("Authorization", "bearer " + localStorage.getItem("token"));
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
            "listguestEmail": this.add_listguestEmail,
            "listguestName": this.add_listguestName,
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

    searchUserAPI = async() => {
       
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "bearer " + localStorage.getItem("token"));
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");


        var urlencoded = new URLSearchParams();
        urlencoded.append("username", this.state.search);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        await fetch("https://hcmusemu.herokuapp.com/profile/findname", requestOptions)
            .then(response => response.json())
            .then(result => {
                this.setState({
                    //add_listguestEmail:[...this.state.add_listguestEmail, result[0]]
                    foundedUser: result
                })
            })
            .then()
            .catch(error => console.log('error', error));
    }

    addUser = (user) =>{
        let user_list = [...this.state.add_listguestName];
        let mail_list = [...this.state.add_listguestEmail];
        const includes = (a, v) => a.indexOf(v) !== -1
        if (includes(mail_list,user) === true){
             alert("Người dùng này đã được thêm vào danh sách");
        }
        else{
             user_list.push(user.HoTen);
             mail_list.push(user.Email);
             this.setState({
                 add_listguestName: user_list,
                 add_listguestEmail: mail_list
             })
        }
    }
    renderAddedUser = () => {
        
        if (this.state.foundedUser.length > 0){
            return(
                <div>
                    {this.state.foundedUser.map((user,index) => {
                    return( 
                    <div key={index}  onClick={()=>{this.addUser(user);this.setState({search: ""})}}>
                         <Box border={1} borderColor="red" textAlign="center" className="search">
                            {user.HoTen}&nbsp;-&nbsp;{user.Email}
                        </Box>
                    </div>
                    )})}         
                </div>
               
            )
    
            }
        else{
                return null;
            }
    }

    handleSearch = () => {
        if (this.state.search.length > 0){
            this.searchUserAPI()
        }
    }
    handleChangeSearch = (event) =>{
        this.setState({search: event.target.value})
    }
    removeAddedUser = (user)=>{
        let user_list = [...this.state.add_listguestName];
        let mail_list = [...this.state.add_listguestEmail];
        let index = mail_list.indexOf(user);
        index !== -1 && user_list.splice(index , 1)
        index !== -1 && mail_list.splice(index , 1)
        this.setState({
            add_listguestName: user_list,
            add_listguestEmail: mail_list
        })
    }
    viewDetailEvent = () => {
      if (this.state.popupview === 1) {
        return (
            <div style={{color: "black"}} className="popup-event">
                    <div>
                        <IconButton 
                            onClick={()=>{this.closePopup();this.setState({foundedUser: []})}} 
                            style={{float: "right",backgroundColor:"red"}}>
                                <ClearIcon fontSize="small" color="white"/>
                        </IconButton>
                        <Typography variant="h6"> 
                            <TitleIcon verticalAlign="center"/>Tiêu đề
                        </Typography>
                        <br/>
                        <TextField 
                                    maxHeight="10vh"
                                    multiline
                                    variant="outlined"
                                    fullWidth 
                                    placeholder="Thêm tiêu đề" 
                                    onChange={this.setParams} 
                                    name="add_title" 
                                    value={this.state.add_title}
                        />
                    </div>
                    <br/>
                    <div style={{ display: "flex" }}>
                        <Typography variant="h6"> <CategoryIcon/> Xếp loại lịch hẹn </Typography>
                        &nbsp; &nbsp;&nbsp;
                        <Select 
                            onChange={this.handleEventChange} 
                            value={this.state.add_type_event}
                            >
                            {this.renderTypeWork()}
                        </Select>
                    </div>
                    <DatePicker 
                        dateFormat="dd/MM/yyyy" 
                        placeholderText="Ngày lên lịch" 
                        locale="vi" 
                        selected={this.state.add_date} 
                        onChange={(date) => this.renderDatepicker(date)} />
                    <div style={{display:"flex",alignItems:"center", justifyContent:"left"}}>
                        <Typography variant="h6"><TimelapseIcon/>Thời gian:&nbsp;&nbsp;&nbsp;</Typography>
                        <br/>
                        <Typography>Từ:&nbsp;&nbsp;&nbsp;</Typography>
                        <Select 
                            borderRadius="50%" 
                            className= "clock"
                            name="add_start" 
                            onChange={this.handleChange} 
                            value={this.state.add_start}>
                            {this.renderClockPickerStart()}
                        </Select>
                        <Typography>Đến:&nbsp;&nbsp;&nbsp;</Typography>
                        <Select 
                            borderRadius="50%" 
                            className= "clock"
                            name="add_end" 
                            onChange={this.handleChange}  
                            value={this.state.add_end}>
                            {this.renderClockPickerEnd()}
                        </Select>
                    </div>

                    <br/>
                    <div>
                        <Typography variant="h6"> 
                            <DescriptionIcon verticalAlign="center"/>
                            Mô tả lịch hẹn
                        </Typography>
                        <br/>
                        <TextField 
                        variant="outlined" 
                        fullWidth
                        placeholder="Thêm nội dung" 
                        onChange={this.setParams} 
                        name="add_desc" 
                        value={this.state.add_desc}/>
                    </div>
                    <div>
                        <Typography variant="h6"> <LinkIcon/>Link</Typography>
                    
                        <TextField
                            multiline
                            variant="outlined"
                            fullWidth
                            placeholder="Thêm url tuỳ chọn" 
                            onChange={this.setParams} 
                            name="add_url" 
                            value={this.state.add_url}
                        />
                    </div>
                    <div>
                        <Typography variant="h6"><PersonAddIcon/> Thêm người dùng</Typography>
                        <br/>
                        <TextField  
                            variant="outlined"
                            fullWidth
                            placeholder="Thêm người dùng" 
                            onChange={(e)=>this.handleChangeSearch(e)}
                            onKeyDown={this.handleSearch}
                            value={this.state.search}
                            name="add_user_list"
                            InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end" alignItems="center">
                                      {this.state.search.length > 0 ? 
                                        <IconButton onClick={()=>this.setState({search: ""})}>
                                            <ClearIcon style={{borderRadius:"50%"}}/>
                                        </IconButton> 
                                        : 
                                        null}
                                  </InputAdornment>
                                ),
                              }}
                        />
                        {this.state.search.length > 0 ? this.renderAddedUser() : null}
                    </div>
                    {this.renderAdderUser()}
                    <br/>
                    <div>
                        <Typography variant="h6"><ColorLensIcon/>Màu đánh dấu</Typography>
                        <CirclePicker color={this.state.add_color} width="100%"  onChangeComplete={this.handleChangeComplete} circleSize={28}/>
                    </div>
                    <br/>
                    <div class="btn-box">
                        <Button class="btn add" onClick={this.editEvent}>Chỉnh sửa</Button>
                        <Button class="btn delete" onClick={()=>{{ this.setState({
                            confirmDialog:{
                                isOpen: true,
                                title: 'Bạn muốn xoá sự kiện này chứ',
                                subTitle: "Giao tác không thể hoàn",
                                onConfirm: () => { this.removeEvent(this.state.edit_id); this.setState({confirmDialog: {isOpen: false,}});this.closePopup()}}
                            })}}}>Xoá event</Button>
                        <Button class="btn cancel" onClick={()=>{this.closePopup();this.setState({foundedUser: []})}}>Hủy</Button>
                    </div>
                    <ConfirmDialog
                        confirmDialog={this.state.confirmDialog}
                        setConfirmDialog={(e)=>this.setState({confirmDialog:  e.target.value})}
                    />
                </div>
            )
        }
    }

    renderAdderUser = () =>{
        if (this.state.add_listguestEmail.length > 0 || this.state.add_listguestName.length > 0){
            return(
                <Box fullWidth style={{display:"block",borderRadius:"10px"}} multiline border={1}>
                    {this.state.add_listguestEmail.map((item,index)=>{
                        return(
                            <Box key={index} border={1} style={{margin:"2% 1% 2% 1%",borderRadius:"5px",display: "inline-block", height:"4vh"}}>
                                {item} 
                                <IconButton onClick={()=>this.removeAddedUser(item)} style={{width: "4vh", height: "4vh"}}>
                                    <ClearIcon fontSize="small"/>
                                </IconButton>
                            </Box>
                            
                        )
                    }
                    )}
                </Box>
            )
        }
        else return(
            <Box fullWidth style={{display:"block",borderRadius:"10px"}} multiline border={1}>
            </Box>
        )
    }

    popupAddEvent = () => {
        if (this.state.popup === 1) {
            return (
                <div className="popup-event">
                    <div>
                    <IconButton 
                        onClick={()=>{this.closePopup();this.setState({foundedUser: []})}} 
                        style={{float: "right",backgroundColor:"red"}}>
                            <ClearIcon fontSize="small" color="white"/>
                    </IconButton>
                        <Typography variant="h6"> 
                            <TitleIcon verticalAlign="center"/>Tiêu đề
                        </Typography>
                        <br/>
                        <TextField 
                                    maxHeight="10vh"
                                    multiline
                                    variant="outlined"
                                    fullWidth 
                                    placeholder="Thêm tiêu đề" 
                                    onChange={this.setParams} 
                                    name="add_title" 
                                    value={this.state.add_title}
                        />
                    </div>
                    <br/>
                    <div style={{ display: "flex" }}>
                        <Typography variant="h6"> <CategoryIcon/> Xếp loại lịch hẹn </Typography>
                        &nbsp; &nbsp;&nbsp;
                        <Select 
                            onChange={this.handleEventChange} 
                            value={this.state.add_type_event}
                            >
                            {this.renderTypeWork()}
                        </Select>
                    </div>
                    <DatePicker 
                        dateFormat="dd/MM/yyyy" 
                        placeholderText="Ngày lên lịch" 
                        locale="vi" 
                        selected={this.state.add_date} 
                        onChange={(date) => this.renderDatepicker(date)} />
                    <div style={{display:"flex",alignItems:"center", justifyContent:"left"}}>
                        <Typography variant="h6"><TimelapseIcon/>Thời gian:&nbsp;&nbsp;&nbsp;</Typography>
                        <br/>
                        <Typography>Từ:&nbsp;&nbsp;&nbsp;</Typography>
                        <Select 
                            borderRadius="50%" 
                            className= "clock"
                            name="add_start" 
                            onChange={this.handleChange} 
                            value={this.state.add_start}>
                            {this.renderClockPickerStart()}
                        </Select>
                        <Typography>Đến:&nbsp;&nbsp;&nbsp;</Typography>
                        <Select 
                            borderRadius="50%" 
                            className= "clock"
                            name="add_end" 
                            onChange={this.handleChange}  
                            value={this.state.add_end}>
                            {this.renderClockPickerEnd()}
                        </Select>
                    </div>

                    <br/>
                    <div>
                        <Typography variant="h6"> 
                            <DescriptionIcon verticalAlign="center"/>
                            Mô tả lịch hẹn
                        </Typography>
                        <br/>
                        <TextField 
                        variant="outlined" 
                        fullWidth
                        placeholder="Thêm nội dung" 
                        onChange={this.setParams} 
                        name="add_desc" 
                        value={this.state.add_desc}/>
                    </div>
                    <div>
                        <Typography variant="h6"> <LinkIcon/>Link</Typography>
                    
                        <TextField
                            multiline
                            variant="outlined"
                            fullWidth
                            placeholder="Thêm url tuỳ chọn" 
                            onChange={this.setParams} 
                            name="add_url" 
                            value={this.state.add_url}
                        />
                    </div>
                    <div>
                        <Typography variant="h6"><PersonAddIcon/> Thêm người dùng</Typography>
                        <br/>
                        <TextField  
                            variant="outlined"
                            fullWidth
                            placeholder="Thêm người dùng" 
                            onChange={(e)=>this.handleChangeSearch(e)}
                            onKeyDown={this.handleSearch}
                            value={this.state.search}
                            name="add_user_list"
                            InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end" alignItems="center">
                                      {this.state.search.length > 0 ? 
                                        <IconButton onClick={()=>this.setState({search: ""})}>
                                            <ClearIcon style={{borderRadius:"50%"}}/>
                                        </IconButton> 
                                        : 
                                        null}
                                  </InputAdornment>
                                ),
                              }}
                        />
                        {this.state.search.length > 0 ? this.renderAddedUser() : null}
                    </div>
                    {this.renderAdderUser()}
                    <br/>
                    <div>
                        <Typography variant="h6"><ColorLensIcon/>Màu đánh dấu</Typography>
                        <CirclePicker color={this.state.add_color} width="100%"  onChangeComplete={this.handleChangeComplete} circleSize={28}/>
                    </div>
                    <br/>
                    <div class="btn-box">
                        <Button class="btn add" onClick={this.addEvent}>Thêm thông báo</Button>
                        <span>&nbsp;&nbsp;&nbsp; </span>
                        <Button class="btn cancel" onClick={()=>{this.closePopup();this.setState({foundedUser: []})}}>Hủy</Button>
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
                                <div onClick={(i) => this.changeMonth(-1)}> <ArrowBackIcon/></div>
                                <div>THÁNG {this.state.month}</div>
                                <div onClick={(i) => this.changeMonth(1)}> <ArrowForwardIcon/></div>
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
