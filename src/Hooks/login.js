import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import clsx from "clsx"
import { makeStyles } from '@material-ui/core';
import { Grid, FormControl,FormLabel,FormControlLabel,FormHelperText,Input,InputLabel, FormGroup,CssBaseline} from '@material-ui/core';

const useStyles = makeStyles(() => ({
    login_container: {
        marginTop: "10%", 
        marginBottom: "10%", 
        maxHeight: "300px",
        width: "90%"
      },
      info: {
        paddingTop: "5%", 
        paddingLeft: "5%"
      },
      login_form_1: {
        borderRadius: "10px", 
        padding: "3%", 
        background: "#ffffff", 
        boxShadow: "0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 9px 26px 0 rgba(0, 0, 0, 0.19)"
      },
      login_form_1_h3: {
        textAlign: "center", 
        marginBottom: "12%", 
        color: "rgb(0, 0, 0)"
      },
      btnSubmit: {
        fontWeight: "600", 
        width: "50%", 
        backgroundColor: "rgb(255, 255, 255)", 
        border: "1.5px solid black", 
        borderRadius: "1.5rem", 
        padding: "2%"
      },
      btnSubmit_hover: {
        boxShadow: "0px 0px 0px 0.5px black inset"
      },
      btnForgetPwd: {
        color: "rgb(0, 0, 0)", 
        fontWeight: "600", 
        textDecoration: "none", 
        paddingLeft: "10%"
      },
      btnForgetPwd_hover: {
        textDecoration: "none", 
        color: "rgb(100, 100, 100)"
      },
      login_input: {
        background: "#ffffff", 
        border: "1px solid black"
      }
}));
export default function LoginButton() {
    const classes = useStyles()
    const [username, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loadding, setLoadding] = useState(0);
    let history = useHistory();
    useEffect(() => {
        if (localStorage.getItem("token")) {
            history.replace("/");
        }
    })


    async function AcctionLogin() {
        setLoadding(1);

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("username", username);
        urlencoded.append("password", password);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        await fetch("https://hcmusemu.herokuapp.com/account/signin", requestOptions)
            .then(response => {
                if (response.ok && response.status==200) {
                    return response.json()
                }
                throw Error(response.status)
            })
            .then(result => {
                if (result.token !== undefined) {
                    localStorage.setItem("token", result.token)
                    console.log(result.token)
                    history.replace("/");
                }
            })
            .catch(error => {
                console.log('error', error)
                alert("Sai tài khoản hoặc mật khẩu")
                setLoadding(0);
            });
    }

    function loaddingButton() {
        if (loadding===1){
        return (
            <button className={classes.btnSubmit}>
                <i className="fa fa-circle-o-notch fa-spin">
                </i>Loading
            </button>

        )}
        return (
            <button type="button" className={classes.btnSubmit} onClick={AcctionLogin}>Đăng nhập</button>
        )
    }

    return (
        <div className={clsx(classes.login_container,classes.login_container)}>
            <Grid  container  direction="row" spacing={2} justify="center">
                <Grid  className={classes.info} item xs={8} md={8}>
                    <Grid >
                        <img width="50%" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png" alt="logo"></img>
                    </Grid>
                    <Grid >
                        <h1 className={classes.login_form_1_h3}>Ứng dụng kết nối và quản lý cổng học tập</h1>
                    </Grid>
                </Grid>
                <Grid className={classes.login_form_1} item xs={4} md={4} >
                        <h1 className={classes.login_form_1_h3}>Đăng nhập</h1>
                        <FormGroup height="50%">
                            <FormControl borderRadius = "50%">
                                <Input className={classes.login_input} name="username" placeholder="Tài khoản" onChange={(e) => setEmail(e.target.value)}/>
                            </FormControl>
                            <br></br>
                        </FormGroup>
                        <FormGroup>
                            <FormControl>
                                <Input type="password" className={classes.login_input} name="password" placeholder="Mật khẩu" onChange={(e) => setPassword(e.target.value)}/>
                            </FormControl>
                        </FormGroup>
                       <br/>
                            {loaddingButton()}
                            <Link to="/signup" className={classes.btnForgetPwd}>Đăng kí</Link>
                </Grid>
            </Grid>
        </div>
    )
}