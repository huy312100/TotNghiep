import React,{useState,useEffect,useRef} from "react";
import { StyleSheet, Text, View , FlatList,TouchableOpacity,Linking} from "react-native";
import { Entypo } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import Error500Screen from "../../error/500";
import Error503Screen from "../../error/503";


const FacultyNewScreen = () =>{

    const token = useSelector((state) => state.authen.token);
    const [dataFacultNew,setDataFacultNew] = useState([]);
    const [statusCode,setStatusCode] = useState(200);
    const [isLoadingFacultScreen,setLoadingFacultScreen]=useState(false);
    const unmounted = useRef(false);

    useEffect(() => {
        getFacultyNew();
        return()=>{
            unmounted.current = true
        };
    },[]);

    //call api
    const getFacultyNew = () =>{
        setLoadingFacultScreen(true);
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `bearer ${token}`);

        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };

        fetch("https://hcmusemu.herokuapp.com/info/newsfaculty",requestOptions)
        .then((response) => {
            const statusCode = response.status;
            const dataRes = response.json();
            return Promise.all([statusCode, dataRes]);
        }).then(([statusCode, dataRes])=> {
            console.log(statusCode,dataRes);
            if (statusCode === 200) {
                const tmpFacultyNew =[];
                for (const key in dataRes) {
                    tmpFacultyNew.push(
                    {
                        title: dataRes[key].Title,
                        link:dataRes[key].Link,
                        date:dataRes[key].Date,
                    });
                }
                setDataFacultNew(tmpFacultyNew);
            }
            else if (statusCode === 500){
                setStatusCode(statusCode);
            }
            else if (statusCode === 503){
                setStatusCode(statusCode)
            }
            else{
                setStatusCode(statusCode);
            }
            setLoadingFacultScreen(false);
        })
        .catch((err) => console.log(err, "error"));
    };

    const renderItemForFacultNew = ({item})=>(
        <TouchableOpacity style={styles.card}
            onPress={() => {Linking.openURL(item.link)}}>

            <View style={styles.info}>
                <Text style={styles.title}>{item.title}</Text>
                <Entypo style={styles.onTheRight} name="chevron-thin-right" size={20} color="blue" />
            </View>
            
            <View tyle={[styles.info,{marginBottom:20}]}>
                <Text style={styles.date}>{item.date}</Text>
            </View>
                
        </TouchableOpacity>
    );

    const loadingSkeletonForFacultNewScreen = () => {
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
            {isLoadingFacultScreen && loadingSkeletonForFacultNewScreen()}
            {statusCode === 500 && !isLoadingFacultScreen && Error500Screen()}
            {statusCode === 503 && !isLoadingFacultScreen && Error503Screen()}
           <FlatList
            data={dataFacultNew}
            renderItem={renderItemForFacultNew}
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