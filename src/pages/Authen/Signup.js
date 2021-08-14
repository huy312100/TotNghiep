import React, {useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {InputAdornment,Container,Typography,Box,Grid,Link,TextField,CssBaseline,Button} from "@material-ui/core"
import logo from "../../images/logo.png"
import VisibilityPasswordTextField from "../../components/shared/VisibilityPasswordTextField"
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
function Copyright() {
  var dt = new Date();
  return (
    <Typography variant="h5" color="textSecondary" align="center">
      {"EMU"} {(dt.getMonth() + 1) + "/" + dt.getDate() +"/"+ dt.getFullYear()  }
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const [isVisible,setVisible] = useState(true);
  const [email,setEmail] = useState(null);
  const [pass,setPass] = useState(null);
  const [retype,setRetype] = useState(null);
  const [name,setName] = useState(null);
  const [listUni,setListUni] = useState([]);
  const [listFac,setListFac] = useState([]);
  const [uniselected,setUniSelected] = useState("");
  const [facselected,setFacSelected] = useState("");
  const [upLoading,setUpLoading] = useState(false);

  const handleVisible = () =>{
    setVisible(!isVisible);
  }

  const onChangeName = (event) =>{
    setName(event.target.value)
  }
  const onChangeEmail = (event) =>{
    setEmail(event.target.value)
  }
  const onChangePass = (event) =>{
    setPass(event.target.value);
  }

  const onChangeRetype = (event) =>{
    setRetype(event.target.value);
  }

  const changeUniValue = (e) =>{
    setUniSelected(e.target.value);
  }

  const changeFacValue = (e) =>{
    setFacSelected(e.target.value);
  }
  
  useEffect(()=>{
    loadUni();      
  },[])

  useEffect(()=>{
   if (uniselected !== null  || uniselected !== ""){
    loadingFaculty();
   }
  },[uniselected])
  const loadUni = async() => {

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    await fetch("https://hcmusemu.herokuapp.com/university/getname", requestOptions)
        .then(response => response.json())
        .then(result => {
            setUniSelected(result[0].MaTruong)
            var uni = result.map((value, index) => {
                return <option key={index} value={value.MaTruong}>{value.TenTruongDH}</option>;
            })
            setListUni(uni);
        })
        .catch(error => console.log('error', error));
  }

  const loadingFaculty = async() => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("MaTruong", uniselected);
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    await fetch("https://hcmusemu.herokuapp.com/faculty/getname", requestOptions)
        .then(response => response.json())
        .then(result => {
            setFacSelected(result[0].MaKhoa);
            var fa = result.map((value, index) => {
                return <option key={index} value={value.MaKhoa}>{value.TenKhoa}</option>;
            })
            setListFac(fa);
        })
        .catch(error => console.log('error', error));
  }


  const SignUpAPI = async() => {
    setUpLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("username", email);
    urlencoded.append("password",pass);
    urlencoded.append("HoTen",name);
    urlencoded.append("MaTruong",uniselected);
    urlencoded.append("MaKhoa",facselected);
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    await fetch("https://hcmusemu.herokuapp.com/account/signup", requestOptions)
        .then((response) => {
          const statusCode = response.status;
          const dataRes = response.json();
          return Promise.all([statusCode, dataRes]);
        })
        .then(([statusCode, dataRes]) => {
            console.log(statusCode,dataRes);
            if (statusCode === 201){
              alert("Đăng kí thành công")
            }
            else{
              alert("Đăng kí thất bại");
            }
            setUpLoading(false);
        })
        .catch(error => console.log('error', error));
  }
  
  const renderUni = ()=>{
    return(
      <div>
        <Typography>Hãy chọn ngôi trường bạn đang giảng dạy:</Typography>
        <select className="form-control" name="uniselected" onChange={(e)=>changeUniValue(e)} value={uniselected}>
          {listUni}
        </select>
      </div>
    )
    
  }

  const renderFac = ()=>{
    return(
      <div>
        <Typography>Hãy chọn khoa bạn đang giảng dạy:</Typography>
        <select className="form-control" name="facselected" onChange={(e)=>changeFacValue(e)} value={facselected}>
       {listFac}
        </select>
      </div>
    )
    
  }

  const renderMatchPass = () =>{
    
    if ((pass !== null || pass !== "") && (retype !== null || retype !== "")){
      if (pass === retype){
        return <DoneIcon style={{backgroundColor:"#3aeb34", borderRadius: "50%" }}/>
      }
      else{
        return <CloseIcon style={{backgroundColor:"red",borderRadius: "50%"}}/>
      }
    }
  }
  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  const handlerSubmit = () =>{
    if (email === null || email === ""){
      alert("Bạn chưa nhập email !!!");
    }
    else if (validateEmail(email) === false){
      alert("Tài khoản phải là một email !!!")
    }
    else if (pass === null || pass === ""){
      alert("Bạn chưa nhập mật khẩu !!!")
    }
    else if (retype === null || retype === ""){
      alert("Bạn chưa nhập lại mật khẩu !!!")
    }
    else{
      SignUpAPI();
    }
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <img style={{width:"30%",height:"30%",borderRadius: "50%"}} src={logo}/>
        <Typography component="h1" variant="h5">
          Đăng ký tài khoản
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2} direction="row" alignItems="center">
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email tài khoản"
                autoComplete
                value = {email}
                onChange = {(e)=>onChangeEmail(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                autoComplete
                id="name"
                label="Họ và tên"
                value = {name}
                onChange = {(e)=>onChangeName(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <VisibilityPasswordTextField
                isVisible = {isVisible}
                onVisibilityChange = {handleVisible}
                variant="outlined"
                required
                autoComplete
                fullWidth
                label="Mật khẩu"
                type="password"
                id="password"
                value = {pass}
                onChange = {(e) => onChangePass(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Nhập lại mật khẩu"
                type={isVisible === true ? "text" : "password"}
                id="retype_password"
                value = {retype}
                onChange = {(e) => onChangeRetype(e)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end" alignItems="center">
                        {renderMatchPass()}
                    </InputAdornment>
                  ),
                }}
              />

            </Grid>
          </Grid>
          <br/>
          {renderUni()}
          <br/>
          {renderFac()}
          {upLoading === false ? <Button
            id ="DangKy"
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={()=>handlerSubmit()}
          >
            Đăng ký
          </Button> 
          :
          <Button fullWidth >
            <i className="fa fa-circle-o-notch fa-spin">
            </i>Loading
          </Button>
          }
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Đã có tài khoản ? Đăng nhập ngay
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}