import React, { Component } from 'react';
import Navbar from '../../Navbar';
import Sidebar from '../../Sidebar';
import "../../../../../style/DetailCourse.css";


class DetailCourse extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loadding: 1,
            content: [],
            assign:[],
            resource:[],
            url:[],
            folder:[]
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
                    assign:result.listAssign,
                    resource:result.listResource,
                    url:result.listUrl,
                    folder:result.listFolder,
                    loadding: 0
                })
                console.log(this.state.content)
            })
            .catch(error => console.log('error', error));
    }

    renderLabel = () =>{
        if (this.state.content.length>1){
            var label = this.state.content.map((content)=>{
                return <div className="content">{content.name}</div>
            })
            return (
                <div>
                    <div className="title">NỘI DUNG</div>
                    <hr/>
                    {label}
                </div>
            )
        }
        return <></>
    }

    renderResource = () =>{
        if (this.state.resource.length>1){
            var label = this.state.resource.map((resource)=>{
                return <div className="content"><a href={resource.url} target="_blank" rel="noopener noreferrer">{resource.name}</a></div>
            })
            return (
                <div>
                    <div className="title">TÀI LIỆU</div>
                    <hr/>
                    {label}
                </div>
            )
        }
        return <></>
    }

    renderAssign = () =>{
        if (this.state.assign.length>1){
            var label = this.state.assign.map((assign)=>{
                return <div className="content"><a href={assign.url} target="_blank" rel="noopener noreferrer">{assign.name}</a></div>
            })
            return (
                <div>
                    <div className="title">BÀI TẬP</div>
                    <hr/>
                    {label}
                </div>
            )
        }
        return <></>
    }

    renderURL = () =>{
        if (this.state.url.length>1){
            var label = this.state.url.map((url)=>{
                return <div className="content"><a href={url.url} target="_blank" rel="noopener noreferrer">{url.name}</a></div>
            })
            return (
                <div>
                    <div className="title">ĐƯỜNG DẪN</div>
                    <hr/>
                    {label}
                </div>
            )
        }
        return <></>
    }

    renderFolder = () =>{
        if (this.state.folder.length>1){
            var label = this.state.folder.map((folder)=>{
                return <div className="content"><a href={folder.url} target="_blank" rel="noopener noreferrer">{folder.name}</a></div>
            })
            return (
                <div>
                    <div className="title">ĐƯỜNG DẪN</div>
                    <hr/>
                    {label}
                </div>
            )
        }
        return <></>
    }


    render() {
        console.log(this.props.match)
        if (this.state.loadding === 0) {
            return (
                <div>
                    <Navbar />
                    <Sidebar />
                    <div className="detail-course-page">
                        <div className="name">Quản trị CSDL hiện đại - 17HTTT</div>
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