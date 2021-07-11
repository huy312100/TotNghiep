import React from "react";
import { View,TextInput, StyleSheet,TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {TextInputLayout} from 'rn-textinputlayout';

export function PasswordInput(props) {
    const [show,setShow]=React.useState(true);
    const [visible,setVisible]=React.useState(true);

    return (
      <View style = {styles.passInput}>
        <TextInputLayout style={styles.inputLayout}>
          <TextInput testID = "Form.PasswordInput" {...props} secureTextEntry={visible} style={styles.inputText}>
            {props.children}
          </TextInput>
        </TextInputLayout>
        <TouchableOpacity style={styles.eyeBtn}  onPress={()=>{
            setVisible(!visible);
            setShow(!show);
          }}>
            <MaterialCommunityIcons name={show===false ? "eye-outline" : "eye-off-outline"} size={20} ></MaterialCommunityIcons>
          </TouchableOpacity>
      </View>
  );
}

const styles = StyleSheet.create({
  passInput: {
    alignItems: "center", 
    flexDirection:"row",
    marginTop: 20
  },

  eyeBtn: {
    position: 'absolute',
    right: 0,
    paddingTop: 20,
    paddingRight:10,
  },

  inputText:{
    width:'100%',
    borderRadius:10,
    fontSize: 16,
    height: 40
  },

  inputLayout: {
    width: "90%",
    marginHorizontal: 20
  }
});
