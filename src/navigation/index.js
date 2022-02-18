import { NativeBaseProvider } from 'native-base';
import React from 'react';
import { ActivityIndicator, Modal, View } from 'react-native';
import { connect } from 'react-redux';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import Spinner from 'react-native-spinkit';
import theme from '../configs/Theme';
import SplashScreen from 'react-native-splash-screen';
import Storage from '../Utils/AsyncStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AccessibilityInfo from 'react-native/Libraries/Components/AccessibilityInfo/AccessibilityInfo';
import { AuthMiddleware } from '../redux/middleware/AuthMiddleware';
import { ActionTypes } from '../redux/action_types';

SplashScreen.hide();


class AppNav extends React.Component {
  state = {
    token: null,
    loading: false
  }

  async componentDidMount() {

    this.setState({ appLoading: true })
    AsyncStorage.getItem('@BB-user', (error, result) => {
      if (!error) {
        if (result) {
          let data = JSON.parse(result);
          this.props.Login(data)
        }
      }
      this.setState({ appLoading: false })
    })


  }
  render() {

    return (
      <View style={{ flex: 1 }}>
        <NativeBaseProvider theme={theme}>

          {this.state.appLoading ? <View style={{ flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }}><ActivityIndicator color={'blue'} size={'large'} /></View> : this.state.token || this.props.logged_in ? <MainStack /> : <AuthStack />}
          {/* {props.logged_in ? <BottomNavigation /> :  <BottomNavigation />} */}
        </NativeBaseProvider>
        <Modal visible={this.props.loading} transparent>
          <View
            style={{
              flex: 1,
              backgroundColor: 'rgba(0,0,0,0.3)',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Spinner
              isVisible={this.props.loading}
              type="FoldingCube"
              color="#1872ea"
              size={80}
            />
          </View>
        </Modal>
      </View>
    );
  };
}

const mapStateToProps = state => ({
  logged_in: state.AuthReducer.is_logged_in,
  loading: state.GeneralReducer.loading,
});

const mapDispatchToProps = dispatch => ({
  Login: data => dispatch({ type: ActionTypes.Login, payload: data }),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppNav);
