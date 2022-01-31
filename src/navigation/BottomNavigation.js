import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text} from 'native-base';
import React from 'react';
import {Image, View} from 'react-native';
import ComingSoon from '../screens/ComingSoon';
import Dashboard from '../screens/Dashboard';
import Settings from '../screens/Settings';
import MainStack from './MainStack';

const BottomTabsNav = createBottomTabNavigator();

const BottomNavIconComp = ({focused, size, icon}) => (
  <View
    style={{
      height: size + 12,
      width: size + 12,
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: focused ? '#1872ea' : '#fff',
    }}>
    <Image
      style={{width: size, height: size, tintColor: focused ? '#fff' : '#000'}}
      source={icon}
    />
  </View>
);

export default function BottomNavigation() {
  return (
    <BottomTabsNav.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {height: 65, paddingBottom: 5},
        tabBarLabelStyle: {
          fontWeight: 'bold',
          color: '#000',
          marginTop: -5,
        },
      }}>
      <BottomTabsNav.Screen
        name="Home"
        component={MainStack}
        options={{
          tabBarIcon: props => (
            <BottomNavIconComp
              {...props}
              icon={require('../assets/home.png')}
            />
          ),
          tabBarLabel: props => (
            <Text
              fontSize="11"
              fontWeight="medium"
              color={props.focused ? 'primary.100' : '#000'}>
              Home
            </Text>
          ),
        }}
      />
      <BottomTabsNav.Screen
        component={ComingSoon}
        name="Services"
        options={{
          tabBarIcon: props => (
            <BottomNavIconComp
              {...props}
              icon={require('../assets/services.png')}
            />
          ),
          tabBarLabel: props => (
            <Text
              fontSize="11"
              fontWeight="medium"
              color={props.focused ? 'primary.100' : '#000'}>
              Services
            </Text>
          ),
        }}
      />
      <BottomTabsNav.Screen
        component={ComingSoon}
        name="Chat"
        options={{
          tabBarIcon: props => (
            <BottomNavIconComp
              {...props}
              icon={require('../assets/chat.png')}
            />
          ),
          tabBarLabel: props => (
            <Text
              fontSize="11"
              fontWeight="medium"
              color={props.focused ? 'primary.100' : '#000'}>
              Chat
            </Text>
          ),
        }}
      />
      <BottomTabsNav.Screen
        component={ComingSoon}
        name="Advertise"
        options={{
          tabBarIcon: props => (
            <BottomNavIconComp
              {...props}
              icon={require('../assets/advertise.png')}
            />
          ),
          tabBarLabel: props => (
            <Text
              fontSize="11"
              fontWeight="medium"
              color={props.focused ? 'primary.100' : '#000'}>
              Advertise
            </Text>
          ),
        }}
      />
      <BottomTabsNav.Screen
        component={Settings}
        name="Settings"
        options={{
          tabBarIcon: props => (
            <BottomNavIconComp
              {...props}
              icon={require('../assets/settings.png')}
            />
          ),
          tabBarLabel: props => (
            <Text
              fontSize="11"
              fontWeight="medium"
              color={props.focused ? 'primary.100' : '#000'}>
              Settings
            </Text>
          ),
        }}
      />
    </BottomTabsNav.Navigator>
  );
}
