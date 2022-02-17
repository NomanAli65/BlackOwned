import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import AppNav from './src/navigation/index';
import SplashScreen from 'react-native-splash-screen';
import {LogBox} from 'react-native';

// LogBox.ignoreAllLogs(true);

SplashScreen.hide();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppNav />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
