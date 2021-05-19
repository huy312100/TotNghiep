import React, { Component } from 'react';
import Navbar from '../../Navbar';
import Sidebar from '../../Sidebar';

class DetailCourse extends Component {

    constructor(props) {
        super(props);
        this.state ={
            content:[]
        }

    }
    componentDidMount() {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "bearer "+localStorage.getItem("token"));
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
                    content:result.listLabel
            })
            console.log(this.state.content)
        })
            .catch(error => console.log('error', error));
    }


    render() {
        return (
            <div>
                <Navbar />
                <Sidebar />
                <div>
                    {/* {this.state.content} */}
                </div>
            </div>
        );
    }
}

export default DetailCourse;