import React,{useState} from "react";
import{View,StyleSheet,Text,TextInput,TouchableWithoutFeedback,Keyboard,TouchableOpacity,Alert,ScrollView} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {useDispatch,useSelector} from "react-redux";
import * as profileActions from '../../../../store/actions/Profile';

import LoadingScreen from '../../LoadingScreen';



const MoodleConnectScreen = ({navigation})=>{

    const [show,setShow]= useState(true);
    const [visible,setVisible]= useState(true);
    const [url,setUrl]=useState('');
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    const [isLoading,setLoading] = useState(false);

    const dispatch=useDispatch();
    const token = useSelector((state) => state.authen.token);
    const typeWebCustomed = useSelector((state) => state.profile.allWebCustomed);

    var nameWebCustomed = typeWebCustomed.find(item => item.Type === 'Moodle');

    const ConnectAppHandler =()=>{
        setLoading(true);
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
            }
            else if(statusCode ===409){
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
    };

    const getWebCustomed = () =>{
        //console.log(token);

        var myHeaders = new Headers();
        myHeaders.append("Authorization", `bearer ${token}`);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("https://hcmusemu.herokuapp.com/web/getcustomlink",requestOptions)
        .then((response) => {
            const statusCode = response.status;
            const dataRes = response.json();
            return Promise.all([statusCode, dataRes]);
        }).then(([statusCode, dataRes]) => {
            const tmp =[];
            if (statusCode === 200){
                for (const key in dataRes) {
                    tmp.push(
                    {
                        Type: dataRes[key].Type,
                        Url:dataRes[key].Url,
                    });
                };
            }
            //setData(json);
            dispatch(profileActions.getAllWebCustomed(tmp));
        })
        .catch((err) => console.log(err, "error"));
    };

    return (
        <TouchableWithoutFeedback onPress={() =>{
            Keyboard.dismiss();
        }}>
            <View style={styles.container}>
            {nameWebCustomed == undefined && <View style={styles.container}>
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
                onPress={() => {
                    ConnectAppHandler();
                    getWebCustomed();
                }}>
                <Text style={styles.textBtnConnect}>Kết nối</Text>
            </TouchableOpacity>
            </View>}

        {nameWebCustomed != undefined && <ScrollView style={styles.container}>
            <Text style={{marginHorizontal:18,color:"black",fontWeight:'500',textAlign:"center",marginBottom:20}}>
                Ứng dụng đã được kết nối với tài khoản Moodle : {nameWebCustomed.Username}
            </Text>

            <Text style={{marginHorizontal:18}}>
                Để huỷ kết nối ứng dụng cũ vui lòng vào <Text style={{fontWeight: 'bold'}}>Tài khoản &gt; Ứng dụng đã được kết nối</Text> 
            </Text>

        </ScrollView>}

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

export default MoodleConnectScreen;