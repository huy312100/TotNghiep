import 'react-native-gesture-handler';
import * as React from 'react';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {ProfileScreen} from '../screens/profile/Profile';
import {NotificationScreen} from '../screens/notifications/Notification';
import MessageScreen from '../screens/message/Message';
import {HomeStackNavigation} from './StackNavigation';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: '#6666FF',
      }}
    >
      <Tab.Screen
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
      <Tab.Screen
        name="Notifications"
        component={NotificationScreen}
        options={{
          tabBarLabel: 'Thông báo',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bell" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Message"
        component={MessageScreen}
        options={{ 
            tabBarLabel:'Tin nhắn',
            tabBarIcon:({ color,size }) => (
                <MaterialCommunityIcons name="message-processing" color={color} size={size} />
            ),
        }}      
      />
 
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Tài khoản',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}


const getTabBarVisibility = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? '';

  if (routeName === 'Calendar') {
      return false;
  }

  return true;
};

export function BottomTabNavigator() {
  return (
      <MyTabs />
  );
}