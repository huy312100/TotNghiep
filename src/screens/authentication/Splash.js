import React,{useEffect} from 'react';
import { View,StyleSheet,Image} from 'react-native';

import { useDispatch } from 'react-redux';

import AsyncStorage from '@react-native-async-storage/async-storage';

import * as authActions from '../../../store/actions/Authen';
import * as profileActions from '../../../store/actions/Profile';

const SplashScreen = ({navigation}) =>{

    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            tryLogin();
        });
        return()=>{
            unsubscribe();
        };
    },[]);

    const getProfile = async (token) =>{
        //setLoading(true);
        //console.log(token);    
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `bearer ${token}`);
      
        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };
      
        await fetch("https://hcmusemu.herokuapp.com/profile/view/parent",requestOptions)
        .then((response) => {
          const statusCode = response.status;
          const dataRes = response.json();
          return Promise.all([statusCode, dataRes]);
        }).then(([statusCode, dataRes]) => {  
          if(statusCode === 200){
              dispatch(profileActions.getProfile(dataRes));
          }
          else{
            console.log("loi");
          }
                    
        }).catch((err) => console.log(err, "error"));
      };

    const tryLogin = async () =>{
        const token = await AsyncStorage.getItem('tokenValue');
         
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
            .then(async([statusCode, dataRes]) => {
                console.log(statusCode,dataRes);
                if (statusCode === 200) {
                    if(dataRes.message === "Token still"){
                        await getProfile(token);
                        dispatch(authActions.login(token));
                        console.log(token);
                        navigation.reset({
                            routes: [{ name: "Main" }]
                        });
                        return;
                    }
                    else{
                        navigation.reset({
                            routes: [{ name: "Login" }]
                        });
                        return;
                    }
                }
                else{
                    navigation.reset({
                        routes: [{ name: "Login" }]
                    });
                    return;
                }        
            }).catch(error => console.log('error', error));
        }
        else{
            navigation.reset({
                routes: [{ name: "Login" }]
            });
            return;
        }
    }

    return (
        <View style={styles.container}>
            <Image style={styles.imageLogo} source={require("../../../assets/logo.png")}/>

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
        width:225,
        height:225,
    },
});

export default SplashScreen;