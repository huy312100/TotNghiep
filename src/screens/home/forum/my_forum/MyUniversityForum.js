import React,{useState,useEffect,useRef} from 'react';
import { View,StyleSheet,Text,TouchableOpacity,Image,FlatList,ActivityIndicator,Linking } from 'react-native';
import { Fontisto,FontAwesome } from '@expo/vector-icons';
import Hyperlink from 'react-native-hyperlink';

import Lightbox from 'react-native-lightbox-v2';

import {useSelector} from 'react-redux';

import * as forumServices from '../../../../services/Forum';

import * as dateUtils from '../../../../utils/Date';

const MyUniversityForumScreen =({navigation})=>{

    const token = useSelector((state) => state.authen.token);
    const unmounted = useRef(false);
    // const dataABC= forumServices.getForum();
    const [dataForum,setDataForum] = useState([]);
    const [isLoading,setIsLoading] = useState(true);
    const [refresh,setRefresh] = useState(false);

    useEffect(() => {
        getMyUniversityForum();
        const unsubscribe = navigation.addListener('focus', () => {
            getMyUniversityForum();
        });
        return()=>{
            unmounted.current = true;
            unsubscribe();
        }; 
    },[refresh]);

    const getMyUniversityForum = () => {
        setIsLoading(true);
        fetch("https://hcmusemu.herokuapp.com/forum/yourpost", {
            method: "GET",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              "Authorization": `bearer ${token}`,
            },
        }) .then((response) => {
            const statusCode = response.status;
            const dataRes = response.json();
            return Promise.all([statusCode, dataRes]);
        }).then(([statusCode, dataRes]) => {
            console.log(statusCode,dataRes);
            if(statusCode === 200){
                const dataTmp = [];  
                for (const key in dataRes) {
                    if(dataRes[key].scope === "u"){
                        dataTmp.push({
                            AvartaOwn:dataRes[key].AvartaOwn,
                            EmailOwn:dataRes[key].EmailOwn,
                            ID:dataRes[key].ID,
                            LikeByOwn:dataRes[key].LikeByOwn,
                            NameOwn:dataRes[key].NameOwn,
                            comment:dataRes[key].comment,
                            image:dataRes[key].image,
                            like:dataRes[key].like,
                            time:dataRes[key].time,
                            title:dataRes[key].title,
                        });
                    }
                }
                setDataForum(dataTmp);
            }
            setIsLoading(false);
        }).catch(error => console.log('error', error));
    };

    const renderItem = ({item})=>(
        <TouchableOpacity style={styles.card}
                onPress={() =>{
                    navigation.navigate('Content Forum',{
                        dataOfForum:item,
                        typeForum:'university'
                    });
                }}>
                <View style={styles.info}>
                    <Image style={styles.imageUserPost} source={ item.AvartaOwn === "" || item.AvartaOwn === null ? require("../../../../../assets/user-icon.png") : {uri : item.AvartaOwn}}/>
                    <View>
                        <Text style={styles.nameAndDate}>{item.NameOwn}</Text>
                        <Text style={[styles.nameAndDate,{fontWeight:'300',fontSize:12}]}>{dateUtils.ConvertToTimeAgo(item.time)}</Text>
                    </View>

                </View>
                
                <Hyperlink linkStyle={{ color: 'blue',textDecorationLine:'underline' }} onPress={ (url) =>  Linking.openURL(url)}>
                    <View tyle={[styles.info,{marginBottom:20}]}>      
                        <Text style={[styles.content]}>{item.title}</Text>                
                    </View>
                </Hyperlink>

                {item.image !== "" && 
                    <Lightbox>
                        <Image style={styles.imagePost} source={{uri:item.image}}/>
                    </Lightbox>
                }

                <View style={styles.footerCard}>
                    {item.LikeByOwn === 1 ?
                        <TouchableOpacity style={styles.buttonFooter}
                            onPress={async()=>{
                                await forumServices.unlikePost(token,item.ID);
                                setRefresh(!refresh);
                            }}>
                                <Fontisto style={{marginRight:8}} name="like" size={18} color="blue" />
                                <Text style={{marginTop:3,color:'blue'}}>{item.like}</Text>
                        </TouchableOpacity>
                        : 
                        <TouchableOpacity style={styles.buttonFooter}
                            onPress={async()=>{
                                await forumServices.likePost(token,item.ID);
                                setRefresh(!refresh);
                            }}>

                                <Fontisto style={{marginRight:8}} name="like" size={18} color="silver" />
                                <Text style={{marginTop:3,color:'silver'}}>{item.like}</Text>
                        </TouchableOpacity>
                    }

                    <TouchableOpacity style={styles.buttonFooter}>
                        <FontAwesome style={{marginRight:8}} name="comment" size={18} color="silver" />
                        <Text style={{marginTop:2,color:'silver'}}>{item.comment}</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
    )

    return (
        <View style={styles.container}>
            {isLoading && dataForum.length === 0 && <View style={{flex:1,justifyContent: 'center',alignItems: 'center'}}>
                <ActivityIndicator size="large" color="blue"/>
            </View>}

            {!isLoading && dataForum.length === 0 && <View style={{flex: 1,justifyContent: 'center',alignItems: 'center'}}>
                    <Text style={{color:'#BBBBBB'}}>
                        Không tìm thấy diễn đàn nào 
                    </Text>
                </View>
            }

            <FlatList
                data={dataForum}
                renderItem={renderItem}
                keyExtractor = {(item,index) => index.toString()}
            />
            
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    card: {
        marginVertical:10,
        width: '100%',
        backgroundColor:'white',
        borderBottomWidth:1,
        borderBottomColor: "#cccccc",
        paddingBottom:5
    },

    imageUserPost:{
        width:38,
        height:38,
        borderRadius:25,
    },

    nameAndDate: {
        fontWeight:'bold',
        marginRight:15,
        marginLeft:15
    },

    info: {
        flexDirection:'row',
        alignItems: 'center',
        marginVertical:10,
        marginHorizontal:10
    },

    content: {
        marginHorizontal:15,
        fontSize:12,
        marginBottom:10,
    },

    imagePost:{
        width:'100%',
        backgroundColor:'grey',
        aspectRatio: 1
    },

    footerCard:{
        flexDirection:'row',
        marginVertical:5,
        marginHorizontal:15,
        justifyContent: 'space-between'
    },

    buttonFooter:{
        flexDirection:'row'
    }
});

export default MyUniversityForumScreen;