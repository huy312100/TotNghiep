import React from 'react';
import { Text, View, StyleSheet,FlatList,TouchableOpacity,Image } from 'react-native';
import{SafeAreaView} from 'react-native-safe-area-context';
import { Icon,Badge } from 'react-native-elements';

const Notification =[
    {
        id: '1',
        titleNotification: 'Title Notification',
        userImg: require("../../../assets/notification-flat.png"),
        contentNotification: 'This is an example notification',
        timeNotification:'10 mins ago',
    },
    {
        id: '2',
        titleNotification: 'Title Notification 2',
        userImg: require("../../../assets/notification-flat.png"),
        contentNotification: 'This is an example notification',
        timeNotification:'31/01/2021',
    },
    {
        id: '3',
        titleNotification: 'Title Notification 3',
        userImg: require("../../../assets/notification-flat.png"),
        contentNotification: 'This is an example notification',
        timeNotification:'25/01/2021',
    },
    {
        id: '4',
        titleNotification: 'Title Notification 4',
        userImg: require("../../../assets/notification-flat.png"),
        contentNotification: 'This is an example notification',
        timeNotification:'31/12/2020',
    },

]

const NotificationScreen=()=>{
    return(
        <SafeAreaView style={styles.container}>
            <FlatList
            data={Notification}
            keyExtractor={item =>item.id}
            renderItem={({item})=>(
                <TouchableOpacity style={styles.card}>
              <View style={styles.userInfo}>
                <View style={styles.userImgWrapper}>
                    <View >
                        <Image style={styles.userImg} source={item.userImg} />
                        <Badge
                            status="error"
                            containerStyle={{ position: 'absolute', top: -4, right: -4 }}
                        />
                    </View>
                </View>
                <View style={styles.textSection}>
                  <View style={styles.userInfoText}>
                    <Text style={styles.userName}>{item.titleNotification}</Text>
                    <Text style={styles.postTime}>{item.timeNotification}</Text>
                  </View>
                  <Text style={styles.messageText}>{item.contentNotification}</Text>
                </View>
              </View>
            </TouchableOpacity>
            )}
            />
        </SafeAreaView>   
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },

    card: {
        width: '100%',
    },

    userInfo:{
        flexDirection:"row",
        justifyContent: "space-between",
      },
    
      userImgWrapper:{
        paddingTop: 15,
        paddingBottom: 15,
      },
    
      userImg:{
        width: 50,
        height: 50,
        borderRadius: 25,
      },
    
      textSection:{
        flexDirection: "column",
        justifyContent: "center",
        padding: 15,
        paddingLeft: 0,
        marginLeft: 10,
        width: 300,
        borderBottomWidth: 1,
        borderBottomColor: "#cccccc",
      },
    
      userInfoText:{
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 5,
      },
    
      userName:{
        fontSize: 14,
        fontWeight: "bold",
      },
    
      postTime: {
        fontSize: 12,
        color:"#666",
      },
    
      messageText:{
        fontSize: 14,
        color: "#333333",
      }
})

export default NotificationScreen;