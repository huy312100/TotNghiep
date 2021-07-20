import React,{useState,useEffect} from "react";
import { StyleSheet, Text, View , FlatList,TouchableOpacity,Linking,TouchableWithoutFeedback} from "react-native";
import { Entypo,FontAwesome } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";


const UniversityNewScreen = ({navigation}) =>{
    const token = useSelector((state) => state.authen.token);
    const [isLoadingUniScreen,setLoadingUniScreen]=useState(false);
    const [uniNews,setUniNews]=useState([]);

    useEffect(() =>{
        getUniversityNew()
    },[])

  //call api get all university news
  const getUniversityNew = () =>{

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `bearer ${token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch("https://hcmusemu.herokuapp.com/info/newsuniversity/parent",requestOptions)
    .then((responseNewUni) => {
        const statusCodeNewUni = responseNewUni.status;
        const dataResNewUni = responseNewUni.json();
        return Promise.all([statusCodeNewUni, dataResNewUni]);
    }).then(([statusCodeNewUni, dataResNewUni]) => {
        if(statusCodeNewUni === 200){
            const tmpNew =[];
            for (const key in dataResNewUni) {
                tmpNew.push(
                {
                  title: dataResNewUni[key].Title,
                  link:dataResNewUni[key].Link,
                  date:dataResNewUni[key].Date,
                });
            };
            setUniNews(tmpNew);
        }
        else{

        }
        
    }).catch((err) => console.log(err, "error"));
  };


    const renderItemForUniNew = ({item})=>(
        <TouchableOpacity style={styles.card}
            onPress={() => {Linking.openURL(item.link)}}
        >

            <View style={styles.info}>
                <Text style={styles.title}>{item.title}</Text>
                <Entypo style={styles.onTheRight} name="chevron-thin-right" size={20} color="blue" />
            </View>
            
            <View tyle={[styles.info,{marginBottom:20}]}>
                <Text style={styles.date}>{item.date}</Text>
            </View>
                
        </TouchableOpacity>
    );

    const loadingSkeletonForUniNewScreen = () => {
        return(
            <SkeletonPlaceholder>
                <View >
                    <View style={skeletonLoading.info}/>
                    <View style={[skeletonLoading.info,skeletonLoading.secondLine]}/>
                    <View style={[skeletonLoading.info,skeletonLoading.onTheRightArrow]}/>
                    <View style={[skeletonLoading.info,skeletonLoading.date]}/>
                </View>
                
                <View >
                    <View style={skeletonLoading.info}/>
                    <View style={[skeletonLoading.info,skeletonLoading.secondLine]}/>
                    <View style={[skeletonLoading.info,skeletonLoading.onTheRightArrow]}/>
                    <View style={[skeletonLoading.info,skeletonLoading.date]}/>
                </View>

                <View >
                    <View style={skeletonLoading.info}/>
                    <View style={[skeletonLoading.info,skeletonLoading.secondLine]}/>
                    <View style={[skeletonLoading.info,skeletonLoading.onTheRightArrow]}/>
                    <View style={[skeletonLoading.info,skeletonLoading.date]}/>
                </View>

                <View >
                    <View style={skeletonLoading.info}/>
                    <View style={[skeletonLoading.info,skeletonLoading.secondLine]}/>
                    <View style={[skeletonLoading.info,skeletonLoading.onTheRightArrow]}/>
                    <View style={[skeletonLoading.info,skeletonLoading.date]}/>
                </View>

                <View >
                    <View style={skeletonLoading.info}/>
                    <View style={[skeletonLoading.info,skeletonLoading.secondLine]}/>
                    <View style={[skeletonLoading.info,skeletonLoading.onTheRightArrow]}/>
                    <View style={[skeletonLoading.info,skeletonLoading.date]}/>
                </View>

                <View style={skeletonLoading.card}>
                    <View style={skeletonLoading.info}/>
                    <View style={[skeletonLoading.info,skeletonLoading.secondLine]}/>
                    <View style={[skeletonLoading.info,skeletonLoading.onTheRightArrow]}/>
                    <View style={[skeletonLoading.info,skeletonLoading.date]}/>
                </View>

                <View style={skeletonLoading.card}>
                    <View style={skeletonLoading.info}/>
                    <View style={[skeletonLoading.info,skeletonLoading.secondLine]}/>
                    <View style={[skeletonLoading.info,skeletonLoading.onTheRightArrow]}/>
                    <View style={[skeletonLoading.info,skeletonLoading.date]}/>
                </View>
            </SkeletonPlaceholder>
        )
    };

    return(
        <View style={styles.container}>
            {isLoadingUniScreen && loadingSkeletonForUniNewScreen()} 

            
            <FlatList
                data={uniNews}
                renderItem={renderItemForUniNew}
                keyExtractor={(item,index) => index.toString()}
            /> 

          


        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    card: {
        width: '100%',
        backgroundColor:'white',
        borderBottomWidth:1,
        borderBottomColor: "#cccccc",
        paddingBottom:5,
    },

    onTheRight: {
        position: 'absolute',
        right: 5
    },

    title: {
        fontWeight:'bold',
        marginRight:30,
        marginLeft:15
    },

    info: {
        justifyContent: 'center',
        marginVertical:10
    },

    date: {
        marginRight:30,
        marginLeft:15,
        fontSize:12
    }
});

const skeletonLoading = StyleSheet.create({

    info: {
        marginVertical:10,
        marginLeft:15,
        width:'87%',
        height:20
    },

    secondLine:{
        width:'70%',
        marginTop:0
    },

    onTheRightArrow: {
        width:'6%',
        alignSelf: 'flex-end',
        marginTop:-45,
        marginRight:5
    },

    date: { 
        width:'20%',
        height:14
    },

});

export default UniversityNewScreen;