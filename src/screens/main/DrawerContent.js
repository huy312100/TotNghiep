import React,{useState,useEffect,useRef} from 'react'
import { View,Text,StyleSheet,TouchableOpacity,TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch,useSelector} from "react-redux";

import { DrawerContentScrollView,DrawerItem,useIsDrawerOpen } from '@react-navigation/drawer';
import {Drawer,Avatar} from 'react-native-paper';

import { MaterialIcons,FontAwesome,Entypo } from '@expo/vector-icons';

import * as profileActions from '../../../store/actions/Profile';
import * as authActions from '../../../store/actions/Authen';

const DrawerContentScreen =({navigation}) =>{
    const token = useSelector((state) => state.authen.token);
    const profile = useSelector((state) => state.profile.profile);
    const isDrawerOpen = useIsDrawerOpen();

    const dispatch =useDispatch();

    const unmounted = useRef(false);


    useEffect(()=>{
        const unsubscribe = navigation.addListener('focus', () => {
            getProfile();
        });
        console.log(profile[0].HoTen);
        return()=>{
            unmounted.current = true;
            unsubscribe();
        }
    },[]);

    const SignOut =() =>{
        dispatch(authActions.logout());
        navigation.reset({
            routes: [{ name: "Login" }]
        });
    };

    const getProfile = () =>{
        //setLoading(true);
        //console.log(token);
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `bearer ${token}`);
    
        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };
    
        fetch("https://hcmusemu.herokuapp.com/profile/view/parent",requestOptions)
          .then((response) => response.json())
          .then((json) => {
            console.log('aaaaaaa');
    
            dispatch(profileActions.getProfile(json));            
          }).catch((err) => console.log(err, "error"));
    };

    return(
        <View style={styles.container}>
            
            <DrawerContentScrollView>
            <View style={styles.container}>
                    {/* <Text>{dataProfile[0].HoTen}</Text> */}
                    {profile != undefined && <View style={[styles.userInfoSection]}>
                        <TouchableOpacity style={{flexDirection:'row',marginTop: 10,marginRight:10}}
                            onPress={() => {
                                navigation.navigate('Change Profile')
                            }}>
                            <Avatar.Image 
                                source={profile[0].AnhSV !== '' && profile[0].AnhSV != null ? {uri: profile[0].AnhSV} : require("../../../assets/user.png")}
                                size={50}
                            />
                            <View style={{marginLeft:15, flexDirection:'column'}}>
                                <Text numberOfLines={1} style={styles.title}>{profile[0].HoTen}</Text>
                                <Text numberOfLines={1} style={styles.caption}>{profile[0].Email}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>}
                </View>
                <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem style={styles.drawerItem}
                            icon={({color, size}) => (
                                <FontAwesome name="calendar" size={size} color='grey' />
                            )}
                            label="Lịch chi tiết"
                            onPress={() => {navigation.navigate('Detail Calendar')}}
                        />

                        <DrawerItem style={styles.drawerItem}
                            icon={({color, size}) => (
                                <Entypo name="info" size={size} color="grey" /> 
                           )}
                            label="Thông tin trường"
                            onPress={() => {navigation.navigate('Info University')}}
                        />

                        <DrawerItem 
                            icon={({color, size}) => (
                                <Entypo name="open-book" size={size} color="grey" />
                           )}
                            label="Môn học của sinh viên"
                            onPress={() => {navigation.navigate('Course')}}
                        />
                        
                    </Drawer.Section>
            </DrawerContentScrollView>

            

            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem 
                    icon={({color, size}) => (
                        <MaterialIcons name="exit-to-app" size={size} color='red' />
                    )}
                    label="Đăng xuất"
                    labelStyle={{color:'red'}}
                    onPress={() => {
                        AsyncStorage.removeItem('tokenValue').then(async () => {
                            SignOut();
                        })
                    }}
                />
            </Drawer.Section>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1,
    },

    userInfoSection: {
        paddingLeft: 20,
    },

    title: {
        fontSize: 14,
        marginTop: 3,
        fontWeight: 'bold',
        marginBottom:5
    },  

    caption: {
        fontSize: 12,
        color:'#cccccc'
    },
    
    drawerSection: {
        marginTop: 15,
    },

    drawerItem: {
        borderBottomColor: '#f4f4f4',
        borderBottomWidth: 1,
    }
})

export default DrawerContentScreen;