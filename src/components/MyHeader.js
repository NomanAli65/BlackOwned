import React, { Component } from 'react';
import { View, Dimensions, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { ArrowBackIcon, Avatar, Heading, HStack, Icon } from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { imgURL } from '../configs/AxiosConfig';

const { width } = Dimensions.get('window');

class MyHeader extends Component {

  render() {
    console.warn("user Header", this.props.user?.user);
    return (
      <HStack
        backgroundColor="white"
        justifyContent="space-between"
        alignItems="center"
        padding={3}>
        {this.props.back ? (
          <HStack>
            <TouchableOpacity onPress={this.props.onBackPress}>
              <ArrowBackIcon />
            </TouchableOpacity>
            <View style={{ width: width * 0.14 }} />
          </HStack>
        ) : (
          <View style={{ width: width * 0.2 }} />
        )}
        <Heading fontSize={this.props.size ? this.props.size : 'lg'} fontWeight="medium">{this.props.title}</Heading>
        {this.props.notify || this.props.profile ? (
          <HStack space="sm">
            {this.props.notify ? (
              <HStack>
                {!this.props.profile ? (
                  <View style={{ width: width * 0.1 }} />
                ) : null}
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Notification')}>
                  <Icon
                    as={MaterialCommunityIcons}
                    name="bell"
                    color="#000"
                    size="7"
                  />
                </TouchableOpacity>
              </HStack>
            ) : null}
            {this.props.profile ? (
              <HStack>
                {!this.props.notify ? (
                  <View style={{ width: width * 0.1 }} />
                ) : null}
                <TouchableOpacity onPress={() => { this.props?.user?.user?.role == 'provider' ? this.props.navigation.navigate('UserProfile') : this.props.navigation.navigate('profileSettings') }}>
                  <Avatar
                    source={this.props.user?.user?.profile_pic ? { uri: imgURL + this.props.user?.user?.profile_pic } : require('../assets/user.png')}
                    size="sm"
                    backgroundColor="#ddd"
                  />
                </TouchableOpacity>
              </HStack>
            ) : null}
          </HStack>
        ) : (
          <View style={{ width: width * 0.2 }} />
        )}
      </HStack>
    );
  }
}

const mapStateToProps = state => ({
  user: state.AuthReducer.user,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(MyHeader);
