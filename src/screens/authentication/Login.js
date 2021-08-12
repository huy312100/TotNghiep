import React,{useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity,Keyboard,TouchableWithoutFeedback } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { TextInput } from 'react-native-paper';

import {useDispatch} from 'react-redux';

import * as authActions from '../../../store/actions/Authen';
import * as profileActions from '../../../store/actions/Profile';

import LoadingScreen from '../LoadingScreen';

const LoginScreen =({navigation}) =>{

    const dispatch = useDispatch();
    const [show,setShow]= useState(true);
    const [visible,setVisible]= useState(true);

    const [username,setUsername] =useState('');
    const [password,setPassword] = useState('');
    const [isLoading,setLoading]=useState(false);
    
    const getProfile = async (token) =>{
      //setLoading(true);
      //console.log(token);    
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `bearer ${token}`);
    
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
    
      await fetch("https://hcmusemu.herokuapp.com/profile/view/parent",requestOptions)
      .then((response) => {
        const statusCode = response.status;
        const dataRes = response.json();
        return Promise.all([statusCode, dataRes]);
      }).then(([statusCode, dataRes]) => {  
        if(statusCode === 200){
            dispatch(profileActions.getProfile(dataRes));
        }
        else{
          console.log("loi");
        }
                  
      }).catch((err) => console.log(err, "error"));
    };
    
    const loginAPI = async()=>{
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
                  await AsyncStorage.setItem('tokenValue',token);
                  dispatch(authActions.login(token));
                  await getProfile(token);
                  navigation.reset({
                    routes: [{ name: "Main" }]
                  });
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

                <TextInput
                    style={styles.input}
                    mode="outlined"
                    label="Email"
                    value={username}
                    onChangeText={(username)=>setUsername(username)}
                />

                <View style={styles.passInput} >

                    <TextInput
                        style={styles.input}
                        mode="outlined"
                        label="Mật khẩu"
                        value={password}
                        onChangeText={(password)=>setPassword(password)}
                        secureTextEntry={visible}
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
        width:'100%',
        marginBottom:10
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