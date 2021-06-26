import React,{useState} from "react";
import{View,StyleSheet,Text,TextInput,TouchableWithoutFeedback,Keyboard,TouchableOpacity,Alert} from "react-native";
import RNPickerSelect from 'react-native-picker-select';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {useDispatch,useSelector} from "react-redux";
import * as profileActions from '../../../../store/actions/Profile';

import LoadingScreen from '../../LoadingScreen';

import SyncStorage from 'sync-storage';


const ClassroomConnectScreen = ({navigation})=>{

    const [show,setShow]= useState(true);
    const [visible,setVisible]= useState(true);
    const [url,setUrl]=useState('');
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    const [isLoading,setLoading] = useState(false);

    const dispatch=useDispatch();
    const token = SyncStorage.get('tokenValue');

    const ConnectAppHandler =()=>{
        setLoading(true);
        //console.log(token);
        let details = {
            typeUrl: 'Classroom',
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

          fetch("https://hcmusemu.herokuapp.com/web/postaccountcustom", {
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
                dispatch(profileActions.connectApplication());
                navigation.navigate("Profile");
                setLoading(false);
            }else if(statusCode ===409){
                setLoading(false);
                Alert.alert(
                    "Lỗi",
                    "Loại ứng dụng đã được kết nối trước đó . Vui lòng xoá kết nối trước khi tạo một kết nối ứng dụng mới !",
                    [
                      { text: "Xác nhận", 
                        style: "cancel"
                      },
                    ]
                );
            }
            else{
                setLoading(false);
                alert("Lỗi.Xin vui lòng thử lại !!!");
            }
        }).catch(error => console.log('error', error));
    }

    return (
        <TouchableWithoutFeedback onPress={() =>{
            Keyboard.dismiss();
        }}>
            <View style={styles.container}>
                {isLoading && LoadingScreen()}
                
                <Text style={styles.label}>
                    URL
                </Text>

                <TextInput style={styles.input} onChangeText={(url)=>setUrl(url)}/>

                <Text style={styles.label}>
                    Username ứng dụng
                </Text>

                <TextInput style={styles.input} keyboardType="default" 
                    onChangeText={(username)=>setUsername(username)}/>

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

            <TouchableOpacity
                style={styles.button}
                onPress={() => {ConnectAppHandler()}}>
                <Text style={styles.textBtnConnect}>Kết nối</Text>
            </TouchableOpacity>
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
        backgroundColor: "#ccc",
        width: "100%",
        borderRadius:10,
        padding:10,
        paddingRight:30
    },

    button:{
        backgroundColor: "green",
        margin:60,
        borderRadius:20,
        padding:10
    },
    
    input:{
        marginLeft:15,
        marginRight:15,
        backgroundColor:"#cccc",
        borderRadius:10,
        padding:10
    },

    textBtnConnect: {
        color: "white",
        fontSize: 15,
        textAlign: "center",
      },
});

export default ClassroomConnectScreen;