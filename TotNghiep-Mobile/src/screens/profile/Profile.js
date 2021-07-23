import React,{useEffect} from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { ListItem, Header, Icon } from "react-native-elements";

import RoundedImage from "../../components/profile/main/RoundedImage";

import {useDispatch,useSelector} from "react-redux";

import AsyncStorage from '@react-native-async-storage/async-storage';

import * as Notifications from 'expo-notifications';

import * as authenActions from "../../../store/actions/Authen";
import * as homeActions from "../../../store/actions/Home";

const categoryProfile = [
  {
    name: "Kết nối ứng dụng",
    icon: "transit-connection-variant",
    type_icon: "material-community",
  },
  {
    name: "Ứng dụng đã được kết nối",
    icon: "connectdevelop",
    type_icon: "font-awesome-5",
  },
  {
    name: "Đổi mật khẩu",
    icon: "lock-reset",
    type_icon: "material-community",
  },
  // more items
];

export function ProfileScreen({navigation}) {
  const dispatch = useDispatch();

  const profile=useSelector((state) => state.profile.profile);


  return (
    <View style={styles.container}>
      <View style={styles.infoView}>
        <RoundedImage styles = {{fontSize: 30}} source={{uri: profile[0].AnhSV ==="" ? undefined : profile[0].AnhSV}}></RoundedImage>
        <Text style={styles.nameText}>{profile[0].HoTen}</Text>
      </View>
      
      <View style={styles.nameText}>
        {categoryProfile.map((item, index) => (
          <ListItem key={index}  bottomDivider>
            <TouchableOpacity style={styles.itemBtn} onPress={() =>{
              if(index === 0){
                navigation.navigate("Connect application");
              }
              else if(index === 1){
                navigation.navigate("Web Customed"); 
              }
              else if(index === 2){
                navigation.navigate("Change Password");
              }
            }}>
              <Icon name={item.icon} type={item.type_icon} color='black'/>
              <ListItem.Content>
                <ListItem.Title style={styles.itemName}>
                  {item.name}
                </ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron />
            </TouchableOpacity>
          </ListItem>
        ))}
      </View>

      <View style={styles.signoutBtnTouchable}>
      <TouchableOpacity style={styles.signoutBtn}
          onPress={() => {
            AsyncStorage.removeItem('tokenValue').then(() => {
              dispatch(authenActions.logout);
              dispatch(homeActions.VisibleBotTab(false));
              Notifications.cancelAllScheduledNotificationsAsync();
              navigation.navigate("Login");
            })
          }}>        
            <Text style={styles.signoutTextBtn}>Đăng xuất</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  nameText: {
    marginTop: 20,
    fontSize: 25
  },

  infoView: {
    alignItems: "center",

  },

  itemBtn: {
    flex: 1,
    flexDirection: "row",
    height:"100%"
  },

  itemName: {
    paddingLeft: 10,
    fontSize: 17
  },

  headerTitle: {
    fontSize:18,
    color:"#FFFFFF"
  },

  signoutBtn: {
    alignItems: "center",
    padding: 15,
    marginVertical: 20,
    marginHorizontal:10,
    borderRadius: 30,
    borderColor:"blue",
    borderWidth: 1,
  },

  signoutBtnTouchable:{
    flex: 1,
    justifyContent: 'flex-end',
    alignSelf: "center",
    marginBottom: 10,
    width: "50%",

  },

  signoutTextBtn:{
    color:"blue",
    fontWeight: "bold",
    fontSize: 17
  },

});

// export default ProfileScreen;
