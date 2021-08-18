import React from "react";
import { StyleSheet, Text, View,ActivityIndicator} from "react-native";

const LoadingScreen =() =>{
    return(
        <View style={styles.loading}>
            <ActivityIndicator size="large" color="#EEEEEE" />
            <Text style={styles.txtIndicator}>Đang xử lí ...</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(52, 52, 52, 0.5)'
    },

    txtIndicator: {
        fontSize:15,
        fontWeight: "bold",
        color:"#EEEEEE"
    }
});

export default LoadingScreen;