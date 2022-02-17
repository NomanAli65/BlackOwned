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

// import {Colors} from '../../Styles';



const { width } = Dimensions.get('window');

export default class UserProfile extends Component {

    componentDidMount() {
        // Animated.timing(this.rotation, {
        //   toValue: 1,
        //   duration: 1000,
        //   useNativeDriver: true,
        // }).start();
    }

    renderServicesList = item => (

        <View >
            <Text style={{ fontSize: 12, }}>{item}</Text>
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
                            <Image source={require('../../assets/1.jpeg')} style={styles.profileImg} />
                            <View style={{ paddingHorizontal: 10, }}>
                                <Text style={styles.ProfileName}>Stacy Stratus</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ alignSelf: 'center' }}>
                                        <StarRating
                                            rating={4.5}
                                            onChange={() => null}
                                            color={'#1D9CD9'}
                                            starSize={13}
                                            maxStars={5}
                                            starStyle={{ width: 2 }}
                                        />
                                    </View>
                                    <Text style={{ marginHorizontal: 5, textAlignVertical: 'center' }}>(4.5)</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Image source={require('../../assets/blueMarker.png')} style={{ width: 20, height: 20 }} />
                                    <Text style={{}}>8 miles away</Text>
                                </View>

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
                                <View style={{ flexDirection: 'row', marginBottom: 3 }}>
                                    <Entypo name={'briefcase'} size={15} color={'#1872ea'} />

                                    {/* <Image source={require('../../assets/blueMarker.png')} style={{ width: 15, height: 15 }} /> */}
                                    <Text style={{ fontSize: 12, marginLeft: 5 }}>Realtor (Professional)</Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginBottom: 3 }}>
                                    <Entypo name={'mail'} size={15} color={'#1872ea'} />
                                    <Text style={{ fontSize: 12, marginLeft: 5, }}>JohnDoe@Blackowned@gmail.com</Text>
                                </View>
                            </View>
                            <View style={{}}>
                                <View style={{ flexDirection: 'row', marginBottom: 3 }}>
                                    <Entypo name={'phone'} size={15} color={'#1872ea'} />
                                    <Text style={{ fontSize: 12, marginLeft: 5, }}>(555)555-1234</Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginBottom: 3 }}>
                                    <Entypo name={'address'} size={15} color={'#1872ea'} />
                                    <Text style={{ fontSize: 12, marginLeft: 5, }}>NewYork,USA</Text>
                                </View>
                            </View>
                        </View>

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
                                    data={[
                                        'Realtors',
                                        'Artists',
                                        'Musicians',
                                        'Baby Sitter',
                                        'Beautician',
                                        'Electrition',
                                    ]}
                                    renderItem={({ item }) => this.renderServicesList(item)}
                                />
                            </View>
                        </TouchableOpacity>

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
                </ScrollView>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Upload')}
                    activeOpacity={0.7}
                    style={styles.fabBtn}>
                    <Entypo name="plus" size={28} color={'#fff'} />
                </TouchableOpacity>
            </View>
        );
    }
}

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
