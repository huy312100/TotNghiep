import React from 'react';
import { TextInput,StyleSheet } from 'react-native';

export function UsernameInput(props) {
    return(
        <TextInput {...props} style={styles.input} keyboardType="default">
            {props.children}
        </TextInput>
    );
}

const styles = StyleSheet.create({
    input: {
        backgroundColor:'#ccc',
        width:'100%',
        marginVertical:20,
        padding:20,
        borderRadius:10,
    }
})