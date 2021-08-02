import React,{useState,useCallback} from 'react';
import { View, Text, StyleSheet, FlatList,TouchableOpacity,TextInput,ImageBackground,SafeAreaView,Image } from 'react-native';

import{useSelector} from 'react-redux';

import { Ionicons } from '@expo/vector-icons';

import AsyncStorage from '@react-native-async-storage/async-storage';

import RoundedImage from '../../components/profile/main/RoundedImage';



const FindToChatScreen = ({navigation}) => {

    const [nameUser,setNameUser] =useState('');
    var [data,setData] = useState([]);

    const socket = useSelector((state) => state.authen.socket);

    const [roomID,setRoomID] = useState('');

    const token = useSelector((state) => state.authen.token);

    var abc ;

    const getInfoFromName =(name) => {
        let details = {
            HoTen:name
          };
      
          let formBody = [];
      
          for (let property in details) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
          }
          formBody = formBody.join("&");
      
          fetch("https://hcmusemu.herokuapp.com/profile/findinfofromfullname", {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              "Authorization": `bearer ${token}`
            },
            body: formBody,
          }).then((response) => {
              const statusCode = response.status;
              const dataRes = response.json();
              return Promise.all([statusCode, dataRes]);
          }).then(([statusCode, dataRes])=>{
                //console.log(statusCode,dataRes);
                setData(dataRes);
          }).catch(error => console.log('error', error));
    };

    // const loadRoomID = useCallback(() => {
    //   socket.once('Reply-Create-Room',(data)=>{
    //     setRoomID(data);
    //   });
    // },[]);

    const renderItem = ({ item }) => (
        <View>
          <TouchableOpacity
            style={styles.card}
            onPress={async () => {
              socket.emit('Create-Room',[token,item.Email]);
             
              socket.once('Reply-Create-Room',async (data)=>{
                setRoomID(data);
                console.log(data);
                navigation.navigate("Chat", {
                  email: item.Email,
                  name:item.HoTen,
                  idChatRoom:data
                });
                //console.log(roomID)
              });
              
              //abc = await AsyncStorage.getItem('IDChatRoom');
              //loadRoomID();
              //console.log(abc)
              //console.log(roomID);

              // navigation.navigate("Chat", {
              //   email: item.Email,
              //   name:item.HoTen,
              //   idChatRoom:roomID
              // });
            }}
          >

            <View style={{marginVertical:10,borderRadius:25}}>
              <Image style={{width:70, height:70,borderRadius:40}} source={{ uri:`https://ui-avatars.com/api/?background=random&color=ffffff&name=${item.HoTen}`}}/>
            </View>
            
            {/* <View style={styles.courseInfo}>
              <View style={styles.textSection}>
                <Text style={styles.courseName}>{item.name}</Text>
    
               
              </View>
            </View> */}
            <View style={{marginTop:10}}>
                <Text style={[styles.name,{fontWeight:'bold'}]}>{item.HoTen}</Text>
                <Text style={styles.name}>{item.TenKhoa}</Text>
                <Text style={styles.nameUniversity}>{item.TenTruongDH}</Text>
            </View>
            

          </TouchableOpacity>
        </View>
      );

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity onPress={() =>{ navigation.goBack()}}>
            <Ionicons name="chevron-back" size={38} color="blue" />
            </TouchableOpacity>
 
            <View style={styles.input}>
                <Ionicons style={{marginTop:3}} name="search-outline" size={18} color="#888888" />
                <TextInput keyboardType="default" placeholder="Tìm kiếm" style={{width:'95%'}}
                onChangeText={(name)=>{
                    //console.log(name);
                    if(name.trim().length!==0) {
                        getInfoFromName(name);
                    }
                    else{
                        setData([]);
                    }
                }}>                
                </TextInput>    
            </View>
        </View>

        {data.length==0 && <View style={{flex:1,justifyContent: 'center',alignItems: 'center'}}>
          <ImageBackground style={styles.img}
             source={require('../../../assets/finding.png')}
             resizeMode='contain'/>
          <Text style={{color:'#cccccc'}}>
            Tìm kiếm bạn bè và nhắn tin ngay
          </Text>
             </View>}

        <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item,index) => index.toString()}/>


      </SafeAreaView>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 25 : 0
    },

    header: {
        flexDirection:'row',
        paddingTop: 10,
        paddingBottom: 15,
        borderBottomColor:'#DDDDDD',
        borderBottomWidth:.2,
    },

    input:{
        flexDirection:'row',
        width:'88%',
        backgroundColor:"#cccc",
        borderRadius:10,
        padding:10,
    },

    card: {
        paddingHorizontal:10,
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "#cccccc",
        flexDirection: "row",

    },
    name:{
        marginTop:10,
        marginHorizontal:20
    },
    nameUniversity:{
        fontSize:9,
        marginHorizontal:20
    },
    img:{
      width:'100%',
      height:'100%',
      backgroundColor:'transparent'
    }

});

export default FindToChatScreen;
