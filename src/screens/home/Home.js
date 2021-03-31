
import React from 'react';
import { StyleSheet, View, Text,Dimensions,TouchableOpacity } from 'react-native';
import { Icon } from "react-native-elements";
import {SafeAreaView} from 'react-native-safe-area-context'


const DeviceWidth = Dimensions.get('window').width


export function HomeScreen({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}>Khám phá ngay</Text>
      <View >
        <View style={styles.gridMainFunctions} >
          
          <View style={styles.gridItemShape} >
            <TouchableOpacity style={styles.gridTouchable} onPress={() =>{
              navigation.navigate("Calendar");
            }}>
                <Icon name="calendar-alt" type="font-awesome-5" color="red" size={40}/>
                <Text style={styles.textItem}>Lịch hoạt động</Text>
              </TouchableOpacity>
          </View>

          <View style={styles.gridItemShape}  >
            <TouchableOpacity style={styles.gridTouchable} onPress={() =>{
              navigation.navigate("Course")
            }}>
            <Icon name="graduation-cap" type="font-awesome-5" color="red" size={40} />
                <Text style={styles.textItem}>Thông tin khóa học</Text>
            </TouchableOpacity> 
          </View>

          <View style={styles.gridItemShape}  >
            <TouchableOpacity style={styles.gridTouchable}>
            <Icon name="forum" type="material-community" color="red" size={40}/>
                <Text style={styles.textItem}>Diễn đàn</Text>
            </TouchableOpacity> 
          </View> 

        </View>

        <View style={styles.gridMainFunctions}>

          <View style={styles.gridItemShape}  >          
            <TouchableOpacity style={styles.gridTouchable}>
            <Icon name="info-circle" type="font-awesome-5" color="red" size={40} />
                <Text style={styles.textItem}>Thông tin trường</Text>
            </TouchableOpacity> 
          </View>

          <View style={styles.gridItemShape}  >
            <TouchableOpacity style={styles.gridTouchable}>
            <Icon name="pencil-alt" type="font-awesome-5" color="red" size={40} />
                <Text style={styles.textItem}>Điểm số</Text>
            </TouchableOpacity> 
          </View>

          <View style={styles.gridItemShape}  >
            <TouchableOpacity style={styles.gridTouchable}>
            <Icon name="envelope-open-text" type="font-awesome-5" color="red" size={40} />
                <Text style={styles.textItem}>Mail</Text>
            </TouchableOpacity> 
          </View>

        </View>
             
      </View>
        

      <Text style={styles.label}>Deadline gần nhất</Text>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  gridMainFunctions: {
    flexDirection: 'row',
  },

  gridItemShape:{
    borderWidth: 1,
    borderColor:"#DDDDDD",
    borderRadius: 1,// Must add to change border style
    borderStyle: 'dotted',
    width: DeviceWidth/3,
    height: DeviceWidth*0.3,
  },

  label: {
    margin:10,
    fontSize:16,
    fontWeight: "bold",
  },

  gridTouchable: {
    width:"100%",
    height:"100%",
    alignItems: "center",
    justifyContent: "center"
  },

  textItem: {
    marginTop:15,
  },


})
