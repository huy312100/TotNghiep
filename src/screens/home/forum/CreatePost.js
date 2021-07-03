import React,{useState} from 'react';
import { View,StyleSheet,Text,TouchableOpacity,TextInput,TouchableWithoutFeedback,Keyboard,ImageBackground } from 'react-native';
import { Entypo,FontAwesome,MaterialCommunityIcons } from '@expo/vector-icons'
import { Header,Overlay } from 'react-native-elements';

import {useSelector} from 'react-redux';

import * as imagePickerUtils from '../../../utils/ImagePicker';
import * as forumServices from '../../../services/Forum';


const CreatePostScreen = ({navigation}) => {

    const token = useSelector((state) => state.authen.token);

    const [title,setTitle] = useState('');
    const [typeForum,setTypeForum] = useState('');
    const [imageSelected,setImageSelected] = useState({uri:null});

    const [visibleOverlay,setVisibleOverlay] = useState(false);

    const toggleOverlay = () => {
        setVisibleOverlay(!visibleOverlay);
    };

    const checkDisableAddButton = () => {
        if(title.trim().length !==0 && typeForum !==""){
            return false;
        }
        return true;
    }

    return (

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
                                    await forumServices.createPost(token,title,imageSelected,typeForum);
                                    navigation.goBack();
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
                        <ImageBackground style={{width:200,height:200,borderStyle:'dashed',borderColor:'silver',borderWidth:2,justifyContent:'center',alignItems:'center'}}
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
                </Overlay>
            </View>
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
        fontSize:18,
        marginLeft:5
    },

    onTheRight: {
        position: 'absolute',
        right: 0
    },
});

export default CreatePostScreen;