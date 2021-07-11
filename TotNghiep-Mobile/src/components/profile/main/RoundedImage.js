import React,{ useState} from "react";
import { SafeAreaView, View, ImageBackground,StyleSheet } from "react-native";

const RoundedImage =(props)=>{
    const [image, setImage] = useState('https://baodansinh.mediacdn.vn/2019/12/30/va-1577670930380-15776709303872011433781.jpg');

    return(
        <ImageBackground
            {...props}
            style={styles.image}
            imageStyle={styles.imgShape}>
                {props.children}
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    image: {
        width:120,
        height:120,
        marginTop: 10,
    },

    imgShape: {
        borderRadius: 60,
        backgroundColor:'#dcdcdc'
    }
})

export default RoundedImage;