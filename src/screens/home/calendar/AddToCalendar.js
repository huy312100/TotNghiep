import React,{useState} from 'react';
import { StyleSheet, View, Text,TouchableOpacity,TouchableWithoutFeedback,Keyboard,TextInput,Switch,KeyboardAvoidingView,ScrollView } from 'react-native';
import { Ionicons,Entypo,SimpleLineIcons } from '@expo/vector-icons';
import { Header } from '@react-navigation/stack';



const AddToCalendarScreen = () => {

    const getCurrentTimestamp=()=>{
        return Date.now();
    };

    const [currentTimestamp,setCurrentTimestamp]=useState(getCurrentTimestamp());
    const [nextHourTimestamp,setNextHourTimestamp]=useState(getCurrentTimestamp()+3600*1000);
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const getCurrenDay = (timestamp)=>{
        var today = new Date(timestamp); 
        var day= today.getDate();
        return day;
      };
    
      const getCurrentMonth =(timestamp)=> {
        var today = new Date(timestamp);
        var month = today.getMonth() + 1;
        return month; 
      };
    
      const getCurrentYear = (timestamp) => {
        var today = new Date(timestamp); 
        var year= today.getFullYear();
        return year;
      }
      
      const addZero=(i) =>{
        if (i < 10) {
          i = "0" + i;
        }
        return i;
      }
      
      const getCurrentTime = (timestamp) => {
        var d = new Date(timestamp);
        var h = addZero(d.getHours());
        var m = addZero(d.getMinutes());
        return h + ":" + m;
      }

      

    return(
        <KeyboardAvoidingView
        //keyboardVerticalOffset = {Header.HEIGHT + 20} // adjust the value here if you need more padding
         behavior={Platform.OS === "ios" ? "padding" : "height"}
         style={styles.container}>
        <TouchableWithoutFeedback onPress={() =>{
            Keyboard.dismiss();
          }}>
         <ScrollView style={styles.container}>
            <View style={styles.card}>
                <TextInput style={styles.titleName} placeholder="Tiêu đề"></TextInput>
            </View> 

            <View style={styles.card}>
                <View style={styles.date}>
                <SimpleLineIcons name="clock" size={20} color="red" />
                    <Text style={styles.label}>Cả ngày</Text>
                    <Switch
                        style={[{ transform: [{ scaleX: .8 }, { scaleY: .8 }],marginTop:-5,marginRight:-10},styles.onTheRight]}
                        trackColor={{ false: "white", true: "green" }}
                        // thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                        size="medium"/>  
                </View>

                <TouchableOpacity style={styles.date}>
                    <Text style={[styles.label,{marginLeft:32}]}>Bắt đầu</Text>
                    <View style={[styles.onTheRight,{flexDirection:'row'}]}>
                        <Text style={styles.label}>{getCurrenDay(currentTimestamp)+" tháng "+ getCurrentMonth(currentTimestamp)+"," + getCurrentYear(currentTimestamp)}</Text>
                        <Text style={[styles.label,{marginLeft:20}]}>{getCurrentTime(currentTimestamp)}</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.date}>
                    <Text style={[styles.label,{marginLeft:32}]}>Kết thúc</Text>
                    <View style={[styles.onTheRight,{flexDirection:'row'}]}>
                        <Text style={styles.label}>{getCurrenDay(nextHourTimestamp)+" tháng "+ getCurrentMonth(nextHourTimestamp)+"," + getCurrentYear(nextHourTimestamp)}</Text>
                        <Text style={[styles.label,{marginLeft:20}]}>{getCurrentTime(nextHourTimestamp)}</Text>
                    </View>
                </TouchableOpacity>
            </View>


            <TouchableOpacity style={[styles.card,{marginBottom:0}]}>
                <View style={styles.date}>
                <Ionicons name="people-outline" size={23} color="red" />
                    <Text style={styles.label}>Thêm người</Text>
                    <Entypo style={styles.onTheRight} name="chevron-thin-right" size={18} color="blue" />
                </View>
            </TouchableOpacity> 

            <TouchableOpacity style={[styles.card,{marginTop:0,marginBottom:0}]}>
                <View style={styles.date}>
                <SimpleLineIcons name="event" size={20} color="red" />
                    <Text style={styles.label}>Loại sự kiện</Text>
                    <Entypo style={styles.onTheRight} name="chevron-thin-right" size={18} color="blue" />
                </View>
            </TouchableOpacity> 

            <TouchableOpacity style={[styles.card,{marginTop:0}]}>
                <View style={styles.date}>
                <Ionicons name="color-palette-outline" size={23 } color="red" />
                    <Text style={styles.label}>Màu sắc</Text>
                    <Entypo style={styles.onTheRight} name="chevron-thin-right" size={18} color="blue" />
                </View>
            </TouchableOpacity> 

            <View style={[styles.card,{marginBottom:0}]}>
                <View style={styles.date}>
                <SimpleLineIcons name="link" size={20} color="red" />
                   <TextInput style={[styles.label,{width:"100%"}]} placeholder="URL"></TextInput>
                </View>
            </View> 
            <View style={[styles.card,{marginTop:0,height:"25%"}]}>
                <View style={styles.date}>
                    <SimpleLineIcons name="note" size={20} color="red" />
                    <TextInput style={[styles.label,{width:"100%",marginTop:-5,height:"600%"}]} placeholder="Mô tả" multiline={true}></TextInput>
                </View>
            </View> 
            </ScrollView>
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
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
        borderBottomColor: "#EEEEEE",
        marginVertical:20
    },

    titleName:{
        marginLeft: 48,
        marginVertical:10,
        fontSize:20
    },

    date:{
        flexDirection:'row',
        marginHorizontal:20,
        marginVertical:10,
    },

    label: {
        fontSize:18,
        marginLeft:15
    },

    onTheRight: {
        position: 'absolute',
        right: 0
    }
});

export default AddToCalendarScreen;