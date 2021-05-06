import React, { Component } from 'react';
import Navbar from '../../Navbar';
import NavSetting from './NavSetting';
import "../../../../../style/SetURL.css"

class SetURL extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: "0"
        }
    }


    checkTypeWeb = () => {
        if (this.state.type === "3") {
            return (
                <></>
            )
        }
        else {
            return (
                <div>
                    <div className="lb-input">
                        <label>Tài khoản</label>
                        <input className="inputops" />
                    </div>
                    <div className="lb-input">
                        <label>Mật khẩu</label>
                        <input className="inputops" />
                    </div>
                </div>
            )
        }
    }

    setParams = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <div>
                <Navbar />
                <NavSetting />
                <div>
                    <div className="seturl-box">
                        <div className="lb-input">
                            <label>Loại trang web</label>
                            <select className="form-control inputops" name="type" onChange={this.setParams} value={this.state.type}>
                                <option value="0">Moodle</option>
                                <option value="1">Slack</option>
                                <option value="2">Trello</option>
                                <option value="3">Portal</option>
                            </select>
                        </div>
                        <div className="lb-input">
                            <label>Địa chỉ trang web(URL)</label>
                            <input className="inputops" />
                        </div>
                        {this.checkTypeWeb()}
                        <div className="btnconnect-box">
                            <div className="btnconnect" type="button">Kết nối</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SetURL;