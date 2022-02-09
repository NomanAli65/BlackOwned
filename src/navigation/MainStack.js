import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Banks from '../screens/Banks/Banks';
import ComingSoon from '../screens/ComingSoon';
import Dashboard from '../screens/Dashboard';
import EditProfile from '../screens/EditProfile/EditProfile';
import FriendList from '../screens/FriendList';
import Jobs from '../screens/Jobs/Jobs';
import AddProduct from '../screens/Marketplace/AddProduct';
import Marketplace from '../screens/Marketplace/Marketplace';
import ProductDetails from '../screens/Marketplace/ProductDetails';
import Network from '../screens/Network';
import News from '../screens/News/News';
import NewsDetail from '../screens/News/NewsDetail';
import Notification from '../screens/Notification/Notification';
import OtherProfile from '../screens/Profile/OtherProfile';
import profileSettings from '../screens/ProfileSettings/profileSettings';
import Rating from '../screens/Rating';
import Seminar from '../screens/Seminar/Seminar';
import ServiceDetail from '../screens/Services/ServiceDetail';
import Services from '../screens/Services/Services';
import AddServices from '../screens/Services/AddServices';
import ServicesFilter from '../screens/Services/ServicesFilter';
import SubcriptionPlans from '../screens/SubcriptionPlans/SubcriptionPlans';
import PrivacyPolicy from '../screens/PrivacyPolicy/PrivacyPolicy';
import TermsAndConditions from '../screens/TermsAndConditions/TermsAndConditions';
import ContactUs from '../screens/ContactUs/ContactUs';
import Advertise from '../screens/Advertise/Advertise';
import Payment from '../screens/Payment/Payment';
import AddCard from '../screens/Payment/AddCard';


const MainStackNav = createStackNavigator();

const MainStack = () => {
  return (
    <MainStackNav.Navigator screenOptions={{ headerShown: false }}>
      <MainStackNav.Screen name="Dashboard" component={Dashboard} />
      <MainStackNav.Screen name="Services" component={Services} />
      <MainStackNav.Screen name="AddServices" component={AddServices} />
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
      <MainStackNav.Screen name="Marketplace" component={Marketplace} />
      <MainStackNav.Screen name="ProductDetails" component={ProductDetails} />
      <MainStackNav.Screen name="AddProduct" component={AddProduct} />
      <MainStackNav.Screen name="Jobs" component={Jobs} />
      <MainStackNav.Screen name="Notification" component={Notification} />
      <MainStackNav.Screen name="profileSettings" component={profileSettings} />
      <MainStackNav.Screen name="EditProfile" component={EditProfile} />
      <MainStackNav.Screen name="SubcriptionPlans" component={SubcriptionPlans} />
      <MainStackNav.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <MainStackNav.Screen name="TermsAndConditions" component={TermsAndConditions} />
      <MainStackNav.Screen name="ContactUs" component={ContactUs} />
      <MainStackNav.Screen name="Advertise" component={Advertise} />
      <MainStackNav.Screen name="Payment" component={Payment} />
      <MainStackNav.Screen name="AddCard" component={AddCard} />


      <MainStackNav.Screen
        name="Development In Process"
        component={ComingSoon}
      />
    </MainStackNav.Navigator>
  );
};

export default MainStack;
