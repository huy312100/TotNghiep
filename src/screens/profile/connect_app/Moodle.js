import React,{useState} from "react";
import{View,StyleSheet,Text,TextInput,TouchableWithoutFeedback,Keyboard,TouchableOpacity,Alert,ScrollView} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {useDispatch,useSelector} from "react-redux";
import * as Notifications from 'expo-notifications';

import AsyncStorage from '@react-native-async-storage/async-storage';

import * as profileActions from '../../../../store/actions/Profile';
import * as homeActions from "../../../../store/actions/Home";
import * as authActions from '../../../../store/actions/Authen';

import LoadingScreen from '../../LoadingScreen';

const MoodleConnectScreen = ({navigation})=>{

    const [show,setShow]= useState(true);
    const [visible,setVisible]= useState(true);
    const [isLoading,setLoading] = useState(false);

    const dispatch=useDispatch();
    const token = useSelector((state) => state.authen.token);
    const typeWebCustomed = useSelector((state) => state.profile.allWebCustomed);

    const [nameWebCustomed,setNameWebCustomed]= useState(typeWebCustomed.find(item => item.Type === 'Moodle'));

    const [url,setUrl]=useState(nameWebCustomed == undefined ? "" : nameWebCustomed.Url);
    const [username,setUsername]=useState(nameWebCustomed == undefined ? "" : nameWebCustomed.Username);
    const [password,setPassword]=useState('');

    const ConnectAppHandler = async()=>{
        //console.log(token);
        let details = {
            typeUrl: 'Moodle',
            url:url,
            username: username,
            password: password,
        };
    
        let formBody = [];
    
        for (let property in details) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        await fetch("https://hcmusemu.herokuapp.com/web/postaccountcustom", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": `bearer ${token}`
        },
            body: formBody,
        }).then((response) => {
            const statusCode = response.status;
            const dataRes = response.json();
            return Promise.all([statusCode, dataRes]);
        }).then(([statusCode, dataRes])=>{
            console.log(dataRes,statusCode); 
            if(statusCode === 201){
                getWebCustomed();
                dispatch(profileActions.connectApplication());
                navigation.navigate("Profile");
                
            }
            else if(statusCode === 409){
                Alert.alert(
                    "Lỗi",
                    "Loại ứng dụng đã được kết nối trước đó. Vui lòng xoá kết nối trước khi tạo một kết nối ứng dụng mới !",
                    [
                        { text: "Xác nhận", 
                        style: "cancel"
                        },
                    ]
                );
            }
            else if (statusCode === 401){
                Alert.alert(
                    "Phiên đăng nhập đã hết hạn",
                    "Vui lòng tiến hành đăng nhập lại",
                    [
                        { text: "OK", 
                        onPress: () => {
                            AsyncStorage.removeItem('tokenValue').then(async () => {
                            dispatch(authActions.logout);
                            dispatch(homeActions.VisibleBotTab(false));
                            Notifications.cancelAllScheduledNotificationsAsync();
                            navigation.reset({
                                routes: [{ name: "Login" }]
                            });
                            })
                        }
                        },
                    ]
                );
            }
            else{
                Alert.alert(
                    "Xảy ra lỗi",
                    "Xin vui lòng thử lại !!!",
                    [
                        { text: "Xác nhận", 
                        style: "cancel"
                        },
                    ]
                );
            }
        }).catch(error => console.log('error', error));
    };

    const getWebCustomed = async () =>{
        //console.log(token);

        var myHeaders = new Headers();
        myHeaders.append("Authorization", `bearer ${token}`);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        await fetch("https://hcmusemu.herokuapp.com/web/getcustomlink",requestOptions)
        .then((response) => {
            const statusCode = response.status;
            const dataRes = response.json();
            return Promise.all([statusCode, dataRes]);
        }).then(([statusCode, dataRes]) => {
            console.log(statusCode,dataRes);
            const tmp =[];
            if (statusCode === 200){
                for (const key in dataRes) {
                    tmp.push(
                    {
                        Type: dataRes[key].Type,
                        Url:dataRes[key].Url,
                        Username: dataRes[key].Username,
                    });
                };
                dispatch(profileActions.getAllWebCustomed(tmp));
            }
            else if (statusCode === 500){
                dispatch(profileActions.getAllWebCustomed(tmp));
            }
            else{
                
            }
            //setData(json);
        })
        .catch((err) => console.log(err, "error"));
    };

    const onDelete = async () => {
        let details = {
            typeUrl: "Moodle",
        };

        let formBody = [];

        for (let property in details) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        await fetch("https://hcmusemu.herokuapp.com/web/deleteaccount", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": `bearer ${token}`,
        },
        body: formBody,
        }).then((response) => {
            const statusCode = response.status;
            const dataRes = response.json();
            return Promise.all([statusCode, dataRes]);
        }).then(([statusCode, dataRes]) => {
            if (statusCode === 200){
                getWebCustomed();
                navigation.navigate("Profile");
            }
            else if (statusCode === 401){
                Alert.alert(
                    "Phiên đăng nhập đã hết hạn",
                    "Vui lòng tiến hành đăng nhập lại",
                    [
                        { text: "OK", 
                        onPress: () => {
                            AsyncStorage.removeItem('tokenValue').then(async () => {
                            dispatch(authActions.logout);
                            dispatch(homeActions.VisibleBotTab(false));
                            Notifications.cancelAllScheduledNotificationsAsync();
                            navigation.reset({
                                routes: [{ name: "Login" }]
                            });
                            })
                        }
                        },
                    ]
                );
            }
        }).catch((error) => console.log("error", error));
    };

    const checkDisableButton = () => {
        if(nameWebCustomed == undefined){
            if(url.trim().length === 0 || username.trim().length === 0 || password.trim().length === 0) {
                return true; 
            }
            return false;
        }
        return true;
    };

    const checkDisableDeleteButton = () => {
        if(nameWebCustomed != undefined){
            return false;
        }
        return true;
    }

    return (
        <TouchableWithoutFeedback onPress={() =>{
            Keyboard.dismiss();
        }}>
            <View style={styles.container}>
            
                {isLoading && LoadingScreen()}
               
                <View style={{flexDirection:'row',alignItems: 'center' }}>
                    <Text style={[styles.label,{marginRight:0}]}>
                        URL
                    </Text>
                    <Text style={{color:'grey'}}>
                        (https://courses.fit.hcmus.edu.vn)
                    </Text>
                </View>
                

                <TextInput style={styles.input} onChangeText={(url)=>setUrl(url)}>{url}</TextInput>

                <Text style={styles.label}>
                    Username ứng dụng
                </Text>

                <TextInput style={styles.input} keyboardType="default" 
                    onChangeText={(username)=>setUsername(username)}>{username}</TextInput>

                <Text style={styles.label}>
                    Password ứng dụng
                </Text>

                <View style={styles.passInput}>
                    <TextInput secureTextEntry={visible} style={styles.passInputText}
                        onChangeText={(password)=>setPassword(password)}/>
                    <TouchableOpacity style={styles.eyeBtn}  onPress={()=>{
                        setVisible(!visible);
                        setShow(!show);
                    }}>
                        <MaterialCommunityIcons name={show===false ? "eye-outline" : "eye-off-outline"} size={16} ></MaterialCommunityIcons>
                    </TouchableOpacity>
                </View>

            <View style={{flexDirection:'row',justifyContent: 'center'}}>

                <TouchableOpacity
                    disabled={checkDisableDeleteButton()}
                    style={[styles.button,{backgroundColor: checkDisableDeleteButton() ? "grey" : "red"}]}
                    onPress={async() => {
                        setLoading(true);
                        await onDelete();
                        setLoading(false);
                    }}>
                    <Text style={styles.textBtnConnect}>Xóa thông tin</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    disabled={checkDisableButton()}
                    style={[styles.button,{backgroundColor: checkDisableButton() ? "grey" : "green"}]}
                    onPress={async() => {
                        setLoading(true);
                        await ConnectAppHandler();
                        setLoading(false);
                    }}>
                    <Text style={styles.textBtnConnect}>Kết nối</Text>
                </TouchableOpacity>
                    
            </View>
           


        </View>
        </TouchableWithoutFeedback>
        
    ); 
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    label: {
        margin:15,
        fontSize:15
    },

    userInput: {
        backgroundColor:'#ccc',
        width:'100%',
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

    button:{
        marginHorizontal:10,
        marginVertical:40,
        borderRadius:20,
        paddingVertical:10,
        paddingHorizontal:30
    },
    
    input:{
        borderWidth:1,
        borderColor:'green',
        marginLeft:15,
        marginRight:15,
        borderRadius:10,
        padding:10
    },

    textBtnConnect: {
        color: "white",
        fontSize: 15,
        textAlign: "center",
    },
});

export default MoodleConnectScreen;