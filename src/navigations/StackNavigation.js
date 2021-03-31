import "react-native-gesture-handler";
import * as React from "react";
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/authentications/Login";
import RegisterScreen  from "../screens/authentications/Register";
import {HomeScreen} from "../screens/home/Home";
import CalendarScreen from "../screens/home/calendar/Calendar";
import MessageScreen from "../screens/message/Message";
import {ChatScreen} from "../screens/message/Chat";
import {ProfileScreen} from '../screens/profile/Profile';
import NotificationScreen from '../screens/notifications/Notification';
import MyCoursesInfoScreen from '../screens/home/courses/MyCoursesInfo';
import AllCoursesInfoScreen from '../screens/home/courses/AllCoursesInfo';
import ChangeProfileScreen from '../screens/profile/ChangeProfile';



const Stack = createStackNavigator();
const bottomTab = createBottomTabNavigator();
const topTab= createMaterialTopTabNavigator();


//All Stack navigation of our app
export function AuthenStackNavigation() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Main"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />

      <Stack.Screen
      name="Register"
      component={RegisterScreen}
      options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

function HomeStackNavigation() { 
  return(
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{ title: "Lịch hoạt động" }}
      />
      <Stack.Screen
        name="Course"
        component={CourseInfoTopTab}
        options={{ title: "Thông tin khóa học" }}
      />

    </Stack.Navigator>
  )
}

function MessageStackNavigation() { 
  return(
    <Stack.Navigator initialRouteName="Message">
      <Stack.Screen
        name="Message"
        component={MessageScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={({route}) =>({
          title:route.params.userName,
          headerTitleAlign: 'center',
          headerBackTitle:false,
        })}
      />

    </Stack.Navigator>
  )
}

function ProfileStackNavigation() { 
  return(
    <Stack.Navigator initialRouteName="Profile">
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{headerShown: false }}
      />
      <Stack.Screen
        name="Change Profile"
        component={ChangeProfileScreen}
        options={{ title: "Thay đổi thông tin" }}
      />
    </Stack.Navigator>
  )
}

//Bottom tab 
function MyBottomTabs() {
  return (
    <bottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: '#6666FF',
      }}
    >
      <bottomTab.Screen
        name="Home"
        component={HomeStackNavigation}
        options={({route})=>({
          tabBarLabel: 'Trang chủ',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
          tabBarVisible: getTabBarVisibility(route),
        })}
      />
      <bottomTab.Screen
        name="Notifications"
        component={NotificationScreen}
        options={{
          tabBarLabel: 'Thông báo',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bell" color={color} size={size} />
          ),
          tabBarBadge:4,         
        }}
      />

      <bottomTab.Screen
        name="Message"
        component={MessageStackNavigation}
        options={({route})=>({
          tabBarLabel: 'Tin nhắn',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="message-processing" color={color} size={size} />
          ),
          tabBarVisible: getTabBarVisibility(route),
          tabBarBadge:13,
        })}
      />
 
      <bottomTab.Screen
        name="Profile"
        component={ProfileStackNavigation}
        options={({route})=>({
          tabBarLabel: 'Tài khoản',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
          tabBarVisible: getTabBarVisibility(route),
        })}
      />
    </bottomTab.Navigator>
  );
}

const getTabBarVisibility = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route) ;
  if (routeName === 'Calendar' || routeName === 'Chat' ||routeName === 'Course'|| routeName==='Change Profile') {
      return false;
  }
  return true;
};

function BottomTabNavigator() {
  return (
      <MyBottomTabs />
  );
}

//Top tab of course screen
function CourseInfoTopTab(){
  return (
    <topTab.Navigator initialRouteName="All Course">
      <topTab.Screen 
        name="All Courses" 
        component={AllCoursesInfoScreen} 
        options={{
          tabBarLabel:'Tất cả'
        }}/>
      <topTab.Screen 
        name="My Courses" 
        component={MyCoursesInfoScreen}
        options={{
          tabBarLabel:'Của tôi'
        }}
        />
    </topTab.Navigator>
  )
}




