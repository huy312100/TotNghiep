import React from 'react';
import { TextInput,StyleSheet } from 'react-native';
import {TextInputLayout} from 'rn-textinputlayout';

export function UsernameInput(props) {
    return(
        <TextInputLayout style={styles.inputLayout}>
        <TextInput testID="Form.UsernameInput" {...props} style={styles.input} keyboardType="default">
            {props.children}
        </TextInput>
        </TextInputLayout>
    );
}

const styles = StyleSheet.create({
    input: {
        width:'100%',
        borderRadius:10,
        fontSize: 16,
        height: 40
    },
    inputLayout: {
        marginTop: 0,
        marginHorizontal: 20
    }
})