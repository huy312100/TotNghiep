import React,{ useState} from "react";
import { View, Text, ScrollView, StyleSheet,TouchableOpacity,ImageBackground } from "react-native";
import{Input,Icon} from "react-native-elements";
import * as ImagePicker from 'expo-image-picker';

import RoundedImage from "../../components/profile/main/RoundedImage";



function ChangeProfileScreen() {
  const [image, setImage] = useState('https://baodansinh.mediacdn.vn/2019/12/30/va-1577670930380-15776709303872011433781.jpg');
  
  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    console.log(pickerResult);
  }
  return (
    <ScrollView>

    <View style={styles.container}>
      <View style={styles.infoView}>
        <TouchableOpacity onPress={openImagePickerAsync}>
          <RoundedImage>
            <View
              style={styles.backgroundOpacity}>
                <Icon name="camera-plus" 
                type="material-community"  
                size={35}
                color="#fff"
                style={styles.iconCamera} />
            </View>
          </RoundedImage>
        </TouchableOpacity>
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
  },

  backgroundOpacity:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  iconCamera:{
    opacity: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  }
});

export default ChangeProfileScreen;
