import React,{useState} from 'react';
import { View, Text, StyleSheet, FlatList,TouchableOpacity,TextInput,Image } from 'react-native';
import{SafeAreaView} from 'react-native-safe-area-context';

import{useSelector} from 'react-redux';

import { Ionicons } from '@expo/vector-icons';


const AddPeopleToCalendarScreen = ({navigation}) => {

    const [nameUser,setNameUser] = useState('');
    const [data,setData] = useState([]);

    const token = useSelector((state) => state.authen.token);


    const getInfoFromUsername =(name) => {
        let details = {
            username:name
          };
      
          let formBody = [];
      
          for (let property in details) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
          }
          formBody = formBody.join("&");
      
          fetch("https://hcmusemu.herokuapp.com/profile/findname", {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: formBody,
          }).then((response) => {
              const statusCode = response.status;
              const dataRes = response.json();
              return Promise.all([statusCode, dataRes]);
          }).then(([statusCode, dataRes])=>{
                console.log(dataRes);
                setData(dataRes);
          }).catch(error => console.log('error', error));
    };


    const renderItem = ({ item }) => (
        
      <TouchableOpacity style={styles.card} >
          <View style={styles.userInfo}>
          <View style={styles.userImgWrapper}>
              <Image style={styles.userImg} source={{uri: `https://ui-avatars.com/api/?background=888888&color=fff&name=${item.HoTen}`}}/>
          </View>
          <View style={styles.textSection}>
              <View style={styles.userInfoText}>
                <Text style={styles.name}>{item.HoTen}</Text>
              </View>
              <Text style={styles.email}>{item.Email}</Text>
          </View>
          </View>
      </TouchableOpacity>
        
      );

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity onPress={() =>{ navigation.goBack(); }}>
            <Ionicons name="chevron-back" size={38} color="blue" />
            </TouchableOpacity>
 
            <View style={styles.input}>
                <Text style={{marginTop:2.5,color:'#AAAAAA'}}>Mời : </Text>
                <TextInput keyboardType="default" style={{width: '100%'}}
                onChangeText={(name)=>{
                    console.log(name);
                    if(name.trim().length!==0) {
                        getInfoFromUsername(name);
                    }
                    else{
                        setData([]);
                    }
                }}>                
                </TextInput>    
            </View>
        </View>

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
      width: '100%',
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
      width: 300,
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

export default AddPeopleToCalendarScreen;
