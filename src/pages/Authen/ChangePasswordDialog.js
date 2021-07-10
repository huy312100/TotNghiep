import React, { Component } from 'react';
import Navbar from '../../Navbar';
import NavSetting from './NavSetting';
import {withStyles,makeStyles} from '@material-ui/core'
import clsx from 'clsx'
import 'font-awesome/css/font-awesome.min.css';
const useStyles = makeStyles(() => ({
    root:{
      marginLeft: 200,
    },
    change_pw: {
      "width": "60vw",
      "margin": "76px 27.5vw",
      "background": "white",
      "boxShadow": "0px 0.5px 1px grey",
      "padding": "20px",
      "borderRadius": "10px"
    },
    pw_input: {
      "display": "flex",
      "justifyContent": "space-between",
      "alignItems": "center",
      "margin": "10px"
    },
    pw_input_label: {
      "fontWeight": "500"
    },
    pw_input__inputops: {
      "width": "40vw",
      "fontSize": "16px",
      "height": "30px"
    },
    "pw_input_input_type_password": {
      "fontSize": "16px",
      "height": "30px",
      "background": "white",
      "border": "1px solid black",
      "borderRadius": "10px",
      "margin": "0",
      "padding": "5px"
    },
    "pw_input_input_type_password__focus": {
      "background": "white",
      "boxShadow": "0px 0px 0px 0.5px black inset"
    },
    "connect_box": {
      "display": "flex",
      "justifyContent": "flex-end",
      "marginRight": "10px"
    },
    "connect_box__btnconnect_box__btnconnect": {
      "textAlign": "center",
      "width": "15vw",
      "padding": "5px",
      "border": "1px solid grey",
      "background": "#3b5da1",
      "color": "white",
      "borderRadius": "10px",
      "marginLeft": "10px"
    },
    "connect_box__btnconnect_box__btndisconnect": {
      "textAlign": "center",
      "width": "10vw",
      "padding": "5px",
      "border": "1px solid grey",
      "background": "#ff0100",
      "color": "white",
      "borderRadius": "5px",
      "marginLeft": "10px"
    },
    "connect_box__btnconnect_box__connect_status_fail": {
      "color": "red",
      "fontSize": "14px"
    },
    "connect_box__btnconnect_box__connect_status_success": {
      "color": "green",
      "fontSize": "14px"
    },
    "connect_box__btnconnect_box": {
      "display": "flex",
      "alignItems": "center",
      "justifyContent": "space-around"
    }
}));
class ChangePW extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pw: "",
            newpw: "",
            reptnewpw: "",
            loadding: 0,
            success: -1,
            repeat:0
        }

    }

    changePassword = () => {
        this.setState({ loadding: 1 })
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "bearer " + localStorage.getItem("token")+"tC");
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("Oldpassword", this.state.pw);
        urlencoded.append("Newpassword", this.state.newpw);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch("https://hcmusemu.herokuapp.com/account/changepassword", requestOptions)
            .then(response => {
                if (response.ok) {
                    return response.text()
                }
                throw Error("Không thể đổi mật khẩu")
            }
            )
            .then(result => {
                console.log(result)
                this.setState({
                    loadding: 0,
                    success: 1
                })
            })
            .catch(error => {
                console.log('error', error)
                this.setState({
                    loadding: 0,
                    success: 0
                })
            });
    }

    setParams = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    checkSuccess = () => {
       const {classes} = this.props
        if (this.state.success === 1) {
            return <div className={classes.connect_box__btnconnect_box}>
                <label className={classes.connect_box__btnconnect_box__connect_status_success}>
                    Đổi thành công
                </label>
                {this.checkLoadding()}
            </div>
        }
        if (this.state.repeat===1) {
            return <div className={classes.connect_box__btnconnect_box}>
                <label className={classes.connect_box__btnconnect_box__connect_status_fail}>
                    Nhập lại mật khẩu mới sai
                </label>
                {this.checkLoadding()}
            </div>
        }
        if (this.state.repeat===0 && this.state.success===0) {
            return <div className={classes.connect_box__btnconnect_box}>
                <label className={classes.connect_box__btnconnect_box__connect_status_fail}>
                    Mật khẩu sai
                </label>
                {this.checkLoadding()}
            </div>
        }
        else {
            return <div className={classes.connect_box__btnconnect_box}>
                <div></div>
                {this.checkLoadding()}
            </div>
        }
    }

    checkRepeatPassword = () => {
        if (this.state.newpw === this.state.reptnewpw) {
            this.setState({repeat:0,success:-1})
            this.changePassword();
        }
        else{
            this.setState({repeat:1})
        }
        
    }

    checkLoadding = () => {
      const {classes} = this.props
        if (this.state.loadding === 0) {
            return <div className={classes.connect_box__btnconnect_box__btnconnect} type="button" onClick={this.checkRepeatPassword}>Đổi mật khẩu</div>
        }
        else {
            return <div className= {classes.connect_box__btnconnect_box__btnconnect} type="button" ><i class="fa fa-circle-o-notch fa-spin"></i>Đổi mật khẩu</div>
        }
    }


    render() {
      const {classes} = this.props
        return (
            <div>
                <Navbar />
                <NavSetting />
                <div className={classes.change_pw}>
                    <div className={classes.pw_input}>
                        <label>Mật khẩu hiện tại</label>
                        <input type="password" className={clsx(classes.pw_input__inputops,classes.pw_input)} name="pw" onChange={this.setParams} value={this.state.pw} />
                    </div>
                    <div className={classes.pw_input}>
                        <label>Mật khẩu mới</label>
                        <input type="password" className={clsx(classes.pw_input__inputops,classes.pw_input)} name="newpw" onChange={this.setParams} value={this.state.newpw} />
                    </div>
                    <div className={classes.pw_input}>
                        <label>Nhập lại mật khẩu mới</label>
                        <input type="password" className={clsx(classes.pw_input__inputops,classes.pw_input)} name="reptnewpw" onChange={this.setParams} value={this.state.reptnewpw} />
                    </div>
                    <div className={classes.connect_box}>
                        {this.checkSuccess()}
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(useStyles)(ChangePW);
