import React, { Component } from 'react';
import { View, Dimensions,TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { ArrowBackIcon, Avatar, Heading, HStack, Icon } from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

class MyHeader extends Component {
  render() {
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
        <Heading fontWeight="medium">{this.props.title}</Heading>
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
                <Avatar
                  source={require('../assets/user.png')}
                  size="sm"
                  backgroundColor="#ddd"
                />
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

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(MyHeader);
