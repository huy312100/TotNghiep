import React from "react";
import { View,TextInput, StyleSheet,TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export function PasswordInput({ children, style,...props }) {
    const [show,setShow]=React.useState(true);
    const [visible,setVisible]=React.useState(true);

    return (
      <View style={styles.passInput}>
        <TextInput {...props} secureTextEntry={visible} style={styles.inputText}>
          {children}
      </TextInput>
      <TouchableOpacity style={styles.eyeBtn}  onPress={()=>{
          setVisible(!visible);
          setShow(!show);
      }}>
        <MaterialCommunityIcons name={show===false ? "eye-outline" : "eye-off-outline"} size={16} ></MaterialCommunityIcons>
      </TouchableOpacity>
      </View>
  );
}

const styles = StyleSheet.create({
  passInput: {
    alignItems: "center",
    flexDirection:"row",
  },

  eyeBtn: {
    position: 'absolute',
    right: 0,
    paddingRight:10,
  },

  inputText:{
    backgroundColor: "#ccc",
    width: "100%",
    marginVertical: 20,
    padding: 20,
    borderRadius: 10,
  }
});
