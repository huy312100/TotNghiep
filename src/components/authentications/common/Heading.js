import React from 'react';
import { Dimensions,Text,StyleSheet } from 'react-native';

export function Heading({children,style,...props}) {
    return(
        <Text testID="Form.Heading" {...props} style={[style,styles.text]}>
            {children}
            {console.log(Dimensions.get("window").height )}
        </Text>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize:Dimensions.get("window").width * 0.1,
        marginBottom:Dimensions.get("window").height * 0.01,
        marginLeft:5,
        color:'blue',
        fontWeight:'bold'
    }
})