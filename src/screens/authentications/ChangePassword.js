import React,{ useState } from 'react';
import { ScrollView,View, Text,TouchableOpacity,Keyboard,TouchableWithoutFeedback,StyleSheet,TextInput,Alert} from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useDispatch,useSelector } from 'react-redux';

import * as authActions from '../../../store/actions/Authen';
import LoadingScreen from '../LoadingScreen';


const ChangePasswordScreen = ({navigation}) => {

    const [showOldPass,setShowOldPass]= useState(true);
    const [visibleOldPass,setVisibleOldPass]= useState(true);
    const [showNewPass,setShowNewPass]= useState(true);
    const [visibleNewPass,setVisibleNewPass]= useState(true);
    const [showConfPass,setShowConfPass]= useState(true);
    const [visibleConfPass,setVisibleConfPass]= useState(true);

    const [isLoading,setLoading]=useState(false);


    const [password,setPassword]=useState('');
    const [newPassword,setNewPassword]=useState('');
    const [confirmPassword,setConfirmPassword]=useState('');

    const dispatch = useDispatch();
    const token = useSelector((state) => state.authen.token);

    const checkCurrentPass = () =>{
        if(password === ""){
            return true;
          }
          return false;
    }

    const checkConditionPassword = () =>{
        var PASS_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        if(PASS_REGEX.test(newPassword)){
          return true;
        }
        return false;
    };

    const checkPasswordRepeat =()=>{
        if(newPassword === confirmPassword ){
            return true;
        }
        return false;
    };

    const ChangePassword =()=>{
        setLoading(true);
        let details = {
            Oldpassword: password,
            Newpassword: newPassword,
          };
      
          let formBody = [];
      
          for (let property in details) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
          }
          formBody = formBody.join("&");
      
          fetch("https://hcmusemu.herokuapp.com/account/changepassword", {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              "Authorization": `bearer ${token}`
            },
            body: formBody,
          }).then((response)=>{
              const statusCode = response.status;
              const dataRes = response.json();
              return Promise.all([statusCode, dataRes]);
          }).then(([statusCode, dataRes])=>{
            if(statusCode === 200){                
              dispatch(authActions.changePassword());
              setLoading(false);
              navigation.navigate('Profile');
            }
            else if(statusCode === 401){
                if(dataRes.message === "Invalid password"){
                    setLoading(false);
                    Alert.alert(
                        "Lỗi",
                        "Mật khẩu hiện tại chưa chính xác",
                        [
                            {
                                text: "OK",
                                style: "cancel"
                            }
                        ])
                }
            }
          }).done();
    }

    return(
    <TouchableWithoutFeedback onPress={() =>{
        Keyboard.dismiss();}}>

        <ScrollView style={styles.container}>
            <View style={styles.instruction}>
              <Text style={styles.instructionLabel}>Mật khẩu phải chứa tối thiểu tám ký tự, ít nhất một chữ hoa, một chữ thường và một số</Text>
            </View>

            <Text style={styles.label}>
                Mật khẩu hiện tại
            </Text>

            <View style={styles.passInput}>
                <TextInput secureTextEntry={visibleOldPass} style={styles.passInputText} placeholder={"Nhập mật khẩu hiện tại"}
                    onChangeText={(password)=>setPassword(password)}/>
                <TouchableOpacity style={styles.eyeBtn}  onPress={()=>{
                    setVisibleOldPass(!visibleOldPass);
                    setShowOldPass(!showOldPass);
                }}>
                    <MaterialCommunityIcons name={showOldPass===false ? "eye-outline" : "eye-off-outline"} size={16} ></MaterialCommunityIcons>
                </TouchableOpacity>
            </View>

            {checkCurrentPass() && 
                <View style={styles.errorPassLabel}>
                    <Text style={styles.textErrorPass}>Mật khẩu không được để trống</Text>
                </View>}

            <View style={styles.divide}/>

            <Text style={styles.label}>
                Mật khẩu mới
            </Text>

            <View style={styles.passInput}>
                <TextInput secureTextEntry={visibleNewPass} style={styles.passInputText} placeholder={"Nhập mật khẩu mới"}
                    onChangeText={(newPassword)=>setNewPassword(newPassword)}/>
                <TouchableOpacity style={styles.eyeBtn}  onPress={()=>{
                    setVisibleNewPass(!visibleNewPass);
                    setShowNewPass(!showNewPass);
                }}>
                    <MaterialCommunityIcons name={showNewPass===false ? "eye-outline" : "eye-off-outline"} size={16} ></MaterialCommunityIcons>
                </TouchableOpacity>
            </View>

            {!checkConditionPassword() && newPassword.length > 0 &&
                 <View style={styles.errorPassLabel}>
                    <Text style={styles.textErrorPass}>Mật khẩu mới không hợp lệ</Text>
                </View>}

            <View style={[styles.passInput,{marginTop:15}]}>
                <TextInput secureTextEntry={visibleConfPass} style={styles.passInputText} placeholder={"Nhập lại mật khẩu mới"}
                    onChangeText={(confirmPassword)=>setConfirmPassword(confirmPassword)}/>
                <TouchableOpacity style={styles.eyeBtn}  onPress={()=>{
                    setVisibleConfPass(!visibleConfPass);
                    setShowConfPass(!showConfPass);
                }}>
                    <MaterialCommunityIcons name={showConfPass===false ? "eye-outline" : "eye-off-outline"} size={16} ></MaterialCommunityIcons>
                </TouchableOpacity>
            </View>

            {!checkPasswordRepeat() &&
                <View style={styles.errorPassLabel}>
                    <Text style={styles.textErrorPass}>Mật khẩu nhập lại không khớp</Text>
                </View>}

            { checkPasswordRepeat() && checkConditionPassword() && !checkCurrentPass() ?
               <TouchableOpacity
                onPress={() => {ChangePassword()}}
                style={[styles.button,{backgroundColor:'green'}]}>
                <Text style={styles.textBtnConfirm}>Đổi mật khẩu </Text>
            </TouchableOpacity>
            :
            <TouchableOpacity
                disabled={true}
                style={[styles.button,{backgroundColor:'grey'}]}>
                <Text style={styles.textBtnConfirm}>Đổi mật khẩu </Text>
            </TouchableOpacity>}

            {isLoading && LoadingScreen()}
        </ScrollView>
    </TouchableWithoutFeedback>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    
    instruction: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#FFFFCC',
        paddingVertical: 10,
        paddingHorizontal:20
    },

    instructionLabel: {
        color:'#AAAAAA'
    },

    label: {
        margin:18,
        fontSize:15
    },

    passInput: {
        alignItems: "center",
        flexDirection:"row",
        marginHorizontal:15,
        
      },
    
    eyeBtn: {
        position: 'absolute',
        right: 0,
        paddingRight:10,
        paddingLeft:10,
    },

    passInputText:{
        borderWidth:1,
        borderColor:'green',
        width: "100%",
        borderRadius:10,
        padding:10,
        paddingRight:30
    },
    
    divide:{
        marginTop:20,
        borderBottomWidth:1,
        borderBottomColor:'#DDDDDD'
    },

    button:{
        backgroundColor: "green",
        margin:60,
        borderRadius:20,
        padding:10
    },

    textBtnConfirm: {
        color: "white",
        fontSize: 15,
        textAlign: "center",
    },

    errorPassLabel:{
        marginHorizontal:18,
    },

    textErrorPass: {
        color:'red'
    }


});

export default ChangePasswordScreen;

