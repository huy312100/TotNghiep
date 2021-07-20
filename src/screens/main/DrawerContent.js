import React from 'react'
import { View,Text,StyleSheet,TouchableOpacity,TextInput } from 'react-native';
import {useDispatch} from "react-redux";


import { DrawerContentScrollView,DrawerItem } from '@react-navigation/drawer';
import {Drawer,Avatar} from 'react-native-paper';

import { MaterialIcons,FontAwesome,Entypo } from '@expo/vector-icons';

import * as authActions from '../../../store/actions/Authen'

const DrawerContentScreen =({navigation}) =>{

    const dispatch =useDispatch();

    const SignOut =() =>{
        dispatch(authActions.logout());
        navigation.navigate('Login');
    }

    return(
        <View style={styles.container}>
            <DrawerContentScrollView>
            <View style={styles.container}>
                    <View style={[styles.userInfoSection]}>
                        <TouchableOpacity style={{flexDirection:'row',marginTop: 10,marginRight:10}}
                            onPress={() => {
                                navigation.navigate('Change Profile')
                            }}
                        >
                            <Avatar.Image 
                                source={
                                    // uri: 'https://api.adorable.io/avatars/50/abott@adorable.png'
                                    require("../../../assets/user.png")
                                }
                                size={50}
                            />
                            <View style={{marginLeft:15, flexDirection:'column'}}>
                                <Text numberOfLines={1} style={styles.title}>Nguyễn Văn A</Text>
                                <Text numberOfLines={1} style={styles.caption}>nndhparent@gmail.com</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem style={styles.drawerItem}
                            icon={({color, size}) => (
                                <FontAwesome name="calendar" size={size} color='grey' />
                            )}
                            label="Lịch chi tiết"
                            onPress={() => {navigation.navigate('Detail Calendar')}}
                        />

                        <DrawerItem 
                            icon={({color, size}) => (
                                <Entypo name="info" size={size} color="grey" /> 
                           )}
                            label="Thông tin trường"
                            onPress={() => {navigation.navigate('Info University')}}
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
                    onPress={() => {SignOut();}}
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