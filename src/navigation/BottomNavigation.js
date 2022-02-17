import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'native-base';
import React from 'react';
import { Image, View } from 'react-native';
import ComingSoon from '../screens/ComingSoon';
import Services from '../screens/Services/Services';
import Dashboard from '../screens/Dashboard';
import Settings from '../screens/Settings';
import MainStack from './MainStack';
import Advertise from '../screens/Advertise/Advertise';
import ChatList from '../screens/Chat/ChatList';
import { connect } from 'react-redux';
import AddServices from '../screens/Services/AddServices';

const BottomTabsNav = createBottomTabNavigator();

const BottomNavIconComp = ({ focused, size, icon }) => (
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
      style={{ width: size, height: size, tintColor: focused ? '#fff' : '#000' }}
      source={icon}
    />
  </View>
);

function BottomNavigation(props) {
  console.warn("props:", props);
  return (
    <BottomTabsNav.Navigator
      initialRouteName={Dashboard}
      screenOptions={{
        headerShown: false,
        tabBarStyle: { height: 65, paddingBottom: 5 },
        tabBarLabelStyle: {
          fontWeight: 'bold',
          color: '#000',
          marginTop: -5,
        },
      }}>
      <BottomTabsNav.Screen
        name="Home"
        component={Dashboard}
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
        component={props?.user?.user?.role == 'provider' ? AddServices : Services}
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
        component={ChatList}
        name="ChatList"
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
        component={Advertise}
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

const mapStateToProps = state => ({
  user: state.AuthReducer.user,
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(BottomNavigation);
