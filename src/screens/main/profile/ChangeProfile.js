import React,{useState} from 'react';
import { View,Text,StyleSheet,TouchableOpacity,TextInput,TouchableWithoutFeedback,Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import {Avatar} from 'react-native-paper';

import {useDispatch,useSelector} from "react-redux";

import * as imagePicker from "../../../utils/ImagePicker";
import * as profileServices from "../../../services/Profile";

import LoadingScreen from "../../LoadingScreen";

import * as profileActions from "../../../../store/actions/Profile";

const ChangeProfileScreen = ({navigation}) =>{
    const token = useSelector((state) => state.authen.token);
    const profile = useSelector((state) => state.profile.profile);

    const dispatch = useDispatch();

    const [fullname,setFullname] = useState(profile[0].HoTen);
    const [image, setImage] = useState({uri:profile[0].AnhSV});

    const [isLoading,setIsLoading] = useState(false);

    const checkDisableBtn = () =>{
        if(fullname === profile[0].HoTen && JSON.stringify(image) === JSON.stringify({uri:profile[0].AnhSV})){
            return true;
        }
        return false;
    };

    const getProfile = async() =>{
    
        //console.log(token);
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `bearer ${token}`);
    
        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };
    
        await fetch("https://hcmusemu.herokuapp.com/profile/view/parent",requestOptions)
          .then((response) => response.json())
          .then((json) => {
            //console.log(json);
    
            //console.log(dataUniversity);
            dispatch(profileActions.getProfile(json));
    
          }).catch((err) => console.log(err, "error"));
    };


    return (
        <TouchableWithoutFeedback onPress={() =>{
            Keyboard.dismiss();
        }}>


        <View style={styles.container}>
            {isLoading && LoadingScreen()}
            <View style={{alignItems: 'center'}}>
                <TouchableOpacity onPress={async ()=>{
                    let imageChoose=await imagePicker.openImagePickerAsync();

                    if(imageChoose.uri === null){
                    imageChoose = image;
                    console.log(imageChoose);
                    }
                    setImage(imageChoose);
                }}>
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

            <TouchableOpacity disabled={checkDisableBtn()}
                style={[styles.button,{backgroundColor: checkDisableBtn() ? "silver" : "#009999"}]}
                onPress={async() =>{
                    if(image.uri !== profile[0].AnhSV && image.uri != null){
                        setIsLoading(true);
                        await profileServices.deleteImage(token);
                        await profileServices.uploadImage(token,image);
                        await profileServices.editProfile(token,fullname);
                        await getProfile();
                        setIsLoading(false);
                        navigation.goBack();
                    }
                    else{
                        setIsLoading(true);
                        await profileServices.editProfile(token,fullname);
                        await getProfile();
                        setIsLoading(false);
                        navigation.goBack();
                    }  
                }}
                >
                <Text style={styles.textBtnConnect}>Chỉnh sửa</Text>
            </TouchableOpacity>
          
        </View>
        </TouchableWithoutFeedback>
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
        borderWidth:1,
        borderColor: 'silver',
        marginHorizontal:15,
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