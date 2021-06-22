import React,{useState,useEffect,useRef} from 'react';
import { View, Text, StyleSheet, FlatList,TouchableOpacity,Image,RefreshControl,Alert } from 'react-native';
import { useSelector,useDispatch } from 'react-redux';

// import{SafeAreaView} from 'react-native-safe-area-context';
// import {Header,SearchBar} from 'react-native-elements';
// import { MaterialCommunityIcons} from '@expo/vector-icons';

const FirstReadMessageScreen = ({navigation}) => {

    const token = useSelector((state) => state.authen.token);

    const dataMsgFirstRead = useSelector((state) => state.message.firstReadMsg);

    const socket = useSelector((state) => state.authen.socket);

    const [dataAwaitMsg,setDataAwaitMsg] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const unmounted = useRef(false);

    function convertTimestamp(timestamp) {
        var d = new Date(timestamp * 1000), // Convert the passed timestamp to milliseconds
            yyyy = d.getFullYear(),
            mm = ('0' + (d.getMonth() + 1)).slice(-2),  // Months are zero based. Add leading 0.
            dd = ('0' + d.getDate()).slice(-2),         // Add leading 0.
            hh = d.getHours(),
            h = hh,
            min = ('0' + d.getMinutes()).slice(-2),     // Add leading 0.
            ampm = 'AM',
            time;
        if (hh > 12) {
            h = hh - 12;
            ampm = 'PM';
        } else if (hh === 12) {
            h = 12;
            ampm = 'PM';
        } else if (hh == 0) {
            h = 12;
        }
        // ie: 2014-03-24, 3:00 PM
        time = dd + '-' + mm + '-' + yyyy + ', ' + h + ':' + min + ' ' + ampm;
        return time;
    };

    useEffect(() => {
        getAwaitMessage();
        return()=>{
          unmounted.current = true;
        };
    },[dataMsgFirstRead]);

    //call api get await message 
    const getAwaitMessage =() => {
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
                const tmpAwaitMsg =[];
                for (const key in dataRes.awaittext) {
                    tmpAwaitMsg.push(
                    {
                        state: dataRes.awaittext[key].state,
                        _id: dataRes.awaittext[key]._id,
                        idChatRoom: dataRes.awaittext[key].idChatRoom,
                        from: dataRes.awaittext[key].from,
                        text: dataRes.awaittext[key].text,
                        time: dataRes.awaittext[key].time,

                    });
                }
                setDataAwaitMsg(tmpAwaitMsg);
            }
           
            else{
                console.log(statusCode)
            }
            // setLoadingFacultScreen(false);
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
                        navigation.navigate("Chat",{
                            name:item.from,
                            idChatRoom:item.idChatRoom
                        });
                    
                        socket.emit("Accepted",item.idChatRoom);

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
                <Text style={styles.userName}>{item.from}</Text>
                <Text style={styles.postTime}>{convertTimestamp(item.time/1000)}</Text>
                </View>
                <Text style={styles.messageText}>{item.text}</Text>
            </View>
            </View>
        </TouchableOpacity>
    );

    return(
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

