import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import clsx from "clsx"
import { makeStyles, Typography } from '@material-ui/core';
import { Grid, FormControl,Input, FormGroup,Box,IconButton,InputAdornment ,Button} from '@material-ui/core';
import Logo from "../images/logo.png"
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { School } from '@material-ui/icons';
const useStyles = makeStyles(() => ({
    root:{
        justifyContent: "absolute"
    },
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
        background: "#ebedc7", 
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
      btnSignUp: {
        color: "blue", 
        textDecoration: "none", 
        paddingLeft: "5px"
      },
      btnForgetPwd_hover: {
        textDecoration: "none", 
        color: "rgb(100, 100, 100)"
      },
      login_input: {
        background: "#ffffff", 
        border: "1px solid black"
      },
      inputContainer: {
        justifyContent: 'center',
      },
      input: {
        height: 50,
      },
      icon: {
        position: 'absolute',
        right: 10,
      }
    
}));
export default function LoginButton() {
    const classes = useStyles()
    const [username, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loadding, setLoadding] = useState(0);
    const [visible, setVisible] = useState(false);
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
                    console.log(result.role);
                    if (result.role === "1"){
                      localStorage.setItem("token", result.token+ "sT")
                    }
                    else{
                      localStorage.setItem("token", result.token+ "tC")
                    }
                    localStorage.setItem("expired",(new Date().getTime()+7200000))
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
                <Button className={classes.btnSubmit} onClick={()=>AcctionLogin()}>Đăng nhập</Button>
        )
    }
    
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };
      const handleClickShowPassword = () => {
        setVisible(!visible);
      };
    return (
        <Box  width="95%" className={classes.root} border={2.5} style={{marginLeft: "20px", marginRight:"20px", marginTop:"100px", marginBottom:"100px",backgroundColor:"#d5f3f5"}}>
        <div className={clsx(classes.login_container,classes.login_container)}>
            <Grid  container  direction="row" spacing={2} justify="center">
                    
                <Grid  className={classes.info} item xs={4} md={8}>
                    <Grid >
                        <h1 className={classes.login_form_1_h3}>Ứng dụng kết nối và quản lý học tập</h1>
                    </Grid>
                    
                    <Grid
                        style={{
                            position: 'absolute', 
                            left: '45%', 
                            top: '55%',
                            transform: 'translate(-50%, -50%)'
                        }}
                    >                      
                        <img style={{alignSelf: "center"}} width="30%" src={Logo} alt="logo"></img>
                    </Grid>
                  
                </Grid>
              
                <Grid className={classes.login_form_1} item xs={4} md={4} >
                        <h1 className={classes.login_form_1_h3}><School/>&nbsp;Đăng nhập</h1>
                        <FormGroup height="50%">
                            <FormControl borderRadius = "50%">
                                <Input className={classes.login_input} name="username" placeholder="Tài khoản" onChange={(e) => setEmail(e.target.value)}/>
                            </FormControl>
                            <br></br>
                        </FormGroup>
                        <FormGroup>
                            <FormControl >
                                <div style={{position: 'relative', display: 'inline-block'}}>
                                    <Input type={visible ? "text" : "password"}
                                    className={classes.login_input} 
                                    name="password"
                                    placeholder="Mật khẩu" 
                                    onChange={(e) => setPassword(e.target.value)}
                                    style={{width:"100%"}}
                                    endAdornment={
                                        <InputAdornment position="end">
                                          <IconButton
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                          >
                                            {visible? <VisibilityIcon /> : <VisibilityOffIcon />}
                                          </IconButton>
                                        </InputAdornment>
                                      }
                                    />
                                 </div>
                            </FormControl>
                        </FormGroup>
                       <br/>
                          {loaddingButton()}
                          <Link to="/resetpassword" className={classes.btnForgetPwd}>Quên mật khẩu?</Link>
                      <br/>
                      {/*<div style={{textAlign:"center"}}>
                      <Typography>Bạn chưa có tài khoản?
                        <Link to="/signup" className={classes.btnSignUp}>
                          Đăng ký ngay
                        </Link>
                        </Typography>
                      </div>*/}
                </Grid>
               
            </Grid>
        </div>
        </Box>
    )
}