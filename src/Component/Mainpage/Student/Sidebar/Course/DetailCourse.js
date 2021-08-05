import React, { Component } from 'react';
import Navbar from '../../Navbar';
import Sidebar from '../../Sidebar';
import "../../../../../style/DetailCourse.css";
import Category from '../../Category';
import { Link } from 'react-router-dom';


class DetailCourse extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loadding: 1,
            content: [],
            assign: [],
            resource: [],
            url: [],
            folder: []
        }

    }
    componentDidMount() {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "bearer " + localStorage.getItem("token"));
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("IDCourses", this.props.match.params.id);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch("https://hcmusemu.herokuapp.com/coursescontent", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                this.setState({
                    content: result.listLabel,
                    assign: result.listAssign,
                    resource: result.listResource,
                    url: result.listUrl,
                    folder: result.listFolder,
                    loadding: 0
                })
                console.log(this.state.content)
            })
            .catch(error => console.log('error', error));
    }

    renderLabel = () => {
        if (this.state.content.length > 1) {
            var label = this.state.content.map((content) => {
                return <div className="content">{content.name}</div>
            })
            return (
                <div>
                    <div className="title">NỘI DUNG</div>
                    <hr />
                    {label}
                </div>
            )
        }
        return null
    }

    renderResource = () => {
        if (this.state.resource.length > 1) {
            var label = this.state.resource.map((resource) => {
                return <div className="content"><a href={resource.url} target="_blank" rel="noopener noreferrer">{resource.name}</a></div>
            })
            return (
                <div>
                    <div className="title">TÀI LIỆU</div>
                    <hr />
                    {label}
                </div>
            )
        }
        return null
    }

    renderAssign = () => {
        if (this.state.assign.length > 1) {
            var label = this.state.assign.map((assign) => {
                return <div className="content"><a href={assign.url} target="_blank" rel="noopener noreferrer">{assign.name}</a></div>
            })
            return (
                <div>
                    <div className="title">BÀI TẬP</div>
                    <hr />
                    {label}
                </div>
            )
        }
        return null
    }

    renderURL = () => {
        if (this.state.url.length > 1) {
            var label = this.state.url.map((url) => {
                return <div className="content"><a href={url.url} target="_blank" rel="noopener noreferrer">{url.name}</a></div>
            })
            return (
                <div>
                    <div className="title">ĐƯỜNG DẪN</div>
                    <hr />
                    {label}
                </div>
            )
        }
        return null
    }

    renderFolder = () => {
        if (this.state.folder.length > 1) {
            var label = this.state.folder.map((folder) => {
                return <div className="content"><a href={folder.url} target="_blank" rel="noopener noreferrer">{folder.name}</a></div>
            })
            return (
                <div>
                    <div className="title">ĐƯỜNG DẪN</div>
                    <hr />
                    {label}
                </div>
            )
        }
        return null
    }


    render() {
        console.log(this.props.match)
        if (this.state.folder.length === 0 && this.state.content.length === 0 && this.state.resource.length === 0 && this.state.assign.length === 0 && this.state.url.length === 0)
            return <div className="col-12" >
                <Link to="/course" style={{ background: "white", padding: "10px", boxShadow: "0 4px 24px 0 rgb(34 41 47 / 10%)", borderRadius: "7px" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-left-square" viewBox="0 0 16 17">
                        <path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm11.5 5.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
                    </svg><span style={{ margin: "0 10px" }}>Trở về</span>
                </Link>
                <Category current="Nội dung" sub1="Môn học" sub1link={"/course"} />

                <div className="col-12" style={{ textAlign: "center", margin: "20px", fontSize: "20px" }}>
                    Không có nội dung để hiển thị
                </div>
            </div>
        if (this.state.loadding === 0) {
            return (
                <div className="col-12">
                    <Link to="/course" style={{ background: "white", padding: "10px", boxShadow: "0 4px 24px 0 rgb(34 41 47 / 10%)", borderRadius: "7px" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-left-square" viewBox="0 0 16 17">
                            <path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm11.5 5.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
                        </svg><span style={{ margin: "0 10px" }}>Trở về</span>
                    </Link>
                    <Category current="Nội dung" sub1="Môn học" sub1link={"/course"} />

                    <div className="detail-course-page">
                        {/* <div className="name"></div> */}
                        {this.renderLabel()}
                        {this.renderAssign()}
                        {this.renderResource()}
                        {this.renderURL()}
                        {this.renderFolder()}
                    </div>
                </div>
            );
        }
        return <></>
    }
}

export default DetailCourse;