import React,{useState,useEffect} from 'react';
import { View, Text, StyleSheet, FlatList,TouchableOpacity,TextInput,Image } from 'react-native';
import{SafeAreaView} from 'react-native-safe-area-context';


import { Ionicons,FontAwesome} from '@expo/vector-icons';

import { useDispatch,useSelector } from 'react-redux';

import * as calendarActions from '../../../../store/actions/Calendar';


const AddPeopleToCalendarScreen = ({navigation}) => {

    const dispatch= useDispatch();
    const allUserChoose = useSelector((state) => state.calendar.allUserChoose);

    const [userChoose,setUserChoose] = useState(allUserChoose);
    const [data,setData] = useState([]);
    const [txtSeach,setTxtSeach] = useState('');

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
                //console.log(dataRes);
                const tmp= objDiff(dataRes,userChoose);
                //setData(dataRes.filter(({Email})=>));
                setData(tmp);
          }).catch(error => console.log('error', error));
    };

    useEffect(() => {
      //console.log(userChoose);
       console.log(allUserChoose);
    },[userChoose]);


    const renderItem = ({ item }) => (
      <TouchableOpacity style={styles.card} onPress={() =>{
        //setNameUser([...nameUser,item.HoTen]);
        setUserChoose([...userChoose,item]);
        setData([]);
        txtSeach.clear();
      }}>
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

    const renderEmailChipItem = ({item,index})=>(
      <View style={styles.viewOneChip}>
        <Text style={styles.labelInChip}>{item.Email}</Text>
        <TouchableOpacity
          onPress={() => {
            const tempUserChoose = [...userChoose];
            tempUserChoose.splice(index,1);
            setUserChoose(tempUserChoose);

          }}>

          <FontAwesome name="close" size={24} color="white" />
        </TouchableOpacity>
      </View> 
    );

    const checkEmptyPeopleInCalendar = () => {
      if(allUserChoose.length === 0 && userChoose.length === 0){
        return true;
      }
      return false;
    };

    //Remove all duplicate in view
    const objDiff =(firstObj,secondObj)=>{
      console.log(firstObj);
      console.log(secondObj);
      const newArr =firstObj.filter(obj=>!secondObj.find(sec=>sec.Email===obj.Email && sec.HoTen===obj.HoTen)
      //this is formatted so that it is easily readable
      );

      return newArr;
    } 

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          
          <TouchableOpacity onPress={() =>{ navigation.goBack(); }}>
            <Ionicons name="chevron-back" size={38} color="red" />
            
          </TouchableOpacity>

          <View style={styles.input}>
              <Text style={{marginTop:2.5,color:'#AAAAAA'}}>Mời : </Text>
              <TextInput keyboardType="default" style={{width:'88%'}}
              onChangeText={(name)=>{
                  
                  if(name.trim().length!==0) {
                      getInfoFromUsername(name);
                  }
                  else{
                      setData([]);
                  }
              }}
              ref={input => { setTxtSeach(input); }}>               
              </TextInput>    
          </View>

          <TouchableOpacity style={styles.confirm} disabled={checkEmptyPeopleInCalendar()} 
            onPress={() =>{
              dispatch(calendarActions.addPeopleToCalendar(userChoose));
              navigation.navigate('Add Event');
            }}>
            <Text style={[styles.confirmLabel,{color: checkEmptyPeopleInCalendar() ? 'silver' : 'blue'}]}>Xong</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.viewAllChip}>
          <FlatList
            horizontal={true}
            data={userChoose}
            renderItem={renderEmailChipItem}
            keyExtractor={(item,index) => index.toString()}/>
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
        borderBottomWidth:.5,
    },

    input:{
        flexDirection:'row',
        width:'78%',
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

    confirm:{
      marginHorizontal:5,
      marginVertical:12,
    },

    confirmLabel:{
      fontSize:16,
      fontWeight:'600'
    },

    viewAllChip:{
      marginLeft:10,
      marginVertical:10,
      flexDirection:'row',
      flexWrap: 'wrap',
    },

    viewOneChip:{
      backgroundColor:"#0099FF",
      borderRadius:25,
      padding:7,
      flexDirection:'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight:5,
    },

    labelInChip:{
      color:'white',
      marginRight:10
    }


});

export default AddPeopleToCalendarScreen;
