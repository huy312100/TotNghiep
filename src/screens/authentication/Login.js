import React,{useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity,Keyboard,TouchableWithoutFeedback, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {useDispatch} from 'react-redux';

import * as authenServices from '../../services/Authen';

import * as authActions from '../../../store/actions/Authen';

import LoadingScreen from '../LoadingScreen';

const LoginScreen =({navigation}) =>{

    const dispatch = useDispatch();
    const [show,setShow]= useState(true);
    const [visible,setVisible]= useState(true);

    const [username,setUsername] =useState('');
    const [password,setPassword] = useState('');
    const [isLoading,setLoading]=useState(false);


    const loginAPI=async()=>{
        if(username!="" && password!=""){
          setLoading(true);
          let details = {
            'username': username,
            'password': password
        };
      
        let formBody = [];
        for (let property in details) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
      
        await fetch('https://hcmusemu.herokuapp.com/account/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
          }).then((response) => {
            const statusCode = response.status;
            const data = response.json();
            return Promise.all([statusCode, data]);
          })
            .then(async ([statusCode, data]) => {
                console.log(statusCode,data);
                setLoading(false);
                if(statusCode===200 && data.role==="3"){
                  const token = data.token + 'pR';
                  dispatch(authActions.login(token));
                  navigation.navigate("Main");
                  setLoading(false);
                }else{
                  setLoading(false);
                  alert("Tài khoản hoặc mật khẩu không đúng.Xin vui lòng thử lại")
                }
            }).done();
        }
        else{
          alert("Xin vui lòng điển đầy đủ thông tin");
        }
     }

    return(
        <TouchableWithoutFeedback onPress={()=>{
            Keyboard.dismiss();
          }}>
            <View style={styles.container}>
                
      
                <Text style={styles.header}>Bắt đầu ngay</Text>

                <TextInput placeholder={"Tên đăng nhập"} style={styles.input}
                    onChangeText={(username)=>setUsername(username)}
                />

                <View style={styles.passInput} >
                    <TextInput testID = "Form.PasswordInput"  secureTextEntry={visible} style={styles.input} placeholder="Mật khẩu"
                        onChangeText={(password)=>setPassword(password)}
                    />
                    <TouchableOpacity style={styles.eyeBtn}  onPress={()=>{
                        setVisible(!visible);
                        setShow(!show);
                    }}>
                        <MaterialCommunityIcons name={show===false ? "eye-outline" : "eye-off-outline"} size={16} />
                    </TouchableOpacity>
                </View>
                {/* <UsernameInput placeholder={"Tên đăng nhập"}
                onChangeText={(username)=>setUsername(username)}/>
        
                <PasswordInput placeholder={"Mật khẩu"}
                onChangeText={(password)=>setPassword(password)}/> */}
        
        
                <TouchableOpacity style={styles.buttonLoginContainer} testID="Button.Login"
                    onPress={async()=>{
                        loginAPI();
                    }}>
                <Text style={styles.textBtnLogIn}>Đăng nhập</Text>
                </TouchableOpacity>
        
                <TouchableOpacity
                    onPress={()=>{
                        navigation.navigate("Forget Password");
                    }}>
                    <Text style={styles.forgetPassText}>Quên mật khẩu?</Text>
                </TouchableOpacity>
        
                {isLoading && LoadingScreen()}
                </View>
          </TouchableWithoutFeedback>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        padding: 10,
        paddingTop: 120,
    },

    header:{
        fontWeight:'bold',
        fontSize:26,
        color:'#003366',
        marginBottom:50
    },

    input:{
        backgroundColor:'#ccc',
        width:'100%',
        marginVertical:20,
        padding:20,
        borderRadius:10,
    },
    
    passInput: {
        alignItems: "center",
        flexDirection:"row",
    },

    eyeBtn: {
        position: 'absolute',
        right: 0,
        paddingRight:10,
    },

    forgetPassText: {
        fontWeight: "bold",
        color: "#336666",
        fontSize: 16,
    },

    buttonLoginContainer: {
        backgroundColor: "#FF9966",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 20,
        borderRadius: 10,
        paddingTop:20,
        paddingBottom:20
    },

    textBtnLogIn: {
        color: "white",
        fontWeight: "bold",
        fontSize: 20,
        textAlign: "center",
    },

    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(52, 52, 52, 0.5)'
    },

    txtIndicator: {
        fontSize:15,
        fontWeight: "bold",
        color:"#EEEEEE"
    }
});

export default LoginScreen;