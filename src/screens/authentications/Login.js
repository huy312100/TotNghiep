import React,{ useState } from "react";
import { 
  Dimensions,
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Image
}from "react-native";

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
            if(statusCode===200 && data.role==="1"){
              if(data.firstsign === true){
                const token = data.token + 'sT';
                await AsyncStorage.setItem('tokenValue',token);
                dispatch(authActions.login(token));
                navigation.navigate("Start Config");
                setLoading(false);
              }
              else{
                const token = data.token + 'sT';
                await AsyncStorage.setItem('tokenValue',token);
                dispatch(authActions.login(token));
                navigation.reset({
                  routes: [{ name: "Main" }]
                });
                setLoading(false);
              }
             
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

          <Image style={styles.imageLogo} source={require("../../../assets/logo.png")}/>
          <Heading>E M U</Heading>

          <UsernameInput label="Email"
            hideLabel={username !== ''}
            onChangeText={(username)=>setUsername(username)}/>

          <PasswordInput label="Mật khẩu"
            hideLabel={password !== ''}
            onChangeText={(password)=>setPassword(password)}/>

          <View style={styles.viewForgetPassword}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Forget Password');
              }}
            >
              <Text style={styles.forgetPassText}>Quên mật khẩu?</Text>
            </TouchableOpacity>
          </View>



          <TouchableOpacity style={styles.buttonLoginContainer} testID="Button.Login"
            onPress={() => {
              loginAPI();
              }}>
            <Text style={styles.textBtnLogIn}>Đăng nhập</Text>
          </TouchableOpacity>

          <View style={styles.bottomText}>
            <Text>Chưa có tài khoản?</Text>
            <TouchableOpacity onPress={() =>{
              //dispatch(universityActions.getAllInfoUniversity());
              navigation.navigate("Register");
              
            }}>
              <Text style={styles.signupText}>Đăng ký ngay</Text>
            </TouchableOpacity>
          </View>

          {isLoading && LoadingScreen()}
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
    paddingTop: 50,
  },

  imageLogo: {
    width:Dimensions.get("window").width * 0.35,
    height:Dimensions.get("window").height * 0.15,
  },

  passInput: {
    backgroundColor: "#ccc",
    width: "100%",
  },

  viewForgetPassword: {
    width:'100%',
    alignItems: 'flex-end',
    paddingRight:5,
    marginVertical:Dimensions.get("window").height * 0.018
  },

  forgetPassText: {
    fontWeight: "bold",
    color: "#336633",
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
    backgroundColor: "#0066FF",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    paddingVertical:Dimensions.get("window").height * 0.02
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
