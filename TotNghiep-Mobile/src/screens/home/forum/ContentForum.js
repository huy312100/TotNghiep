import React,{useState,useEffect,useRef} from 'react';
import { View,StyleSheet,Text,TouchableOpacity,Image,FlatList,TextInput,KeyboardAvoidingView ,ImageBackground,Alert} from 'react-native';
import { Fontisto,FontAwesome,Entypo,MaterialCommunityIcons,AntDesign,Ionicons } from '@expo/vector-icons';
import { Header } from 'react-native-elements';

import {useSelector} from 'react-redux';

import * as dateUtils from '../../../utils/Date';
import * as imagePickerUtils from '../../../utils/ImagePicker';
import * as forumServices from '../../../services/Forum';
import { color } from 'react-native-elements/dist/helpers';

const ContentForumFacultyAndUniversityScreen =({navigation,route})=>{

    const token = useSelector((state) => state.authen.token);
    const profile=useSelector((state) => state.profile.profile);

    const unmounted = useRef(false);

    const [refresh,setRefresh] = useState(false);

    const [dataComment,setDataComment] = useState([]);
    const [imageSelected,setImageSelected] = useState({uri:""});
    const [comment,setComment] = useState('');
    const dataOfForum = route.params.dataOfForum;

    useEffect(() => {
        getAllComment();
        return()=>{
            unmounted.current = true;
        }
    },[refresh]);


    const getAllComment =()=>{
        let details = {
            IDPost: dataOfForum.ID,
        };
      
        let formBody = [];
    
        for (let property in details) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        fetch("https://hcmusemu.herokuapp.com/forum/viewcmt", {
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
            if(statusCode === 200){
                setDataComment(dataRes);
            }
        }).catch(error => console.log('error', error));
    }

    const checkLike = (item) =>{
        if(item.LikeByOwn === 1)
        {
            return true;
        }
        else{return false;}
    }

    const renderItem = ({item}) =>(
        <View style={styles.card}>
             <View style={styles.info}>
                <Image style={styles.imageUserPost} source={ item.AvartOwn === "" || item.AvartOwn == null ? require("../../../../assets/user-icon.png") : {uri : item.AvartOwn}}/>
                <View style={{flexDirection:'row'}}>
                    <Text style={[styles.nameAndDate,{marginRight:5},cmtStyles.nameAndDate]}>{item.NameOwn}</Text>
                    <Entypo name="dot-single" size={18} color="silver" />
                    <Text style={[styles.nameAndDate,{fontWeight:'300',marginLeft:5},cmtStyles.nameAndDate]}>{dateUtils.ConvertToTimeAgoGeneral(item.time)}</Text>
                    
                </View>
                {item.EmailOwn === profile[0].Email && 
                        <TouchableOpacity style={{ marginLeft:30,position: 'absolute',right:0}}
                            
                            onPress={() =>{
                                Alert.alert(
                                    "Xoá bình luận",
                                    "Bạn có chắc chắn muốn xoá bình luận này ?",
                                    [
                                      { text: "Từ chối", 
                                        style: "cancel"
                                      },
                                      {
                                        text: "Cho phép",
                                        onPress: async () => {
                                            await forumServices.deleteCmt(token,item.ID);
                                            setRefresh(!refresh);
                                        },
                                      },
                                    ]
                                  );
                            }}>

                            <AntDesign name="close" size={14} color="silver" />
                        </TouchableOpacity>
                    }
            </View>

            <View tyle={[styles.info,{marginBottom:20}]}>      
                <Text style={[styles.content,{color:'#555555'}]}>{item.comment}</Text>                
            </View>

            {item.image !== "" && <Image style={styles.imagePost} source={{uri:item.image}}/>}
        </View>
    )

    const checkDisableAddButton =() =>{
        if(comment.trim().length !== 0){
            return false;
        }
        return true;
    }

    return (
        
        <View style={styles.container}>
        
        <Header
                containerStyle={{
                    backgroundColor: '#33CCFF',
                    justifyContent: 'space-around',
                    borderBottomColor:'#DDDDDD'
                }}

                centerComponent={
                    <Text numberOfLines={1} style={{fontSize:16,fontWeight:'500',marginTop:5, color: "white"}}>Bài đăng của {dataOfForum.NameOwn}</Text>
                }

                leftComponent={
                <TouchableOpacity onPress={() =>{ 
                    navigation.goBack();
                    }}>
                        <Entypo name="chevron-left" size={30} color="white" />
                    </TouchableOpacity>
                }/>
            <View>
            <View style={styles.card}>
            <View style={styles.info}>
            <Image style={styles.imageUserPost} source={ dataOfForum.AvartaOwn === "" || dataOfForum.AvartaOwn === null ? require("../../../../assets/user-icon.png") : {uri : dataOfForum.AvartaOwn}}/>
                <View>
                    <Text style={styles.nameAndDate}>{dataOfForum.NameOwn}</Text>
                    <Text style={[styles.nameAndDate,{fontWeight:'300',fontSize:12}]}>{dateUtils.ConvertToTimeAgo(dataOfForum.time)}</Text>
                </View>
                {dataOfForum.EmailOwn === profile[0].Email && 
                <TouchableOpacity style={{ position: 'absolute',right:0,top:0}}
                    onPress={async() =>{
                        await forumServices.deletePost(token,dataOfForum.ID);
                        navigation.goBack();
                    }}>

                    <AntDesign  name="delete" size={18} color="red" />
                </TouchableOpacity>}
            </View>
            
            <View tyle={[styles.info,{marginBottom:20}]}>      
                <Text style={[styles.content]}>{dataOfForum.title}</Text>                
            </View>

            {dataOfForum.image !== "" && <Image style={styles.imagePost} source={{uri:dataOfForum.image}}/>}

            <View style={styles.footerCard}>
                <TouchableOpacity style={styles.buttonFooter}
                    onPress={async()=>{
                        await forumServices.likePost(token,dataOfForum.ID);
                        setRefresh(!refresh);
                    }}
                >
                    <Fontisto style={{marginRight:8, color:checkLike(dataOfForum) ? 'blue':'silver'}} name="like" size={18} color="silver" />
                    <Text style={{marginTop:3,color:checkLike(dataOfForum) ? 'blue':'silver'}}>{dataOfForum.like}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonFooter}>
                    <Text style={{marginTop:2,color:'silver'}}>{dataOfForum.comment + "  " + "Comments"}</Text>
                </TouchableOpacity>
            </View>
        </View>
        
        </View>
            <FlatList
                data={dataComment}
                renderItem={renderItem}
                keyExtractor={(item,index) => index.toString()}
                //ListHeaderComponent={headerComponent}
                // ListFooterComponent={footerComponent}
                ListFooterComponent={<View style={{height: 80}}/>}
            />

        
            <View style={cmtStyles.bottomCmtView} >
            {imageSelected.uri !== "" &&
                <ImageBackground source={{uri: imageSelected.uri}} style={cmtStyles.imgSelected}>
                    <TouchableOpacity onPress={() =>{
                        setImageSelected({uri:""});
                    }}>
                        <Ionicons style={{ position: 'absolute',right:0, opacity:0.5}} name="close-circle-outline" size={20} color="#EEEEEE" />
                    </TouchableOpacity>   
                </ImageBackground>
            }
                <View style={cmtStyles.bottomCmtComponent}>
                    <TouchableOpacity style={{bottom:0}}
                        onPress={async() =>{
                            let image = await imagePickerUtils.openImagePickerAsync();
                            console.log(image);
                            setImageSelected(image)
                        }}
                    >
                        <Ionicons style={{marginTop:2}} name="md-image-outline" size={28} color="#CCCCCC" />
                    </TouchableOpacity>

                    <TextInput
                        style={cmtStyles.bottomTxtInput}
                        multiline={true}
                        editable={true}
                        placeholder="Nhập câu trả lời... " 
                        value = {comment}
                        onChangeText={value => setComment(value)}
                    />

                    <TouchableOpacity  disabled = {checkDisableAddButton()}
                        onPress={async() =>{
                            await forumServices.commentPost(token,dataOfForum.ID,comment,imageSelected);
                            setComment('');
                            setImageSelected({uri:""});
                            setRefresh(!refresh);
                        }}
                    >
                        <MaterialCommunityIcons style={[cmtStyles.btnSubmitCmt, {color: checkDisableAddButton() ? 'silver':'blue'}]} name="send-circle" size={30}/>
                    </TouchableOpacity>
                
                </View>
            </View>
            
        
        
        </View>
        
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    card: {
        marginTop:10,
        width: '100%',
        backgroundColor:'white',
        borderBottomWidth:1,
        borderBottomColor: "#cccccc",
        paddingBottom:5
    },

    imageUserPost:{
        width:38,
        height:38,
        borderRadius:25,
        backgroundColor:'grey'
    },

    nameAndDate: {
        fontWeight:'bold',
        marginRight:15,
        marginLeft:15
    },

    info: {
        flexDirection:'row',
        alignItems: 'center',
        marginVertical:10,
        marginHorizontal:10
    },

    content: {
        marginHorizontal:15,
        fontSize:12,
        marginBottom:10,
    },

    imagePost:{
        width:'100%',
        backgroundColor:'grey',
        aspectRatio: 1
    },

    footerCard:{
        flexDirection:'row',
        marginVertical:5,
        marginHorizontal:15,
        justifyContent: 'space-between'
    },

    buttonFooter:{
        flexDirection:'row'
    }
});

const cmtStyles = StyleSheet.create({
    nameAndDate: {
        color:'silver',
    },

    bottomCmtView: {
        flex: 1,
        borderWidth:0.2,
        borderColor:'silver',
        position: 'absolute',
        bottom:0,
        backgroundColor:'white',
        width:'100%',
        paddingTop: Header.HEIGHT,
    },

    bottomCmtComponent:{
        flexDirection:'row',
        marginTop:15,
        marginLeft:8,
        marginBottom:20,
    },

    bottomTxtInput: {
        maxHeight:100,
        borderRadius:20,
        backgroundColor:'#EEEEEE',
        width:'80%',
        marginLeft:10,
        paddingLeft:14,
        paddingRight:25,
        paddingTop:7.5,
        paddingBottom:5
    },

    btnSubmitCmt:{
        right:0,
        marginHorizontal:2,
        marginVertical:1.5
    },

    imgSelected:{
        backgroundColor:'grey',
        width:100,
        height:100,
        marginLeft:50,
        marginTop:10,
        aspectRatio: 1
    }
})

export default ContentForumFacultyAndUniversityScreen;