import React,{useState,useEffect,useRef} from "react";
import { StyleSheet, Text, View , FlatList,TouchableOpacity,Linking} from "react-native";
import { Entypo } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const FacultyNewScreen = () =>{

    const token = useSelector((state) => state.authen.token);
    const [dataNew,setDataNew] = useState([]);
    const [isLoading,setLoading]=useState(false);
    const unmounted = useRef(false);

    useEffect(() => {
        getFacultyNew();
        return()=>{
            unmounted.current = true
        };
    },[]);

    //call api
    const getFacultyNew = () =>{
        setLoading(true);
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `bearer ${token}`);

        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };

        fetch("https://hcmusemu.herokuapp.com/info/newsfaculty",requestOptions)
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
            const tmpFacultyNew =[];
            for (const key in json) {
                tmpFacultyNew.push(
                {
                    title: json[key].Title,
                    link:json[key].Link,
                    date:json[key].Date,
                });
            };
            setDataNew(tmpFacultyNew);
            console.log(dataNew);
            setLoading(false);
        })
        .catch((err) => console.log(err, "error"));
    }

    const renderItem = ({item})=>(
        <TouchableOpacity style={styles.card}
            onPress={() => {Linking.openURL(item.link)}}>

            <View style={styles.info}>
                <Text style={styles.title}>{item.title}</Text>
                <Entypo style={styles.onTheRight} name="chevron-thin-right" size={20} color="blue" />
            </View>
            
            <View tyle={[styles.info,{marginBottom:20}]}>
                <Text style={styles.date}>{item.date}</Text>
                <Entypo style={styles.onTheRight} name="dots-three-horizontal" size={18} color="grey" />
            </View>
                
        </TouchableOpacity>
    );

    const loadingSkeleton = () => {
        return(
            <SkeletonPlaceholder>
                <View >
                    <View style={skeletonLoading.info}/>
                    <View style={[skeletonLoading.info,skeletonLoading.secondLine]}/>
                    <View style={[skeletonLoading.info,skeletonLoading.onTheRightArrow]}/>
                    <View style={[skeletonLoading.info,skeletonLoading.date]}/>
                    <View style={[skeletonLoading.info,skeletonLoading.onTheRightThreeDot]}/>
                </View>
                
                <View >
                    <View style={skeletonLoading.info}/>
                    <View style={[skeletonLoading.info,skeletonLoading.secondLine]}/>
                    <View style={[skeletonLoading.info,skeletonLoading.onTheRightArrow]}/>
                    <View style={[skeletonLoading.info,skeletonLoading.date]}/>
                    <View style={[skeletonLoading.info,skeletonLoading.onTheRightThreeDot]}/>
                </View>

                <View >
                    <View style={skeletonLoading.info}/>
                    <View style={[skeletonLoading.info,skeletonLoading.secondLine]}/>
                    <View style={[skeletonLoading.info,skeletonLoading.onTheRightArrow]}/>
                    <View style={[skeletonLoading.info,skeletonLoading.date]}/>
                    <View style={[skeletonLoading.info,skeletonLoading.onTheRightThreeDot]}/>
                </View>

                <View >
                    <View style={skeletonLoading.info}/>
                    <View style={[skeletonLoading.info,skeletonLoading.secondLine]}/>
                    <View style={[skeletonLoading.info,skeletonLoading.onTheRightArrow]}/>
                    <View style={[skeletonLoading.info,skeletonLoading.date]}/>
                    <View style={[skeletonLoading.info,skeletonLoading.onTheRightThreeDot]}/>
                </View>

                <View >
                    <View style={skeletonLoading.info}/>
                    <View style={[skeletonLoading.info,skeletonLoading.secondLine]}/>
                    <View style={[skeletonLoading.info,skeletonLoading.onTheRightArrow]}/>
                    <View style={[skeletonLoading.info,skeletonLoading.date]}/>
                    <View style={[skeletonLoading.info,skeletonLoading.onTheRightThreeDot]}/>
                </View>

                <View style={skeletonLoading.card}>
                    <View style={skeletonLoading.info}/>
                    <View style={[skeletonLoading.info,skeletonLoading.secondLine]}/>
                    <View style={[skeletonLoading.info,skeletonLoading.onTheRightArrow]}/>
                    <View style={[skeletonLoading.info,skeletonLoading.date]}/>
                    <View style={[skeletonLoading.info,skeletonLoading.onTheRightThreeDot]}/>
                </View>

                <View style={skeletonLoading.card}>
                    <View style={skeletonLoading.info}/>
                    <View style={[skeletonLoading.info,skeletonLoading.secondLine]}/>
                    <View style={[skeletonLoading.info,skeletonLoading.onTheRightArrow]}/>
                    <View style={[skeletonLoading.info,skeletonLoading.date]}/>
                    <View style={[skeletonLoading.info,skeletonLoading.onTheRightThreeDot]}/>
                </View>
            </SkeletonPlaceholder>
        )
    }

    return(
        <View style={styles.container}>
            {isLoading && loadingSkeleton()}
           <FlatList
            data={dataNew}
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

    card: {
        width: '100%',
        backgroundColor:'white',
        borderBottomWidth:1,
        borderBottomColor: "#cccccc",
        paddingBottom:5
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

    onTheRightThreeDot:{
        width:'6%',
        height:14,
        alignSelf: 'flex-end',
        marginTop:-25,
        marginRight:5
    },
})

export default FacultyNewScreen;