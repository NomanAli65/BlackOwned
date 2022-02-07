import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import ComingSoon from '../screens/ComingSoon';
import Dashboard from '../screens/Dashboard';
import Services from '../screens/Services/Services';
import ServiceDetail from '../screens/Services/ServiceDetail';
import Network from '../screens/Network';
import Banks from '../screens/Banks/Banks';
import Seminar from '../screens/Seminar/Seminar';
import News from '../screens/News/News';
import NewsDetail from '../screens/News/NewsDetail';
const MainStackNav = createStackNavigator();

const MainStack = () => {
  return (
    <MainStackNav.Navigator screenOptions={{ headerShown: false }}>
      <MainStackNav.Screen name="Dashboard" component={Dashboard} />
      <MainStackNav.Screen name="Services" component={Services} />
      <MainStackNav.Screen name="ServiceDetail" component={ServiceDetail} />
      <MainStackNav.Screen name="Network" component={Network} />
      <MainStackNav.Screen name="Banks" component={Banks} />
      <MainStackNav.Screen name="Seminar" component={Seminar} />
      <MainStackNav.Screen name="News" component={News} />
      <MainStackNav.Screen name="NewsDetail" component={NewsDetail} />
      <MainStackNav.Screen
        name="Development In Process"
        component={ComingSoon}
      />
    </MainStackNav.Navigator>
  );
};

export default MainStack;
