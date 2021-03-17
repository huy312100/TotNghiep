import React from "react";
import { StyleSheet, Text, View, TouchableOpacity,Keyboard,TouchableWithoutFeedback } from "react-native";
import {
  Heading,
  UsernameInput,
  PasswordInput,
} from "../../components/authentications/commons/Index";

const LoginScreen = ({ style, navigation }) => {
  return (
    <View style={styles.container}>
      <Heading>Đăng nhập</Heading>
      <UsernameInput placeholder={"Tên đăng nhập"}></UsernameInput>

      <PasswordInput placeholder={"Mật khẩu"}></PasswordInput>

      <View style={[style, styles.buttonLoginContainer]}>
        <TouchableOpacity style={styles.btnLoginTouchable}
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <Text style={styles.textBtnLogIn}>Đăng nhập</Text>
        </TouchableOpacity>
      </View>

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
    justifyContent: "center",
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
    padding: 20,
    marginVertical: 20,
    borderRadius: 10,
  },

  textBtnLogIn: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },

  btnLoginTouchable:{
    width: "100%"
  }
});

export default LoginScreen;
