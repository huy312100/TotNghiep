import React,{useState,useEffect,useRef} from 'react';
import { View,StyleSheet,Text,TouchableOpacity,Image,FlatList,TextInput,KeyboardAvoidingView ,ImageBackground,Alert} from 'react-native';
import { Fontisto,FontAwesome,Entypo,MaterialCommunityIcons,AntDesign,Ionicons } from '@expo/vector-icons';
import { Header } from 'react-native-elements';

import {useSelector} from 'react-redux';

import * as dateUtils from '../../../utils/Date';
import * as imagePickerUtils from '../../../utils/ImagePicker';
import * as forumServices from '../../../services/Forum';

const ContentForumFacultyAndUniversityScreen =({navigation,route})=>{

    const token = useSelector((state) => state.authen.token);
    const profile=useSelector((state) => state.profile.profile);

    const dataOfForum = route.params.dataOfForum;
    const typeForum=route.params.typeForum;

    const unmounted = useRef(false);

    const [refresh,setRefresh] = useState(false);

    const [dataComment,setDataComment] = useState([]);
    const [imageSelected,setImageSelected] = useState({uri:""});
    const [comment,setComment] = useState('');

    useEffect(() => {
        getAllComment();
        return()=>{
            unmounted.current = true;
        }
    },[refresh]);

    const getAllComment =()=>{
        console.log(typeForum);
        if(typeForum === 'faculty' || typeForum === 'university'){
            //console.log('a');
            getAllCommentOfFacultyOrUniversity();
        }
        else if(typeForum === 'course'){
            //console.log('b');
            getAllCommentCourse();
        }
    };

    const getAllCommentOfFacultyOrUniversity =() => {
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
            console.log(statusCode,dataRes);
            if(statusCode === 200){
                setDataComment(dataRes);
            }
        }).catch(error => console.log('error', error));
    };

    const getAllCommentCourse =() => {
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
            console.log(statusCode,dataRes);
            if(statusCode === 200){
                setDataComment(dataRes);
            }
        }).catch(error => console.log('error', error));
    }; 

    const headerComponent = (
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
                        if(typeForum === 'faculty' || typeForum === 'university'){
                            await forumServices.deletePost(token,dataOfForum.ID);
                            navigation.goBack();
                        }
                        else if(typeForum === 'course'){
                            await forumServices.deleteCoursePost(token,dataOfForum.ID);
                            navigation.goBack();
                        }
                        
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
                        if(typeForum === 'faculty' || typeForum === 'university'){
                            await forumServices.likePost(token,dataOfForum.ID);
                        }
                        else if(typeForum === 'course'){
                            await forumServices.likeCoursePost(token,dataOfForum.ID);
                        }
                        setRefresh(!refresh);
                    }}
                >
                    <Fontisto style={{marginRight:8}} name="like" size={18} color="silver" />
                    <Text style={{marginTop:3,color:'silver'}}>{dataOfForum.like}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonFooter}>
                    <FontAwesome style={{marginRight:8}} name="comment" size={18} color="silver" />
                    <Text style={{marginTop:2,color:'silver'}}>{dataOfForum.comment}</Text>
                </TouchableOpacity>
            </View>
        </View>

        <View style={{flexDirection:'row',marginHorizontal:10,marginTop:10}}>
            <MaterialCommunityIcons name="arrow-top-right-bold-outline" size={24} color="grey" />
            <Text style={{color:'grey',marginTop:4,fontWeight:'600'}}> Tất cả câu trả lời</Text>
        </View>
        
        </View>
    );

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
                                            if(typeForum === 'faculty' || typeForum === 'university'){
                                                await forumServices.deleteCmt(token,item.ID);
                                            }
                                            else if(typeForum === 'course'){
                                                await forumServices.deleteCourseCmt(token,item.ID);
                                            }
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

    return (
        
        <View style={styles.container}>
        
        <Header
                containerStyle={{
                    backgroundColor: 'white',
                    justifyContent: 'space-around',
                    borderBottomColor:'#DDDDDD'
                }}

                centerComponent={
                    <Text numberOfLines={1} style={{fontSize:12,fontWeight:'500',marginTop:10}}>Diễn đàn của {dataOfForum.NameOwn}</Text>
                }

                leftComponent={
                <TouchableOpacity onPress={() =>{ 
                    navigation.goBack();
                    }}>
                        <Entypo name="chevron-left" size={30} color="blue" />
                    </TouchableOpacity>
                }/>
            
            <FlatList
                data={dataComment}
                renderItem={renderItem}
                keyExtractor={(item,index) => index.toString()}
                ListHeaderComponent={headerComponent}
                // ListFooterComponent={footerComponent}
            />

            <View style={{ marginBottom:66}}>

            </View>

        <KeyboardAvoidingView behavior={"position"}>
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

                    <TextInput multiline style={cmtStyles.bottomTxtInput} placeholder="Nhập câu trả lời... " 
                        onChangeText={(value) => setComment(value)}
                        clearButtonMode="always"
                    />

                    {comment.trim().length !== 0 &&
                    <TouchableOpacity 
                        onPress={async() =>{
                            if(typeForum === 'faculty' || typeForum === 'university'){
                                await forumServices.commentPost(token,dataOfForum.ID,comment,imageSelected);                                
                            }
                            else if(typeForum === 'course'){
                                console.log(token,dataOfForum.ID,comment,imageSelected);
                                await forumServices.commentCoursePost(token,dataOfForum.ID,comment,imageSelected);
                            }
                                setComment('');
                                setImageSelected({uri:""});
                                setRefresh(!refresh);
                        }}
                    >
                        <MaterialCommunityIcons style={cmtStyles.btnSubmitCmt} name="send-circle" size={30} color="blue" />
                    </TouchableOpacity>
                    }   
                </View>
            </View>
            
        
            </KeyboardAvoidingView>
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
        width:'100%'
    },

    bottomCmtComponent:{
        flexDirection:'row',
        marginTop:15,
        marginLeft:8,
        marginBottom:20
    },

    bottomTxtInput: {
        maxHeight:100,
        borderRadius:20,
        backgroundColor:'#EEEEEE',
        width:'88%',
        marginLeft:10,
        paddingLeft:14,
        paddingRight:25,
        paddingTop:7.5,
        paddingBottom:5
    },

    btnSubmitCmt:{
        position:'absolute',
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