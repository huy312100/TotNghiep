import React,{useState,useEffect,useRef} from 'react';
import { StyleSheet, View, Text,Dimensions,TouchableOpacity,Image,FlatList,Linking,Alert,ActivityIndicator } from 'react-native';
import { Header} from 'react-native-elements';
import { useDispatch,useSelector } from 'react-redux';

import { Ionicons,FontAwesome5,Entypo } from '@expo/vector-icons';


const ForumOfCourseMoodleScreen = ({navigation,route}) =>{

    const [data, setData] = useState([]);
    const [idForum,setIDForum] = useState('');

    useEffect(() => {
        getForumByCourse();
        getDiscusstionInForum();
        console.log(data);
    },[idForum]);
    
    const getForumByCourse = () =>{
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
          fetch(`https://courses.ctda.hcmus.edu.vn/webservice/rest/server.php?wstoken=e60659766afd56c8cdfdf54a994ab063&moodlewsrestformat=json&wsfunction=mod_forum_get_forums_by_courses&courseids[0]=${route.params.idCourse}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                //console.log(result[1].id);
                //let foundID = result.find(o=>o.name === 'Discussion Forums');
                 setIDForum(result[1].id);
                
            })
            .catch(error => console.log('error', error));
    }

    const getDiscusstionInForum = () => {
        console.log(idForum);
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
          fetch(`https://courses.ctda.hcmus.edu.vn/webservice/rest/server.php?wstoken=e60659766afd56c8cdfdf54a994ab063&moodlewsrestformat=json&wsfunction=mod_forum_get_forum_discussions_paginated&forumid=${idForum}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                setData(result.discussions);
            })
            .catch(error => console.log('error', error));
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.card} onPress={() =>{
            navigation.navigate("Content Forum Of A Moodle Course",{
                nameForum: item.name,
                userPost:item.userfullname,
                content: item.message,
            })
        }}>

             <View style={styles.info}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={{marginLeft:15,marginTop:10}}>Người đăng : {item.userfullname}</Text>
            </View>
        </TouchableOpacity>
    )

    return(
        <View style={styles.container}>
            <Header
            containerStyle={{
                backgroundColor: 'white',
                justifyContent: 'space-around',
                borderBottomColor:'#DDDDDD'
            }}
            centerComponent={
                <Text style={{fontSize:17,fontWeight:'500'}} numberOfLines={1}>{route.params.name}</Text>
            }
            leftComponent={
              <TouchableOpacity onPress={() =>{
                  navigation.goBack();
              }}>
                  <Ionicons name="chevron-back-sharp" size={24} color="blue" />
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

    card: {
        width: '100%',
        backgroundColor:'white',
        borderBottomWidth:1,
        borderBottomColor: "#cccccc",
        paddingBottom:5
    },

    info: {
        justifyContent: 'center',
        marginVertical:10
    },

    title: {
        fontWeight:'bold',
        marginRight:15,
        marginLeft:15
    },

});

export default ForumOfCourseMoodleScreen;