import React,{useEffect} from 'react';
import { View,StyleSheet, Image} from 'react-native';

import { Heading } from '../../components/authentications/common/Heading';

import { useDispatch } from 'react-redux';

import AsyncStorage from '@react-native-async-storage/async-storage';

import * as authActions from '../../../store/actions/Authen';


const StartupScreen = ({navigation}) =>{

    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            tryLogin();
        });
        return()=>{
            unsubscribe();
        };
    },[]);

    const tryLogin = async () =>{
        const token= await AsyncStorage.getItem('tokenValue');
         
        if(token != null || token !== '' || token != undefined){
            var myHeaders = new Headers();
            myHeaders.append("Authorization", `bearer ${token}`);

            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch("https://hcmusemu.herokuapp.com/checktoken", requestOptions)
            .then(response => {
                const statusCode = response.status;
                const dataRes = response.json();
                return Promise.all([statusCode, dataRes]);
            })
            .then(([statusCode, dataRes]) => {
                console.log(statusCode,dataRes);
                if (statusCode === 200) {
                    if(dataRes.message === "Token still"){
                        dispatch(authActions.login(token));
                        console.log(token);
                        navigation.navigate("Main");
                        return;
                    }
                    else{
                        navigation.navigate("Login");
                        return;
                    }
                }
                else{
                    navigation.navigate("Login");
                    return;
                }        
            }).catch(error => console.log('error', error));
        }
        else{
            navigation.navigate("Login");
            return;
        }
    }

    return (
        <View style={styles.container}>
            <Image style={styles.imageLogo} source={require("../../../assets/logo.png")}/>
            <Heading>E M U</Heading>


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

export default StartupScreen;