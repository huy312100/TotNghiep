import React from 'react';
import { View,StyleSheet,Image,Text,TouchableOpacity,TextInput } from 'react-native';


const MailSentScreen = ({navigation}) => {
    return(
        <View style={styles.container}>
           
            <Image style={styles.imageLogo} source={require("../../../assets/email-sent.png")} />

            <Text style={{fontSize:22,fontWeight:'500',color:'black'}}>
                Đã gửi mail về tài khoản của bạn
            </Text>

            <Text style={{fontSize:12,marginHorizontal:40,marginTop:20, marginBottom:30,textAlign:'center'}}>
                Kiểm tra hộp thư đến và nhấn vào đường link được gửi đến để khôi phục tài khoản của bạn
            </Text>

            <TouchableOpacity style={{backgroundColor:'#0066FF',width:'80%',alignItems: 'center',justifyContent: 'center',borderRadius:25}}
                onPress={()=>{
                    navigation.navigate('Login')
                }}>
                <View style={{marginVertical:15}}>
                    <Text style={{color:'white',fontWeight:'500'}}>Trở về trang chính</Text>
                </View>
                
            </TouchableOpacity>

        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },

    imageLogo: {
        marginTop:150,
        width:300,
        height:300,
    },

    input:{
        marginLeft:15,
        marginRight:15,
        backgroundColor:"#cccc",
        borderRadius:10,
        paddingVertical:15,
        paddingHorizontal:10,
        fontSize:15
    },
});

export default MailSentScreen;