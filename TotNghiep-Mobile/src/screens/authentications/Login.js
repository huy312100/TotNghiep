import React,{ useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity,Keyboard,TouchableWithoutFeedback} from "react-native";
import {
  Heading,
  UsernameInput,
  PasswordInput,
} from "../../components/authentications/common/Index";

import { useDispatch } from 'react-redux';

import AsyncStorage from '@react-native-async-storage/async-storage';

import * as authActions from '../../../store/actions/Authen';

import LoadingScreen from '../LoadingScreen';


const LoginScreen = ({navigation}) => {

  const dispatch =useDispatch();

  const [username,setUsername]=useState('');
  const [password,setPassword]=useState('');
  const [isLoading,setLoading]=useState(false);

  const loginAPI=async()=>{
    if(username!="" && password!=""){
      setLoading(true);
      let details = {
        'username': username,
        'password': password
    };
  
    let formBody = [];
    for (let property in details) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
  
    await fetch('https://hcmusemu.herokuapp.com/account/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formBody
      }).then((response) => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
      })
        .then(async ([statusCode, data]) => {
            console.log(statusCode,data);
            setLoading(false);
            if(statusCode===200 && data.role==="2"){
              const token = data.token + 'tC';
              await AsyncStorage.setItem('tokenValue',token);
              dispatch(authActions.login(token));
              navigation.navigate("Main");
              setLoading(false);
            }else{
              setLoading(false);
              alert("Tài khoản hoặc mật khẩu không đúng.Xin vui lòng thử lại")
            }
        }).done();
    }
    else{
      alert("Xin vui lòng điển đầy đủ thông tin");
    }
 }
  return (
    <TouchableWithoutFeedback onPress={()=>{
      Keyboard.dismiss();
    }}>
      <View style={styles.container}>

        <Heading style={{textAlign: "center", paddingTop: 30}}>Đăng nhập</Heading>
        <UsernameInput placeholder={"Tên đăng nhập"}
          onChangeText={(username)=>setUsername(username)}/>

        <PasswordInput placeholder={"Mật khẩu"}
          onChangeText={(password)=>setPassword(password)}/>

        <TouchableOpacity>
          <Text style={styles.forgetPassText}>Lấy lại mật khẩu</Text>
        </TouchableOpacity>


        <TouchableOpacity style={styles.buttonLoginContainer} testID="Button.Login"
          onPress={() => {
            loginAPI();
            }}>
          <Text style={styles.textBtnLogIn}>Đăng nhập</Text>
        </TouchableOpacity>

        {isLoading && LoadingScreen()}
        </View>
    </TouchableWithoutFeedback>
    
  );
};

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    paddingTop: 30,
  },

  passInput: {
    backgroundColor: "#ccc",
    width: "100%",
  },

  forgetPassText: {
    fontWeight: "bold",
    color: "blue",
    fontSize: 16,
    marginTop: 20,
    marginLeft: 20
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
    backgroundColor: "blue",
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
    borderRadius: 100,
    paddingTop:20,
    paddingBottom:20,
    marginTop:90,
    marginLeft:20,
    marginRight:20
  },

  textBtnLogIn: {
    color: "white",
    fontWeight: "bold",
    fontSize: 25,
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
