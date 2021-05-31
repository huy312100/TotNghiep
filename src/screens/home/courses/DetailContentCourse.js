import React, { useEffect,useState } from "react";
import { View, TouchableOpacity, StyleSheet,Text,SectionList,Linking,Alert } from "react-native";
import { useSelector } from "react-redux";
import LoadingScreen from '../../LoadingScreen';


const ContentCourseInfoScreen = ({route}) => {
  const idCourse  = route.params.idCourse;
  const token = useSelector((state) => state.authen.token);

  const [dataAssign,setDataAssign] = useState([]);
  const [dataDoc,setDataDoc]=useState([]);
  const [dataResour,setDataResour] = useState([]);
  const [dataFolder,setDataFolder] = useState([]);

  const [isLoading,setLoading]=useState(false);

  useEffect(() => {
    const getDetailCourse = () => {
      setLoading(true);
      const idCourse=route.params.idCourse;
      let details = {
        IDCourses: idCourse,
      };

      let formBody = [];

      for (let property in details) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");

      console.log(formBody);

      fetch("https://hcmusemu.herokuapp.com/coursescontent", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Authorization": `bearer ${token}`,
        },
        body: formBody,
      })
        .then((response) => response.json())
        .then((json) => {
          //console.log(json);
          const tmpAssign =[];
          for (const key in json.listAssign) {
            tmpAssign.push(
              {
              id: json.listAssign[key]._id,
              url:json.listAssign[key].url,
              name:json.listAssign[key].name,
              startDate:json.listAssign[key].startDate,
            });
          }
          console.log(tmpAssign);
          setDataAssign(tmpAssign);

          const tmpDoc=[];
          for (const key in json.listUrl) {
            tmpDoc.push(
              {
              id: json.listUrl[key]._id,
              url:json.listUrl[key].url,
              name:json.listUrl[key].name,
            });
          }
          console.log(tmpDoc);
          setDataDoc(tmpDoc);


          const tmpResour=[];
          for (const key in json.listResource) {
            tmpResour.push(
              {
              id: json.listResource[key]._id,
              url:json.listResource[key].url,
              name:json.listResource[key].name,
            });
          }
          console.log(tmpResour);
          setDataResour(tmpResour);


          const tmpFolders =[];
          for (const key in json.listFolder) {
            tmpFolders.push(
              {
              id: json.listFolder[key]._id,
              url:json.listFolder[key].url,
              name:json.listFolder[key].name,
            });
          }
          console.log(tmpFolders);
          setDataFolder(tmpFolders);

          setLoading(false);
        })
        .catch((err) => console.log(err, "error"));
    };
    getDetailCourse();
  }, []);

  const renderItem = ({ item }) => (
    <View>
      
      <TouchableOpacity style={styles.card} onPress={() =>{
        Alert.alert(
          "Chuyển tiếp",
          "Ứng dụng muốn chuyển tiếp đến trang môn học của bạn",
          [
            { text: "Từ chối", 
              style: "cancel"
            },
            {
              text: "Cho phép",
              onPress: () => Linking.openURL(item.url),
            },
          ]
        );
      }}>
        <Text style={styles.deadlineName}>{item.name}</Text>
      </TouchableOpacity>
    </View> 
    
  );

  const renderEmpty = ({section}) => {
    if(section.data.length===0 && !isLoading){
      return(
        <View>
          <Text style={styles.emptyInfo}>Nội dung không tìm thấy</Text>
        </View>
      )
    }
  };


  return (
    <View style={styles.container}>
      <SectionList
      sections={[
        {title:"Deadline",data:dataAssign},
        {title:"Tài liệu",data:dataResour},
        {title:"Thực hành",data:dataDoc},
        {title:"Khác",data:dataFolder},
        
      ]}
      renderItem={renderItem}
      keyExtractor={(item,index) => index.toString()}
      //ListEmptyComponent={renderEmpty}
      renderSectionHeader={({ section: { title } }) => (
        <Text style={styles.label}>{title}</Text>
      )}
      stickySectionHeadersEnabled={false} 
      //stickyHeaderIndices={[0]}
      renderSectionFooter={renderEmpty}
      />  

      { isLoading && LoadingScreen()}

      {/* <FlatList
        data={dataDoc}
        renderItem={renderItem}
        keyExtractor={(item,index) => index.toString()}
        ListEmptyComponent={renderEmpty}
        ListHeaderComponent={
          <Text style={styles.label}>DOCUMENTATION</Text>
        }
        //stickyHeaderIndices={[0]}
        />   */}
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  label: {
    margin:10,
    fontSize:16,
    fontWeight: "bold",
  },


  card: {
    width: '100%',
    backgroundColor:'white',
    borderBottomWidth:1,
    borderBottomColor: "#cccccc",
  },

  deadlineName:{
    marginLeft: 40,
    marginVertical:20,
    fontSize:15
  },

  emptyInfo: {
    marginLeft:50,
    fontSize:18
  }

});

export default ContentCourseInfoScreen;
