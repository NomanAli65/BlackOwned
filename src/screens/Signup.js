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
import { StyleSheet, Image, View, Dimensions, Text, TouchableOpacity, Modal } from 'react-native';
import { AuthMiddleware } from '../redux/middleware/AuthMiddleware';
import { connect } from 'react-redux';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

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
    modalVisible: false,
    geoLocationAddress: '',
    geoLocationCoordinates: [],
    lat:'',
    lng:'',
    showResult: false
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
      lat,
      lng,
      geoLocationAddress,
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
      lat,
      lng,
      geoLocationAddress,
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
        lat,
        lng,
        geoLocationAddress,
      });
    } else {
      alert('Please enter your information');
    }
  };

  render() {
    console.log(this.state.lat, this.state.lng);
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
                keyboardType='numeric'
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
                style={{ justifyContent: 'space-around', width: '100%' }}
                marginBottom={3}
                tintColor="#1872ea"
                onChange={nextValue => {
                  this.setState({ userType: nextValue });
                }}>
                <Radio value="customer">
                  <Text style={{ color: '#aaa', marginStart: 5 }}>Customer</Text>
                </Radio>
                <Radio value="provider">
                  <Text style={{ color: '#aaa', marginStart: 5 }}>
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
                  style={{ justifyContent: 'space-around', width: '100%' }}
                  marginBottom={3}
                  tintColor="#1872ea"
                  onChange={nextValue => {
                    this.setState({ provider: nextValue });
                  }}>
                  <Radio value="individual" >
                    <Text style={{ color: '#aaa', marginStart: 5 }}>
                      Individual
                    </Text>
                  </Radio>
                  <Radio value="business">
                    <Text style={{ color: '#aaa', marginStart: 5 }}>
                      Business
                    </Text>
                  </Radio>
                </Radio.Group>
              ) : null}
              {this.state.provider == 'business' ? (
                <View style={{ width: '100%', alignItems: 'center' }}>
                  <Input
                    placeholder="Company Name"
                    style={{ ...styles.input, marginTop: 10 }}
                    onChangeText={company_name => this.setState({ company_name })}
                  />
                  <TouchableOpacity style={styles.input} onPress={() => this.setState({ modalVisible: true })}>
                    {this.state.geoLocationAddress  == '' ?
                      (
                        <View style={{height:40,alignItems:'center',justifyContent:'center'}}>
                          <Text style={{ textAlign: 'center' }}>Select Location</Text>
                        </View>
                      ) : (
                        <View style={{height:40,alignItems:'center',justifyContent:'center'}}>
                        <Text numberOfLines={1} style={{ textAlign: 'center',padding:10 }}>{this.state.geoLocationAddress}</Text>
                        </View>
                      )}
                  </TouchableOpacity>
                  
                </View>
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
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              this.setState({ modalVisible: false });
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Select Location</Text>
                <GooglePlacesAutocomplete
                  placeholder='Search'
                  GooglePlacesDetailsQuery={{ fields: "geometry" }}
                  onPress={(data, details = null) => {
                    
                    this.setState(
                      {
                        geoLocationAddress: data.description, // selected address
                        geoLocationCoordinates: `${details.geometry.location.lat},${details.geometry.location.lng}`, // selected coordinates,
                        modalVisible: false,
                        lat: details.geometry.location.lat,
                        lng:details.geometry.location.lng,
                      }
                    );
                    console.warn(data, details);
                  }}
                  value={this.state.geoLocationAddress}
                  onChangeText={this.state.geoLocationAddress}
                  fetchDetails={true}
                  onBlur={() => console.warn(("ok"))}
                  styles={{
                    container: {
                      width: "100%",
                    },
                    textInputContainer: {
                      elevation: 5,
                      backgroundColor: "#fff",
                      borderRadius: 5,
                    },
                  }}
                  query={{
                    key: 'AIzaSyBBVMEPDktEjcindc7_NjCpFWsSWVspyKI',
                    language: 'en',
                  }}
                />
              </View>
            </View>
          </Modal>
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
    flex: 1
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
  },
  modalView: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",

  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
