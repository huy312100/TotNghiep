import React from "react";
import { View, StyleSheet,TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import GmailInput from 'react-native-gmailtype-textinput';


export function PasswordInput(props) {
    const [show,setShow]=React.useState(true);
    const [visible,setVisible]=React.useState(true);

    return (
      <View style={styles.passInput} >
        <View style={styles.input}>
          <GmailInput testID = "Form.PasswordInput" {...props} secureTextEntry={visible} >
         
          </GmailInput>
          
        </View>

        <TouchableOpacity style={styles.eyeBtn}  onPress={()=>{
              setVisible(!visible);
              setShow(!show);
          }}>
          <Ionicons name={show===false ? "eye" : "eye-off"} size={20} color ='gray'></Ionicons>
        </TouchableOpacity>

        
      
      </View>
  );
}

const styles = StyleSheet.create({
  passInput: {
    flexDirection:"row",
    alignItems: "center",
    justifyContent:'center'
  },  

  eyeBtn: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    paddingRight:10,
    paddingBottom:15
  },


  input: {
    width:'100%',
    marginLeft:-16,
    backgroundColor:'white',
  }

});
