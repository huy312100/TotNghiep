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
    const [isLoading,setLoading]=useState(false);

    const dispatch=useDispatch();

    var d = new Date();
    var n = d.getFullYear();


//     const ConnectApi =async () => {
//         Keyboard.dismiss();
//         var requestOptions = {
//             method: 'POST',
//             redirect: 'follow'
//           };
          
//           await fetch(`${url}/login/token.php?service=moodle_mobile_app&username=${username}&password=${password}`, requestOptions)
//             .then(response => response.json())
//             .then(result => {             

//                 localStorage.setItem("tokenModdle",result.token);
//                 //console.log(localStorage.getItem("tokenModdle"));
//                 console.log(url);
//                 console.log(requestOptions);
//                 console.log(result.token);
//                 //deadlineModdle();
//                 navigation.navigate("Profile");

//                 })
//             .catch(error => console.log('error', error));
//     }
//    // console.log(token);

//    const deadlineModdle =()=>{

//       var requestOptions = {
//         method: 'POST',
//         redirect: 'follow'
//       };
      
//        fetch(`${url}/webservice/rest/server.php?moodlewsrestformat=json&wstoken=${localStorage.getItem("tokenModdle")}&wsfunction=core_calendar_get_calendar_monthly_view&year=${d.getFullYear()}&month=${d.getMonth()+1}`, requestOptions)
//         .then(response => response.json())
//         .then(result => {             

//             //localStorage.setItem("tokenModdle",result.token);
//             //console.log(localStorage.getItem("tokenModdle"));
//             console.log();
//             //moodleObj.courseName=;
//             localStorage.setItem("Course Name",result.weeks[2].days[6].events[0].course.fullname);
//             localStorage.setItem("Day",result.weeks[2].days[6].mday);
//             localStorage.setItem("Month",d.getMonth()+1);
//             localStorage.setItem("Year",d.getFullYear());
//             localStorage.setItem("Full Date",localStorage.getItem("Day")+"/"+localStorage.getItem("Month")+"/"+localStorage.getItem("Year"));
//             localStorage.setItem("Event name",result.weeks[2].days[6].events[0].name);
//             console.log(localStorage.getItem("Event name"))
//             })
//         .catch(error => console.log('error', error));
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
        marginLeft:15,
        marginRight:15,
      },
    
    eyeBtn: {
        position: 'absolute',
        right: 0,
        paddingRight:10,
    },

    passInputText:{
        backgroundColor: "#ccc",
        width: "100%",
        marginVertical: 10,
        borderRadius:10
    },

    button:{
        backgroundColor: "green",
        margin:40,
        borderRadius:20,
        padding:10
    },
    
    input:{
        marginLeft:15,
        marginRight:15,
        backgroundColor:"#cccc",
        borderRadius:10,
    },

    textBtnConnect: {
        color: "white",
        fontSize: 15,
        textAlign: "center",
      },
});

export default ConnectAppScreen;