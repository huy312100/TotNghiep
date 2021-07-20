import React,{useState} from 'react';
import { View,Text,StyleSheet,TouchableOpacity,TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import {Avatar} from 'react-native-paper';


import {useDispatch,useSelector} from "react-redux";

const ChangeProfileScreen = () =>{

    const profile = useSelector((state) => state.profile.profile);

    const [fullname,setFullname] = useState(profile[0].HoTen);
    const [image, setImage] = useState({uri:profile[0].AnhSV});


    return (
        <View style={styles.container}>
            <View style={{alignItems: 'center'}}>
                <TouchableOpacity>
                    <Avatar.Image 
                        style={styles.image}
                        source={image.uri !== '' && image.uri != null ? {uri: image.uri} : require("../../../../assets/user.png")}
                        size={100}/>

                    <View style={styles.backgroundOpacity}>
                        <Ionicons style={styles.iconCamera} name="md-camera-reverse-sharp" size={20} color="black" />
                    </View>
                </TouchableOpacity>
            </View>

            <Text style={styles.labelText}>Tên</Text>

            <TextInput style={styles.input} keyboardType="default" 
                onChangeText={(fullname) => setFullname(fullname)}>{profile[0].HoTen}</TextInput>

            <View style={[styles.emailLabel,{marginHorizontal:20,marginVertical:10,fontSize:15}]}>
                <Text style={{color:'orange',fontWeight:'bold'}}>Email</Text>
                <Text style={{marginLeft:10,color:'red'}}>(Không thể thay đổi)</Text>
            </View>

            <TextInput style={[styles.input]} editable={false} placeholder={profile[0].Email}></TextInput>

            <TouchableOpacity
                style={styles.button}>

                <Text style={styles.textBtnConnect}>Kết nối</Text>
            </TouchableOpacity>
          
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        width:100,
        height:100,
        marginTop: 10,
        borderRadius: 60,
        backgroundColor:'#dcdcdc'
    },

    backgroundOpacity:{
        position: "absolute", 
        bottom: 10, 
        right: 14
    },

    labelText: {
        marginHorizontal:20,
        marginVertical:10,
        fontSize:15,
        fontWeight:'bold',
        color:'orange'
    },

    input:{
        marginHorizontal:15,
        backgroundColor:"#cccc",
        borderRadius:20,
        padding:10
    },

    emailLabel:{
        flexDirection:'row',
    },

    iconCamera:{
        opacity: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },

    button:{
        backgroundColor: "#009999",
        margin:60,
        borderRadius:20,
        padding:10
    },

    textBtnConnect: {
        color: "white",
        fontSize: 15,
        textAlign: "center",
    },
})

export default ChangeProfileScreen;