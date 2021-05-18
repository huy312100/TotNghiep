import React,{useState} from "react";
import{View,StyleSheet,Text,TextInput,TouchableWithoutFeedback,Keyboard,TouchableOpacity} from "react-native";
import RNPickerSelect from 'react-native-picker-select';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {useDispatch} from "react-redux";
import * as profileActions from '../../../store/actions/Profile';



const ConnectAppScreen = ({navigation})=>{

    const [show,setShow]= useState(true);
    const [visible,setVisible]= useState(true);
    const [typeUrl,setTypeUrl] =useState('');
    const [url,setUrl]=useState('');
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    const [isLoading,setLoading] = useState(false);

    const dispatch=useDispatch();

    var d = new Date();
    var n = d.getFullYear();

    const ConnectAppHandler = async()=>{
        Keyboard.dismiss();
        await dispatch(profileActions.connectApplication(typeUrl,url,username,password));
        navigation.navigate("Profile");
    }

    return (
        <TouchableWithoutFeedback onPress={() =>{
            Keyboard.dismiss();
        }}>
            <View style={styles.container}>
                <Text style={styles.label}>
                    Loại ứng dụng
                </Text>
                <View backgroundColor={"#cccc"} style={styles.input}>
                    <RNPickerSelect 
                        onValueChange={(value) => setTypeUrl(value)}
                        style={{ inputAndroid: { color: 'black' } }}
                        useNativeAndroidPickerStyle={false}
                        fixAndroidTouchableBug={true}
                        placeholder={{
                            label: 'Chọn loại ứng dụng',
                            value: null,
                            color: '#777777'}}
                        items={[
                            { label: 'Moodle', value: 'Moodle' },
                            { label: 'Slack', value: 'Slack' },
                            { label: 'Trello', value: 'Trello' },
                            { label: 'Classroom', value: 'Classroom' },
                        ]}/>
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

export default ConnectAppScreen;