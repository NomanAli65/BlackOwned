import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Banks from '../screens/Banks/Banks';
import ComingSoon from '../screens/ComingSoon';
import Dashboard from '../screens/Dashboard';
import FriendList from '../screens/FriendList';
import Network from '../screens/Network';
import News from '../screens/News/News';
import NewsDetail from '../screens/News/NewsDetail';
import OtherProfile from '../screens/Profile/OtherProfile';
import Rating from '../screens/Rating';
import Seminar from '../screens/Seminar/Seminar';
import ServiceDetail from '../screens/Services/ServiceDetail';
import Services from '../screens/Services/Services';
import ServicesFilter from '../screens/Services/ServicesFilter';
import profileSettings from '../screens/ProfileSettings/profileSettings';
import EditProfile from '../screens/EditProfile/EditProfile';
import SubcriptionPlans from '../screens/SubcriptionPlans/SubcriptionPlans';
const MainStackNav = createStackNavigator();

const MainStack = () => {
  return (
    <MainStackNav.Navigator screenOptions={{ headerShown: false }}>
      <MainStackNav.Screen name="Dashboard" component={Dashboard} />
      <MainStackNav.Screen name="Services" component={Services} />
      <MainStackNav.Screen name="ServicesFilter" component={ServicesFilter} />
      <MainStackNav.Screen name="ServiceDetail" component={ServiceDetail} />
      <MainStackNav.Screen name="OtherProfile" component={OtherProfile} />
      <MainStackNav.Screen name="FriendList" component={FriendList} />
      <MainStackNav.Screen name="Rating" component={Rating} />
      <MainStackNav.Screen name="Network" component={Network} />
      <MainStackNav.Screen name="Banks" component={Banks} />
      <MainStackNav.Screen name="Seminar" component={Seminar} />
      <MainStackNav.Screen name="News" component={News} />
      <MainStackNav.Screen name="NewsDetail" component={NewsDetail} />
      <MainStackNav.Screen name="profileSettings" component={profileSettings} />
      <MainStackNav.Screen name="EditProfile" component={EditProfile} />
      <MainStackNav.Screen name="SubcriptionPlans" component={SubcriptionPlans} />


      <MainStackNav.Screen
        name="Development In Process"
        component={ComingSoon}
      />
    </MainStackNav.Navigator>
  );
};

export default MainStack;
