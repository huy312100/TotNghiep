import React,{ useState } from 'react';
import { View,StyleSheet,Image,Text,TouchableOpacity,TextInput,TouchableWithoutFeedback,Keyboard } from 'react-native';

import LoadingScreen from '../LoadingScreen';

import * as authenServies from '../../services/Authen';


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

            <TouchableOpacity style={[styles.buttonSend,{backgroundColor:checkBtnSendDisabled()?'silver':'#FF9933',}]} disabled={checkBtnSendDisabled()}
                onPress={async()=>{
                    setLoading(true);
                    await authenServies.ForgetPassword(email);
                    navigation.navigate('Confirm Mail Sent');
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