import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import MyHeader from '../components/MyHeader';
import { Box, Button, Heading, HStack, Icon, VStack } from 'native-base';
import { connect } from 'react-redux';
import { AuthMiddleware } from '../redux/middleware/AuthMiddleware';
import { ActionTypes } from '../redux/action_types';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { imgURL } from '../configs/AxiosConfig';


const { width } = Dimensions.get('window');
const iconSize = 20;

class Settings extends Component {
  render() {
    console.warn("User:", this.props.user?.user);
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <MyHeader title={'Settings'} notify profile navigation={this.props.navigation} />
        <ScrollView>
          <View style={{ flex: 1, padding: 20 }}>
            <HStack
              padding={5}
              backgroundColor="#eee"
              space="md"
              alignItems="center">
              <Image
                source={this.props?.user?.user?.profile_pic ?
                  {
                    uri: imgURL + this.props?.user?.user?.profile_pic
                  } : require('../assets/user.png')
                }
                style={{
                  width: width * 0.3,
                  height: width * 0.3,
                  borderRadius: 3,
                }}
              />
              <VStack space="lg">
                <Box>
                  <Heading fontSize="lg">{this.props?.user?.user?.username}</Heading>
                  <Text adjustsFontSizeToFit numberOfLines={1} style={{ width: '97%', fontSize: 13, }}>{this.props?.user?.user?.email}</Text>
                </Box>
                <Button
                  onPress={() => this.props.navigation.navigate('EditProfile')}
                  backgroundColor="primary.100" maxWidth={120}>
                  Edit Profile
                </Button>
              </VStack>
            </HStack>
            <VStack marginTop="5" padding="5" backgroundColor="#eee">
              <TouchableOpacity
                onPress={() => { this.props?.user?.user?.role == 'provider' ? this.props.navigation.navigate('UserProfile') : this.props.navigation.navigate('profileSettings') }
                }>
                <HStack space="md" alignItems="center" paddingY={3}>
                  <Image
                    style={{
                      width: iconSize,
                      height: iconSize,
                      resizeMode: 'contain',
                    }}
                    source={require('../assets/person.png')}
                  />
                  <Heading fontSize="lg">Profile</Heading>
                </HStack>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('SubcriptionPlans')
                }>
                <HStack space="md" alignItems="center" paddingY={3}>
                  <Image
                    style={{
                      width: iconSize,
                      height: iconSize,
                      resizeMode: 'contain',
                    }}
                    source={require('../assets/subscribe.png')}
                  />
                  <Heading fontSize="lg">Subscription Plan</Heading>
                </HStack>
              </TouchableOpacity>
              {/* <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('Development In Process')
                }>
                <HStack space="md" alignItems="center" paddingY={3}>
                  <Image
                    style={{
                      width: iconSize,
                      height: iconSize,
                      resizeMode: 'contain',
                    }}
                    source={require('../assets/add_person.png')}
                  />
                  <Heading fontSize="lg">Invite</Heading>
                </HStack>
              </TouchableOpacity> */}
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('ContactUs')
                }>
                <HStack space="md" alignItems="center" paddingY={3}>
                  <Image
                    style={{
                      width: iconSize,
                      height: iconSize,
                      resizeMode: 'contain',
                    }}
                    source={require('../assets/call.png')}
                  />
                  <Heading fontSize="lg">Contact Us</Heading>
                </HStack>
              </TouchableOpacity>
              {/* {this.props.user.user.role == 'provider' ? (
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('Development In Process')
                  }>
                  <HStack space="md" alignItems="center" paddingY={3}>
                    <Icon size={'sm'} as={FontAwesome5} name="star-half-alt" />
                    <Heading fontSize="lg">Ratings</Heading>
                  </HStack>
                </TouchableOpacity>
              ) : null} */}
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('TermsAndConditions')
                }>
                <HStack space="md" alignItems="center" paddingY={3}>
                  <Image
                    style={{
                      width: iconSize,
                      height: iconSize,
                      resizeMode: 'contain',
                    }}
                    source={require('../assets/read.png')}
                  />
                  <Heading fontSize="lg">Terms & Condition</Heading>
                </HStack>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('PrivacyPolicy')
                }>
                <HStack space="md" alignItems="center" paddingY={3}>
                  <Image
                    style={{
                      width: iconSize,
                      height: iconSize,
                      resizeMode: 'contain',
                    }}
                    source={require('../assets/lock.png')}
                  />
                  <Heading fontSize="lg">Privacy Policy</Heading>
                </HStack>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.props.Logout()}>
                <HStack space="md" alignItems="center" paddingY={3}>
                  <Image
                    style={{
                      width: iconSize,
                      height: iconSize,
                      resizeMode: 'contain',
                    }}
                    source={require('../assets/logout.png')}
                  />
                  <Heading fontSize="lg">Logout</Heading>
                </HStack>
              </TouchableOpacity>
            </VStack>
          </View>
        </ScrollView >
      </View >
    );
  }
}

const mapStateToProps = state => ({
  user: state.AuthReducer.user,
});

const mapDispatchToProps = dispatch => ({
  Logout: () => dispatch({ type: ActionTypes.Logout }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
