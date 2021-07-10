import React,{useState,useEffect,useRef} from 'react';
import { StyleSheet, View, Text,Dimensions,TouchableOpacity,Image,FlatList,Linking,Alert,ActivityIndicator } from 'react-native';
import { useDispatch,useSelector } from 'react-redux';

import * as courseActions from '../../../../../store/actions/Course';

const ForumCourseScreen = ({navigation}) =>{
    const token = useSelector((state) => state.authen.token);
    const dispatch = useDispatch();

    const unmounted = useRef(false);
    const [pageCurrent,setPageCurrent] = useState(0);
    const [isLoading,setIsLoading] = useState(false);

    var infoCourseChoose = {
        idCourse : "",
        nameCourse : ""
    };

  // const allCourses = useSelector((state) => state.course.allCourses);

  const [data, setData] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    getAllCourses();
    return()=>{
        unmounted.current = true;
    }
  }, [pageCurrent]);

  const getAllCourses = () => {
    let details = {
      page: pageCurrent,
    };

    let formBody = [];

    for (let property in details) {
      let encodedKey = encodeURIComponent(property);
      let encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    console.log(formBody);

    fetch("https://hcmusemu.herokuapp.com/studycourses/allcourses", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `bearer ${token}`,
      },
      body: formBody,
    })
    .then((response) => {
        const statusCode = response.status;
        const dataRes = response.json();
        return Promise.all([statusCode, dataRes]);
      })
      .then(([statusCode, dataRes]) => {
        //tmp.concat(json)
        if(statusCode === 200) {
            if(dataRes.message !== 'Page not Found'){
                setData(data.concat(dataRes));
                dispatch(courseActions.getAllCourses(data.concat(dataRes)));
            }
        }
        setIsLoading(false);
      })
      .catch((err) => console.log(err, "error"));
  };

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.card} 
            onPress={() =>{
                infoCourseChoose.idCourse=item.IDCourses;
                infoCourseChoose.nameCourse=item.name;
                dispatch(courseActions.getInfoCourseChoose(infoCourseChoose));
                navigation.navigate('Forum Of A Course');
        }}>

            <View style={styles.info}>
                <Text style={styles.title}>{item.name}</Text>
            </View>

            {typeof(item.teacher.map) !== 'undefined' && <View tyle={[styles.info,{marginBottom:20,marginLeft:20}]}>
                {item.teacher.map((item, index) => (
                <Text key={index} style={styles.date}>Giáo viên : {item}</Text>
              ))
              }
            </View>}
            
        </TouchableOpacity>
    );

    const handleMore = () =>{
        setPageCurrent(pageCurrent+1);
        setIsLoading(true);
    };

    const renderFooter = () =>(
        isLoading?
        <View style={styles.footerLoader}>
            <ActivityIndicator size="large"/>
        </View>:null
    );

    return(
        <View style={styles.container}>
            <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item,index) => index.toString()}
            onEndReached={handleMore}
            onEndReachedThreshold={0}
            ListFooterComponent={renderFooter}
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

export default ForumCourseScreen;
