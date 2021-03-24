import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export function NotificationScreen(){
    return(
        <View style={styles.container}>
            <Text>Notification</Text>
        </View>   
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})