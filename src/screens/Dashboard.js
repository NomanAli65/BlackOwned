import {
  Avatar,
  Box,
  Button,
  Heading,
  HStack,
  Icon,
  Input,
  ScrollView,
  VStack,
} from 'native-base';
import React, {Component} from 'react';
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import {connect} from 'react-redux';
import MyHeader from '../components/MyHeader';
import Feather from 'react-native-vector-icons/Feather';

const {width} = Dimensions.get('window');

class Dashboard extends Component {
  state = {
    data: [
      {name: 'Realtors', img: require('../assets/realtor.jpg')},
      {name: 'Artists', img: require('../assets/realtor.jpg')},
      {name: 'Plumber', img: require('../assets/realtor.jpg')},
      {name: 'Electrician', img: require('../assets/realtor.jpg')},
    ],
    online_friends: [
      {img: require('../assets/1.jpeg')},
      {img: require('../assets/2.jpeg')},
      {img: require('../assets/3.jpeg')},
      {img: require('../assets/4.jpeg')},
      {img: require('../assets/5.jpeg')},
      {img: require('../assets/1.jpeg')},
      {img: require('../assets/2.jpeg')},
      {img: require('../assets/3.jpeg')},
      {img: require('../assets/4.jpeg')},
      {img: require('../assets/5.jpeg')},
    ],
    companies: [
      {
        name: 'Global World',
        img: require('../assets/c1.jpeg'),
        distance: '2 miles',
      },
      {
        name: 'Strategic Solutions',
        img: require('../assets/c2.jpeg'),
        distance: '3 miles',
      },
      {
        name: 'Trading Co',
        img: require('../assets/c3.jpeg'),
        distance: '2.5 miles',
      },
    ],
  };

  onClick = () => {
    this.props.navigation.navigate('Development In Process');
  };

  _renderItem = ({item}) => {
    return (
      <TouchableOpacity onPress={this.onClick} style={{marginEnd: 15}}>
        <Image
          source={item.img}
          style={{width: width * 0.5, height: 120, borderRadius: 5}}
        />
        <Heading fontSize="lg" marginTop="2">
          {item.name}
        </Heading>
      </TouchableOpacity>
    );
  };

  _renderFriend = ({item}) => {
    return (
      <TouchableOpacity onPress={this.onClick} style={{marginEnd: 15}}>
        <Avatar size="sm" source={item.img} />
      </TouchableOpacity>
    );
  };

  _renderCompany = ({item}) => {
    return (
      <TouchableOpacity onPress={this.onClick}>
        <HStack marginBottom="2">
          <Image
            source={item.img}
            style={{width: 50, height: 45, borderRadius: 2}}
          />
          <VStack marginLeft={3} justifyContent="center">
            <Heading fontSize="md">{item.name}</Heading>
            <Text style={{fontSize: 12}}>{item.distance}</Text>
          </VStack>
        </HStack>
      </TouchableOpacity>
    );
  };

 

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <MyHeader title={'Home'} notify profile/>
        <ScrollView style={{flex: 1}}>
          <View style={{flex: 1, padding: 15}}>
            <Heading fontSize="xl">Hello Sarah,</Heading>
            <Heading fontSize="2xl">Welcome Back</Heading>
            <HStack
              backgroundColor="#eee"
              marginTop="2"
              borderRadius={10}
              alignItems="center"
              paddingX="3">
              <Icon as={Feather} name="search" size="sm" color="#aaa" />
              <Input fontSize={14} placeholder="Search" borderWidth={0} />
            </HStack>
            <HStack marginY={3} alignSelf={'center'} space={'md'}>
              <Button
                onPress={this.onClick}
                flex={1}
                borderRadius={5}
                paddingX={0}
                bgColor="#1872ea">
                <Heading fontSize="13" color="#fff">
                  Jobs
                </Heading>
              </Button>
              <Button
                onPress={this.onClick}
                flex={1}
                borderRadius={5}
                backgroundColor="#ddd">
                <Heading fontSize="13" color="#000">
                  Market Place
                </Heading>
              </Button>
              <Button
                onPress={this.onClick}
                flex={1}
                borderRadius={5}
                backgroundColor="#ddd">
                <Heading fontSize="13" color="#000">
                  Network
                </Heading>
              </Button>
            </HStack>
            <HStack justifyContent="space-between" marginY="3">
              <Heading fontSize="md" color="#1872ea">
                Services
              </Heading>
              <TouchableOpacity onPress={this.onClick}>
                <Text>View All</Text>
              </TouchableOpacity>
            </HStack>
            <FlatList
              data={this.state.data}
              horizontal
              renderItem={this._renderItem}
            />
            <Heading
              fontSize="md"
              color="primary.100"
              marginTop="5"
              marginBottom="3">
              Online Friends:
            </Heading>
            <FlatList
              data={this.state.online_friends}
              horizontal
              renderItem={this._renderFriend}
            />
            <HStack
              justifyContent="space-between"
              marginBottom="3"
              marginTop="5">
              <Heading fontSize="md" color="#1872ea">
                Local Companies Listed:
              </Heading>
              <TouchableOpacity onPress={this.onClick}>
                <Text>View All</Text>
              </TouchableOpacity>
            </HStack>
            <FlatList
              data={this.state.companies}
              renderItem={this._renderCompany}
            />
            <HStack marginY={3} alignSelf={'center'} space={'md'}>
              <Button
                onPress={this.onClick}
                size={'sm'}
                borderRadius={10}
                paddingX={0}
                bgColor="#1872ea">
                <Heading fontSize="13" color="#fff" fontWeight="medium">
                  Black owned banks
                </Heading>
              </Button>
              <Button
                onPress={this.onClick}
                size={'sm'}
                borderRadius={10}
                backgroundColor="#ddd">
                <Heading fontSize="13" color="#000" fontWeight="medium">
                  Black News
                </Heading>
              </Button>
              <Button
                onPress={this.onClick}
                size={'sm'}
                borderRadius={10}
                backgroundColor="#ddd">
                <Heading fontSize="13" color="#000" fontWeight="medium">
                  Seminars
                </Heading>
              </Button>
            </HStack>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.AuthReducer.user,
});

export default connect(mapStateToProps, null)(Dashboard);
