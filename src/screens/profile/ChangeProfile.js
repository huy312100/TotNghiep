import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import{Input} from "react-native-elements";

import RoundedImage from "../../components/profile/main/RoundedImage";

function ChangeProfileScreen() {
  return (
    <ScrollView>

    <View style={styles.container}>
      <View style={styles.infoView}>
        <RoundedImage></RoundedImage>
      </View>
      <View style={styles.inputText}>
        <Text style={styles.labelText}>Họ và tên</Text>
        <Input></Input>
      </View>

      <View style={styles.inputText}>
        <Text style={styles.labelText}>Email</Text>
        <Input></Input>
      </View>

    </View>
    </ScrollView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  infoView: {
    alignItems: "center",
    paddingBottom:20
  }, 
  labelText: {
    paddingLeft:10,
    fontWeight: "bold",
  },
  inputText: {
    paddingLeft:15,
    paddingRight:15
  }
});

export default ChangeProfileScreen;
