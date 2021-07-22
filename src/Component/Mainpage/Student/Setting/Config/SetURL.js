import React, { Component } from 'react';
import Navbar from '../../Navbar';
import NavSetting from './NavSetting';
import "../../../../../style/SetURL.css"
import SetURLSuccuss from '../../../../../hook/seturl';

class SetURL extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: "Moodle",
            username: "",
            password: "",
            url: "",
            success: -1,
            loadding: 0,
            unlinkloadding: 0,
            tag: 1,
            connected: []
        }
    }

    getConnectedWeb = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "bearer " + localStorage.getItem("token"));

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("https://hcmusemu.herokuapp.com/web/getcustomlink", requestOptions)
            .then(response => {
                if (response.ok)
                    return response.json()
                throw Error("Đã có lỗi xảy ra")
            })
            .then(result => {
                console.log(result)
                this.setState({
                    connected: result,
                    username:result.find(x=>x.Type==="Moodle").Username,
                    url:result.find(x=>x.Type==="Moodle").Url
                })
                
            })
            .catch(error => console.log('error', error));
    }

    componentDidMount() {
        this.getConnectedWeb();
    }


    checkTypeWeb = () => {
        // if (this.state.type === "Portal") {
        //     return (
        //         <></>
        //     )
        // }
        // else {
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
        // }
    }

    checkConnect = () => {
        var portalunlink = this.state.connected.indexOf("Portal") === -1 ? <></> : <div className="btndisconnect" type="button" onClick={this.disconnect3rdApp}>Hủy thông tin đã lưu</div>;
        var moodleunlink = <div className="btndisconnect" type="button" onClick={this.disconnect3rdApp}>Hủy thông tin đã lưu</div>;
        var trellounlink = this.state.connected.indexOf("Trello") === -1 ? <></> : <div className="btndisconnect" type="button" onClick={this.disconnect3rdApp}>Hủy thông tin đã lưu</div>;
        var slackunlink = this.state.connected.indexOf("Slack") === -1 ? <></> : <div className="btndisconnect" type="button" onClick={this.disconnect3rdApp}>Hủy thông tin đã lưu</div>;
        var type = [portalunlink, moodleunlink, trellounlink, slackunlink];


        if (this.state.loadding === 1) {
            return <div className="btnconnect-box">
                <div></div>
                <div className="btnconnect" type="button"><i class="fa fa-circle-o-notch fa-spin"></i>Lưu</div>
            </div>
        }
        if (this.state.unlinkloadding === 1) {
            return <div className="btnconnect-box">
                <div></div>
                <div className="gr-btnconnect">
                    <div className="btndisconnect" type="button"><i class="fa fa-circle-o-notch fa-spin"></i>Hủy thông tin đã lưu</div>
                    <div className="btnconnect" type="button"><i class="fa fa-circle-o-notch fa-spin"></i>Chờ</div>
                </div>
            </div>
        }
        if (this.state.success === 0) {
            return (
                <div className="btnconnect-box">
                    <label className="connect-status">
                        Lưu thất bại
                    </label>
                    <div className="btnconnect" type="button" onClick={this.connect3rdApp}>Thử lại</div>
                </div>
            )
        }
        else {
            return <div className="btnconnect-box">
                <div></div>
                <div className="gr-btnconnect">
                    {type[this.state.tag]}
                    <div className="btnconnect" type="button" onClick={this.connect3rdApp}>Lưu</div>
                </div>
            </div>
        }
    }

    disconnect3rdApp = async () => {
        this.setState({ unlinkloadding: 1 })
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "bearer " + localStorage.getItem("token"));
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("typeUrl", "Portal");

        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        await fetch("https://hcmusemu.herokuapp.com/web/deleteaccount", requestOptions)
            .then(response => {
                console.log(response.status);
                if (response.status === 500) {
                    return response.text();
                }
                else {
                    throw new Error('Hủy thông tin đã lưu thất bại');
                }
            })
            .then(result => {
                console.log(result)
                this.setState({
                    unlinkloadding: 0
                })
            })
            .catch(error => {
                console.log('error', error)
                this.setState({
                    unlinkloadding: 0
                })
            });

        this.getConnectedWeb();
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
                    throw new Error('Lưu thất bại');
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
        if (numtag !== this.state.tag) {
            this.setState({
                success: -1
            })
        }
        this.setState({
            tag: numtag,
            type: type[numtag]
        })
    }

    renderSetULRbox = () => {
        // var portaltag = this.state.tag === 0 ? "portal" : "";
        // var moodletag = this.state.tag === 1 ? "moodle" : "";
        // var trellotag = this.state.tag === 2 ? "trello" : "";
        // var slacktag = this.state.tag === 3 ? "slack" : "";

        // if (this.state.connected.length>0) {
        //     var portallink = this.state.connected.indexOf("Portal") === -1 ? "" : <i class="fa fa-check-circle fa-fw" style={{ color: "green" }}></i>;
        //     var moodlelink = this.state.connected.indexOf("Moodle") === -1 ? "" : <i class="fa fa-check-circle fa-fw" style={{ color: "green" }}></i>;
        //     var trellolink = this.state.connected.indexOf("Trello") === -1 ? "" : <i class="fa fa-check-circle fa-fw" style={{ color: "green" }}></i>;
        //     var slacklink = this.state.connected.indexOf("Slack") === -1 ? "" : <i class="fa fa-check-circle fa-fw" style={{ color: "green" }}></i>;
        // }
        // else {
        //     var portallink = ""
        //     var moodlelink = ""
        //     var trellolink = ""
        //     var slacklink = ""
        // }

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
                {/* <div className="seturl-tag" >
                    <div className="tag">
                        <div type="button" className={"btn-seturl " + portaltag} onClick={(numtag) => this.clickTag(0)}>Portal {portallink}
                        </div>
                        <div type="button" className={"btn-seturl " + moodletag} onClick={(numtag) => this.clickTag(1)}>Moodle {moodlelink}
                        </div>
                        <div type="button" className={"btn-seturl " + trellotag} onClick={(numtag) => this.clickTag(2)}>Trello {trellolink}
                        </div>
                        <div type="button" className={"btn-seturl " + slacktag} style={{ marginTop: "2px" }} onClick={(numtag) => this.clickTag(3)}>Slack {slacklink}
                        </div>
                    </div>
                </div > */}
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
            </div >
        )
    }


    render() {
        // console.log(this.state.success === 0)
        let checkrender = this.state.success === 1 ? (<div className="seturl-successbox"><SetURLSuccuss /></div>) : this.renderSetULRbox();
        return (
            <div>
                {/* <Navbar /> */}
                <NavSetting />
                <div style={{margin:"auto"}} className="col col-12 col-md-6">
                    {checkrender}

                </div>

            </div>
        );
    }
}

export default SetURL;