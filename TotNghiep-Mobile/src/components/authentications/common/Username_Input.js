import React from 'react';
import { View,StyleSheet } from 'react-native';
import GmailInput from 'react-native-gmailtype-textinput';


export function UsernameInput(props) {
    return(
        <View style={styles.input}>
            <GmailInput testID="Form.UsernameInput" {...props} keyboardType="email-address"/>
        </View> 
    );
}

const styles = StyleSheet.create({
    input: {
        width:'100%',
        marginLeft:-16,
        backgroundColor:'white',
    }
})