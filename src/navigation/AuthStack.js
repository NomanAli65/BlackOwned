import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import ComingSoon from '../screens/ComingSoon';
import Login from '../screens/Login';
import Signup from '../screens/Signup';

const AuthStackNav = createStackNavigator();

const AuthStack = () => {
  return (
    <AuthStackNav.Navigator screenOptions={{headerShown: false}}>
      <AuthStackNav.Screen name="Login" component={Login} />
      <AuthStackNav.Screen name="Signup" component={Signup} />
      <AuthStackNav.Screen
        name="Development In Process"
        component={ComingSoon}
      />
    </AuthStackNav.Navigator>
  );
};

export default AuthStack;
