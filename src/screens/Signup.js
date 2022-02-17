import {
  Button,
  Heading,
  IconButton,
  Input,
  Pressable,
  Radio,
  ScrollView,
} from 'native-base';
import React, { Component } from 'react';
import { StyleSheet, Image, View, Dimensions, Text } from 'react-native';
import { AuthMiddleware } from '../redux/middleware/AuthMiddleware';
import { connect } from 'react-redux';

const { width, height } = Dimensions.get('window');

class Signup extends Component {
  state = {
    username: '',
    email: '',
    city: '',
    phone: '',
    provider: '',
    userType: 'customer',
    password: '',
    c_password: '',
    company_name: '',
  };

  Signup = () => {
    let {
      email,
      password,
      c_password,
      username,
      city,
      phone,
      provider,
      userType,
      company_name,
    } = this.state;
    console.warn({
      email,
      password,
      username,
      city,
      phone,
      c_password,
      userType,
      provider,
      company_name,
    });
    if (
      username &&
      email &&
      password &&
      c_password &&
      city &&
      phone &&
      userType
    ) {
      if (userType == 'provider' && provider) {
        if (provider == 'business') {
          if (!company_name) {
            alert('Please enter your company name');
            return;
          }
        }
      } else if (userType != 'customer') {
        alert('Please select provider type');
        return;
      }
      this.props.Signup({
        email,
        password,
        username,
        city,
        phone,
        c_password,
        userType,
        provider,
        company_name,
      });
    } else {
      alert('Please enter your information');
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
                marginHorizontal: '5%',
                marginVertical: 20,
                borderRadius: 20,
                padding: 20,
              }}>
              <Heading style={{ marginBottom: 25 }}>Sign Up</Heading>
              <Input
                placeholder="Username"
                style={styles.input}
                onChangeText={username => this.setState({ username })}
              />
              <Input
                placeholder="Email"
                style={styles.input}
                onChangeText={email => this.setState({ email })}
              />
              <Input
                placeholder="City"
                style={styles.input}
                onChangeText={city => this.setState({ city })}
              />
              <Input
                placeholder="Phone Number"
                style={styles.input}
                onChangeText={phone => this.setState({ phone })}
              />
              <Input
                placeholder="Password"
                style={styles.input}
                secureTextEntry
                onChangeText={password => this.setState({ password })}
              />
              <Input
                placeholder="Confirm Password"
                style={styles.input}
                secureTextEntry
                onChangeText={c_password => this.setState({ c_password })}
              />
              <Heading
                style={{
                  fontSize: 14,
                  marginBottom: 10,
                  alignSelf: 'flex-start',
                  color: '#aaa',
                }}>
                Register As
              </Heading>
              <Radio.Group
                name="myRadioGroup"
                value={this.state.userType}
                flexDirection="row"
                marginBottom={3}
                tintColor="#1872ea"
                onChange={nextValue => {
                  this.setState({ userType: nextValue });
                }}>
                <Radio value="customer" marginRight={7}>
                  <Text style={{ color: '#aaa', marginStart: 10 }}>Customer</Text>
                </Radio>
                <Radio value="provider">
                  <Text style={{ color: '#aaa', marginStart: 10 }}>
                    Service Provider
                  </Text>
                </Radio>
              </Radio.Group>
              {this.state.userType == 'provider' ? (
                <Heading
                  style={{
                    fontSize: 14,
                    marginVertical: 10,
                    alignSelf: 'flex-start',
                    color: '#aaa',
                  }}>
                  Service Provider As
                </Heading>
              ) : null}
              {this.state.userType == 'provider' ? (
                <Radio.Group
                  name="myRadioGroup"
                  value={this.state.provider}
                  flexDirection="row"
                  marginBottom={3}
                  tintColor="#1872ea"
                  onChange={nextValue => {
                    this.setState({ provider: nextValue });
                  }}>
                  <Radio value="individual" marginRight={10}>
                    <Text style={{ color: '#aaa', marginStart: 10 }}>
                      Individual
                    </Text>
                  </Radio>
                  <Radio value="business">
                    <Text style={{ color: '#aaa', marginStart: 10 }}>
                      Business
                    </Text>
                  </Radio>
                </Radio.Group>
              ) : null}
              {this.state.provider == 'business' ? (
                <Input
                  placeholder="Company Name"
                  style={{ ...styles.input, marginTop: 10 }}
                  onChangeText={company_name => this.setState({ company_name })}
                />
              ) : null}

              <Button
                onPress={this.Signup}
                backgroundColor="primary.100"
                style={{
                  width: '95%',
                  borderRadius: 10,
                  marginVertical: 10,
                  height: 45,
                }}>
                Signup
              </Button>
            </View>
            <View style={{ alignItems: 'center' }}>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: '#000' }}>Already have an account?</Text>
              </View>
              <Button
                onPress={() => this.props.navigation.navigate('Login')}
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
                <Text style={{ color: '#1872ea' }}>LOGIN</Text>
              </Button>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  Signup: data => dispatch(AuthMiddleware.Register(data)),
});

export default connect(null, mapDispatchToProps)(Signup);

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
