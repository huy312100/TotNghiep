import React from 'react';
import { View,ImageBackground,StyleSheet } from 'react-native';


const Error503Screen = () => {
    return(
        <View style={styles.container}>
            <ImageBackground style={styles.img}
             source={require('../../../assets/503_error.png')}
             resizeMode='contain'/>

        </View>

    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    img: {
        width:'100%',
        height:'100%',
        backgroundColor:'transparent'
    }
});

export default Error503Screen;