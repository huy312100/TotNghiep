import React from "react";
import { SafeAreaView, View, ScrollView,StyleSheet } from "react-native";

const RoundedImage =()=>{
    return(
        <View style={styles.image}>
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        width:120,
        height:120,
        borderRadius:60,
        backgroundColor:'#dcdcdc',
        marginTop: 30,
    }
})

export default RoundedImage;