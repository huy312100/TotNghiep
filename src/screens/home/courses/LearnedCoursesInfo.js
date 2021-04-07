import React from 'react'
import { View, Text,TouchableOpacity,StyleSheet} from 'react-native';

function LearnedInfoScreen(){
    return (
        <View style={styles.container}>
            <Text>
                Đã học
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default LearnedInfoScreen;