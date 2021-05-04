import React,{ useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity,ActivityIndicator,Keyboard,TouchableWithoutFeedback} from "react-native";
import {
  Heading,
  UsernameInput,
  PasswordInput,
} from "../../components/authentications/common/Index";

import { useDispatch } from 'react-redux';
import * as authActions from '../../../store/actions/Authen';
import * as universityActions from "../../../store/actions/University";


const LoginScreen = ({ navigation }) => {

  const [username,setUsername]=useState('');
  const [password,setPassword]=useState('');
  const [isLoading,setLoading]=useState(false);
  const dispatch = useDispatch();

//   const getLoginAPI=async()=>{
//     Keyboard.dismiss();
//     if(username!="" && password!=""){
//       setLoading(true);
//       let details = {
//         'username': username,
//         'password': password
//     };
  
//     let formBody = [];
//     for (let property in details) {
//         let encodedKey = encodeURIComponent(property);
//         let encodedValue = encodeURIComponent(details[property]);
//         formBody.push(encodedKey + "=" + encodedValue);
//     }
//     formBody = formBody.join("&");
  
//     await fetch('https://hcmusemu.herokuapp.com/account/signin', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/x-www-form-urlencoded'
//         },
//         body: formBody
//       }).then((response) => {
//         const statusCode = response.status;
//         const data = response.json();
//         return Promise.all([statusCode, data]);
//       })
//         .then( ([statusCode, data]) => {
//             console.log(statusCode,data);
//             setLoading(false);
//             if(statusCode===200){
//               navigation.navigate("Main");
//             }else{
//               alert("Tài khoản hoặc mật khẩu không đúng.Xin vui lòng thử lại")
//             }
//         }).done();
//     }

//     else{
//       alert("Xin vui lòng điển đầy đủ thông tin");
//     }
//  }

  const loginHandler = async () =>{
    Keyboard.dismiss();
    setLoading(true);

    try{
      await dispatch(authActions.login(username,password));
      navigation.navigate("Main");
    }
    catch(err){
      console.log(err.message);
      setLoading(false);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={()=>{
      Keyboard.dismiss();
    }}>
      <View style={styles.container}>

        <Heading>Đăng nhập</Heading>
        <UsernameInput placeholder={"Tên đăng nhập"}
          onChangeText={(username)=>setUsername(username)}/>

        <PasswordInput placeholder={"Mật khẩu"}
          onChangeText={(password)=>setPassword(password)}/>


        <TouchableOpacity style={styles.buttonLoginContainer}
          onPress={() => {
            loginHandler();
            }}>
          <Text style={styles.textBtnLogIn}>Đăng nhập</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.forgetPassText}>Quên mật khẩu?</Text>
        </TouchableOpacity>

        <View style={styles.bottomText}>
          <Text>Chưa có tài khoản?</Text>
          <TouchableOpacity onPress={() =>{
            dispatch(universityActions.getAllInfoUniversity());
            navigation.navigate("Register");
            
          }}>
            <Text style={styles.signupText}>Đăng ký ngay</Text>
          </TouchableOpacity>
        </View>

        {isLoading && <View style={styles.loading}>
          <ActivityIndicator size="large" color="#EEEEEE" />
          <Text style={styles.txtIndicator}>Đang xử lí ...</Text>
          </View>}
        </View>
    </TouchableWithoutFeedback>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 10,
    paddingTop: 120,
  },

  passInput: {
    backgroundColor: "#ccc",
    width: "100%",
  },

  forgetPassText: {
    fontWeight: "bold",
    color: "blue",
    fontSize: 16,
  },

  bottomText: {
    flex: 1,
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    marginBottom: 20,
    flexDirection: "row",
    fontSize: 14,
  },

  signupText: {
    color: "red",
    fontWeight: "bold",
    marginLeft: 5,
  },

  buttonLoginContainer: {
    backgroundColor: "green",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
    borderRadius: 10,
    paddingTop:20,
    paddingBottom:20
  },

  textBtnLogIn: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },

  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.5)'
  },

  txtIndicator: {
    fontSize:15,
    fontWeight: "bold",
    color:"#EEEEEE"
  }
});

export default LoginScreen;
