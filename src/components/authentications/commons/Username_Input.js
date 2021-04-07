import React from 'react';
import { TextInput,StyleSheet } from 'react-native';

export function UsernameInput({children,style,...props}) {
    return(
        <TextInput {...props} style={[style,styles.input]} keyboardType="default">
            {children}
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