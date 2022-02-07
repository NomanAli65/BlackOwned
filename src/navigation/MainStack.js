import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import ComingSoon from '../screens/ComingSoon';
import Dashboard from '../screens/Dashboard';
import FriendList from '../screens/FriendList';
import Rating from '../screens/Rating';
import Services from '../screens/Services/Services';
import ServicesFilter from '../screens/Services/ServicesFilter';
import ServiceDetail from '../screens/Services/ServiceDetail';
import OtherProfile from '../screens/Profile/OtherProfile';


const MainStackNav = createStackNavigator();

const MainStack = () => {
  return (
    <MainStackNav.Navigator screenOptions={{headerShown: false}}>
      <MainStackNav.Screen name="Dashboard" component={Dashboard} />
      <MainStackNav.Screen name="Services" component={Services} />
      <MainStackNav.Screen name="ServicesFilter" component={ServicesFilter} />
      <MainStackNav.Screen name="ServiceDetail" component={ServiceDetail} />
      <MainStackNav.Screen name="OtherProfile" component={OtherProfile} />
      <MainStackNav.Screen name="FriendList" component={FriendList} />
      <MainStackNav.Screen name="Rating" component={Rating} />
      <MainStackNav.Screen
        name="Development In Process"
        component={ComingSoon}
      />
    </MainStackNav.Navigator>
  );
};

export default MainStack;
