import {
  Button,
  Heading,
  Icon,
  IconButton,
  Input,
  Pressable,
  ScrollView,
} from 'native-base';
import React, { Component } from 'react';
import { StyleSheet, Image, View, Dimensions, Text } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import { connect } from 'react-redux';
import { AuthMiddleware } from '../redux/middleware/AuthMiddleware';

const { width } = Dimensions.get('window');

class Login extends Component {
  state = {
    //email: 'customer@gmail.com',
    //email: 'test123@gmail.com',
    email: 'test@gmail.com',
    password: 'admin123',
  };

  Login = () => {
    let { email, password } = this.state;
    if (email && password) {
      this.props.Login({
        email,
        password,
      });
    } else {
      alert('Please enter your email and password');
    }
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.container}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: 20,
            }}>
            <Image style={styles.logo} source={require('../assets/logo.png')} />
          </View>
          <View style={{ flex: 1 }}>
            <View
              style={{
                alignItems: 'center',
                borderWidth: 1,
                borderColor: '#ccc',
                marginHorizontal: '10%',
                marginVertical: 20,
                borderRadius: 20,
                padding: 20,
              }}>
              <Heading style={{ marginBottom: 25 }}>Log In</Heading>
              <Input
                placeholder="Username"
                style={styles.input}
                value={this.state.email}
                onChangeText={email => this.setState({ email })}
              />
              <Input
                placeholder="Password"
                style={styles.input}
                value={this.state.password}
                secureTextEntry
                onChangeText={password => this.setState({ password })}
              />
              <Button
                onPress={this.Login}
                backgroundColor="primary.100"
                style={{
                  width: '95%',
                  borderRadius: 10,
                  marginVertical: 10,
                  height: 45,
                }}>
                Login
              </Button>
              <Pressable
                onPress={() =>
                  this.props.navigation.navigate('Development In Process')
                }
                style={{ padding: 5 }}>
                <Text style={{ color: '#000' }}>Forgot Password?</Text>
              </Pressable>
            </View>
            <View style={{ alignItems: 'center' }}>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: '#000' }}>Don't have an account?</Text>
              </View>
              <Button
                onPress={() => this.props.navigation.navigate('Signup')}
                backgroundColor="primary.100"
                bgColor="#fff"
                color="primary.100"
                borderRadius={10}
                borderWidth={1}
                borderColor="primary.100"
                style={{
                  marginVertical: 10,
                  width: '50%',
                  height: 45,
                }}>
                <Text style={{ color: '#1872ea' }}>SIGNUP</Text>
              </Button>
              <Text style={{ color: '#000' }}>Or Sign In with</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <IconButton
                  icon={
                    <Icon
                      name="facebook"
                      as={MaterialCommunityIcons}
                      color="#3b5998"
                      size={10}
                    />
                  }
                />
                <IconButton
                  icon={
                    <Icon
                      name="google-plus"
                      as={FontAwesome5Pro}
                      color="#DB4437"
                      size={9}
                    />
                  }
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  Login: data => dispatch(AuthMiddleware.Login(data)),
});

export default connect(null, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  logo: {
    width: width * 0.4,
    height: width * 0.4,
  },
  input: {
    width: '95%',
    borderRadius: 10,
    textAlign: 'center',
    marginBottom: 15,
    backgroundColor: '#fff',
    elevation: 3,
    borderWidth: 0,
  },
});
