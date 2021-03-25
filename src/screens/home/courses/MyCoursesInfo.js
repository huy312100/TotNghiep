import React from 'react'
import { View, Text,TouchableOpacity,StyleSheet} from 'react-native';

function MyCoursesInfoScreen(){
    return (
        <View style={styles.container}>
            <Text>
                My Courses
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

export default MyCoursesInfoScreen;