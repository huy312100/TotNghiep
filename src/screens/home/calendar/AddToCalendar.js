import React,{useState} from 'react';
import { StyleSheet, View, Text,Dimensions,TouchableOpacity,Image,FlatList,Linking,Alert,TextInput,Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


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
        <View style={styles.container}>
            <View style={styles.card}>
                <TextInput style={styles.titleName} placeholder="Tiêu đề"></TextInput>
            </View> 

            <View style={styles.card}>
                <View style={styles.date}>
                    <Ionicons name="time-outline" size={20} color={"black"} />
                    <Text style={styles.label} >Cả ngày</Text>
                    <Switch
                        style={[{ transform: [{ scaleX: .6 }, { scaleY: .6 }],marginTop:-5,marginRight:-10},styles.onTheRight]}
                        trackColor={{ false: "white", true: "green" }}
                        // thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                        size="medium"/>  
                </View>

                <TouchableOpacity style={styles.date}>
                    <Text style={[styles.label,{marginLeft:25}]}>Bắt đầu</Text>
                    <View style={[styles.onTheRight,{flexDirection:'row'}]}>
                        <Text style={styles.label}>{getCurrenDay(currentTimestamp)+" tháng "+ getCurrentMonth(currentTimestamp)+"," + getCurrentYear(currentTimestamp)}</Text>
                        <Text style={[styles.label,{marginLeft:20}]}>{getCurrentTime(currentTimestamp)}</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.date}>
                    <Text style={[styles.label,{marginLeft:25}]}>Kết thúc</Text>
                    <View style={[styles.onTheRight,{flexDirection:'row'}]}>
                        <Text style={styles.label}>{getCurrenDay(nextHourTimestamp)+" tháng "+ getCurrentMonth(nextHourTimestamp)+"," + getCurrentYear(nextHourTimestamp)}</Text>
                        <Text style={[styles.label,{marginLeft:20}]}>{getCurrentTime(nextHourTimestamp)}</Text>
                    </View>
                </TouchableOpacity>
            </View>
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
        marginVertical:20
    },

    titleName:{
        marginLeft: 40,
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
        marginLeft:5
    },

    onTheRight: {
        position: 'absolute',
        right: 0
    }
});

export default AddToCalendarScreen;