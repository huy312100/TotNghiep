import React,{useState,useEffect,useRef} from 'react';
import { View,Text,StyleSheet,FlatList,Image,TouchableOpacity } from 'react-native';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

import { Entypo } from '@expo/vector-icons';

import {Header} from 'react-native-elements';

import { useDispatch,useSelector } from 'react-redux';

const ListUserLikedScreen = ({navigation,route}) =>{

    const token = useSelector((state) => state.authen.token);
    const unmounted = useRef(false);

    const idPost =route.params.idPost;
    const typeForum = route.params.typeForum;

    const [data, setData] = useState([]);
    const [isLoading,setIsLoading] = useState(true);

    useEffect(() => {
        getUserLiked();
        return()=>{
            unmounted.current = true;
        }
    },[]);

    const getUserLiked =() => {
        if(typeForum === 'faculty' || typeForum === 'university'){
            //console.log('a');
            getUserLikedForumFaculOrUni();
        }
        else if(typeForum === 'course'){
            //console.log('b');
            getUserLikedForumCourse();
        }
    };

    const getUserLikedForumFaculOrUni = () => {
        setIsLoading(true);
        let details = {
            IDPost: idPost
        }
      
        let formBody = [];
    
        for (let property in details) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        fetch("https://hcmusemu.herokuapp.com/forum/viewlike", {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              "Authorization": `bearer ${token}`,
            },
            body: formBody,
        }) .then((response) => {
            const statusCode = response.status;
            const dataRes = response.json();
            return Promise.all([statusCode, dataRes]);
        }).then(([statusCode, dataRes]) => {
            console.log(statusCode,dataRes);
            if(statusCode === 200){
                setData(dataRes);
            }
            setIsLoading(false);
        }).catch(error => console.log('error', error));
    };

    const getUserLikedForumCourse= () => {
        setIsLoading(true);
        let details = {
            IDPost: idPost
        }
      
        let formBody = [];
    
        for (let property in details) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        fetch("https://hcmusemu.herokuapp.com/forum/courses/viewlike", {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              "Authorization": `bearer ${token}`,
            },
            body: formBody,
        }) .then((response) => {
            const statusCode = response.status;
            const dataRes = response.json();
            return Promise.all([statusCode, dataRes]);
        }).then(([statusCode, dataRes]) => {
            console.log(statusCode,dataRes);
            if(statusCode === 200){
                setData(dataRes);
            }
            setIsLoading(false);
        }).catch(error => console.log('error', error));
    };

    const renderItem = ({ item }) => (
        <View style={styles.userInfo}>
            <View style={styles.userImgWrapper}>
                <Image style={styles.userImg} source={ item.Avart === "" || item.Avart === null ? require("../../../../assets/user-icon.png") : {uri : item.Avart}}/>
            </View>
            <View style={styles.textSection}>
                <View style={styles.userInfoText}>
                  <Text style={styles.name}>{item.Name}</Text>
                </View>
                <Text style={styles.email}>{item.Email}</Text>
            </View>
          </View>
    );

    const LoadingWithSkeletonScreen = () => {
        return(
          <SkeletonPlaceholder>
            <View style={[skeletonLoading.infoLoading,{marginTop:20}]}>
              <View style={skeletonLoading.imageLoading} />
              <View style={{ marginLeft: 20 }}>
                <View style={skeletonLoading.contentLoading}>
                  <View style={skeletonLoading.titleLoading} />
                </View>
                <View style={skeletonLoading.detailLoading}/>
                <View style={skeletonLoading.divideLoading}/>
              </View>
            </View>
    
            <View style={skeletonLoading.infoLoading}>
              <View style={skeletonLoading.imageLoading} />
              <View style={{ marginLeft: 20 }}>
                <View style={skeletonLoading.contentLoading}>
                  <View style={skeletonLoading.titleLoading} />
                </View>
                <View style={skeletonLoading.detailLoading}/>
                <View style={skeletonLoading.divideLoading}/>
              </View>
            </View>
    
            <View style={skeletonLoading.infoLoading}>
              <View style={skeletonLoading.imageLoading} />
              <View style={{ marginLeft: 20 }}>
                <View style={skeletonLoading.contentLoading}>
                  <View style={skeletonLoading.titleLoading} />
                </View>
                <View style={skeletonLoading.detailLoading}/>
                <View style={skeletonLoading.divideLoading}/>
              </View>
            </View>
    
            <View style={skeletonLoading.infoLoading}>
              <View style={skeletonLoading.imageLoading} />
              <View style={{ marginLeft: 20 }}>
                <View style={skeletonLoading.contentLoading}>
                  <View style={skeletonLoading.titleLoading} />
                </View>
                <View style={skeletonLoading.detailLoading}/>
                <View style={skeletonLoading.divideLoading}/>
              </View>
            </View>
    
            <View style={skeletonLoading.infoLoading}>
              <View style={skeletonLoading.imageLoading} />
              <View style={{ marginLeft: 20 }}>
                <View style={skeletonLoading.contentLoading}>
                  <View style={skeletonLoading.titleLoading} />
                </View>
                <View style={skeletonLoading.detailLoading}/>
                <View style={skeletonLoading.divideLoading}/>
              </View>
            </View>
    
            <View style={skeletonLoading.infoLoading}>
              <View style={skeletonLoading.imageLoading} />
              <View style={{ marginLeft: 20 }}>
                <View style={skeletonLoading.contentLoading}>
                  <View style={skeletonLoading.titleLoading} />
                </View>
                <View style={skeletonLoading.detailLoading}/>
                <View style={skeletonLoading.divideLoading}/>
              </View>
            </View>
    
            <View style={skeletonLoading.infoLoading}>
              <View style={skeletonLoading.imageLoading} />
              <View style={{ marginLeft: 20 }}>
                <View style={skeletonLoading.contentLoading}>
                  <View style={skeletonLoading.titleLoading} />
                </View>
                <View style={skeletonLoading.detailLoading}/>
                <View style={skeletonLoading.divideLoading}/>
              </View>
            </View>
    
            <View style={skeletonLoading.infoLoading}>
              <View style={skeletonLoading.imageLoading} />
              <View style={{ marginLeft: 20 }}>
                <View style={skeletonLoading.contentLoading}>
                  <View style={skeletonLoading.titleLoading} />
                </View>
                <View style={skeletonLoading.detailLoading}/>
                <View style={skeletonLoading.divideLoading}/>
              </View>
            </View>
    
            <View style={skeletonLoading.infoLoading}>
              <View style={skeletonLoading.imageLoading} />
              <View style={{ marginLeft: 20 }}>
                <View style={skeletonLoading.contentLoading}>
                  <View style={skeletonLoading.titleLoading} />
                </View>
                <View style={skeletonLoading.detailLoading}/>
                <View style={skeletonLoading.divideLoading}/>
              </View>
            </View>
    
            <View style={skeletonLoading.infoLoading}>
              <View style={skeletonLoading.imageLoading} />
              <View style={{ marginLeft: 20 }}>
                <View style={skeletonLoading.contentLoading}>
                  <View style={skeletonLoading.titleLoading} />
                </View>
                <View style={skeletonLoading.detailLoading}/>
                <View style={skeletonLoading.divideLoading}/>
              </View>
            </View>
    
            <View style={skeletonLoading.infoLoading}>
              <View style={skeletonLoading.imageLoading} />
              <View style={{ marginLeft: 20 }}>
                <View style={skeletonLoading.contentLoading}>
                  <View style={skeletonLoading.titleLoading} />
                </View>
                <View style={skeletonLoading.detailLoading}/>
                <View style={skeletonLoading.divideLoading}/>
              </View>
            </View>
    
            <View style={skeletonLoading.infoLoading}>
              <View style={skeletonLoading.imageLoading} />
              <View style={{ marginLeft: 20 }}>
                <View style={skeletonLoading.contentLoading}>
                  <View style={skeletonLoading.titleLoading} />
                </View>
                <View style={skeletonLoading.detailLoading}/>
                <View style={skeletonLoading.divideLoading}/>
              </View>
            </View>
    
          </SkeletonPlaceholder>
        )
    }

    return (
        <View style={styles.container}>
             <Header
                containerStyle={{
                    backgroundColor: 'white',
                    justifyContent: 'space-around',
                    borderBottomColor:'#DDDDDD'
                }}

                centerComponent={
                    <Text numberOfLines={1} style={{fontSize:12,fontWeight:'500',marginTop:10}}>Người yêu thích diễn đàn</Text>
                }

                leftComponent={
                <TouchableOpacity onPress={() =>{ 
                    navigation.goBack();
                    }}>
                        <Entypo name="chevron-left" size={30} color="blue" />
                    </TouchableOpacity>
            }/>

            {isLoading && data.length === 0 && LoadingWithSkeletonScreen()}

            {!isLoading && data.length === 0 && <View style={{flex: 1,justifyContent: 'center',alignItems: 'center'}}>
                    <Text style={{color:'#BBBBBB'}}>
                        Không tìm thấy người nào thích bài đăng này
                    </Text>
                </View>
            }

            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item,index) => index.toString()}
            />
        </View>
        
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
      width: '100%',
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

const skeletonLoading = StyleSheet.create({
    infoLoading: {
      flexDirection: "row",
      alignItems: "center",
      marginLeft:10,
      marginBottom:20
    },
  
    imageLoading:{
      width: 50, 
      height: 50, 
      borderRadius: 25
    },
  
    contentLoading:{
      flexDirection:'row',
      justifyContent: "space-between"
    },
  
    titleLoading: { 
      width: 320, 
      height: 15, 
      borderRadius: 4
    },
  
    timeLoading:{ 
      width: 50, 
      height: 15, 
      borderRadius: 4 
    },
  
    detailLoading:{ 
      marginTop: 6, 
      width: 320, 
      height: 20, 
      borderRadius: 4
    },
  
    divideLoading:{
      marginTop: 15, 
      width: 320, 
      height: 2, 
      borderRadius: 4
    }
  })

export default ListUserLikedScreen;