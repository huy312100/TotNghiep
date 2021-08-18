import React,{ useState } from 'react';
import { ScrollView, View, Text,TouchableOpacity,Keyboard,TouchableWithoutFeedback,StyleSheet,TextInput,Alert} from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useDispatch,useSelector } from 'react-redux';

import LoadingScreen from '../LoadingScreen';

const CreateParentAccountScreen = ({navigation}) => {

    const [show,setShow]= useState(true);
    const [visible,setVisible]= useState(true);
    const [nameParent,setNameParent]= useState('');
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    const [isLoading,setLoading] = useState(false);

    const token = useSelector((state) => state.authen.token);
    const profile = useSelector((state) => state.profile.profile);

    const checkDisableAddButton = ()=>{
        const EMAIL_REGEX = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if(nameParent.trim().length === 0 || !EMAIL_REGEX.test(username.toLowerCase()) || password.trim().length === 0){
            return true;
        }
        return false;
    };

    const CreateParentAccount = async() => {
        setLoading(true);
        let details = {
            username: username,
            password: password,
            HoTen: nameParent,
            Email: profile[0].Email
        };
      
        let formBody = [];
    
        for (let property in details) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
    
        await fetch("https://hcmusemu.herokuapp.com/account/signupparent", {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              "Authorization": `bearer ${token}`,
            },
            body: formBody,
        }) .then((response) => {
            const statusCode = response.status;
            const dataRes = response.json();
            return Promise.all([statusCode, dataRes]);
        }).then(([statusCode, dataRes]) => {
            console.log(statusCode,dataRes);
            if(statusCode === 201){
                Alert.alert(
                    "Thành công",
                    "Tạo tài khoản cho phụ huynh thành công",
                    [
                      {
                        text: "Xác nhận",
                        onPress: () => navigation.navigate("Profile"),
                      },
                    ]
                  );
                setLoading(false);
            }
            else if(statusCode === 500){
                Alert.alert(
                    "Lỗi",
                    "Tài khoản cho phụ huynh đã được tạo trước đó",
                    [
                      {
                        text: "Xác nhận",
                      },
                    ]
                  );
                setLoading(false);
            }
        }).catch(error => console.log('error', error));
    
    }

    
    return(
        <TouchableWithoutFeedback onPress={() =>{
            Keyboard.dismiss();
        }}>
            <ScrollView style={styles.container}>
           
                {isLoading && LoadingScreen()}
               
                <Text style={styles.label}>
                    Tên phụ huynh
                </Text>

                <TextInput style={styles.input} onChangeText={(name)=>setNameParent(name)}/>

                <Text style={styles.label}>
                    Email 
                </Text>

                <TextInput style={styles.input} keyboardType="email-address" 
                    onChangeText={(username)=>setUsername(username)}/>

                <Text style={styles.label}>
                    Password
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
                    disabled={checkDisableAddButton()}
                    style={[styles.button,{backgroundColor: checkDisableAddButton() ? 'silver' : 'green'}]}
                    onPress={async () => {
                        await CreateParentAccount();
                    }}>
                    <Text style={styles.textBtnConnect}>Tạo</Text>
                </TouchableOpacity>
            </ScrollView>

        
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
        borderWidth:1,
        borderColor:'green',
        width: "100%",
        borderRadius:10,
        padding:10,
        paddingRight:30
    },

    button:{
        margin:60,
        borderRadius:20,
        padding:10
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

export default CreateParentAccountScreen;

