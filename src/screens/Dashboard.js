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
import React, { Component } from 'react';
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import { connect } from 'react-redux';
import { ServicesMiddleware } from '../redux/middleware/ServicesMiddleware';
import { ListedCompaniesMiddleware } from '../redux/middleware/ListedCompaniesMiddleware';
import MyHeader from '../components/MyHeader';
import Feather from 'react-native-vector-icons/Feather';
import { imgURL } from '../configs/AxiosConfig';
import geolocation from 'react-native-geolocation-service';
import { AppMiddleware } from '../redux/middleware/AppMiddleware';


const { width } = Dimensions.get('window');

class Dashboard extends Component {
  state = {

    online_friends: [
      { img: require('../assets/1.jpeg') },
      { img: require('../assets/2.jpeg') },
      { img: require('../assets/3.jpeg') },
      { img: require('../assets/4.jpeg') },
      { img: require('../assets/5.jpeg') },
      { img: require('../assets/1.jpeg') },
      { img: require('../assets/2.jpeg') },
      { img: require('../assets/3.jpeg') },
      { img: require('../assets/4.jpeg') },
      { img: require('../assets/5.jpeg') },
    ],

    selectedButtonTop: null,
  };

  componentDidMount() {
    this.requestLocationPermission();
    this.props.getAllServices({ name: '' });
    this.props.getAllListedCompanies({ name: '' })
    // .then(() => this.setState({ loader: false }))
    // .catch(() => this.setState({ loader: false }));
  }
  requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
          'title': 'Location Access Required',
          'message': 'This App needs to Access your location'
        }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          //To Check, If Permission is granted
          /// setGrantedPermission(true)
          this.getCurrentLocation();
        } else {
          alert("Permission Denied");
        }
      } catch (err) {
        alert("err", err);
      }
    }
    // if (Platform.OS === 'ios') {
    //     try {
    //         const granted = await PermissionsAndroid.request(
    //             PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
    //             'title': 'Location Access Required',
    //             'message': 'This App needs to Access your location'
    //         }
    //         )
    //         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //             //To Check, If Permission is granted
    //             /// setGrantedPermission(true)
    //             this.getCurrentLocation();
    //         } else {
    //             alert("Permission Denied");
    //         }
    //     } catch (err) {
    //         alert("err", err);
    //     }
    // }

  }

  getCurrentLocation = () => {

    geolocation.getCurrentPosition(
      (position) => {
        // console.warn("Region:", position);
        this.UpdateUserLocation(position);
      },
      (error) => {
        // See error code charts below.
        // console.warn('Code ', error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 10000 }
    )
  }

  UpdateUserLocation = (position) => {
    // console.warn("Position:", position?.coords?.longitude);
    let lat = position?.coords?.latitude
    let lng = position?.coords?.longitude

    let userData = {
      lat,
      lng
    }
    this.props.UpdateUserLocation({
      userData,
      callback: response => {

        if (response) {

        } else {
          this.setState({ loading: false, refreshing: false, });

        }
      },
    })
  }


  onClick = () => {
    this.props.navigation.navigate('Development In Process');
  };

  _renderItem = item => {
    // console.warn(item);
    const { user } = this.props;
    return (
      <TouchableOpacity
        // onPress={() => this.props.navigation.navigate('ServiceDetail', { name: item.name })}
        onPress={() => this.props.navigation.navigate(user.user.role == 'provider' ? 'AddServices' : 'Services')}
        style={{ marginEnd: 15 }}>
        <Image
          source={item.image ?
            {
              uri: imgURL + item.image
            } : require('../assets/user.png')
          }
          style={{ width: width * 0.5, height: 120, borderRadius: 5 }}
        />
        <Heading fontSize="lg" marginTop="2">
          {item.name}
        </Heading>
      </TouchableOpacity>
    );
  };

  _renderFriend = ({ item }) => {
    return (
      <TouchableOpacity style={{ marginEnd: 15 }}>

        <Avatar size="md" source={item.img} />
        <View style={{ width: 10, height: 10, top: -10, zIndex: 1, borderRadius: 360, backgroundColor: 'rgb(21,238,86)', alignSelf: 'flex-end' }}></View>
      </TouchableOpacity>
    );
  };

  _renderCompany = item => {
    // console.warn("ITEM:", item);
    return (
      <TouchableOpacity onPress={() => this.props.navigation.navigate("LocalCompanyList")}>
        <HStack marginBottom="2">
          <Image
            source={item.profile_pic ?
              {
                uri: imgURL + item.profile_pic
              } : require('../assets/user.png')
            }
            style={{ width: 50, height: 45, borderRadius: 2 }}
          />
          <VStack marginLeft={3} justifyContent="center">
            <Heading fontSize="md">{item.company_name}</Heading>
            <Text style={{ fontSize: 12 }}>2 miles</Text>
          </VStack>
        </HStack>
      </TouchableOpacity>
    );
  };



  render() {
    let { selectedButtonTop } = this.state;
    const { getServicesData_list, getLisetdCompaniesData_list, user } = this.props;
    //console.warn('Dataa', user);
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <MyHeader title={'Home'} notify profile navigation={this.props.navigation} />
        <ScrollView style={{ flex: 1 }}>
          <View style={{ flex: 1, padding: 15 }}>
            <Heading fontSize="xl">Hello {this.props?.user?.user?.username},</Heading>
            <Heading fontSize="2xl">Welcome Back</Heading>
            {/* <HStack
              backgroundColor="#eee"
              marginTop="2"
              borderRadius={10}
              alignItems="center"
              paddingX="3">
              <Icon as={Feather} name="search" size="sm" color="#aaa" />
              <Input fontSize={14} placeholder="Search" borderWidth={0} />
            </HStack> */}
            <HStack flex={1} marginY={3} alignSelf={'center'} space={'md'}>
              <Button
                onPress={() => this.props.navigation.navigate( user.user.role == 'provider' ? 'Jobs' : 'AddJobCustomer')}
                flex={0.3}
                borderRadius={5}
                paddingX={0}
                borderBottomWidth={2}
                borderBottomColor={'#1872ea'}
                borderBottomRadius={'none'}
                bgColor={selectedButtonTop == 0 ? "#1872ea" : "#fff"}
              >
                <Heading fontSize="13" color={"#000"} >
                  Jobs
                </Heading>
              </Button>
              <Button
                onPress={() => this.props.navigation.navigate('Marketplace')}
                flex={0.4}
                borderRadius={5}
                borderBottomWidth={selectedButtonTop == 0 ? 2 : 0}
                borderBottomColor={selectedButtonTop == 0 ? '#1872ea' : null}
                borderBottomRadius={'none'}
                bgColor={"#fff"}
              // backgroundColor={selectedButtonTop == 1 ? "#1872ea" : "#ddd"}
              >
                <Heading textAlign={'center'} fontSize="13" color={"#000"}>
                  Market Place
                </Heading>
              </Button>
              <Button
                onPress={() => this.props.navigation.navigate('Network')}
                flex={0.3}
                borderRadius={5}
                borderBottomWidth={selectedButtonTop == 0 ? 2 : 0}
                borderBottomColor={selectedButtonTop == 0 ? '#1872ea' : null}
                borderBottomRadius={'none'}
                bgColor={"#ffff"}
              // backgroundColor={selectedButtonTop == 2 ? "#1872ea" : "#ddd"}
              >
                <Heading fontSize="13" color={"#000"}>
                  Network
                </Heading>
              </Button>
            </HStack>
            <HStack justifyContent="space-between" marginY="3">
              <Heading fontSize="md" color="#1872ea">
                Services
              </Heading>
              <TouchableOpacity onPress={() => this.props.navigation.navigate(user.user.role == 'provider' ? 'AddServices' : 'Services')}>
                <Text>View All</Text>
              </TouchableOpacity>
            </HStack>
            <FlatList
              data={getServicesData_list}
              horizontal
              // initialNumToRender={5}
              maxToRenderPerBatch={5}
              renderItem={({ item, index }) => this._renderItem(item)}
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
            // renderItem={({ item, index }) => this._renderFriend(item)}
            />
            <HStack
              justifyContent="space-between"
              marginBottom="3"
              marginTop="5">
              <Heading fontSize="md" color="#1872ea">
                Local Companies Listed:
              </Heading>
              <TouchableOpacity onPress={() => this.props.navigation.navigate("LocalCompanyList")}>
                <Text>View All</Text>
              </TouchableOpacity>
            </HStack>
            <FlatList
              data={getLisetdCompaniesData_list}
              renderItem={({ item, index }) => this._renderCompany(item)}
            // renderItem={this._renderCompany}
            />
            <HStack marginY={3} alignSelf={'center'} space={'md'}>
              <Button
                onPress={() => this.props.navigation.navigate('Banks')}
                size={'sm'}
                borderRadius={10}
                paddingX={0}
                bgColor="#1872ea">
                <Heading fontSize="12" color="#fff" fontWeight="medium">
                  Black Owned Banks
                </Heading>
              </Button>
              <Button
                onPress={() => this.props.navigation.navigate('News')}
                size={'sm'}
                borderRadius={10}
                backgroundColor="#ddd">
                <Heading fontSize="12" color="#000" fontWeight="medium">
                  Black News
                </Heading>
              </Button>
              <Button
                onPress={() => this.props.navigation.navigate('Seminar')}
                size={'sm'}
                borderRadius={10}
                backgroundColor="#ddd">
                <Heading fontSize="12" color="#000" fontWeight="medium">
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

// const mapStateToProps = state => ({
//   user: state.AuthReducer.user,
// });

const mapStateToProps = state => {
  return {
    user: state.AuthReducer.user,
    getServicesData: state.ServicesReducer.getServicesData,
    getServicesData_list: state.ServicesReducer.getServicesData_list,
    getLisetdCompaniesData: state.ListedCompaniesReducer.getLisetdCompaniesData,
    getLisetdCompaniesData_list: state.ListedCompaniesReducer.getLisetdCompaniesData_list,

  };
};
const mapDispatchToProps = dispatch => ({
  // Login: data => dispatch(AuthMiddleware.Login(data)),
  // Login: data => dispatch(AuthMiddleware.Login(data)),

  getAllServices: (payload) =>
    dispatch(ServicesMiddleware.getAllServices(payload)),
  getAllListedCompanies: (payload) =>
    dispatch(ListedCompaniesMiddleware.getAllListedCompanies(payload)),
  UpdateUserLocation: paylaod => dispatch(AppMiddleware.UpdateUserLocation(paylaod)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
