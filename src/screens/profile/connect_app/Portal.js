import React,{useState} from "react";
import{View,StyleSheet,Text,TextInput,TouchableWithoutFeedback,Keyboard,TouchableOpacity,Alert,ScrollView} from "react-native";
import RNPickerSelect from 'react-native-picker-select';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {useDispatch,useSelector} from "react-redux";
import * as profileActions from '../../../../store/actions/Profile';

import LoadingScreen from '../../LoadingScreen';



const PortalConnectScreen = ({navigation})=>{

    const [show,setShow]= useState(true);
    const [visible,setVisible]= useState(true);
    const [isLoading,setLoading] = useState(false);

    const dispatch=useDispatch();
    const token = useSelector((state) => state.authen.token);
    const typeWebCustomed = useSelector((state) => state.profile.allWebCustomed);

    var nameWebCustomed = typeWebCustomed.find(item => item.Type === 'Portal');

    const [url,setUrl] = useState(nameWebCustomed == undefined ? "" : nameWebCustomed.Url);


    const ConnectAppHandler = async()=>{
        setLoading(true);
        //console.log(token);
        let details = {
            typeUrl: 'Portal',
            url:url,
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

    const getWebCustomed = async() =>{
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
                        Username:dataRes[key].Username,
                    });
                };
                dispatch(profileActions.getAllWebCustomed(tmp));
            }
            //setData(json);
        })
        .catch((err) => console.log(err, "error"));
    };

    const onDelete = async () => {
        await fetch("https://hcmusemu.herokuapp.com/web/deleteaccountportal", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": `bearer ${token}`,
        },
        }).then((response) => {
            const statusCode = response.status;
            const dataRes = response.json();
            return Promise.all([statusCode, dataRes]);
        }).then(([statusCode, dataRes]) => {
            console.log(statusCode,dataRes);
            if (statusCode === 200){
                getWebCustomed();
                navigation.navigate("Profile");
            }
        }).catch((error) => console.log("error", error));
    };

    const checkDisableButton = () => {
        if(nameWebCustomed == undefined){
            if(url.trim().length === 0 ) {
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
            <ScrollView style={styles.container}>
                {isLoading && LoadingScreen()}
                
                <Text style={styles.label}>
                    URL
                </Text>

                <TextInput style={styles.input} onChangeText={(url)=>setUrl(url)}>{url}</TextInput>

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
            </ScrollView>
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

export default PortalConnectScreen;