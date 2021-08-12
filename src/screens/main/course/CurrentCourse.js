import React,{useState,useEffect,useRef} from 'react';
import { StyleSheet, View, Text,Dimensions,TouchableOpacity,Image,FlatList,Linking,Alert,ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';


const CurrentCourseScreen = () =>{
    const token = useSelector((state) => state.authen.token);

    const unmounted = useRef(false);
    const [isLoading,setIsLoading] = useState(true);


  // const allCourses = useSelector((state) => state.course.allCourses);

    const [data, setData] = useState([]);

    useEffect(() => {
        getCurrentCourses();
        return()=>{
            unmounted.current = true;
        }
    }, []);

    const getCurrentCourses = async () =>{
        setIsLoading(true);
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `bearer ${token}`);
    
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
    
        await fetch("https://hcmusemu.herokuapp.com/studycourses/currentcourses/parent",requestOptions)
        .then((response) => {
          const statusCode = response.status;
          const dataRes = response.json();
          return Promise.all([statusCode, dataRes]);
        })
        .then(([statusCode, dataRes]) => {
            if(statusCode === 200){
            setData(dataRes);
            }
            setIsLoading(false);

        }).catch((err) => console.log(err, "error"));
    
    };

    const renderItem = ({ item }) => (
        <View style={styles.card} >

            <View style={styles.info}>
                <Text style={styles.title}>{item.name}</Text>
            </View>

            {typeof(item.teacher.map) !== 'undefined' && <View tyle={[styles.info,{marginBottom:20,marginLeft:20}]}>
                {item.teacher.map((item, index) => (
                <Text key={index} style={styles.date}>Giáo viên : {item}</Text>
              ))
              }
            </View>}
            
        </View>
    );

    return(
        <View style={styles.container}>
            {isLoading && data.length === 0 && <View style={{flex:1,justifyContent: 'center',alignItems: 'center'}}>
                <ActivityIndicator size="large" color="orange"/>
            </View>}

            {!isLoading && data.length === 0 && <View style={{flex: 1,justifyContent: 'center',alignItems: 'center'}}>
                    <Text style={{color:'#BBBBBB'}}>
                        Không tìm thấy môn học nào 
                    </Text>
                </View>}


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

    title: {
        fontWeight:'bold',
        marginRight:15,
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
    },

    footerLoader: {
        marginTop : 10,
        alignItems: "center",
    }
});

export default CurrentCourseScreen;
