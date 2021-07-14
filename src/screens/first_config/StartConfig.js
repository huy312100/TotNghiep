import React from 'react';
import { View,StyleSheet,Image,Text,TouchableOpacity } from 'react-native';

import { Heading } from '../../components/authentications/common/Heading';

const StartConfigScreen = ({navigation}) => {
    return(
        <View style={styles.container}>
            <Image style={styles.imageLogo} source={require("../../../assets/logo.png")}/>
            <Heading>E M U</Heading>

            <Text style={{fontSize:22,fontWeight:'500',color:'black'}}>
                Cảm ơn bạn đã tham gia
            </Text>

            <Text style={{fontSize:12,marginHorizontal:40,marginTop:20, marginBottom:100,textAlign:'center'}}>
                Cùng bắt đầu với một vài thiết lập nho nhỏ nhé để trải nghiệm ứng dụng một cách tốt nhất nhé
            </Text>

            <TouchableOpacity style={{backgroundColor:'#0066FF',width:'80%',alignItems: 'center',justifyContent: 'center',borderRadius:25}}
                onPress={()=>{
                    navigation.navigate('Moodle Config')
                }}
            >
                <View style={{marginVertical:15}}>
                    <Text style={{color:'white',fontWeight:'500'}}>Bắt đầu ngay</Text>
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
        width:175,
        height:125,
    },
});

export default StartConfigScreen;