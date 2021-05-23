import "react-native-gesture-handler";
import * as React from "react";
import {TouchableOpacity,Text} from "react-native"
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createStackNavigator,HeaderBackButton } from "@react-navigation/stack";

import { useSelector,useDispatch } from "react-redux";
import * as calendarActions from '../../store/actions/Calendar';

import LoginScreen from "../screens/authentications/Login";
import RegisterScreen  from "../screens/authentications/Register";
import HomeScreen from "../screens/home/Home";
import CalendarScreen from "../screens/home/calendar/Calendar";
import MessageScreen from "../screens/message/Message";
import {ChatScreen} from "../screens/message/Chat";
import {ProfileScreen} from '../screens/profile/Profile';
import NotificationScreen from '../screens/notifications/Notification';
import AllCourseInfoScreen from '../screens/home/courses/AllCourse';
import CurrentCourseInfoScreen from '../screens/home/courses/CurrentCourse';
import ChangeProfileScreen from '../screens/profile/ChangeProfile';
import ConnectAppScreen from '../screens/profile/ConnectApplication';
import ContentCourseInfoScreen from '../screens/home/courses/DetailContentCourse';
import WebCustomedScreen from '../screens/profile/TypeWebCustomed';
import ChangePasswordScreen from '../screens/authentications/ChangePassword';
import AddToCalendarScreen from '../screens/home/calendar/AddToCalendar';


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

function HomeStackNavigation({navigation}) { 
  const statusTitle = useSelector((state) => state.calendar.statusTitle);
  const dispatch = useDispatch();

  // dispatch(calendarActions.getStatusOfTitle(true));

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
          headerRight:()=>(
            <TouchableOpacity onPress={() =>navigation.navigate('Add Event')}>
              <MaterialCommunityIcons name="plus" size={30} color={"blue"} />
            </TouchableOpacity>
          ),
          headerRightContainerStyle:{
            paddingRight:10
          },
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

      <Stack.Screen 
        name="Content Course"
        component={ContentCourseInfoScreen}
        options={({route}) =>({
          title:route.params.name,
          headerTitleAlign: 'center',
          headerBackTitle:false,
          headerTruncatedBackTitle:false,
        })}
      />

      <Stack.Screen
        name="Add Event"
        component={AddToCalendarScreen}
        options={{ 
          title: 'Sự kiện mới',
          headerTitleStyle: {
            color: 'black'
          },
          headerRight:()=>(
              <TouchableOpacity disabled={statusTitle}>
                <Text style={{fontSize:17,color:statusTitle ? 'silver' : 'blue'}}>
                  Thêm
                </Text>
              </TouchableOpacity>
          ),
          headerLeft:()=>(
            <HeaderBackButton 
            label='Huỷ'
            tintColor='red'
            onPress={()=>{
              dispatch(calendarActions.getStatusOfTitle(true));
              navigation.navigate("Calendar")
            }}/>
          ),
          headerRightContainerStyle:{
            paddingRight:10
          },
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
              <MaterialCommunityIcons name="account-edit" size={22} color={"#FFFFFF"} />
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
          // headerRight:()=>(
          //   <TouchableOpacity>
          //     <MaterialCommunityIcons name="check-bold" size={23} color={"#FFFFFF"} />
          //   </TouchableOpacity>
          // ),
          // headerRightContainerStyle:{
          //   paddingRight:10
          // }
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
          headerRight:()=>(
            <TouchableOpacity onPress={() => navigation.navigate("Web Customed")}>
              <MaterialCommunityIcons name="playlist-check" size={28} color={"#FFFFFF"} />
            </TouchableOpacity>
          ),
          headerRightContainerStyle:{
            paddingRight:10
          }
        }}
      />

      <Stack.Screen
        name="Web Customed"
        component={WebCustomedScreen}
        options={{ 
          title: "Ứng dụng đã được kết nối",
          headerTitleAlign: 'center',
          headerBackTitle:false,
          headerTruncatedBackTitle:false,
          headerTintColor:"#FFFFFF",
          headerStyle:{
            backgroundColor:"#33CCFF"
          },
          // headerRight:()=>(
          //   <TouchableOpacity onPress={navigation.navigate("")}>
          //     <MaterialCommunityIcons name="playlist-check" size={28} color={"#FFFFFF"} />
          //   </TouchableOpacity>
          // ),
          // headerRightContainerStyle:{
          //   paddingRight:10
          // }
        }}
      />

      <Stack.Screen
        name="Change Password"
        component={ChangePasswordScreen}
        options={{ 
          title: "Thay đổi mật khẩu",
          headerTitleAlign: 'center',
          headerBackTitle:false,
          headerTruncatedBackTitle:false,
          headerTintColor:"#FFFFFF",
          headerStyle:{
            backgroundColor:"#33CCFF"
          },
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

  const arrHideBotTab=["Calendar","Chat","Course","Change Profile","Connect application","Content Course","Web Customed","Change Password","Add Event"];

  for (var i = 0; i < arrHideBotTab.length; i++) {
    if (routeName === arrHideBotTab[i]) {
      return false;
    }
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
        name="Current Course" 
        component={CurrentCourseInfoScreen} 
        options={{
          tabBarLabel:'Đang học'
        }}/>
      <topTab.Screen 
        name="All Course" 
        component={AllCourseInfoScreen}
        options={{
          tabBarLabel:'Tất cả môn học'
        }}
        />
    </topTab.Navigator>
  )
}




