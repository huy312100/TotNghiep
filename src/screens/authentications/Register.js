import React from "react";
import { StyleSheet, Text, View, TouchableOpacity,ScrollView,Keyboard,TouchableWithoutFeedback } from "react-native";
import {
  Heading,
  UsernameInput,
  PasswordInput,
} from "../../components/authentications/common/Index";
import RNPickerSelect from 'react-native-picker-select';

const RegisterScreen = ({ navigation }) => {
  return (
    <TouchableWithoutFeedback onPress={()=>{
      Keyboard.dismiss();
    }}>
      <ScrollView>
        <View style={styles.container}>
          <Heading>Đăng ký</Heading>
          <UsernameInput placeholder={"Tên đăng nhập"}/>

          <PasswordInput placeholder={"Mật khẩu"}/>

          <PasswordInput placeholder={"Nhập lại mật khẩu"}/>

          <UsernameInput placeholder={"Họ và tên"}/>

          <View style={styles.dropdown}>
          <RNPickerSelect
            onValueChange={(value) => console.log(value)}
                        style={{ inputAndroid: { color: 'black' } }}
                        useNativeAndroidPickerStyle={false}
                        fixAndroidTouchableBug={true}
                        placeholder={{
                          label: 'Chọn trường',
                          value: null}}
                        items={[
                            { label: 'Moodle', value: 'Moodle' },
                            { label: 'Slack', value: 'Slack' },
                            { label: 'Trello', value: 'Trello' },
                            { label: 'Classroom', value: 'Classroom' }]}/>
          </View>
          

          <View style={styles.dropdown}>
          <RNPickerSelect
            onValueChange={(value) => console.log(value)}
                        style={{ inputAndroid: { color: 'black' } }}
                        useNativeAndroidPickerStyle={false}
                        fixAndroidTouchableBug={true}
                        placeholder={{
                          label: 'Chọn khoa',
                          value: null}}
                        onOpen={() =>{placeholder={}}}
                        items={[
                            { label: 'Moodle', value: 'Moodle' },
                            { label: 'Slack', value: 'Slack' },
                            { label: 'Trello', value: 'Trello' },
                            { label: 'Classroom', value: 'Classroom' }]}/>
          </View>

          <View style={styles.buttonLoginContainer}>
            <TouchableOpacity style={styles.btnLoginTouchable}
              onPress={() => {
              }}
            >
              <Text style={styles.textBtnLogIn}>Tạo tài khoản</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.bottomText}>
            <Text>Đã có tài khoản?</Text>
            <TouchableOpacity onPress={() =>{
              navigation.navigate("Login");
            }}>
              <Text style={styles.signupText}>Tham gia ngay</Text>
            </TouchableOpacity>
        </View>
        </View>
    </ScrollView>
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

  dropdown: {
    marginLeft:15,
    marginRight:15,
    backgroundColor:"#cccc",
    paddingLeft:20,
    paddingTop:20,
    paddingBottom:20,
    width: "100%",
    borderRadius:10,
    marginVertical:20,
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
  },

  bottomText: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    fontSize: 14,
  },

  signupText: {
    color: "#000088",
    fontWeight: "bold",
    marginLeft: 5,
  },
});

export default RegisterScreen;
