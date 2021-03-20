import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import {
  Heading,
  UsernameInput,
  PasswordInput,
} from "../../components/authentications/commons/Index";

const RegisterScreen = ({ style }) => {
  return (
    <View style={styles.container}>
      <Heading>Đăng nhập</Heading>
      <UsernameInput placeholder={"Tên đăng nhập"}></UsernameInput>

      <PasswordInput placeholder={"Mật khẩu"}></PasswordInput>

      <View style={[style, styles.buttonLoginContainer]}>
        <TouchableOpacity style={styles.btnLoginTouchable}
          onPress={() => {
          }}
        >
          <Text style={styles.textBtnLogIn}>Đăng kí</Text>
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
  },

  btnLoginTouchable:{
    width: "100%"
  }
});

export default RegisterScreen;
