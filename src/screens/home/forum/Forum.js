import React,{useState,useEffect,useRef} from 'react';
import { StyleSheet, View, Text,Dimensions,TouchableOpacity,Image,FlatList,Linking,Alert,ActivityIndicator } from 'react-native';
import { useDispatch,useSelector } from 'react-redux';



const ForumScreen = ({navigation}) =>{
    const token = useSelector((state) => state.authen.token);
    const dispatch = useDispatch();

    const unmounted = useRef(false);
    const [pageCurrent,setPageCurrent] = useState(0);
    const [isLoading,setIsLoading] = useState(false);

  // const allCourses = useSelector((state) => state.course.allCourses);

  const [data, setData] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    getAllCourses();
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
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        //tmp.concat(json)
        setData(data.concat(json));
        //dispatch(courseActions.getAllCourses(data.concat(json)));
        setIsLoading(false);
      })
      .catch((err) => console.log(err, "error"));
  };

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.card} 
            onPress={() =>{navigation.navigate('Forum Of A Course',{
                idCourse: item.IDCourses,
                name: item.name,
            })
        }}>

            <View style={styles.info}>
                <Text style={styles.title}>{item.name}</Text>
            </View>
            
            <View tyle={[styles.info,{marginBottom:20,marginLeft:20}]}>
                {item.teacher.map((item, index) => (
                <Text key={index} style={styles.date}>Giáo viên : {item}</Text>
              ))
              }
            </View>
            
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

export default ForumScreen;
