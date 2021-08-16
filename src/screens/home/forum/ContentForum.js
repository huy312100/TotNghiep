import React,{useState,useEffect,useRef,useCallback} from 'react';
import { ScrollView,View,StyleSheet,Text,TouchableOpacity,Image,FlatList,TextInput,KeyboardAvoidingView ,ImageBackground,Alert,Platform,ActivityIndicator,Linking} from 'react-native';
import { Fontisto,FontAwesome,Entypo,MaterialCommunityIcons,AntDesign,Ionicons } from '@expo/vector-icons';
import { Header } from 'react-native-elements';
import Hyperlink from 'react-native-hyperlink';

import Lightbox from 'react-native-lightbox-v2';

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

    const [loading, setLoading] = useState(false);
    const [refresh,setRefresh] = useState(false);

    const [dataDetail,setDataDetail] = useState([]);
    const [dataComment,setDataComment] = useState([]);
    const [imageSelected,setImageSelected] = useState({uri:""});
    const [comment,setComment] = useState('');
    const [commentInput,setCommentInput] = useState('');

    useEffect(() => {
        getDetailPost();
        getAllComment();    
        return()=>{
            unmounted.current = true;
        }    
    },[refresh,dataDetail.length]);

    const getDetailPost = () => {
        if(typeForum === 'faculty' || typeForum === 'university'){
            getDetailPostOfFacultOrUni();
        }
        else if(typeForum === 'course'){
            getDetailPostOfCourse();
        }
    }


    //Get detail post 
    const getDetailPostOfFacultOrUni = () =>{
        setLoading(true);
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

        fetch("https://hcmusemu.herokuapp.com/forum/viewdetail", {
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
                setDataDetail(dataRes);
                setLoading(false);
            }
        }).catch(error => console.log('error', error));
    };

    const getDetailPostOfCourse= () =>{
        setLoading(true);
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

        fetch("https://hcmusemu.herokuapp.com/forum/courses/viewdetail", {
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
                setDataDetail(dataRes);
                setLoading(false);
            }
        }).catch(error => console.log('error', error));
    };

    const getAllComment =()=>{
        if(typeForum === 'faculty' || typeForum === 'university'){
            getAllCommentOfFacultyOrUniversity();
        }
        else if(typeForum === 'course'){
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
            if(statusCode === 200){
                setDataComment(dataRes);
            }
        }).catch(error => console.log('error', error));
    };

    const headerComponent = ()=>{
    return (
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

            <Hyperlink linkStyle={{ color: 'blue',textDecorationLine:'underline' }} onPress={ (url) =>  Linking.openURL(url)}>
                <View tyle={[styles.info,{marginBottom:20}]}>      
                    <Text style={[styles.content]}>{dataOfForum.title}</Text>                
                </View>
            </Hyperlink>

            {dataOfForum.image !== "" && 
                <Lightbox>
                    <Image style={styles.imagePost} source={{uri:dataOfForum.image}}/>
                </Lightbox>
            }

            {dataDetail.length !== 0 && <View style={styles.footerCard}>
                {dataDetail[0].LikeByOwn === 0 ? <TouchableOpacity style={styles.buttonFooter}
                    onPress={async()=>{
                        if(typeForum === 'faculty' || typeForum === 'university'){
                            await forumServices.likePost(token,dataOfForum.ID);
                        }
                        if(typeForum === 'course'){
                            await forumServices.likeCoursePost(token,dataOfForum.ID);
                        }
                        setRefresh(!refresh);
                    }}>
                    <Fontisto style={{marginRight:8}} name="like" size={18} color="silver" />
                    <Text style={{marginTop:3,color:'silver'}}>{dataDetail[0].like}</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity style={styles.buttonFooter}
                    onPress={async()=>{
                        await forumServices.unlikePost(token,dataOfForum.ID);
                        setRefresh(!refresh);
                        
                    }}>
                    <Fontisto style={{marginRight:8}} name="like" size={18} color="blue" />
                     <Text style={{marginTop:3,color:'blue'}}>{dataDetail[0].like}</Text>
                </TouchableOpacity>}

                <TouchableOpacity style={styles.buttonFooter}>
                    <Text style={{marginTop:2,color:'silver'}}>{dataDetail[0].comment} câu trả lời</Text>
                </TouchableOpacity>
            </View>}
        </View>

        <View style={{flexDirection:'row',marginHorizontal:10,marginTop:10}}>
            <MaterialCommunityIcons name="arrow-top-right-bold-outline" size={24} color="grey" />
            <Text style={{color:'grey',marginTop:4,fontWeight:'600'}}> Tất cả câu trả lời</Text>
        </View>

        </View>
        )
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
                                        text: "Xác nhận",
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

                rightComponent={
                    <TouchableOpacity onPress={()=>{
                        navigation.navigate('List User Liked',{
                            idPost: dataOfForum.ID,
                            typeForum:typeForum,
                        });
                    }}>
                        <Ionicons name="list" size={30} color="#006666" />
                    </TouchableOpacity>
                }

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
                {/* <Text>{dataDetail[0].like}</Text> */}

            {loading ? <ActivityIndicator style={{flex: 1}} color="black"/>
            :
            <FlatList
                data={dataComment}
                renderItem={renderItem}
                keyExtractor={(item,index) => index.toString()}
                ListHeaderComponent={headerComponent()}
                // ListFooterComponent={footerComponent}
            />
        }

            <View style={{ marginBottom:66}}>

            </View>

            {Platform.OS === 'ios' ? <KeyboardAvoidingView behavior='position'>
                <View style={cmtStyles.bottomCmtView} >
                {imageSelected.uri !== "" &&
                    <ImageBackground source={{uri: imageSelected.uri}} style={cmtStyles.imgSelected}>
                        <TouchableOpacity onPress={() =>{
                            setImageSelected({uri:""});
                        }}>
                            <Ionicons style={{ position: 'absolute',right:0, opacity:0.5}} name="close-circle-outline" size={20} color="#EEEEEE" />
                        </TouchableOpacity>
                    </ImageBackground>}
                    <View style={cmtStyles.bottomCmtComponent}>
                        <TouchableOpacity style={{bottom:0}}
                            onPress={async() =>{
                                let image = await imagePickerUtils.openImagePickerAsync();
                                console.log(image);
                                setImageSelected(image)
                            }}
                        >
                            <Ionicons style={{marginTop:2}} name="md-image-outline" size={32} color="#CCCCCC" />
                        </TouchableOpacity>

                        <TextInput multiline style={cmtStyles.bottomTxtInput} placeholder="Nhập câu trả lời... "
                            onChangeText={(value) => {
                                setComment(value);
                            }}
                            clearButtonMode="always"
                            ref={input => { setCommentInput(input) }}
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
                                    commentInput.clear();
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

                :

                <View style={cmtStyles.bottomCmtView} >
                    {imageSelected.uri !== "" &&
                        <ImageBackground source={{uri: imageSelected.uri}} style={cmtStyles.imgSelected}>
                            <TouchableOpacity onPress={() =>{
                                setImageSelected({uri:""});
                            }}>
                                <Ionicons style={{ position: 'absolute',right:0, opacity:0.5}} name="close-circle-outline" size={20} color="#EEEEEE" />
                            </TouchableOpacity>
                        </ImageBackground>}

                        <View style={cmtStyles.bottomCmtComponent}>
                            <TouchableOpacity style={{bottom:0}}
                                onPress={async() =>{
                                    let image = await imagePickerUtils.openImagePickerAsync();
                                    console.log(image);
                                    setImageSelected(image)
                                }}>
                                <Ionicons style={{marginTop:2}} name="md-image-outline" size={32} color="#CCCCCC" />
                            </TouchableOpacity>

                            <TextInput multiline style={cmtStyles.bottomTxtInput} placeholder="Nhập câu trả lời... "
                                onChangeText={(value) => setComment(value)}
                                ref={input => { setCommentInput(input) }}
                            />
                           
                            {comment.trim().length !== 0 && <TouchableOpacity
                            style={cmtStyles.btnSubmitCmt}
                                onPress={async() =>{
                                    if(typeForum === 'faculty' || typeForum === 'university'){
                                        await forumServices.commentPost(token,dataOfForum.ID,comment,imageSelected);
                                    }
                                    else if(typeForum === 'course'){
                                        console.log(token,dataOfForum.ID,comment,imageSelected);
                                        await forumServices.commentCoursePost(token,dataOfForum.ID,comment,imageSelected);
                                    }
                                        setComment('');
                                        commentInput.clear();
                                        setImageSelected({uri:""});
                                        setRefresh(!refresh);
                                }}>
                                <MaterialCommunityIcons name="send-circle" size={30} color="blue" />
                            </TouchableOpacity>}


                        </View>
                </View>
            }
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
        borderColor:'silver',
        borderWidth:.3
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
        marginHorizontal:Platform.OS === 'android' ? 9 :2 ,
        marginVertical:2
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