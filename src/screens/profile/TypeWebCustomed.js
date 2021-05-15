import React,{useEffect,useState} from 'react';
import { View,StyleSheet,Text,TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SwipeListView } from 'react-native-swipe-list-view';
import {useSelector} from "react-redux";


const WebCustomedScreen = () =>{

    const token = useSelector((state) => state.authen.token);
    const [data,setData] = useState([]);


    useEffect(() =>{
        const getWebCustomed = () =>{
            //console.log(token);
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
                console.log(json);

                setData(json);
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
                <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]} onPress={onDelete}>
                    <MaterialCommunityIcons name="trash-can" size={30} color={"#FFFFFF"} />
                </TouchableOpacity>
            </View>
        )
    }

    const onDelete =() => {
        console.log('a');
    }

    const renderHiddenItem =(data,rowMap) =>{
        return (
            <HiddenItemWithAction
            data={data}
            rowMap={rowMap}
            onDelete ={() => deleteRow(rowMap,data.item.userName)}
            />
        )
    }

    return(
        <View style={styles.container}>
            <SwipeListView
                data={data}
                keyExtractor={(item,index) => index.toString()}
                renderItem={renderItem}
                renderHiddenItem={renderHiddenItem}
                rightOpenValue={-85}
            />
        </View>
    )
} 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop:10
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
});

export default WebCustomedScreen;
