import React,{useState,useEffect,useRef} from 'react';
import { View, Text, StyleSheet, FlatList,TouchableOpacity,Image,RefreshControl,Alert } from 'react-native';
import { useSelector,useDispatch } from 'react-redux';

import * as dateUtils from '../../utils/Date';

import LoadingWithSkeletonScreen from '../LoadingSkeleton';

const FirstReadMessageScreen = ({navigation}) => {

    const token = useSelector((state) => state.authen.token);

    const dataMsgFirstRead = useSelector((state) => state.message.firstReadMsg);

    const socket = useSelector((state) => state.authen.socket);

    const [dataAwaitMsg,setDataAwaitMsg] = useState([]);
    const [isLoading,setIsLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const unmounted = useRef(false);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
          getAwaitMessage();
        });
        return()=>{
          unmounted.current = true;
          unsubscribe();
        };
    },[dataMsgFirstRead]);

    //call api get await message 
    const getAwaitMessage =() => {
      setIsLoading(true);
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `bearer ${token}`);

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      
      fetch("https://hcmusemu.herokuapp.com/chat/findchatawait",requestOptions)
      .then((response) => {
          const statusCode = response.status;
          const dataRes = response.json();
          return Promise.all([statusCode, dataRes]);
      }).then(([statusCode, dataRes])=> {
          console.log(statusCode,dataRes);
          if (statusCode === 200) {
            if(dataRes.message === "Message await is Empty"){
              setDataAwaitMsg([]);
            }
            else{
              const tmpAwaitMsg =[];
              for (const key in dataRes) {
                tmpAwaitMsg.push(
                {   
                  Anh:dataRes[key].Anh,
                  Email:dataRes[key].Email,
                  state: dataRes[key].state,
                  idChatRoom: dataRes[key].idChatRoom,
                  name: dataRes[key].name,
                  text: dataRes[key].text,
                  time: dataRes[key].time,
                  TypeRoom: dataRes[key].TypeRoom,
                });
              }
              setDataAwaitMsg(tmpAwaitMsg);
            }
          }
          
          else{
              console.log(statusCode)
          }
          // setLoadingFacultScreen(false);
          setIsLoading(false);
          setRefreshing(false);
      })
      .catch((err) => console.log(err, "error"));
    };

    //refresh control trigger
    const onRefresh = () => {
      setRefreshing(true);
      getAwaitMessage();
    };

    const renderItem =({ item })=>(
        <TouchableOpacity style={styles.card} onPress={() =>{
            
            Alert.alert(
                "Chuyển tiếp",
                "Chấp nhận lời nhắn tin từ người lạ",
                [
                  { text: "Từ chối", 
                    style: "cancel"
                  },
                  {
                    text: "Cho phép",
                    onPress: () => {
                      //console.log(item.name,item.idChatRoom,item.Email,item.Anh);
                      socket.emit("Accepted",item.idChatRoom);
                      navigation.navigate("Chat",{
                          name:item.name,
                          idChatRoom:item.idChatRoom,
                          email:item.Email,
                          avatar:item.Anh
                      });

                    }
                  },
                ]
              );    
            }}>
            <View style={styles.userInfo}>
            <View style={styles.userImgWrapper}>
                <Image style={styles.userImg} source= {require("../../../assets/user-icon.png")} />
            </View>
            <View style={styles.textSection}>
                <View style={styles.userInfoText}>
                <Text style={styles.userName}>{item.name}</Text>
                <Text style={styles.postTime}>{dateUtils.ConvertToTimeAgoGeneral(item.time)}</Text>
                </View>
                <Text style={styles.messageText}>{item.text}</Text>
            </View>
            </View>
        </TouchableOpacity>
    );

    return(
        <View style={{flex: 1}}> 

          {isLoading && dataAwaitMsg.length === 0 && LoadingWithSkeletonScreen()}

          {!isLoading && dataAwaitMsg.length === 0 &&  <View style={{flex:1,justifyContent: 'center',alignItems: 'center',backgroundColor: '#ffffff'}}>
                
                <Text style={{color:'#BBBBBB'}}>
                    Không tìm thấy tin nhắn chờ nào
                </Text>
            </View>}

          <View style={styles.container}> 
              <FlatList
                  data={dataAwaitMsg}
                  renderItem={renderItem}
                  keyExtractor={(item,index) => index.toString()}
                  refreshControl={<RefreshControl
                      colors={["#9Bd35A", "#689F38"]}
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                      />}
              />
          </View>
        </View>
    )
};

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
        width: 300,
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

export default FirstReadMessageScreen;

