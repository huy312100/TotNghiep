import React from 'react';
import { Text,StyleSheet } from 'react-native';

export function Heading({children,style,...props}) {
    return(
        <Text testID="Form.Heading" {...props} style={[style,styles.text]}>
            {children}
        </Text>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize:32,
        marginBottom:36
    }
})