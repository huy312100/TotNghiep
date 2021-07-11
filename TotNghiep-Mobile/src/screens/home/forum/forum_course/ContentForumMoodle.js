import React,{useState,useEffect,useRef} from 'react';
import { StyleSheet, View, Text,TouchableOpacity,ScrollView,Linking } from 'react-native';
import { Header} from 'react-native-elements';

import { Ionicons,FontAwesome5,Entypo } from '@expo/vector-icons';
import HTML from "react-native-render-html";


const ContentForumScreen = ({navigation,route}) =>{

    const contentForumMoodle = route.params.content;

    return(
        <View style={styles.container}>
            <Header
            containerStyle={{
                backgroundColor: 'white',
                justifyContent: 'space-around',
                borderBottomColor:'#DDDDDD'
            }}
            centerComponent={
                <Text style={{fontSize:17,fontWeight:'500'}} numberOfLines={1}>{contentForumMoodle.name}</Text>
            }
            leftComponent={
              <TouchableOpacity onPress={() =>{
                  navigation.goBack();
              }}>
                  <Ionicons name="chevron-back-sharp" size={24} color="blue" />
              </TouchableOpacity>
              
            }/>

            <ScrollView style={styles.card} >

             <View style={styles.info}>
                <Text style={styles.title}>Người đăng : {contentForumMoodle.fullname}</Text>
                <View style={{marginHorizontal:10}}>
                    <HTML source={{ html: contentForumMoodle.message }}></HTML>

                    <View style={{flexDirection:'row',marginTop:80}}>
                        <Text style={{fontWeight:'bold'}}>Nguồn : </Text>
                        {/* <TouchableOpacity 
                            onPress={() =>{
                                Linking.openURL(contentForumMoodle.url)
                            }}
                        >
                            <Text style={{textDecorationLine:'underline',color:'blue'}}>{contentForumMoodle.url}</Text>

                        </TouchableOpacity> */}
                    </View>
                    
                </View>

               
                
            </View>
        </ScrollView>

           
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
        marginLeft:10
    },

});

export default ContentForumScreen;