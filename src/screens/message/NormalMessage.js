import React,{useState,useEffect,useRef} from 'react';
import { Dimensions, View, Text, StyleSheet, FlatList,TouchableOpacity,Image,RefreshControl } from 'react-native';

import LoadingWithSkeletonScreen from '../LoadingSkeleton';

import { useSelector,useDispatch } from 'react-redux';

import * as dateUtils from '../../utils/Date';

import * as homeActions from '../../../store/actions/Home';

const NormalMessageScreen = ({navigation}) => {

  const[dataMsg,setDataMsg] = useState([]);

  const token = useSelector((state) => state.authen.token);
  const profile = useSelector((state) => state.profile.profile);

  const dispatch = useDispatch();

  const [isLoading,setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const unmounted = useRef(false);

  var countMsgNotRead = 0;

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getAllMessage();
    });
    return()=>{
      unmounted.current = true;
      unsubscribe();
    };
  },[]);

  //call api get all message screen
  const getAllMessage =() => {
    setIsLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `bearer ${token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    
    fetch("https://hcmusemu.herokuapp.com/chat/findchat",requestOptions)
    .then((response) => {
        const statusCode = response.status;
        const dataRes = response.json();
        return Promise.all([statusCode, dataRes]);
    }).then(([statusCode, dataRes])=> {
        console.log(statusCode,dataRes);
        if (statusCode === 200) {
          if(dataRes.message==='Message is Empty'){
            setDataMsg([]);
          }
          else{
            const tmpMsg =[];
            for (const key in dataRes) {
              tmpMsg.push(
              {
                idRoom: dataRes[key].idRoom,
                name: dataRes[key].name,
                Email: dataRes[key].Email,
                Anh: dataRes[key].Anh,
                TypeRoom: dataRes[key].TypeRoom,
                text: dataRes[key].text,
                time: dataRes[key].time,
                state:dataRes[key].state,
                EmailEnd: dataRes[key].EmailEnd,
              });

              if(dataRes[key].EmailEnd !== profile[0].Email){
                if (!dataRes[key].state) {
                  countMsgNotRead++;
                }
              }
            }
            setDataMsg(tmpMsg);
          }
        }
        
        else{
            console.log(statusCode)
        }
        // setLoadingFacultScreen(false);
        dispatch(homeActions.MessageNotRead(countMsgNotRead));
        countMsgNotRead = 0;
        setIsLoading(false);
        setRefreshing(false);
    })
    .catch((err) => console.log(err, "error"));
  };

  //refresh control trigger
  const onRefresh = () => {
    setRefreshing(true);
    getAllMessage();
  };

  
  const renderItem =({ item })=>(
    <TouchableOpacity style={styles.card} onPress={() =>{ 
      navigation.navigate("Chat",{
        name:item.name,
        idChatRoom:item.idRoom,
        email:item.Email,
        avatar:item.Anh
      });
    }}>
        <View style={styles.userInfo}>
        <View style={styles.userImgWrapper}>
            <Image style={styles.userImg} source={{uri: item.Anh === "" || item.Anh === null ? `https://ui-avatars.com/api/?background=random&color=fff&name=${item.name}`: item.Anh}}/>
        </View>
        <View style={styles.textSection}>
            <View style={styles.userInfoText}>
              <Text style={styles.userName}>{item.name}</Text>
              <Text style={[styles.postTime,{fontWeight : (!item.state && item.EmailEnd !== profile[0].Email) ? "bold" : "normal"}]}>{dateUtils.ConvertToTimeAgoGeneral(item.time)}</Text>
            </View>
            <Text style={[styles.messageText,{fontWeight : (!item.state && item.EmailEnd !== profile[0].Email) ? "bold" : "normal"}]}>{item.EmailEnd === profile[0].Email ? "Bạn: " :""}{item.text}</Text>


        </View>
        </View>
    </TouchableOpacity>
  )


    return (

      <View style={{flex: 1}}>

      {isLoading && dataMsg.length === 0 && LoadingWithSkeletonScreen()}

      {!isLoading && dataMsg.length === 0 &&  <View style={{flex:1,justifyContent: 'center',alignItems: 'center',backgroundColor: '#ffffff',}}>
            
            <Text style={{color:'#BBBBBB'}}>
                Không tìm thấy tin nhắn nào
            </Text>
          </View>}

        <View style={styles.container}>
          <FlatList
            data={dataMsg}
            renderItem={renderItem}
            keyExtractor={(item,index) => index.toString()}
            refreshControl={<RefreshControl
              colors={["blue", "red"]}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />}
          />
        </View>
      </View>
      
    );
};

export default NormalMessageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft:15,
    alignItems: 'center',
    backgroundColor: '#ffffff',
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
    width: Dimensions.get("window").width*0.75,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },

  userInfoText:{
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },

  userName:{
    fontSize: 14,
    fontWeight: "bold",
  },

  postTime: {
    fontSize: 12,
    color:"#666",
  },

  messageText:{
    fontSize: 14,
    color: "#333333",
  },

  img: {
    width:'100%',
    height:'100%',
    backgroundColor:'transparent'
  },
});

