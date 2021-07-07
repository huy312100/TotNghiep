import React,{useState,useEffect,useRef} from 'react';
import { StyleSheet, View, Text,Dimensions,TouchableOpacity,Image,FlatList,Linking,Alert,ActivityIndicator } from 'react-native';
import { Header} from 'react-native-elements';
import { useDispatch,useSelector } from 'react-redux';

import { Ionicons,FontAwesome5,Entypo } from '@expo/vector-icons';


const ForumOfCourseMoodleScreen = ({navigation,route}) =>{

    const token = useSelector((state) => state.authen.token);

    const infoCourseChoose = useSelector((state) => state.course.infoCourseChoose);

    const [data, setData] = useState([]);
    const [idForum,setIDForum] = useState('');

    useEffect(() => {
        console.log(infoCourseChoose);
        getForumCourseOfMoodle();
    },[]);
    
 

    const getForumCourseOfMoodle = () => {
        let details = {
            IDCourses: infoCourseChoose.idCourse,
        };
      
        let formBody = [];
    
        for (let property in details) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
    
        fetch("https://hcmusemu.herokuapp.com/forummoodle", {
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
                setData(dataRes[0].Forum);
            }
        }).catch(error => console.log('error', error));
    }

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.card} onPress={() =>{
            navigation.navigate("Content Forum Of A Moodle Course",{
                content: item,
            })
        }}>
             <View style={styles.info}>
                <Text style={styles.title}>{item.subject}</Text>
                <Text style={{marginLeft:15,marginTop:10}}>Người đăng : {item.fullname}</Text>
            </View>
        </TouchableOpacity>
    )

    return(
        <View style={styles.container}>
            {/* <Header
            containerStyle={{
                backgroundColor: 'white',
                justifyContent: 'space-around',
                borderBottomColor:'#DDDDDD'
            }}
            centerComponent={
                <Text style={{fontSize:17,fontWeight:'500'}} numberOfLines={1}>{infoCourseChoose.nameCourse}</Text>
            }
            leftComponent={
              <TouchableOpacity onPress={() =>{
                  navigation.goBack();
              }}>
                  <Ionicons name="chevron-back-sharp" size={24} color="blue" />
              </TouchableOpacity>
              
            }/> */}

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

    card: {
        width: '100%',
        backgroundColor:'white',
        borderBottomWidth:1,
        borderBottomColor: "#cccccc",
        paddingBottom:5
    },

    info: {
        justifyContent: 'center',
        marginVertical:10
    },

    title: {
        fontWeight:'bold',
        marginRight:15,
        marginLeft:15
    },

});

export default ForumOfCourseMoodleScreen;