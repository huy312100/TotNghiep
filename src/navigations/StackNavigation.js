import "react-native-gesture-handler";
import * as React from "react";
import {TouchableOpacity} from "react-native"
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/authentications/Login";
import RegisterScreen  from "../screens/authentications/Register";
import HomeScreen from "../screens/home/Home";
import CalendarScreen from "../screens/home/calendar/Calendar";
import MessageScreen from "../screens/message/Message";
import {ChatScreen} from "../screens/message/Chat";
import {ProfileScreen} from '../screens/profile/Profile';
import NotificationScreen from '../screens/notifications/Notification';
import LearnedInfoScreen from '../screens/home/courses/LearnedCoursesInfo';
import LearningInfoScreen from '../screens/home/courses/LearningCoursesInfo';
import ChangeProfileScreen from '../screens/profile/ChangeProfile';
import ConnectAppScreen from '../screens/profile/ConnectApplication';


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
        options={{ 
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{ 
          title: "Lịch hoạt động",
          headerBackTitle:false,
          headerTruncatedBackTitle:false,
       }}
      />
      <Stack.Screen
        name="Course"
        component={CourseInfoTopTab}
        options={{ 
          title: "Thông tin khóa học",
          headerBackTitle:false,
          headerTruncatedBackTitle:false,
        }}
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
          headerTruncatedBackTitle:false,
        })}
      />

    </Stack.Navigator>
  )
}

function ProfileStackNavigation({navigation}) { 
  return(
    <Stack.Navigator initialRouteName="Profile">
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          //headerShown: false
          title: "Tài khoản của tôi",
          headerTitleAlign: 'center',
          headerTintColor:"#FFFFFF",
          headerStyle:{
            backgroundColor:"#33CCFF"
          },
          headerRight:()=>(
            <TouchableOpacity onPress={() => navigation.navigate("Change Profile")}>
              <MaterialCommunityIcons name="account-edit" size={20} color={"#FFFFFF"} />
            </TouchableOpacity>
          ),
          headerRightContainerStyle:{
            paddingRight:10
          },
          headerLeft:()=>{
            return null;
          }
        }}
      />

      <Stack.Screen
        name="Change Profile"
        component={ChangeProfileScreen}
        options={{ 
          title: "Thay đổi thông tin",
          headerTitleAlign: 'center',
          headerBackTitle:false,
          headerTruncatedBackTitle:false,
          headerTintColor:"#FFFFFF",
          headerStyle:{
            backgroundColor:"#33CCFF"
          },
          headerRight:()=>(
            <TouchableOpacity>
              <MaterialCommunityIcons name="check-bold" size={20} color={"#FFFFFF"} />
            </TouchableOpacity>
          ),
          headerRightContainerStyle:{
            paddingRight:10
          }
        }}
      />

      <Stack.Screen
        name="Connect application"
        component={ConnectAppScreen}
        options={{ 
          title: "Kết nối ứng dụng",
          headerTitleAlign: 'center',
          headerBackTitle:false,
          headerTruncatedBackTitle:false,
          headerTintColor:"#FFFFFF",
          headerStyle:{
            backgroundColor:"#33CCFF"
          },
          // headerRight:()=>(
          //   <TouchableOpacity>
          //     <MaterialCommunityIcons name="check-bold" size={20} color={"#FFFFFF"} />
          //   </TouchableOpacity>
          // ),
          // headerRightContainerStyle:{
          //   paddingRight:10
          // }
        }}
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
  if (routeName === 'Calendar' || routeName === 'Chat' ||routeName === 'Course'|| routeName==='Change Profile'||routeName=='Connect application') {
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
    <topTab.Navigator initialRouteName="Learning">
      <topTab.Screen 
        name="Learning" 
        component={LearningInfoScreen} 
        options={{
          tabBarLabel:'Đang học'
        }}/>
      <topTab.Screen 
        name="Learned" 
        component={LearnedInfoScreen}
        options={{
          tabBarLabel:'Đã học'
        }}
        />
    </topTab.Navigator>
  )
}




