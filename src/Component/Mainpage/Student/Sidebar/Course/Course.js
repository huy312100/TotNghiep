import React, { Component } from 'react';
import Navbar from '../../Navbar';
import Sidebar from '../../Sidebar';
import { Link } from 'react-router-dom';
import "../../../../../style/Course.css";

class Course extends Component {
    constructor(props) {
        super(props);
        this.state = {
            course: [
                {
                    name: "",
                    teacher: []
                },
                {
                    name: "",
                    teacher: []
                }
            ],
            tag: 0,
            allcourse: [],
            loadding: 1,
            page: 0
        }
        this.handleScroll = this.handleScroll.bind(this);
    }


    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
        this.getCurrentCourse();
        this.getAllCourse();
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }

    getCurrentCourse = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "bearer " + localStorage.getItem("token"));

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("https://hcmusemu.herokuapp.com/studycourses/currentcourses", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                this.setState({
                    course: result
                })
                console.log("course:", this.state.course)
            })
            .catch(error => console.log('error', error));
    }

    getAllCourse = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "bearer " + localStorage.getItem("token"));
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("page", this.state.page);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch("https://hcmusemu.herokuapp.com/studycourses/allcourses", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                // let temp=this.state.allcourse;
                // temp.push(result)
                // console.log("temp:",temp)
                this.setState({
                    allcourse: result,
                    loadding: 0
                })
            })
            .catch(error => console.log('error', error));
    }

    getAllCourseScroll = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "bearer " + localStorage.getItem("token"));
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("page", this.state.page);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch("https://hcmusemu.herokuapp.com/studycourses/allcourses", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                let temp = this.state.allcourse;
                Array.prototype.push.apply(temp, result)
                console.log("temp:", temp)
                this.setState({
                    allcourse: temp,
                    loadding: 0
                })
            })
            .catch(error => console.log('error', error));
    }

    LoaddingIcon = () => {
        if (this.state.loadding === 1) {
            return <i class="loadding fa fa-circle-o-notch fa-spin fa-3x"></i>
        }
    }

    checkPage = () => {
        if (this.state.tag === 0) {
            return (<div>
                {this.state.course.map((c) => {
                    return (
                        <div className="course">
                            <div className="titlee">{c.name}</div>
                            <div className="list-teacher">
                                {c.teacher.map((tc) => (
                                    <div className="content">
                                        <span>Giáo viên: </span>
                                        <span>{tc}</span>
                                    </div>))}
                            </div>
                            <Link to={"/course/"+c.IDCourses} type="button" class="direct">
                                <div className="link">
                                    <i className="fa fa-info fa-fw"></i>
                                    <span>Xem chi tiết môn</span>
                                </div>
                            </Link>
                        </div>
                    )
                })
                }
            </div>
            )
        }
        else {
            return (<div>
                {this.state.allcourse.map((c) => {
                    return (
                        <div className="course">
                            <div className="titlee">{c.name}</div>
                            <div className="list-teacher">
                                {c.teacher.map((tc) => (
                                    <div className="content">
                                        <span>Giáo viên: </span>
                                        <span>{tc}</span>
                                    </div>))}
                            </div>
                            <Link to={"/course/"+c.id} class="direct">
                                <div className="link">
                                    <i className="fa fa-info fa-fw"></i>
                                    <span>Xem chi tiết môn</span>
                                </div>
                            </Link>
                        </div>
                    )
                })
                }
                {this.LoaddingIcon()}
            </div>
            )
        }
    }

    clickTag = (numtag) => {
        this.setState({
            tag: numtag
        })
    }

    handleScroll() {
        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        const windowBottom = Math.round(windowHeight + window.pageYOffset);
        if (windowBottom >= docHeight && this.state.loadding === 0 && this.state.tag === 1) {
            console.log("bottom")
            this.setState({
                loadding: 1,
                page: this.state.page + 1
            })
            this.getAllCourseScroll();
            console.log("loadding:", this.state.loadding)
        } else {
            console.log("not bottom")
        }
    }


    render() {
        var curtag = this.state.tag === 0 ? "current" : "";
        var alltag = this.state.tag === 0 ? "" : "all";
        return (
            <div onScroll={this.handleScroll}>
                <Navbar />
                <Sidebar />
                <div className="course-tag">
                    <div className="tag">
                        <div type="button" className={"btn-course " + curtag} onClick={(numtag) => this.clickTag(0)}>Môn học hiện tại
                        </div>
                        <div type="button" className={"btn-course " + alltag} onClick={(numtag) => this.clickTag(1)}>Tất cả môn học
                        </div>
                    </div>
                </div>
                <div className="course-page">
                    {this.checkPage()}
                </div>
            </div>
        );
    }
}

export default Course;