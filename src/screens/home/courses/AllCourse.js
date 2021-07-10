import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet,FlatList,ActivityIndicator  } from "react-native";
import { useDispatch, useSelector } from "react-redux";


import * as courseActions from "../../../../store/actions/Course";

const AllCourseInfoScreen = ({navigation}) => {
  const [pageCurrent,setPageCurrent] = useState(0);
  const [isLoading,setIsLoading] = useState(false);

  const dispatch = useDispatch();
  // const allCourses = useSelector((state) => state.course.allCourses);

  const [data, setData] = useState([]);
  const token = useSelector((state) => state.authen.token);
  var tmp = [];


  const getAllCourses = async () => {
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
        if(statusCode === 200){
          setData(data.concat(dataRes));
          dispatch(courseActions.getAllCourses(data.concat(dataRes)));
        }
        //tmp.concat(json)

        setIsLoading(false);
      })
      .catch((err) => console.log(err, "error"));
  };



  useEffect(() => {
    setIsLoading(true);
    getAllCourses();
  }, [pageCurrent]);

  const renderItem = ({ item }) => (
    <View>
      <TouchableOpacity
        style={styles.card}
        onPress={() => {
          navigation.navigate("Content Course", {
            idCourse: item.IDCourses,
            name: item.name,
          });
        }}
      >
        <View style={styles.courseInfo}>
          <View style={styles.textSection}>
            <Text style={styles.courseName}>{item.name}</Text>

            <View style={styles.teacherName}>
              {item.teacher.map((item, index) => (
                <Text key={index}>Giáo viên : {item}</Text>
              ))
              }
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
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
  )

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item,index) => index.toString()}
        onEndReached={handleMore}
        onEndReachedThreshold={0}
        ListFooterComponent={renderFooter}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  courseInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  textSection: {
    flexDirection: "column",
    justifyContent: "center",
  },

  courseName: {
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 10,
    marginTop: 10,
  },

  card: {
    marginVertical: 20,
    marginHorizontal: 10,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 10,
  },

  teacherName: {
    marginVertical: 15,
    marginHorizontal: 20,
  },

  footerLoader: {
      marginTop : 10,
      alignItems: "center",
  }
});

export default AllCourseInfoScreen;
