import React,{useEffect,useRef,useState} from 'react'
import { View, Text,TouchableOpacity,StyleSheet,FlatList} from 'react-native';
import {useDispatch,useSelector} from "react-redux";

import * as courseActions from "../../../../store/actions/Course";

const CurrentCourseInfoScreen = () => {
    const dispatch = useDispatch();
    const unmounted = useRef(false);

    const [data,setData] = useState([]);

    const currCourses = useSelector((state) => state.course.currCourses);
    const token = useSelector((state) => state.authen.token);
    const tmp=[];

    useEffect(() => {
        const getCurrentCourses = async () =>{
            
            var myHeaders = new Headers();
            myHeaders.append("Authorization", `bearer ${token}`);

            var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
            };

            fetch("https://hcmusemu.herokuapp.com/studycourses/currentcourses",requestOptions)
              .then((response) => response.json())
              .then((json) => {
                console.log(json);
                console.log(tmp.length);   

                //console.log(dataUniversity);
                
                  for (const key in json) {
                    tmp.push({
                     idCourse: json[key].IDCourses,
                      category:json[key].category,
                      name:json[key].name,
                      startDate:json[key].startDate,
                      teacherName:json[key].teacher
                    });
                  }
                
                  setData(tmp) ;

              }).catch((err) => console.log(err, "error"));
                    //console.log(currCourses.length); 
            //dispatch(courseActions.getCurrentCourses());
            //setData(currCourses);
        }
        getCurrentCourses();
    },[tmp.length]);

    return (
              
        <View style={styles.container}>
          {/* <Text>{data.length}</Text> */}
          
            <FlatList
            data={data}
            keyExtractor={(item,index)=>index.toString()}
            renderItem={({item})=>(
              <TouchableOpacity style={styles.card}>
                <View style={styles.courseInfo}>
                  
                  <View style={styles.textSection}>
                    
                    <Text style={styles.courseName}>{item.name}</Text>
                    
                     <View style={styles.teacherName}>
                       {item.teacherName.map((item,index)=>(
                          <Text>Giáo viên : {item}</Text>
                       ))}
                      
                     </View>
                   
                  </View>
                </View>
              </TouchableOpacity>
              )}/>
      
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
    marginVertical:30,
    marginHorizontal:20,
  }
})

export default CurrentCourseInfoScreen;

