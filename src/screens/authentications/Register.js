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

const RegisterScreen = ({ navigation }) => {
  const [itemNameUniversity,setItemNameUniversity] = useState([]);
  const [itemFacultyName,setItemFacultyName] = useState([]);

  const uniName = useSelector((state) => state.university.universityInfo,shallowEqual);

  const dispatch = useDispatch();

  useEffect(() => {
    const getAllUniNames = async() => {
      dispatch(universityActions.getAllInfoUniversity());
      //console.log(uniName);   
        
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
  //   getAllFacultyName();
  // },[idUni]);


  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <ScrollView>
        <View style={styles.container}>
          <Heading>Đăng ký</Heading>
          <UsernameInput placeholder={"Tên đăng nhập"} />

          <PasswordInput placeholder={"Mật khẩu"} />

          <PasswordInput placeholder={"Nhập lại mật khẩu"} />

          <UsernameInput placeholder={"Họ và tên"} />

          
          <View style={styles.dropdown}>
            <RNPickerSelect
              onValueChange={(value) => { 
                if(value!=null){
                  //console.log(value);
                  //setIdUni(value);
                  //dispatch(universityActions.getAllFacultyOfUniversity(value));
                  getAllFacultyName(value);

                  //console.log(idUni)
                  
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

                console.log(value);
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
              onPress={() => {}}
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
