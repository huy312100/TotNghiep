import React,{ useState } from 'react';
import { View, Text,TouchableOpacity,Keyboard,TouchableWithoutFeedback,StyleSheet,TextInput} from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Divider } from 'react-native-elements';


const ChangePasswordScreen = () => {

    const [show,setShow]= useState(true);
    const [visible,setVisible]= useState(true);
    const [password,setPassword]=useState('');



    const checkConditionPasswords = () =>{
        var PASS_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        var WHITESPACE_REGEX = /\s/;
        if(!EMAIL_REGEX.test(username.toLowerCase()) || username.trim().length === 0 || WHITESPACE_REGEX.test(username)){
          return false;
        }
        return true;
    };

    return(
    <TouchableWithoutFeedback onPress={() =>{
        Keyboard.dismiss();}}>

        <View style={styles.container}>
            <View style={styles.instruction}>
              <Text style={styles.instructionLabel}>Mật khẩu phải chứa tối thiểu tám ký tự, ít nhất một chữ hoa, một chữ thường và một số</Text>
            </View>

            <Text style={styles.label}>
                Mật khẩu hiện tại
            </Text>

            <View style={styles.passInput}>
                <TextInput secureTextEntry={visible} style={styles.passInputText} placeholder={"Nhập mật khẩu hiện tại"}
                    onChangeText={(password)=>setPassword(password)}/>
                <TouchableOpacity style={styles.eyeBtn}  onPress={()=>{
                    setVisible(!visible);
                    setShow(!show);
                }}>
                    <MaterialCommunityIcons name={show===false ? "eye-outline" : "eye-off-outline"} size={16} ></MaterialCommunityIcons>
                </TouchableOpacity>
            </View>

            <View style={styles.divide}/>

            <Text style={styles.label}>
                Mật khẩu mới
            </Text>

            <View style={styles.passInput}>
                <TextInput secureTextEntry={visible} style={styles.passInputText} placeholder={"Nhập mật khẩu mới"}
                    onChangeText={(password)=>setPassword(password)}/>
                <TouchableOpacity style={styles.eyeBtn}  onPress={()=>{
                    setVisible(!visible);
                    setShow(!show);
                }}>
                    <MaterialCommunityIcons name={show===false ? "eye-outline" : "eye-off-outline"} size={16} ></MaterialCommunityIcons>
                </TouchableOpacity>
            </View>

            <View style={[styles.passInput,{marginTop:15}]}>
                <TextInput secureTextEntry={visible} style={styles.passInputText} placeholder={"Nhập lại mật khẩu mới"}
                    onChangeText={(password)=>setPassword(password)}/>
                <TouchableOpacity style={styles.eyeBtn}  onPress={()=>{
                    setVisible(!visible);
                    setShow(!show);
                }}>
                    <MaterialCommunityIcons name={show===false ? "eye-outline" : "eye-off-outline"} size={16} ></MaterialCommunityIcons>
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                style={styles.button}>
                <Text style={styles.textBtnConfirm}>Đổi mật khẩu </Text>
            </TouchableOpacity>

        </View>
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
        backgroundColor:'#99FFFF',
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
        backgroundColor: "#ccc",
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


});

export default ChangePasswordScreen;

