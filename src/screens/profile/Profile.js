import * as React from "react";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
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

export function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Header
        backgroundColor="#33CCFF"
        rightComponent={
          <TouchableOpacity>
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

      <TouchableOpacity style={styles.signoutBtnTouchable}
          onPress={() => {
          }}>
        <View style={styles.signoutBtn}>          
            <Text style={styles.signoutTextBtn}>Đăng xuất</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
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
    fontSize:20,
    fontWeight: "bold",
    color:"#FFFFFF"
  },

  signoutBtn: {
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    marginVertical: 20,
    marginHorizontal:30,
    borderRadius: 30,
    borderColor:"red",
    borderWidth: 1,
  },

  signoutBtnTouchable:{
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: -10
  },

  signoutTextBtn:{
    color:"red",
    fontWeight: "bold",
  }
});

// export default ProfileScreen;
