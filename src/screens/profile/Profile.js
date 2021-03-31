import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { ListItem, Header, Icon } from "react-native-elements";
import RoundedImage from "../../components/profile/main/RoundedImage";

const categoryProfile = [
  {
    name: "Trang mạng xã hội",
    icon: "facebook",
    type_icon: "material-community",
  },
  {
    name: "Kết nối ứng dụng",
    icon: "transit-connection-variant",
    type_icon: "material-community",
  },
  {
    name: "Đổi mật khẩu",
    icon: "lock-reset",
    type_icon: "material-community",
  },
  // more items
];

export function ProfileScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Header
        //backgroundColor="transparent"

        rightComponent={
          <TouchableOpacity onPress={() => navigation.navigate("Change Profile")}>
            <Icon name="account-edit" type="material-community" color="#EEEEEE" />
          </TouchableOpacity>
        }

        centerComponent={
          <Text style={styles.headerTitle}>
            Tài khoản của tôi
          </Text>
        }
      />
      <View style={styles.infoView}>
        <RoundedImage></RoundedImage>
        <Text style={styles.nameText}>Nguyễn Ngọc Đức Huy</Text>
      </View>
      <View style={styles.nameText}>
        {categoryProfile.map((item, index) => (
          <ListItem key={index} bottomDivider>
            <TouchableOpacity style={styles.itemBtn}>
              <Icon name={item.icon} type={item.type_icon} />
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
      <TouchableOpacity 
          onPress={() => {
          }}>
        <View style={styles.signoutBtn}>          
            <Text style={styles.signoutTextBtn}>Đăng xuất</Text>
        </View>
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
  },

  infoView: {
    alignItems: "center",

  },

  itemBtn: {
    flex: 1,
    flexDirection: "row",
  },

  itemName: {
    paddingLeft: 10,
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
    borderColor:"red",
    borderWidth: 1,
  },

  signoutBtnTouchable:{
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: -10,
    width: "100%"
  },

  signoutTextBtn:{
    color:"red",
    fontWeight: "bold",
  },

});

// export default ProfileScreen;
