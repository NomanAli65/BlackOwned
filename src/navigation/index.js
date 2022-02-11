import {NativeBaseProvider} from 'native-base';
import React from 'react';
import {Modal, View} from 'react-native';
import {connect} from 'react-redux';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import Spinner from 'react-native-spinkit';
import theme from '../configs/Theme';
import SplashScreen from 'react-native-splash-screen';

SplashScreen.hide();


const AppNav = props => {
  return (
    <View style={{flex: 1}}>
      <NativeBaseProvider theme={theme}>
        {!props.logged_in ? <MainStack /> : <AuthStack />}
        {/* {props.logged_in ? <BottomNavigation /> :  <BottomNavigation />} */}
      </NativeBaseProvider>
      <Modal visible={props.loading} transparent>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.3)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Spinner
            isVisible={props.loading}
            type="FoldingCube"
            color="#1872ea"
            size={80}
          />
        </View>
      </Modal>
    </View>
  );
};

const mapStateToProps = state => ({
  logged_in: state.AuthReducer.is_logged_in,
  loading: state.GeneralReducer.loading,
});

export default connect(mapStateToProps, null)(AppNav);
