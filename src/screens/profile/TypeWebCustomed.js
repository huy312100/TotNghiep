import React,{useEffect,useState} from 'react';
import { View,StyleSheet,Text,TouchableOpacity, } from 'react-native';
import { MaterialCommunityIcons,FontAwesome5 } from '@expo/vector-icons';
import {Header} from 'react-native-elements';
import { SwipeListView } from 'react-native-swipe-list-view';
import { useSelector,useDispatch } from "react-redux";

import * as profileActions from '../../../store/actions/Profile';

import LoadingScreen from '../LoadingScreen';



const WebCustomedScreen = ({navigation}) =>{

    const token = useSelector((state) => state.authen.token);
    const [data,setData] = useState([]);
    const [isLoading,setLoading] = useState(false);

    const dispatch = useDispatch();

    useEffect(() =>{
        getWebCustomed();
    },[data.length]);

    //call api get web customed
    const getWebCustomed = () =>{
        //console.log(token);
        setLoading(true);

        var myHeaders = new Headers();
        myHeaders.append("Authorization", `bearer ${token}`);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("https://hcmusemu.herokuapp.com/web/getcustomlink",requestOptions)
        .then((response) => {
            const statusCode = response.status;
            const dataRes = response.json();
            return Promise.all([statusCode, dataRes]);
        }).then(([statusCode, dataRes]) => {
            const tmp =[];
            if (statusCode === 200){
                for (const key in dataRes) {
                    tmp.push(
                    {
                        Type: dataRes[key].Type,
                        Url:dataRes[key].Url,
                        Username:dataRes[key].Username,
                    });
                };
                setData(tmp);
            }
            //setData(json);
            dispatch(profileActions.getAllWebCustomed(tmp));
            setLoading(false);
        })
        .catch((err) => console.log(err, "error"));
    };

    const renderItem = (data,rowMap) => {
        return (
            <View style={styles.card}>
                <Text style={styles.connectionName}>{data.item.Type}</Text>
                <View style={styles.secondLine}>
                    <Text style={styles.linkLabel}>Link : </Text>
                    <Text numberOfLines={1} style={styles.url}>{data.item.Url}</Text>
                </View>
                
            </View> 
        );
    };

    const HiddenItemWithAction = props =>{
        return(
            <View style={styles.rowBack}>
                <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]} onPress={() =>onDelete(props.data.item.Type)}>
                    <MaterialCommunityIcons name="trash-can" size={30} color={"#FFFFFF"} />
                </TouchableOpacity>
            </View>
        )
    }

    const onDelete = async (typeUrl) => {
        console.log(typeUrl);
        let details = {
            typeUrl: typeUrl,
          };
    
          let formBody = [];
    
          for (let property in details) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
          }
          formBody = formBody.join("&");
    
          fetch("https://hcmusemu.herokuapp.com/web/deleteaccount", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: `bearer ${token}`,
            },
            body: formBody,
          }).then((response) => {
              response.json();
            }).then((json) => {
              console.log(typeUrl);
              dispatch(profileActions.deleteUrl());
              getWebCustomed();

            }).catch((error) => console.log("error", error));
    };

    const renderHiddenItem =(data,rowMap) =>{
        return (
            <HiddenItemWithAction
                data={data}
                rowMap={rowMap}
                onDelete ={() => deleteRow(rowMap,data.item.userName)}
            />

            // <View style={styles.rowBack}>
            //     <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]} onPress={onDelete(data.item)}>
            //         <MaterialCommunityIcons name="trash-can" size={30} color={"#FFFFFF"} />
            //     </TouchableOpacity>
            // </View>
        )
    };

    const renderEmpty =()=>{
        return(
            <View style={styles.emptyContent}>
                <Text style={styles.emptyInfo}>Nội dung không tìm thấy</Text>
            </View>     
        )   
    }

    return(
        <View style={styles.container}>

            <Header containerStyle={{
                    backgroundColor: '#33CCFF',
                    justifyContent: 'space-around',
                }}
                leftComponent={
                    <TouchableOpacity style={{flexDirection:'row'}} 
                        onPress={() => {
                            getWebCustomed();
                            navigation.goBack();
                    }}>
                        <FontAwesome5 name="chevron-left" size={24} color="white" />
                    </TouchableOpacity>
                }
                centerComponent={
                    <Text style={{color:'white',fontWeight:'600',fontSize:16,marginTop:3}}>Ứng dụng đã kết nối</Text>
                }/>


            <View style={{height:10}}/>

             <SwipeListView
                data={data}
                keyExtractor={(item,index) => index.toString()}
                renderItem={renderItem}
                renderHiddenItem={renderHiddenItem}
                rightOpenValue={-75}/>
             

        {isLoading && LoadingScreen()}

        </View>
    )
} 

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    card: {
        width: '100%',
        backgroundColor:'white',
        borderBottomWidth:1,
        borderBottomColor: "#cccccc",
    },

    connectionName:{
        marginLeft: 20,
        marginVertical:12,
        fontSize:15
    },

    rowBack: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0,
    },
    backTextWhite: {
        color: '#FFF',
    },

    emptyContent: {
        flex: 1, 
        alignItems: 'center',
        justifyContent: 'center', 
    },

    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(52, 52, 52, 0.5)'
    },

    txtIndicator: {
        fontSize:15,
        fontWeight: "bold",
        color:"#EEEEEE"
    },

    

    linkLabel: {
        marginLeft:20,
        fontWeight:'bold',
    },

    secondLine :{
        flexDirection:'row',
        marginTop:-5,
        marginBottom:5
    },

    url:{
        textDecorationLine:'underline',
        color:'blue',
    }
    
});

export default WebCustomedScreen;
