import React from 'react';
import { View,StyleSheet,Image,Text,TouchableOpacity } from 'react-native';


const EndConfigScreen = ({navigation}) => {
    return(
        <View style={styles.container}>
            <Image style={styles.imageLogo} source={require("../../../assets/confirm.png")}/>

            <Text style={{fontSize:22,fontWeight:'500',color:'black',marginVertical:50}}>
                Thiết lập thành công
            </Text>


            <TouchableOpacity style={{backgroundColor:'#0066FF',width:'80%',alignItems: 'center',justifyContent: 'center',borderRadius:25}}
                onPress={()=>{
                    navigation.navigate('Start up')
                }}
            >
                <View style={{marginVertical:15}}>
                    <Text style={{color:'white',fontWeight:'500'}}>Tham gia ngay</Text>
                </View>
                
            </TouchableOpacity>

        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'center',
        alignItems: 'center',
    },

    imageLogo: {
        width:220,
        height:220,
    },
});

export default EndConfigScreen;