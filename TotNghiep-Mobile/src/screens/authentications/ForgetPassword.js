import React,{ useState } from 'react';
import { View,StyleSheet,Image,Text,TouchableOpacity,TextInput,TouchableWithoutFeedback,Keyboard } from 'react-native';

import LoadingScreen from '../LoadingScreen';

import * as authenServies from '../../services/Authen';
import { Alert } from 'react-native';


const ForgetPasswordScreen = ({navigation}) => {

    const [isLoading,setLoading]= useState(false);
    const [email,setEmail] = useState('');

    const checkBtnSendDisabled = () =>{
        var EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if(email.trim().length === 0 || !EMAIL_REGEX.test(email)){
            return true;
        }
        return false;
    }

    const ForgetPassword = async (email) =>{
        let details = {
            emailApp: email,
            emailReset: email
        };
      
        let formBody = [];
    
        for (let property in details) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
    
        await fetch("https://hcmusemu.herokuapp.com/account/forgotpassword", {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: formBody,
        }) .then((response) => {
            const statusCode = response.status;
            const dataRes = response.json();
            return Promise.all([statusCode, dataRes]);
        }).then(([statusCode, dataRes]) => {
            console.log(statusCode,dataRes);
            if(statusCode === 200){
                navigation.navigate('Confirm Mail Sent');
            }
            else{Alert.alert("Lỗi!", "Không tìm thấy Email người dùng. Vui lòng nhập lại.")}
        }).catch(error => console.log('error', error));
    };

    return(
        <TouchableWithoutFeedback onPress={()=>{
            Keyboard.dismiss();
          }}>
        <View style={styles.container}>
           
            <Image style={styles.imageLogo} source={require("../../../assets/email.png")} />

            <Text style={{fontSize:22,fontWeight:'500',color:'black'}}>
                Đặt lại mật khẩu
            </Text>

            <Text style={{fontSize:12,marginHorizontal:40,marginTop:20, marginBottom:30,textAlign:'center'}}>
                Điền thông tin email liên kết với tài khoản để chúng tôi có thể khôi phục tài khoản cho bạn
            </Text>

            <View style={{width:'100%',marginBottom:30}}>
                <TextInput style={styles.input} placeholder={"Nhập địa chỉ email"}
                    onChangeText={(email) => setEmail(email)}
                />
            </View>

            <TouchableOpacity style={[styles.buttonSend,{backgroundColor:checkBtnSendDisabled()?'silver':'#0066FF',}]} disabled={checkBtnSendDisabled()}
                onPress={async()=>{
                    setLoading(true);
                    await ForgetPassword(email);
                    setLoading(false);
                }}>
                <View style={{marginVertical:15}}>
                    <Text style={{color:'white',fontWeight:'500'}}>Gửi mã xác nhận</Text>
                </View>
                
            </TouchableOpacity>

            {isLoading && LoadingScreen()}

        </View>

        </TouchableWithoutFeedback>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },

    imageLogo: {
        marginTop:50,
        width:240,
        height:240,
    },

    input:{
        marginHorizontal:15,
        backgroundColor:"#cccc",
        borderRadius:10,
        paddingVertical:15,
        paddingHorizontal:10,
        fontSize:15
    },

    buttonSend:{
        width:'80%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:25
    }
});

export default ForgetPasswordScreen;