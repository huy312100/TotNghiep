import React,{ useState,useEffect } from "react";
import { StyleSheet, Text,ImageBackground,View,Linking,FlatList,TouchableOpacity} from "react-native";
import {Entypo,MaterialCommunityIcons,FontAwesome5,Fontisto,Feather } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";


const InfoUniversityScreen = () =>{

    const token = useSelector((state) => state.authen.token);
    const [dataUniversity,setDataUniversity] = useState([]);
    const [isLoading,setLoading]=useState(false);

    useEffect(() =>{
        getAllInfoUniversity();
    },[]);

    //call api
    const getAllInfoUniversity= ()=>{
        setLoading(true);
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `bearer ${token}`);

        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };

        fetch("https://hcmusemu.herokuapp.com/info/getinfo/parent",requestOptions)
        .then((response) => response.json())
        .then((json) => {
            //console.log(json);
            setDataUniversity(json);
            setLoading(false);
        })
        .catch((err) => console.log(err, "error"));
    };
    

    const handleAddressString =(str) => {
        const numberOf = str.split(";").length-1;
        const pos=str.indexOf(";");
        return str.slice(0, pos);
    }

    const loadingSkeleton = () =>{
    return(
            <SkeletonPlaceholder>
                <View >
                    <View style={skeletonLoading.card}/>
                    <View style={skeletonLoading.rowInfo}>
                        <View style={skeletonLoading.squareShapeView}/>
                        <View style={skeletonLoading.infoText}/>
                    </View>

                    <View style={skeletonLoading.rowInfo}>
                        <View style={skeletonLoading.squareShapeView}/>
                        <View style={skeletonLoading.infoText}/>
                    </View>

                    <View style={skeletonLoading.rowInfo}>
                        <View style={skeletonLoading.squareShapeView}/>
                        <View style={skeletonLoading.infoText}/>
                    </View>

                    <View style={skeletonLoading.rowInfo}>
                        <View style={skeletonLoading.squareShapeView}/>
                        <View style={skeletonLoading.infoText}/>
                    </View>

                    <View style={skeletonLoading.rowInfo}>
                        <View style={skeletonLoading.squareShapeView}/>
                        <View style={skeletonLoading.infoText}/>
                    </View>

                    <View style={skeletonLoading.rowInfo}>
                        <View style={skeletonLoading.squareShapeView}/>
                        <View style={skeletonLoading.infoText}/>
                    </View>

                    <View style={skeletonLoading.rowInfo}>
                        <View style={skeletonLoading.squareShapeView}/>
                        <View style={skeletonLoading.infoText}/>
                    </View>

                    <View style={skeletonLoading.rowInfo}>
                        <View style={skeletonLoading.squareShapeView}/>
                        <View style={skeletonLoading.infoText}/>
                    </View>
                </View>
            </SkeletonPlaceholder>
        )
    }

    const renderItem = ({ item }) => (
        <View >
            <ImageBackground style={styles.card} source={{ uri: item.Images}}/>

            <View style={[styles.rowInfo,{marginTop:30}]}>
                <View style={styles.squareShapeView}>
                    <FontAwesome5 name="university" size={24} color="#BBBBBB" />
                </View>
                <Text style={styles.infoText}>{item.TenTruongDH}</Text>
            </View>

            <View style={styles.rowInfo}>
                <View style={styles.squareShapeView}>
                    <MaterialCommunityIcons name="web" size={24} color="#BBBBBB" />
                </View>
                <TouchableOpacity onPress={() =>{
                    Linking.openURL(item.WebSite)
                }}>
                    <Text style={[styles.infoText,styles.link]}>{item.WebSite}</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.rowInfo}>
                <View style={styles.squareShapeView}>
                    <Fontisto name="email" size={24} color="#BBBBBB" />
                </View>
                <TouchableOpacity onPress={() =>{
                    Linking.openURL(`mailto:${item.Email}`)
                }}>
                    <Text style={[styles.infoText,styles.link,{color:'red'}]}>{item.Email}</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.rowInfo}>
                <View style={styles.squareShapeView}>
                    <MaterialCommunityIcons name="cellphone-information" size={24} color="#BBBBBB" />
                </View>
                <TouchableOpacity onPress={() =>{
                    Linking.openURL(`tel:${item.SDT}`)
                }}>
                    <Text style={[styles.infoText,styles.link,{color:'#006666'}]}>{item.SDT}</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.rowInfo}>
                <View style={styles.squareShapeView}>
                    <Fontisto name="facebook" size={24} color="#BBBBBB" style={{marginLeft:5}}/>
                </View>
                <TouchableOpacity onPress={() =>{
                    Linking.openURL(item.FanFage)
                }}>
                    <Text style={[styles.infoText,styles.link]}>{item.FanFage}</Text>
                </TouchableOpacity>
            </View>


            <View style={styles.rowInfo}>
                <View style={styles.squareShapeView}>
                    <FontAwesome5 name="user-graduate" size={22} color="#BBBBBB" style={{marginLeft:3}}/>
                </View>
                <Text style={styles.infoText}>{item.TenKhoa}</Text>
            </View>  

            <View style={styles.rowInfo}>
                <View style={styles.squareShapeView}>
                    <Feather name="external-link" size={24} color="#BBBBBB" />
                </View>
                <TouchableOpacity onPress={() =>{
                    Linking.openURL(item.Website)
                }}>
                    <Text style={[styles.infoText,styles.link]}>{item.Website}</Text>
                </TouchableOpacity>
                
            </View>       

            <View style={styles.rowInfo}>
                <View style={styles.squareShapeView}>
                    <Entypo name="address" size={24} color="#BBBBBB" />
                </View>
                <Text style={styles.infoText}>{handleAddressString(item.TenDiaChi)}</Text>
            </View>

        </View>
    );

    return(
        <View style={styles.container}>
            {isLoading && loadingSkeleton()}
            <FlatList
                data={dataUniversity}
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
        opacity:1,
        borderColor: "#cccccc",
        width:'100%',
        height:150,
    },

    rowInfo: {
        flexDirection: "row",
        marginVertical:15,
        marginHorizontal:20,
        //borderWidth:1,
        alignItems: "center",
    },

    squareShapeView: { 
        width: 30,
        height: 30,
        borderRadius:7,
        borderWidth:.5,
        padding:2,
        borderColor:'#BBBBBB'
    },

    infoText:{
        marginHorizontal:10,
    },

    link: {
        color:'blue',
        textDecorationLine: 'underline'
    }
});

const skeletonLoading = StyleSheet.create({
    card: {
        width:'100%',
        height:150,
    },
  
    rowInfo: {
        flexDirection: "row",
        marginVertical:15,
        marginHorizontal:20,
        //borderWidth:1,
        alignItems: "center",
    },
  
    squareShapeView: { 
        width: 30,
        height: 30,
        borderRadius:7,
    },
  
    infoText:{
        width: 300,
        height: 20,
        marginHorizontal:10,
    },
});

export default InfoUniversityScreen;