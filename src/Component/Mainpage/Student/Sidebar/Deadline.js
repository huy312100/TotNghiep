import React, { Component } from 'react';
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';
import "../../../../style/Deadline.css";
// import { Link } from 'react-router-dom';

class Deadline extends Component {
    constructor(props) {
        super(props);

        const search = this.props.location.search;
        const urlParams = new URLSearchParams(search);
        let tag = urlParams.get('tag');
        if (tag === null)
            tag = "0"

        this.state = {
            deadline: [],
            month: 0,
            year: 0,
            empty: 0,

            loadding: 1,
            loaddingnewsuni: 1,
            loaddingnewsfac: 1,

            newsuni: [],
            newsfac: [],

            tag: tag
        }
    }



    getNewsUniversity = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "bearer " + localStorage.getItem("token"));

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("https://hcmusemu.herokuapp.com/info/newsuniversity", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                this.setState({
                    newsuni: result,
                    loaddingnewsuni: 0
                })
            })
            .catch(error => console.log('error', error));
    }

    getNewsFaculty = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "bearer " + localStorage.getItem("token"));

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("https://hcmusemu.herokuapp.com/info/newsfaculty", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                this.setState({
                    newsfac: result,
                    loaddingnewsfac: 0
                })
            })
            .catch(error => console.log('error', error));
    }

    getCurrentDeadline = async () => {
        this.getCurrenDate();
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "bearer " + localStorage.getItem("token"));

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        await fetch("https://hcmusemu.herokuapp.com/deadlinemoodle/month", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                if (result.length > 0 && result[0].nameCourese !== undefined) {
                    this.setState({
                        deadline: result,
                        empty: 0,
                        loadding: 0
                    })
                }
                else {
                    this.setState({
                        empty: 1,
                        loadding: 0
                    })
                }
                console.log(this.state.empty);
                console.log(this.state.month);
                console.log(this.state.year);
            })
            .catch(error => console.log('error', error));
    }


    async componentDidMount() {
        if (this.state.tag==="0"){
            this.getCurrentDeadline()
        }
        if (this.state.tag==="1")
            this.getNewsUniversity()
        if (this.state.tag==="2")
            this.getNewsFaculty()

    }

    convertMonth = (m) => {
        var months = ['một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín', 'mười', 'mười một', 'mười hai'];
        return months[m - 1];
    }

    convertTime = (UNIX_timestamp) => {
        var a = new Date(UNIX_timestamp * 1000);
        var months = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '20', '11', '12'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var time = date + '/' + month + '/' + year + ' ' + hour + ':' + min + ':' + sec;
        return time;
    }

    getCurrenDate = () => {
        var today = new Date();

        this.setState({
            month: today.getMonth() + 1,
            year: today.getFullYear()
        })
    }

    getDeadline = () => {
        this.setState({ loadding: 1 })
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "bearer " + localStorage.getItem("token"));
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("month", this.state.month);
        urlencoded.append("year", this.state.year);
        console.log(this.state.month)
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch("https://hcmusemu.herokuapp.com/deadlinemoodle/month", requestOptions)
            .then(response => {
                console.log(response)
                return response.json()
            })
            .then(result => {
                console.log(result);
                console.log(this.state.month)
                if (result.length > 0 && result[0].nameCourese !== undefined) {
                    this.setState({
                        deadline: result,
                        empty: 0,
                        loadding: 0
                    })
                }
                else {
                    this.setState({
                        empty: 1,
                        loadding: 0
                    })
                }
                // console.log(this.state.dealine)
                // this.getCurrenDate();
                console.log(this.state.month);
            })
            .catch(error => console.log('error', error));
    }

    changeMonth = async (num) => {
        var month_temp = this.state.month + num;
        var year_temp = this.state.year;
        if (month_temp < 1) {
            month_temp = 12;
            year_temp = year_temp - 1;
        }
        if (month_temp > 12) {
            month_temp = 1;
            year_temp = year_temp + 1;
        }

        await this.setState({
            month: month_temp,
            year: year_temp
        });
        console.log(this.state.month)
        this.getDeadline();
    }

    LoaddingIcon = () => {
        if (this.state.loadding === 1) {
            return <i className="loadding fa fa-circle-o-notch fa-spin fa-3x"></i>
        }
    }

    renderDeadline = () => {
        if (this.state.loadding === 1) {
            return this.LoaddingIcon();
        }
        if (this.state.empty === 1) {
            return <div className="deadline">
                <div className="titlee">Không có deadline trong tháng này</div>
            </div>
        }
        else {
            return (
                this.state.deadline.map((d, index) => (
                    <div key={index} className="deadline">
                        <div className="titlee">
                            {d.nameCourese}
                        </div>
                        <div className="decription">
                            {d.decription}
                        </div>
                        <div className="duedate">
                            Hạn chót: {this.convertTime(d.duedate)}
                        </div>
                        <hr />
                        <div type="button" className="direct">
                            {/* <div className="link">
                                <i className="fa fa-info fa-fw"></i>
                                <span>Xem chi tiết môn</span>
                            </div> */}
                            <a className="link" href={d.url} target="_blank" rel="noopener noreferrer">
                                <i className="fa fa-sign-out fa-fw"></i><span>
                                    Chuyển đến trang môn học</span>
                            </a>
                        </div>


                        {/* <hr /> */}
                    </div>
                ))
            )
        }
    }

    clickTag = async (numtag) => {
        this.props.history.push({
            pathname: '/deadline',
            search: "?" + new URLSearchParams({tag: numtag}).toString()
        })
        await this.setState({
            tag: numtag.toString()
        })
        if (this.state.tag === "0" && this.state.loaddingnewsuni === 1)
            this.getCurrentDeadline();
        if (this.state.tag === "1" && this.state.loaddingnewsuni === 1)
            this.getNewsUniversity();
        if (this.state.tag == "2" && this.state.loaddingnewsfac === 1)
            this.getNewsFaculty();

    }

    renderTag = () => {

        if (this.state.tag === "0")
            return (
                <div>
                    <div className="datepicker">
                        <div className="change-month" type="button" onClick={() => this.changeMonth(-1)}><i width="20vw" className="fa fa-angle-left fa-lg fa-fw" aria-hidden="true"></i>Tháng trước</div>
                        <div className="month">{"Tháng " + this.convertMonth(this.state.month) + " " + this.state.year}</div>
                        <div className="change-month" type="button" onClick={() => this.changeMonth(1)}>Tháng sau<i width="20vw" className="fa fa-angle-right fa-lg fa-fw" aria-hidden="true"></i></div>

                    </div>
                    <div className="deadline-page">
                        {/* <hr/>
     */}
                        <div className="deadline-box">
                            {this.renderDeadline()}
                        </div>
                    </div>
                </div>
            )
        else if (this.state.tag === "1" && this.state.loaddingnewsuni === 0) {
            return (
                <div className="news-page">

                    {
                        this.state.newsuni.map((news) => {
                            return (<a href={news.Link} target="_blank" rel="noopener noreferrer"><div className="news">
                                <div className="title">
                                    {news.Title}
                                </div>
                                <div className="time">
                                    {news.Date}
                                </div>

                            </div>
                                {/* <hr/> */}
                            </a>
                            )
                        })
                    }

                </div>
            )
        }

        else if (this.state.tag === "2" && this.state.loaddingnewsfac === 0) {
            return (
                <div className="news-page">

                    {
                        this.state.newsfac.map((news) => {
                            return (<a href={news.Link} target="_blank" rel="noopener noreferrer"><div className="news">
                                <div className="title">
                                    {news.Title}
                                </div>
                                <div className="time">
                                    {news.Date}
                                </div>

                            </div>
                                {/* <hr/> */}
                            </a>
                            )
                        })
                    }

                </div>
            )
        }
    }

    render() {
        var assign = this.state.tag === "0" ? "assign" : "";
        var university = this.state.tag === "1" ? "university" : "";
        var faculty = this.state.tag === "2" ? "faculty" : "";
        return (
            <div>
                <Navbar />
                <Sidebar />
                <div className="deadline-tag">
                    <div className="tag">
                        <div type="button" className={"btn-deadline " + assign} onClick={() => this.clickTag(0)}>Bài tập
                        </div>
                        <div type="button" className={"btn-deadline " + university} onClick={() => this.clickTag(1)}>Tin tức trường
                        </div>
                        <div type="button" className={"btn-deadline " + faculty} onClick={() => this.clickTag(2)}>Tin tức khoa
                        </div>
                    </div>
                </div>
                {this.renderTag()}
            </div>
        );
    }
}

export default Deadline;
