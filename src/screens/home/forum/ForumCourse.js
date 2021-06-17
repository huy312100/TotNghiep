import React,{useState,useEffect,useRef} from 'react';
import { StyleSheet, View, Text,Dimensions,TouchableOpacity,Image,FlatList,Linking,Alert,ActivityIndicator } from 'react-native';
import { Header} from 'react-native-elements';
import { useDispatch,useSelector } from 'react-redux';

import { Ionicons,FontAwesome5,Entypo } from '@expo/vector-icons';


const ForumOfCourseScreen = ({navigation,route}) =>{
    

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
           <Text>a</Text>
        </View>
        
    )
    };

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    

});

export default ForumOfCourseScreen;