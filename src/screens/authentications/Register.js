import React, { useState, useEffect,useRef  } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import {
  Heading,
  UsernameInput,
  PasswordInput,
} from "../../components/authentications/common/Index";
import RNPickerSelect from "react-native-picker-select";
import { useDispatch, useSelector,shallowEqual  } from "react-redux";
import * as universityActions from "../../../store/actions/University";
import * as authActions from '../../../store/actions/Authen';


const RegisterScreen = ({ navigation }) => {
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const [confirmPwd,setConfirmPwd] =useState("");
  const [fullname,setFullname] = useState("");
  const [idUni,setIdUni] = useState("");
  const [idFaculty,setIdFaculty] = useState("");

  const [itemNameUniversity,setItemNameUniversity] = useState([]);
  const [itemFacultyName,setItemFacultyName] = useState([]);

  const allInfo = {
    username:"",
    password:"",
    fullname:"",
    idUni:"",
    idFaculty:"",
  };

  const uniName = useSelector((state) => state.university.universityInfo,shallowEqual);

  const dispatch = useDispatch();

  useEffect(() => {
    const getAllUniNames = async() => {

      dispatch(universityActions.getAllInfoUniversity());
      //console.log(uniName);   

      // fetch("https://hcmusemu.herokuapp.com/university/getname")
      // .then((response) => response.json())
      // .then((json) => {
      //   //console.log(json);

      //   const temp=[];
      //   for (const key in json) {
      //     temp.push({
      //       label: json[key].TenTruongDH,
      //       value: json[key].MaTruong,
      //     });
      //   }
      //   console.log(temp);
      //   setItemNameUniversity(temp);

        
      //   //console.log(dataUniversity);
       
      // })
      // .catch((err) => console.log(err, "error"));
      // //console.log(uniName); 
        
      const temp=[];
      for (const key in uniName) {
        temp.push({
          label: uniName[key].name,
          value: uniName[key].id,
        });
      }
      console.log(temp);
      setItemNameUniversity(temp);
    };
    getAllUniNames();
  },[uniName.length]);



  // useEffect(() =>{
  const getAllFacultyName = (idUni) => {
    let details = {
      MaTruong: idUni,
    };

    let formBody = [];

    for (let property in details) {
      let encodedKey = encodeURIComponent(property);
      let encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    fetch("https://hcmusemu.herokuapp.com/faculty/getname", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formBody,
      }).then((response) => {
          const statusCode = response.status;
          const dataRes = response.json();
          return Promise.all([statusCode, dataRes]);
      }).then(([statusCode, dataRes])=>{
        //console.log(dataRes);
        const temp=[];
    

        for (const key in dataRes) {
          temp.push({
            label: dataRes[key].TenKhoa,
            value: dataRes[key].MaKhoa,
          });
        }
        console.log(temp);
        setItemFacultyName(temp);

      }).done();
  };

  const checkUsername = () => {
    var EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var WHITESPACE_REGEX = /\s/;
    if(!EMAIL_REGEX.test(username.toLowerCase()) || username.trim().length === 0 || WHITESPACE_REGEX.test(username)){
      return false;
    }
    return true;
  }

  const checkPassword = () => {

    if(password.length===0) {
      return false;
    }
    else {
      if(password!=confirmPwd){
        return false;
      }
    }
    return true;
  }

  const register = (registerInfo) => {
    dispatch(authActions.register(registerInfo)).then(() =>{
      navigation.navigate("Login");
    })
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <ScrollView>
        <View style={styles.container}>
          <Heading>Đăng ký</Heading>
          <UsernameInput placeholder={"Tên đăng nhập"}
          onChangeText={(username) => setUsername(username)} />

          <PasswordInput placeholder={"Mật khẩu"}
          onChangeText={(password) => setPassword(password)} />

          <PasswordInput placeholder={"Nhập lại mật khẩu"}
          onChangeText={(password) => setConfirmPwd(password)} />

          <UsernameInput placeholder={"Họ và tên"} 
          onChangeText={(fullname) => setFullname(fullname)} />

          <View style={styles.dropdown}>
            <RNPickerSelect
              onValueChange={(value) => { 
                if(value!=null){
                  setIdUni(value);
                  
                  getAllFacultyName(value);

                  console.log(allInfo);
                }
              }}
              //style={{...pickerSelectStyles}}
              useNativeAndroidPickerStyle={false}
              //fixAndroidTouchableBug={true}
              placeholder={{
                label: "Chọn trường",
                value: null,
              }}
              items={itemNameUniversity}
            />
            </View>

          <View style={styles.dropdown}>
            <RNPickerSelect
              onValueChange={(value) => {

                if(value!=null){
                  console.log(value);
                  setIdFaculty(value);
                }
               
               
              }}
              //style={{ inputAndroid: { color: "black" } }}
              useNativeAndroidPickerStyle={false}
              //fixAndroidTouchableBug={true}
              placeholder={{
                label: "Chọn khoa",
                value: null,
              }}
              items={itemFacultyName}
            />
          </View>

          <View style={styles.buttonLoginContainer}>
            <TouchableOpacity
              style={styles.btnLoginTouchable}
              onPress={() => {
                if(checkPassword() && checkUsername() && idUni!="" && idFaculty !="" && fullname.trim().length>0) {
                  allInfo.fullname=fullname;
                  allInfo.idUni=idUni;
                  allInfo.username=username;
                  allInfo.password=password;
                  allInfo.idFaculty=idFaculty;

                  register(allInfo);
                }
                else if(fullname.trim().length===0){
                  alert("Tên không được bỏ trống");
                }
                else if(!checkUsername()){
                  alert("Tên tài khoản không hợp lệ");
                }
                else if(idUni===""){
                  alert("Xin vui lòng chọn trường");
                }
                else if(idFaculty ===""){
                  alert("Xin vui lòng chọn khoa");
                }
                else{
                  alert("Mặt khẩu hoặc mật khẩu xác nhận không hợp lệ");
                }
                
              }}
            >
              <Text style={styles.textBtnLogIn}>Tạo tài khoản</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.bottomText}>
            <Text>Đã có tài khoản?</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Login");
              }}
            >
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
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: "#cccc",
    paddingLeft: 20,
    paddingTop: 20,
    paddingBottom: 20,
    width: "100%",
    borderRadius: 10,
    marginVertical: 20,
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

  btnLoginTouchable: {
    width: "100%",
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

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: "#cccc",
    paddingLeft: 20,
    paddingTop: 20,
    paddingBottom: 20,
    width: "100%",
    borderRadius: 10,
    marginVertical: 20,
  },
});

export default RegisterScreen;
