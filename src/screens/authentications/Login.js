import React,{ useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity,Keyboard,TouchableWithoutFeedback } from "react-native";
import {
  Heading,
  UsernameInput,
  PasswordInput,
} from "../../components/authentications/commons/Index";


const LoginScreen = ({ style, navigation }) => {
  const [username,setUsername]=useState('');
  const [password,setPassword]=useState('');

  const [message,setMessage]=useState('');

  const Login = async()=>{
    if(username!="" && password!=""){
      await fetch('https://hcmusemu.herokuapp.com/account/signin',{
        method: 'POST',
        headers: {
          'Accept':'application/json',
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          "username":username,
          "password":password
        })

      }).then(res=>res.json())
      .then(resData=>{
        if(resData.message==="Auth successful"){
          navigation.navigate("Main");
        }else{
          alert(resData.message);        
        }
      })
    }
    else{
      alert("Xin vui lòng điển đầy đủ thông tin")
    }
  }
  return (
    <View style={styles.container}>
      <Heading>Đăng nhập</Heading>
      <UsernameInput placeholder={"Tên đăng nhập"}
        onChangeText={(username)=>setUsername(username)}
      ></UsernameInput>

      <PasswordInput placeholder={"Mật khẩu"}
        onChangeText={(password)=>setPassword(password)}
      ></PasswordInput>


      <TouchableOpacity style={styles.buttonLoginContainer}
        onPress={() => {Login()}}>
        <Text style={styles.textBtnLogIn}>Đăng nhập</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.forgetPassText}>Quên mật khẩu?</Text>
      </TouchableOpacity>

      <View style={styles.bottomText}>
        <Text>Chưa có tài khoản?</Text>
        <TouchableOpacity onPress={() =>{
          navigation.navigate("Register");
        }}>
          <Text style={styles.signupText}>Đăng ký ngay</Text>
        </TouchableOpacity>
      </View>
    </View>
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

});

export default LoginScreen;
