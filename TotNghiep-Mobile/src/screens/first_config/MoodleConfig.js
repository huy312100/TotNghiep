import React,{useState} from 'react';
import{View,StyleSheet,Text,TextInput,TouchableWithoutFeedback,Keyboard,TouchableOpacity} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Header } from 'react-native-elements';

import { useSelector,useDispatch } from "react-redux";

import * as authenServices from "../../services/Authen";

import LoadingScreen from "../../screens/LoadingScreen";


const MoodleConfigScreen = ({navigation}) => {
    const token = useSelector((state) => state.authen.token);

    const [isLoading,setLoading] =useState(false);
    const [show,setShow]= useState(true);
    const [visible,setVisible]= useState(true);
    const [url,setUrl]=useState('');
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');

    const checkDisableConnect =() => {
        if(url.trim().length === 0 || username.trim().length === 0 || password.trim().length === 0){
            return true;
        }
        return false;
    };

    const ConnectAppHandler = async ()=>{

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
        }).then(async([statusCode, dataRes])=>{
            console.log(dataRes,statusCode); 
            if(statusCode === 201){
                await authenServices.SetChangeFirstSignIn(token);
            }
            else if(statusCode ===409){

            }
            else{
                alert("Lỗi.Xin vui lòng thử lại !!!");
            }
        }).catch(error => console.log('error', error));
    };

    return(
        <TouchableWithoutFeedback onPress={() =>{
            Keyboard.dismiss();
        }}>
            <View style={styles.container}>
            <Header
                containerStyle={{
                    backgroundColor: 'white',
                    justifyContent: 'space-around',
                    borderBottomColor:'#DDDDDD'
                }}



                leftComponent={
                <TouchableOpacity onPress={async() =>{ 
                    setLoading(true);
                    await authenServices.SetChangeFirstSignIn(token);
                    navigation.navigate("End Config");
                }}>
                        <Text style={{color:'red',fontWeight:'500'}}>Bỏ qua</Text>
                    </TouchableOpacity>
                }

                centerComponent={
                    <Text style={{fontWeight:'500'}}>Thiết lập cài đặt Moodle</Text>

                }

                rightComponent={
                    <TouchableOpacity disabled={checkDisableConnect()}
                        onPress={async()=>{
                            setLoading(true);
                            await ConnectAppHandler(); 
                            navigation.navigate('End Config');
                            setLoading(false);

                        }}>
                            <Text style={{color: checkDisableConnect() ? 'silver' : 'blue',fontWeight:'500'}}>Kết nối</Text>
                    </TouchableOpacity>
                }
            />

                
                
            <View style={{justifyContent:'center',alignItems: 'center',marginHorizontal:30}}>
                <Text style={{marginVertical:30,fontWeight:'500',fontSize:25,color:'purple'}}>KẾT NỐI ỨNG DỤNG</Text>
                <Text style={{textAlign:'center'}}>
                    Thiết lập cài đặt Moodle giúp ứng dụng có thể lấy các thông tin cơ bản từ trang môn học như : Deadline, thông tin môn học ,diễn đàn ...
                </Text>
            </View>
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


            {isLoading && LoadingScreen()}

        </View>
        </TouchableWithoutFeedback>
    )
};

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


export default MoodleConfigScreen;