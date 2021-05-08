import React, { useState, useEffect,useMemo  } from "react";
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
import { useDispatch, useSelector,useStore,shallowEqual  } from "react-redux";
import * as universityActions from "../../../store/actions/University";

const RegisterScreen = ({ navigation }) => {
  const [idUni,setIdUni] = useState('');
  const [itemNameUniversity,setItemNameUniversity] = useState([]);
  const [itemFacultyName,setItemFacultyName] = useState([]);
  const [flag,setFlag] = useState(null);

  const uniName = useSelector((state) => state.university.universityInfo,shallowEqual);
  const facultyName = useSelector((state) => state.university.facultyInfo);

  const dispatch = useDispatch();

  useEffect(() => {
    const getAllUniNames = async() => {
      await dispatch(universityActions.getAllInfoUniversity());
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


    // const temp=[];
    // for (const key in uniName) {
    //   temp.push({
    //     label: uniName[key].name,
    //     value: uniName[key].id,
    //   });
    // }
    // console.log(temp);
    // setItemNameUniversity(temp);

  // useEffect(() =>{
    function getAllFacultyName (idUni) {
      dispatch(universityActions.getAllFacultyOfUniversity(idUni));

      if(facultyName.length!=0){
        const temp=[];
        console.log(facultyName);
    
        for (const key in facultyName) {
          temp.push({
            label: facultyName[key].name,
            value: facultyName[key].id,
          });
        }
        console.log(temp);
        setItemFacultyName(temp);
      }
    };
  //   getAllFacultyName();
  // },[idUni,facultyName.length]);
  

  

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
                  console.log(value);
                  //setIdUni(value);
                  //dispatch(universityActions.getAllFacultyOfUniversity(value));
                  
                  getAllFacultyName(value);

                  //console.log("ABC")
                  
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
