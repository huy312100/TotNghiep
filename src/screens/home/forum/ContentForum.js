import React,{useState,useEffect,useRef} from 'react';
import { StyleSheet, View, Text,Dimensions,TouchableOpacity,Image,FlatList,Linking,Alert,ActivityIndicator,ScrollView } from 'react-native';
import { Header} from 'react-native-elements';

import { Ionicons,FontAwesome5,Entypo } from '@expo/vector-icons';
import HTML from "react-native-render-html";


const ContentForumScreen = ({navigation,route}) =>{

    // const [data, setData] = useState([]);
    // const [idForum,setIDForum] = useState('');

    // useEffect(() => {
    //     getForumByCourse();
    //     getDiscusstionInForum();
    //     console.log(data);
    // },[idForum]);
    
   

    // const renderItem = ({ item }) => (
    //     <TouchableOpacity style={styles.card} >

    //          <View style={styles.info}>
    //             <Text style={styles.title}>{item.name}</Text>
    //             <Text style={{marginLeft:15,marginTop:10}}>Người đăng : {item.userfullname}</Text>
    //         </View>
    //     </TouchableOpacity>
    // )

    return(
        <View style={styles.container}>
            <Header
            containerStyle={{
                backgroundColor: 'white',
                justifyContent: 'space-around',
                borderBottomColor:'#DDDDDD'
            }}
            centerComponent={
                <Text style={{fontSize:17,fontWeight:'500'}} numberOfLines={1}>{route.params.nameForum}</Text>
            }
            leftComponent={
              <TouchableOpacity onPress={() =>{
                  navigation.goBack();
              }}>
                  <Ionicons name="chevron-back-sharp" size={24} color="blue" />
              </TouchableOpacity>
              
            }/>

            {/* <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item,index) => index.toString()}
            /> */}
            <ScrollView style={styles.card} >

             <View style={styles.info}>
                <Text style={styles.title}>Người đăng : {route.params.userPost}</Text>
                <View style={{marginHorizontal:10}}>
                    <HTML source={{ html: route.params.content }}></HTML>
                </View>
                
                {/* <Text style={{marginLeft:15,marginTop:10}}> {item.userfullname}</Text> */}
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