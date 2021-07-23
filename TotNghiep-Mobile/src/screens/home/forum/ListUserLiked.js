import React,{useState,useEffect,useRef} from 'react';
import { View,Text,StyleSheet,FlatList,Image,TouchableOpacity } from 'react-native';

import { Entypo } from '@expo/vector-icons';

import {Header} from 'react-native-elements';

import { useDispatch,useSelector } from 'react-redux';

const ListUserLikedScreen = ({navigation,route}) =>{

    const token = useSelector((state) => state.authen.token);
    const unmounted = useRef(false);

    const idPost = route.params.idPost;
    const typeForum = route.params.typeForum;

    const [data, setData] = useState([]);

    useEffect(() => {
        getUserLiked();
        return()=>{
            unmounted.current = true;
        }
    },[]);

    const getUserLiked =() => {
        if(typeForum === 'faculty' || typeForum === 'university'){
            //console.log('a');
            getUserLikedForumFaculOrUni();
        }
        else if(typeForum === 'course'){
            //console.log('b');
            getUserLikedForumCourse();
        }
    };

    const getUserLikedForumFaculOrUni = () => {
        let details = {
            IDPost: idPost
        }
      
        let formBody = [];
    
        for (let property in details) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        fetch("https://hcmusemu.herokuapp.com/forum/viewlike", {
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
                setData(dataRes);
            }
        }).catch(error => console.log('error', error));
    };

    const getUserLikedForumCourse= () => {
        let details = {
            IDPost: idPost
        }
      
        let formBody = [];
    
        for (let property in details) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        fetch("https://hcmusemu.herokuapp.com/forum/courses/viewlike", {
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
                setData(dataRes);
            }
        }).catch(error => console.log('error', error));
    };

    const renderItem = ({ item }) => (
        <View style={styles.userInfo}>
            <View style={styles.userImgWrapper}>
                <Image style={styles.userImg} source={ item.Avart === "" || item.Avart === null ? require("../../../../assets/user-icon.png") : {uri : item.Avart}}/>
            </View>
            <View style={styles.textSection}>
                <View style={styles.userInfoText}>
                  <Text style={styles.name}>{item.Name}</Text>
                </View>
                <Text style={styles.email}>{item.Email}</Text>
            </View>
          </View>
    );

    return (
        <View style={styles.container}>
             <Header
                containerStyle={{
                    backgroundColor: 'white',
                    justifyContent: 'space-around',
                    borderBottomColor:'#DDDDDD'
                }}

                centerComponent={
                    <Text numberOfLines={1} style={{fontSize:12,fontWeight:'500',marginTop:10}}>Người yêu thích diễn đàn</Text>
                }

                leftComponent={
                <TouchableOpacity onPress={() =>{ 
                    navigation.goBack();
                    }}>
                        <Entypo name="chevron-left" size={30} color="blue" />
                    </TouchableOpacity>
            }/>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item,index) => index.toString()}
            />
        </View>
        
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
  
    userInfo:{
      flexDirection:"row",
      justifyContent: "space-between",
    },

    
    userImgWrapper:{
      paddingTop: 15,
      paddingBottom: 15,
      marginHorizontal:15,
    },
  
    userImg:{
      width: 50,
      height: 50,
      borderRadius: 25,
    },

    textSection:{
      flexDirection: "column",
      justifyContent: "center",
      padding: 15,
      paddingLeft: 0,
      marginLeft: 10,
      width: '100%',
      borderBottomWidth: 1,
      borderBottomColor: "#cccccc",
    },
  
    userInfoText:{
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 5,
    },
  
    name:{
      fontSize: 14,
      fontWeight: "bold",
    },

    email:{
      fontSize: 14,
      color: "#333333",
    },

});

export default ListUserLikedScreen;