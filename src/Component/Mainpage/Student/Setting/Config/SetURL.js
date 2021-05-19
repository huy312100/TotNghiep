import React, { Component } from 'react';
import Navbar from '../../Navbar';
import NavSetting from './NavSetting';
import "../../../../../style/SetURL.css"
import SetURLSuccuss from '../../../../../hook/seturl';

class SetURL extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: "Portal",
            username: "",
            password: "",
            url: "",
            success: -1,
            loadding: 0,
            tag: 0
        }
    }


    checkTypeWeb = () => {
        if (this.state.type === "Portal") {
            return (
                <></>
            )
        }
        else {
            return (
                <div>
                    <div className="lb-input">
                        <label>Tài khoản</label>
                        <input className="inputops" name="username" onChange={this.setParams} value={this.state.username} />
                    </div>
                    <div className="lb-input">
                        <label>Mật khẩu</label>
                        <input type="password" className="inputops" name="password" onChange={this.setParams} value={this.state.password} />
                    </div>
                </div>
            )
        }
    }

    checkConnect = () => {
        if (this.state.loadding === 1) {
            return <div className="btnconnect-box">
                <div></div>
                <div className="btnconnect" type="button"><i class="fa fa-circle-o-notch fa-spin"></i>Kết nối</div>
            </div>
        }
        if (this.state.success === 0) {
            return (
                <div className="btnconnect-box">
                    <label className="connect-status">
                        Kết nối thất bại
                </label>
                    <div className="btnconnect" type="button" onClick={this.connect3rdApp}>Thử lại</div>
                </div>
            )
        }
        else {
            return <div className="btnconnect-box">
                <div></div>
                <div className="btnconnect" type="button" onClick={this.connect3rdApp}>Kết nối</div>
            </div>
        }
    }

    connect3rdApp = () => {
        this.setState({
            loadding: 1
        })
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "bearer " + localStorage.getItem("token"));
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("typeUrl", this.state.type);
        urlencoded.append("url", this.state.url);
        urlencoded.append("username", this.state.username);
        urlencoded.append("password", this.state.password);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch("https://hcmusemu.herokuapp.com/web/postaccountcustom", requestOptions)
            .then(response => {
                console.log(response.status);
                if (response.status === 201) {
                    return response.text();
                }
                else {
                    throw new Error('Kết nối thất bại');
                }
            })
            .then(result => {
                console.log(result)
                this.setState({
                    success: 1
                })
            })
            .catch(error => {
                console.log('error', error)
                this.setState({
                    success: 0,
                    loadding: 0
                })
            });


    }

    setParams = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    clickTag = (numtag) => {
        var type = ['Portal', 'Moodle', 'Trello', 'Slack'];
        if (numtag!==this.state.tag){
            this.setState({
                success:-1
            })
        }
        this.setState({
            tag: numtag,
            type:type[numtag]
        })
    }

    renderSetULRbox = () => {
        var portaltag = this.state.tag === 0 ? "portal" : "";
        var moodletag = this.state.tag === 1 ? "moodle" : "";
        var trellotag = this.state.tag === 2 ? "trello" : "";
        var slacktag = this.state.tag === 3 ? "slack" : "";


        return (
            <div>
                {/* <div className="lb-input">
                <label>Loại trang web</label>
                <select className="inputops typebox" name="type" onChange={this.setParams} value={this.state.type}>
                    <option value="Moodle">Moodle</option>
                    <option value="Slack">Slack</option>
                    <option value="Trello">Trello</option>
                    <option value="Portal">Portal</option>
                </select>
            </div> */}
                <div className="seturl-tag">
                    <div className="tag">
                        <div type="button" className={"btn-seturl " + portaltag} onClick={(numtag) => this.clickTag(0)}>Portal
                        </div>
                        <div type="button" className={"btn-seturl " + moodletag} onClick={(numtag) => this.clickTag(1)}>Moodle
                        </div>
                        <div type="button" className={"btn-seturl " + trellotag} onClick={(numtag) => this.clickTag(2)}>Trello
                        </div>
                        <div type="button" className={"btn-seturl " + slacktag} onClick={(numtag) => this.clickTag(3)}>Slack
                        </div>
                    </div>
                </div>
                <div className="seturl-box">

                    <div className="lb-input">
                        <label>Địa chỉ trang web(URL)</label>
                        <input className="inputops inputpw" name="url" onChange={this.setParams} value={this.state.url} />
                    </div>
                    {this.checkTypeWeb()}
                    <div className="info-connect">

                        {this.checkConnect()}
                    </div>
                </div>
            </div>
        )
    }


    render() {
        console.log(this.state.success === 0)
        let checkrender = this.state.success === 1 ? (<div className="seturl-box"><SetURLSuccuss /></div>) : this.renderSetULRbox();
        return (
            <div>
                <Navbar />
                <NavSetting />
                <div>
                    {checkrender}

                </div>

            </div>
        );
    }
}

export default SetURL;