import "react-native-gesture-handler";
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerActions,getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';


import DrawerContentScreen from '../screens/main/DrawerContent';
import LoginScreen from "../screens/authentication/Login";
import HomeScreen from "../screens/main/Home";
import DetailCalendarScreen from "../screens/main/calendar/DetailCalendar";
import NotificationScreen from "../screens/main/notification/Notification";
import UniversityNewScreen from "../screens/main/new/UniversityNew";
import FacultyNewScreen from "../screens/main/new/FacultyNew";
import InfoUniversityScreen from "../screens/main/InfoUniversity";
import ChangeProfileScreen from "../screens/main/profile/ChangeProfile";


const Stack = createStackNavigator();
const topTab= createMaterialTopTabNavigator();
const bottomTab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

export const MainStackNavigation =() => {
    return(
        <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="Main" component={DrawerNavigation} 
                
                options={{ 
                    // title:'Trang chủ',
                    // headerLeft:()=>(
                    //     <Ionicons name="ios-menu" size={24} color="white"/>
                    // )
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    )
};

function DrawerNavigation() {
    return(
        <Drawer.Navigator drawerContent={props => <DrawerContentScreen {...props} />}>
            <Drawer.Screen name="Drawer" component={BottomTabApp} />
        </Drawer.Navigator>
    )
};

function HomeStackNavigation({navigation}){
    return(
        <Stack.Navigator initialRouteName="Home" 
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#FF9966',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold'
                }
            }}>

            <Stack.Screen name="Home" component={HomeScreen} 
                options={{ 
                    title:'Trang chủ',
                    headerLeft:()=>(
                        <TouchableOpacity onPress={()=>{ navigation.dispatch(DrawerActions.openDrawer())}}>
                            <Ionicons style={{marginLeft:5}} name="ios-menu" size={26} color="white"/>

                        </TouchableOpacity>
                    )
                    //headerShown: false
            }}/>

            <Stack.Screen name="Detail Calendar" component={DetailCalendarScreen}
                options ={{
                    title:'Lịch chi tiết',
                    headerTruncatedBackTitle:false,
                    headerBackTitleVisible:false,
                }}
            />

            <Stack.Screen name="Info University" component={InfoUniversityScreen}
                options ={{
                    title:'Thông tin trường',
                    headerTruncatedBackTitle:false,
                    headerBackTitleVisible:false,
                }}
            />

            <Stack.Screen name="Change Profile" component={ChangeProfileScreen}
                options ={{
                    title:'Cập nhật tài khoản',
                    headerTruncatedBackTitle:false,
                    headerBackTitleVisible:false,
                }}
            />

        </Stack.Navigator>
    )
}

function BottomTabApp() {
    return (
        <bottomTab.Navigator
            initialRouteName="Calendar"
            tabBarOptions={{
                activeTintColor: '#FF9966',
            }}

            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;
      
                  if (route.name === 'Home Stack') {
                    iconName = focused ? 'home-sharp' : 'home-outline';
                  } 
                  else if (route.name === 'Notification') {
                    iconName = focused ? 'notifications-sharp' : 'notifications-outline';
                  }
                  else if (route.name === 'New Stack') {
                    iconName = focused ? 'newspaper-sharp' : 'newspaper-outline';
                  }
      
                  // You can return any component that you like here!
                  return <Ionicons name={iconName} size={size} color={color} />;
                },
              })}>
                
          <bottomTab.Screen name="Home Stack" component={HomeStackNavigation} 
            options ={({route})=>({
                headerShown:false,
                tabBarLabel:"Trang chủ",
                // tabBarIcon:({color,size})=>(
                //     <Ionicons name="ios-home-outline" size={size} color={color} />
                // )
                tabBarVisible:getTabBarVisibility(route)
            })}
          />
          <bottomTab.Screen name="Notification" component={NotificationScreen} 
            options ={{
                tabBarLabel:"Thông báo"
            }}
          />
          <bottomTab.Screen name="New Stack" component={NewStackNavigtion} 
            options ={{
                tabBarLabel:"Tin tức",
                
            }}
          />
        </bottomTab.Navigator>
    );
}

//handler
const getTabBarVisibility = (route) => {

    const routeName = getFocusedRouteNameFromRoute(route) ;
  
    const arrHideBotTab=["Detail Calendar","Info University","Change Profile"];
  
    for (var i = 0; i < arrHideBotTab.length; i++) {
      if (routeName === arrHideBotTab[i]) {
        return false;
      }
    }
    return true;
};

function NewStackNavigtion({navigation}) { 
    return(
      <Stack.Navigator initialRouteName="New">
        <Stack.Screen
          name="New"
          component={NewTopTab}
          options={{
            //headerShown: false
            title: "Tin tức",
            headerTitleAlign: 'center',
            headerTintColor:"#FFFFFF",
            headerStyle:{
              backgroundColor:"#FF9966"
            },
            headerLeft:()=>(
              <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                <Ionicons style={{marginLeft:5}} name="ios-menu" size={26} color="white"/>
              </TouchableOpacity>
            ),
          }}
        />
      </Stack.Navigator>
    )
  }

//Top tab of university info screen
function NewTopTab(){
    return (
    <topTab.Navigator initialRouteName="University New" 
      tabBarOptions={{
        activeTintColor: 'blue',
        labelStyle: { fontSize: 11 },
        }}>
    
        <topTab.Screen 
          name="University New" 
          component={UniversityNewScreen}
          options={{
            tabBarLabel:'Trường'
          }}
          />
  
        <topTab.Screen 
          name="Faculty New" 
          component={FacultyNewScreen}
          options={{
            tabBarLabel:'Khoa'
          }}
        />
    </topTab.Navigator>
  )
}