import React from 'react';
import { View,Text,StyleSheet,ImageBackground } from 'react-native';

const ChangeProfileScreen = () =>{
    return (
        <View style={styles.container}>
            <View style={{alignItems: 'center'}}>
            <ImageBackground style={styles.image}>
                <View style={styles.backgroundOpacity}>
                </View>
            </ImageBackground>

            <Text style={styles.labelText} >Họ và tên</Text>
            </View>
          
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        width:100,
        height:100,
        marginTop: 10,
        borderRadius: 60,
        backgroundColor:'#dcdcdc'
    },

    labelText: {
        marginTop:10,
        fontWeight: "bold",
      },
})

export default ChangeProfileScreen;