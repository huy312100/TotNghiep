import React,{useState,useEffect} from 'react';
import { Dimensions,ScrollView,View,StyleSheet,Text,TouchableOpacity,TextInput,TouchableWithoutFeedback,Keyboard,ImageBackground } from 'react-native';
import { Entypo,FontAwesome,MaterialCommunityIcons } from '@expo/vector-icons'
import { Header,Overlay } from 'react-native-elements';

import RNPickerSelect from "react-native-picker-select";

import {useSelector} from 'react-redux';

import * as imagePickerUtils from '../../../utils/ImagePicker';
import * as forumServices from '../../../services/Forum';


const CreatePostScreen = ({navigation}) => {

    const token = useSelector((state) => state.authen.token);

    const [pageCurrent,setPageCurrent] = useState(0);
    const [title,setTitle] = useState('');
    const [typeForum,setTypeForum] = useState('');
    const [idCourse,setIdCourse] = useState('');
    const [imageSelected,setImageSelected] = useState({uri:null});
    const [dataCourse,setDataCourse] = useState([]);

    const [visibleOverlay,setVisibleOverlay] = useState(false);

    
    useEffect(() => {
        getAllCourses();
    },[pageCurrent])

    const toggleOverlay = () => {
        setVisibleOverlay(!visibleOverlay);
    };

    const checkDisableAddButton = () => {
        if(title.trim().length !==0 && typeForum !==""){
            if(typeForum === 'Môn học'){
                console.log('idCourse print here',idCourse);
                if(idCourse !== '' && idCourse != null){
                    return false;
                }
                return true;
            }
            return false;
        }
        return true;
    };

    const getAllCourses = () => {
        let details = {
            page: pageCurrent,
        };

        let formBody = [];

        for (let property in details) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        console.log(formBody);

        fetch("https://hcmusemu.herokuapp.com/studycourses/allcourses", {
            method: "POST",
            headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `bearer ${token}`,
            },
            body: formBody,
        }).then((response) => {
            const statusCode = response.status;
            const dataRes = response.json();
            return Promise.all([statusCode, dataRes]);
          }).then(([statusCode, dataRes]) => {
            console.log(dataRes);
            //tmp.concat(json)
            if(statusCode === 200){
                const tmp = [];
                for (const key in dataRes) {
                    if(dataRes.message == undefined || dataRes.message !== "Page not Found") {
                        tmp.push({
                            label: dataRes[key].name,
                            value: dataRes[key].IDCourses,
                        });
                    }             
                };
                setDataCourse(dataCourse.concat(tmp));
                console.log(tmp);
                if(tmp.length !==0){
                    setPageCurrent(pageCurrent+1);
                }
            }
            
            //dispatch(courseActions.getAllCourses(data.concat(json)));
        }).catch((err) => console.log(err, "error"));
    };

    return (

        <TouchableWithoutFeedback onPress={() =>{
            Keyboard.dismiss();
          }}>
            <ScrollView style={styles.container}>
                <Header
                    containerStyle={{
                        backgroundColor: 'white',
                        justifyContent: 'space-around',
                        borderBottomColor:'#DDDDDD'
                    }}

                    centerComponent={
                        <Text style={{fontSize:20,fontWeight:'500',marginTop:3}}>Tạo mới </Text>
                    }

                    leftComponent={
                    <TouchableOpacity onPress={() =>{ 
                        //socket.emit('Return-Chat',[roomID,route.params.email]);
                        navigation.goBack();
                        }}>
                            <Entypo name="chevron-left" size={30} color="blue" />
                        </TouchableOpacity>
                    }

                    rightComponent={
                        
                            <TouchableOpacity style={{flexDirection:'row',marginTop:3}}  disabled={checkDisableAddButton()}
                                onPress={async() =>{
                                    if(typeForum === 'Khoa' || typeForum === 'Trường'){
                                        await forumServices.createPost(token,title,imageSelected,typeForum);
                                        navigation.goBack();
                                    }

                                    else if(typeForum === 'Môn học'){
                                        await forumServices.createCoursePost(token,idCourse,title,imageSelected);
                                        navigation.goBack();
                                    }

                                }}
                            >
                               {!checkDisableAddButton() && <FontAwesome name="send" size={24} color="#444444" />}
                            </TouchableOpacity>
                    }
                    />

                <View style={styles.card}>
                    <TextInput multiline style={styles.titleName} placeholder='Thêm nội dung cho bài viết'
                    onChangeText={(title)=>{
                        //console.log(checkTitle(title));
                        setTitle(title);
                        }}>{title}</TextInput>
                </View> 

                <TouchableOpacity style={[styles.card,{marginTop:0}]}
                    onPress={() =>{
                        toggleOverlay();
                    }}>
                    <View style={styles.rowView}>
                        <Text style={styles.label}>Diễn đàn </Text>
                       
                        <Text style={[styles.onTheRight,{marginRight:20,fontSize:15,color:'silver'}]}>{typeForum}</Text>
                        <Entypo style={styles.onTheRight} name="chevron-thin-right" size={18} color="blue" />
                     
                    </View>
                </TouchableOpacity> 

                {typeForum === 'Môn học' && <View style={[styles.card,{marginTop:0}]}>
                    <RNPickerSelect
                        onValueChange={(value) => { 
                            console.log(value);
                            setIdCourse(value);
                        }}
                        style={{...pickerSelectStyles,iconContainer: {
                            top: 10,
                            right: 20,
                          },
                        }}
                        useNativeAndroidPickerStyle={false}
                        //fixAndroidTouchableBug={true}
                        placeholder={{
                            label: "Chọn môn học",
                            value: null,
                            color:'black',
                        }}
                        items={dataCourse}
                        Icon={() => {
                            return <Entypo name="chevron-thin-right" size={18} color="blue" />;
                        }}
                    />
                </View>}
                

                <View style={styles.card}>
                    <View style={styles.rowView}>
                        <Text style={styles.label}>Thêm ảnh</Text>    

                        <TouchableOpacity style={{marginLeft:'auto'}}
                            onPress={async () =>{
                                let image = await imagePickerUtils.openImagePickerAsync();
                                console.log(image);
                                setImageSelected(image)
                            }}
                        >
                        <ImageBackground style={{width:Dimensions.get("window").width*0.5,height:Dimensions.get("window").width*0.5,borderStyle:'dashed',borderColor:'silver',borderWidth:2,justifyContent:'center',alignItems:'center'}}
                             source={{uri: imageSelected.uri !=='' ? imageSelected.uri : null}}
                        >
                            <MaterialCommunityIcons name="image-plus" size={40} color="#0099CC" />
                        </ImageBackground>

                    </TouchableOpacity>                 
                    </View>
                </View> 

                <Overlay isVisible={visibleOverlay} onBackdropPress={toggleOverlay}>
                    <TouchableOpacity style={[styles.card,{marginTop:0,marginBottom:0,borderBottomWidth:1,width:100,height:25}]} 
                        onPress={() => {
                            toggleOverlay();
                            setTypeForum('Trường');    
                        }}>
                        
                        <View style={{alignItems:'center'}}>
                            <Text>
                                Trường 
                            </Text>
                        </View>


                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.card,{marginTop:10,marginBottom:0,borderBottomWidth:1,width:100,height:25}]} 
                        onPress={() => {
                            toggleOverlay();
                            setTypeForum('Khoa');
                        }}>
                        
                        <View style={{alignItems:'center'}}>
                            <Text>
                                Khoa 
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.card,{marginTop:10,marginBottom:0,borderBottomWidth:1,width:100,height:25}]} 
                        onPress={() => {
                            toggleOverlay();
                            setTypeForum('Môn học');
                        }}>
                        
                        <View style={{alignItems:'center'}}>
                            <Text>
                                Môn học 
                            </Text>
                        </View>
                    </TouchableOpacity>
                </Overlay>
            </ScrollView>
          </TouchableWithoutFeedback>
        
        
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    card: {
        width: '100%',
        backgroundColor:'white',
        borderBottomWidth:1,
        borderBottomColor: "#EEEEEE",
        marginTop:20
    },

    titleName:{
        marginHorizontal: 25,
        marginVertical:10,
        fontSize:20,
        fontWeight:'500',
        height:200
    },

    rowView: {
        flexDirection:'row',
        marginHorizontal:20,
        marginVertical:10,
    },

    label: {
        fontSize:16,
        marginLeft:5
    },

    onTheRight: {
        position: 'absolute',
        right: 0
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 25,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 25,
      paddingVertical: 8,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
  });

export default CreatePostScreen;