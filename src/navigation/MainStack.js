import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import ComingSoon from '../screens/ComingSoon';
import Dashboard from '../screens/Dashboard';
import Services from '../screens/Services/Services';
import ServiceDetail from '../screens/Services/ServiceDetail';


const MainStackNav = createStackNavigator();

const MainStack = () => {
  return (
    <MainStackNav.Navigator screenOptions={{headerShown: false}}>
      <MainStackNav.Screen name="Dashboard" component={Dashboard} />
      <MainStackNav.Screen name="Services" component={Services} />
      <MainStackNav.Screen name="ServiceDetail" component={ServiceDetail} />
      <MainStackNav.Screen
        name="Development In Process"
        component={ComingSoon}
      />
    </MainStackNav.Navigator>
  );
};

export default MainStack;
