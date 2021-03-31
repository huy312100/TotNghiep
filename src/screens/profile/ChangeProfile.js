import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import RoundedImage from "../../components/profile/main/RoundedImage";

function ChangeProfileScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.infoView}>
        <RoundedImage></RoundedImage>
        <Text style={styles.nameText}>Nguyễn Ngọc Đức Huy</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  infoView: {
    alignItems: "center",
  }, 
  nameText: {
      marginTop:20,
  }
});

export default ChangeProfileScreen;
