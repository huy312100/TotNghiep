import React,{useEffect,useState} from 'react';
import { View,StyleSheet,Text,TouchableOpacity,ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SwipeListView } from 'react-native-swipe-list-view';
import {useSelector,useDispatch} from "react-redux";

import * as profileActions from '../../../store/actions/Profile';



const WebCustomedScreen = () =>{

    const token = useSelector((state) => state.authen.token);
    const webCustomed=useSelector((state) => state.profile.allWebCustomed);
    const [data,setData] = useState([]);
    const [isLoading,setLoading] = useState(false);

    const dispatch = useDispatch();


    useEffect(() =>{
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
            .then((response) => response.json())
            .then((json) => {
                //console.log(json);
                setData(json);
                dispatch(profileActions.getAllWebCustomed(json));
                setLoading(false);
            })
            .catch((err) => console.log(err, "error"));
        }
        getWebCustomed();
    },[]);


    const renderItem = (data,rowMap) => {
        return (
            <View style={styles.card}>
                <Text style={styles.deadlineName}>{data.item}</Text>
            </View> 
        );
    };

    const HiddenItemWithAction = props =>{
        return(
            <View style={styles.rowBack}>
                <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]} onPress={() =>onDelete(props.data.item)}>
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
              //console.log(json);
              dispatch(profileActions.deleteUrl());
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
            <View style={{height:10}}/>
            { data.length === 0 ? renderEmpty() :
             <SwipeListView
                data={data}
                keyExtractor={(item,index) => index.toString()}
                renderItem={renderItem}
                renderHiddenItem={renderHiddenItem}
                rightOpenValue={-85}/>
             }

        {isLoading && <View style={styles.loading}>
          <ActivityIndicator size="large" color="#EEEEEE" />
          <Text style={styles.txtIndicator}>Đang xử lí ...</Text>
          </View>}

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

    deadlineName:{
        marginLeft: 40,
        marginVertical:20,
        fontSize:15
    },

    rowBack: {
        alignItems: 'center',
        backgroundColor: 'red',
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
      }
});

export default WebCustomedScreen;
