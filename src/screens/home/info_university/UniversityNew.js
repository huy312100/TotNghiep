import React from "react";
import { StyleSheet, Text, View,ActivityIndicator} from "react-native";

const UniversityNewScreen = () =>{
    return(
        <View style={styles.container}>
            <Text>
                University New
            </Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

export default UniversityNewScreen;