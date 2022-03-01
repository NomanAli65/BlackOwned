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
import { Image, Dimensions, View, Animated, TouchableOpacity, Text, FlatList, StyleSheet, Linking } from 'react-native';
import MyHeader from '../../components/MyHeader';
import Feather from 'react-native-vector-icons/Feather';
import StarRating from 'react-native-star-rating-widget';
import Entypo from 'react-native-vector-icons/Entypo';
import { imgURL } from '../../configs/AxiosConfig';
// import {Colors} from '../../Styles';
import { connect } from 'react-redux';
import { ServicesMiddleware } from '../../redux/middleware/ServicesMiddleware';



const { width } = Dimensions.get('window');

class OtherProfile extends Component {

    state = {
        loader: true,
        search: '',
    };
    componentDidMount() {
        this.props.getAllServiceById({ providerid: this.props.route.params.data.provider_id })
        // .then(() => this.setState({ loader: false }))
        // .catch(() => this.setState({ loader: false }));
    }

    renderServicesList = item => (

        <View >
            <Text style={{ fontSize: 12, }}>{item?.name}</Text>
        </View>

    );

    renderPostsList = item => (

        <TouchableOpacity >
            <View style={{ margin: 3 }}>
                <Image source={require('../../assets/c1.jpeg')} style={{ width: 100, height: 100, borderRadius: 5 }} />
            </View>
        </TouchableOpacity>

    );
    OnCallPress = () => {
        console.warn("hello");
        let phoneNumber = '090078601'
        Linking.openURL(`tel:${phoneNumber}`)
    }
    // OnEmailPress = () => {
    //     console.warn("hello email");
    //     let email = 'Care@amazon.com'
    //     Linking.openURL('mailto:' + email)
    // }

    render() {
        let data = this.props.route.params.data
        const { getServicesByIdData,  } = this.props;
        console.warn('Dataa',  getServicesByIdData,);
        return (
            <View style={styles.container}>
                <MyHeader
                    back notify profile navigation={this.props.navigation}
                    title={'Profile'}
                    onBackPress={() => this.props.navigation.goBack()}
                />
                <ScrollView>
                    <View style={{ paddingHorizontal: 20 }}>

                        <View style={{ flexDirection: 'row', backgroundColor: '#eee', padding: 15, marginVertical: 5 }}>
                            <Image source={data?.profile_pic ?
                                {
                                    uri: imgURL + data?.profile_pic
                                } : require('../../assets/user.png')
                            } style={styles.profileImg} />
                            <View style={{ paddingHorizontal: 10, }}>
                                <Text style={styles.ProfileName}>{data?.username}</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ alignSelf: 'center' }}>
                                        <StarRating
                                            rating={data?.rating?.rating}
                                            onChange={() => null}
                                            color={'#1D9CD9'}
                                            starSize={13}
                                            maxStars={5}
                                            starStyle={{ width: 2 }}
                                        />
                                    </View>
                                    <Text style={{ marginHorizontal: 5, textAlignVertical: 'center' }}>{data?.rating?.rating}</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Image source={require('../../assets/blueMarker.png')} style={{ width: 20, height: 20 }} />
                                    <Text style={{}}>8 miles away</Text>
                                </View>

                            </View>
                            <View>
                                <View style={{ marginVertical: 20 }}>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Rating', { provider_id: data?.provider_id, UserImage: data?.profile_pic, UserName: data?.username })}
                                        style={{ borderRadius: 6, backgroundColor: '#1872ea', alignItems: 'center', justifyContent: 'center', paddingVertical: 5, paddingHorizontal: 10 }}>
                                        <Text style={{ color: '#fff', fontSize: 14, fontWeight: 'bold' }}>Rate</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        <View style={{
                            margin: 10, backgroundColor: 'white', padding: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5,
                        }}>
                            <View style={{}}>
                                <View style={{ flexDirection: 'row', marginBottom: 3 }}>
                                    <Entypo name={'briefcase'} size={15} color={'#1872ea'} />

                                    {/* <Image source={require('../../assets/blueMarker.png')} style={{ width: 15, height: 15 }} /> */}
                                    <Text style={{ fontSize: 12, marginLeft: 5 }}>{data?.service_name + ' (Professional)'}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginBottom: 3 }}>
                                    <Entypo name={'mail'} size={15} color={'#1872ea'} />
                                    <Text style={{ fontSize: 12, marginLeft: 5, }}>{data?.email}</Text>
                                </View>
                            </View>
                            <View style={{}}>
                                <View style={{ flexDirection: 'row', marginBottom: 3 }}>
                                    <Entypo name={'phone'} size={15} color={'#1872ea'} />
                                    <Text style={{ fontSize: 12, marginLeft: 5, }}>{data?.phone}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginBottom: 3 }}>
                                    <Entypo name={'address'} size={15} color={'#1872ea'} />
                                    <Text style={{ fontSize: 12, marginLeft: 5, }}>{data?.address}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={{
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
                                    data={getServicesByIdData}
                                    renderItem={({ item }) => this.renderServicesList(item)}
                                />
                            </View>
                        </View>

                        <HStack marginY={3} alignSelf={'center'} space={'md'}>
                            <Button
                                onPress={this.OnCallPress}
                                flex={1}
                                borderRadius={5}
                                paddingX={0}
                                bgColor="#1872ea">
                                <Heading fontSize="13" color="#fff">
                                    Call
                                </Heading>
                            </Button>
                            <Button
                                onPress={this.onClick}
                                flex={1}
                                borderRadius={5}
                                backgroundColor="#1872ea">
                                <Heading fontSize="13" color="#fff">
                                    Chat
                                </Heading>
                            </Button>
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
                        <FlatList
                            numColumns={3}
                            columnWrapperStyle={styles.PostListContainer}
                            style={styles.flex1}
                            showsVerticalScrollIndicator={false}
                            data={[
                                'Realtors',
                                'Artists',
                                'Musicians',
                                'Baby Sitter',
                                'Beautician',
                                'Electrition',
                                'Electrition',
                                'Electrition',
                            ]}
                            renderItem={({ item }) => this.renderPostsList(item)}
                        />
                    </View>
                </ScrollView>
            </View>
        );
    }
}
const mapStateToProps = state => {
    return {
        // role: state.Auth.role,
        // user: state.Auth.user,
        getServicesByIdData: state.ServicesReducer.getServicesByIdData,
        getServicesByIdData_list: state.ServicesReducer.getServicesByIdData_list,
    };
};
const mapDispatchToProps = dispatch => ({
    // Login: data => dispatch(AuthMiddleware.Login(data)),
    // Login: data => dispatch(AuthMiddleware.Login(data)),

    getAllServiceById: (payload) =>
        dispatch(ServicesMiddleware.getAllServiceById(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OtherProfile);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        //   paddingHorizontal: 25,
        backgroundColor: "#fff",
    },

    flex1: { flex: 1 },

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
        fontSize: 16,
        color: 'black',
        alignSelf: 'flex-start',
        fontWeight: '500',
    },
    Profile: {
        padding: 8,
        fontSize: 12,
        // color: 'black',
        alignSelf: 'flex-end',
        fontWeight: '500',
    },
});
