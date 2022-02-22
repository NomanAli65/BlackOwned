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
import { Image, Dimensions, View, Animated, TouchableOpacity, Text, FlatList, StyleSheet } from 'react-native';
import MyHeader from '../../components/MyHeader';
import Feather from 'react-native-vector-icons/Feather';
import StarRating from 'react-native-star-rating-widget';
import Entypo from 'react-native-vector-icons/Entypo';
import { connect } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { ServicesMiddleware } from '../../redux/middleware/ServicesMiddleware';
import { imgURL } from '../../configs/AxiosConfig';

// import {Colors} from '../../Styles';



const { width } = Dimensions.get('window');

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            Services: [],
            Profile_Image: this.props?.user?.user?.profile_pic ?
                { uri: imgURL + this.props?.user?.user?.profile_pic }
                : require('../../assets/user.png'),
        };
    }
    componentDidMount() {
        this.Services_Index()
    }
    Services_Index = () => {
        this.props.Service_Index({
            callback: response => {

                if (response) {
                    // console.warn("ServiceIndex,", response.data);
                    this.setState({
                        Services: response?.data,
                        refreshing: false,
                    })

                } else {
                    this.setState({ loading: false, refreshing: false, });
                }
            },
        });
    }

    renderServicesList = item => (

        <View >
            <Text style={{ fontSize: 12, }}>{item?.services?.name}</Text>
        </View>

    );

    renderPostsList = item => (

        <TouchableOpacity >
            <View style={{ margin: 3 }}>
                <Image source={item.img} style={{ width: 100, height: 100, borderRadius: 5 }} />
            </View>
        </TouchableOpacity>

    );

    render() {
        let User = this.props?.user?.user
        //console.warn("User:", this.props.user.user);
        // let rotate = this.rotation.interpolate({
        //     inputRange: [0, 1],
        //     outputRange: ['0deg', '360deg'],
        // });
        return (
            <View style={styles.container}>
                <MyHeader
                    back notify navigation={this.props.navigation}
                    title={'Profile'}
                    onBackPress={() => this.props.navigation.goBack()}
                />
                <ScrollView>
                    <View style={{ paddingHorizontal: 20 }}>

                        <View style={{ flexDirection: 'row', backgroundColor: '#eee', padding: 15, marginVertical: 5 }}>
                            <Image source={this.state.Profile_Image} style={styles.profileImg} />
                            <View style={{ paddingHorizontal: 10, justifyContent: 'center' }}>
                                <Text style={styles.ProfileName}>{User?.username}</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ alignSelf: 'center' }}>
                                        <StarRating
                                            rating={4.5}
                                            onChange={() => null}
                                            color={'#1D9CD9'}
                                            starSize={13}
                                            maxStars={5}
                                            starStyle={{ width: 3 }}
                                        />
                                    </View>
                                    <Text style={{ marginHorizontal: 5, textAlignVertical: 'center' }}>(4.5)</Text>
                                </View>
                                {/* <View style={{ flexDirection: 'row' }}>
                                    <Image source={require('../../assets/blueMarker.png')} style={{ width: 20, height: 20 }} />
                                    <Text style={{}}>8 miles away</Text>
                                </View> */}


                            </View>
                            {/* <View>
                                <View style={{marginVertical:20}}>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Rating')}
                                        style={{ borderRadius: 10, backgroundColor: '#1872ea',  alignItems: 'center', justifyContent: 'center' ,paddingVertical:5,paddingHorizontal:10}}>
                                        <Text style={{ color: '#fff', fontSize: 14, fontWeight: 'bold' }}>Rate</Text>
                                    </TouchableOpacity>
                                </View>
                            </View> */}
                        </View>

                        <View style={{
                            margin: 10,
                            backgroundColor: 'white',
                            paddingHorizontal: 10,
                            paddingVertical: 15,
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2, },
                            shadowOpacity: 0.25,
                            shadowRadius: 4,
                            elevation: 5,
                        }}>
                            <View style={{}}>
                                {User.provider_as == 'business' ?
                                    <>
                                        < View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 3 }}>
                                            <Entypo name={'briefcase'} size={15} color={'#1872ea'} />
                                            <Text style={{ fontSize: 12, marginLeft: 5 }}>{User?.company_name}</Text>
                                        </View>
                                        < View style={{ width: '95%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginBottom: 3 }}>
                                            <FontAwesome name={'address-card'} size={15} color={'#1872ea'} />
                                            <Text style={{ fontSize: 12, marginLeft: 5 }}>{User?.company_address}</Text>
                                        </View>
                                    </>
                                    : null}
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 3 }}>
                                    <Entypo name={'mail'} size={15} color={'#1872ea'} />
                                    <Text style={{ fontSize: 12, marginLeft: 5, }}>{User.email}</Text>
                                </View>
                            </View>
                            <View style={{}}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 3 }}>
                                    <Entypo name={'phone'} size={15} color={'#1872ea'} />
                                    <Text style={{ fontSize: 12, marginLeft: 5, }}>{User.phone}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 3 }}>
                                    <Entypo name={'address'} size={15} color={'#1872ea'} />
                                    <Text style={{ fontSize: 12, marginLeft: 5, }}>{User.address}</Text>
                                </View>
                            </View>
                        </View>
                        {this.state.Services?.length > 0 ?
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('AddServices')} style={{
                                margin: 10, backgroundColor: 'white', padding: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5,
                            }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Services</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <FlatList
                                        numColumns={3}
                                        columnWrapperStyle={styles.teamsListContainer}
                                        style={styles.flex1}
                                        showsVerticalScrollIndicator={false}
                                        data={
                                            this.state.Services
                                        }
                                        renderItem={({ item }) => this.renderServicesList(item)}
                                    />
                                </View>
                            </TouchableOpacity>
                            : null}

                        <HStack marginY={3} alignSelf={'center'} space={'md'}>
                            <Button onPress={() => this.props.navigation.navigate('EditProfile')}
                                // onPress={this.onClick}
                                flex={1}
                                borderRadius={5}
                                paddingX={0}
                                bgColor="#1872ea">
                                <Heading fontSize="13" color="#fff">
                                    Edit Profile
                                </Heading>
                            </Button>
                            {/* <Button
                                onPress={this.onClick}
                                flex={1}
                                borderRadius={5}
                                backgroundColor="#1872ea">
                                <Heading fontSize="13" color="#fff">
                                    Chat
                                </Heading>
                            </Button> */}
                            <Button
                                onPress={() => this.props.navigation.navigate('FriendList')}
                                flex={1}
                                borderRadius={5}
                                backgroundColor="#1872ea">
                                <Heading fontSize="13" color="#fff">
                                    Friend List
                                </Heading>
                            </Button>
                        </HStack>
                        <View>
                            <FlatList
                                numColumns={3}
                                columnWrapperStyle={styles.PostListContainer}
                                style={styles.flex1}
                                showsVerticalScrollIndicator={false}
                                data={[
                                    { name: 'Realtors', img: require('../../assets/realtor.jpg') },
                                    { name: 'Artists', img: require('../../assets/c1.jpeg') },
                                    { name: 'Musicians', img: require('../../assets/realtor.jpg') },
                                    { name: 'Baby Sitter', img: require('../../assets/c2.jpeg') },
                                    { name: 'Electrition', img: require('../../assets/realtor.jpg') },
                                    { name: 'Beautician', img: require('../../assets/c1.jpeg') },
                                    { name: 'Realtors', img: require('../../assets/realtor.jpg') },
                                    { name: 'Artists', img: require('../../assets/c1.jpeg') },
                                    { name: 'Musicians', img: require('../../assets/realtor.jpg') },
                                    { name: 'Baby Sitter', img: require('../../assets/c2.jpeg') },
                                    { name: 'Electrition', img: require('../../assets/realtor.jpg') },
                                    { name: 'Beautician', img: require('../../assets/c1.jpeg') },
                                ]}
                                renderItem={({ item }) => this.renderPostsList(item)}
                            />
                        </View>
                    </View>
                </ScrollView >
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Upload')}
                    activeOpacity={0.7}
                    style={styles.fabBtn}>
                    <Entypo name="plus" size={28} color={'#fff'} />
                </TouchableOpacity>
            </View >
        );
    }
}

const mapStateToProps = state => ({
    user: state.AuthReducer.user,
});

const mapDispatchToProps = dispatch => ({
    Service_Index: paylaod => dispatch(ServicesMiddleware.Service_Index(paylaod)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        //   paddingHorizontal: 25,
        backgroundColor: "#fff",
    },

    flex1: { flex: 0 },

    teamContainer: {
        marginVertical: 8,
        marginHorizontal: 5,
        backgroundColor: '#eee',
        flex: 1,
        elevation: 2,
        alignItems: 'center',
        //   borderTopEndRadius: 20,
        //   borderTopLeftRadius: 20,
        overflow: 'hidden',
    },
    profileImg: {
        width: 80,
        height: 80,
    },
    teamsListContainer: {
        justifyContent: 'space-between',
        // paddingVertical:8
    },
    PostListContainer: {
        // marginHorizontal:10
    },
    ProfileName: {
        // padding: 8,
        fontSize: 18,
        color: 'black',
        alignSelf: 'flex-start',
        fontWeight: 'bold',
    },
    Profile: {
        padding: 8,
        fontSize: 12,
        // color: 'black',
        alignSelf: 'flex-end',
        fontWeight: '500',
    },
    fabBtn: {
        width: 56,
        height: 56,
        bottom: 15,
        right: 15,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#1D9CD9",
        position: 'absolute',
    },
});
