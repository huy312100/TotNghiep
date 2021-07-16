import React,{useEffect,useRef,useState} from 'react';
import { View, Text,TouchableOpacity,StyleSheet,FlatList,RefreshControl} from 'react-native';
import {useDispatch,useSelector} from "react-redux";


import LoadingWithSkeletonScreen from "./LoadingSkeleton";

import * as courseActions from "../../../../store/actions/Course";

const CurrentCourseInfoScreen = ( {navigation} ) => {
  const dispatch = useDispatch();
  const unmounted = useRef(false);

  const [data,setData] = useState([]);
  const [isLoading,setLoading]=useState(true);


  const currCourses = useSelector((state) => state.course.currCourses);
  const token = useSelector((state) => state.authen.token);
  const tmp=[];

  useEffect(() => {
    getCurrentCourses();
    return()=>{
      unmounted.current = true;
    }
  },[]);

  const getCurrentCourses = async () =>{
    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `bearer ${token}`);

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    fetch("https://hcmusemu.herokuapp.com/studycourses/currentcourses",requestOptions)
    .then((response) => {
      const statusCode = response.status;
      const dataRes = response.json();
      return Promise.all([statusCode, dataRes]);
    })
      .then(([statusCode, dataRes]) => {
          if(statusCode === 200){
            setData(dataRes);
            dispatch(courseActions.getCurrentCourses(dataRes));
          }
          setLoading(false);

      }).catch((err) => console.log(err, "error"));

  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() =>{
      navigation.navigate("Content Course",{
        idCourse : item.idCourse,
        name : item.name
      });
    }}>
      <View style={styles.courseInfo}>
        
        <View style={styles.textSection}>
          
          <Text style={styles.courseName}>{item.name}</Text>
          
           <View style={styles.teacherName}>
              {item.teacher.map((item,index)=>(
                <Text key={index}>Giáo viên :{item}</Text>
              ))}
            </View>
        </View>
      </View>
    </TouchableOpacity>
  )

  return (
            
      <View style={styles.container}>
        {/* <Text>{data.length}</Text> */}

        {isLoading && data.length === 0 && LoadingWithSkeletonScreen()}
        {!isLoading && data.length === 0 && <View style={{flex: 1,justifyContent: 'center',alignItems: 'center'}}>
            <Text>
              Không tìm thấy thông tin môn học nào
            </Text>
          </View>}
        
          <FlatList
            data={data}
            keyExtractor={(item,index) => index.toString()}
            renderItem={renderItem}
          />
    
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  courseInfo:{
    flexDirection:"row",
    justifyContent: "space-between",
  },

  textSection:{
    flexDirection: "column",
    justifyContent: "center",
  },

  courseName:{
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal:10,
    marginTop:10
    
  },

  card: {
    marginVertical:20,
    marginHorizontal:10,
    backgroundColor:'white',
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 10,
  },
  teacherName: {
    marginVertical:15,
    marginHorizontal:20,
  }
});

export default CurrentCourseInfoScreen;

