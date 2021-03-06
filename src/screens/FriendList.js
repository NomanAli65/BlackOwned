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
import MyHeader from '../components/MyHeader';
import Feather from 'react-native-vector-icons/Feather';
import StarRating from 'react-native-star-rating-widget';

// import {Colors} from '../../Styles';



const { width } = Dimensions.get('window');

export default class FriendList extends Component {

    componentDidMount() {
        // Animated.timing(this.rotation, {
        //   toValue: 1,
        //   duration: 1000,
        //   useNativeDriver: true,
        // }).start();
    }

    renderUsersList = item => (

        <TouchableOpacity onPress={() => this.props.navigation.navigate('OtherProfile')}>
            <View style={{ flexDirection: 'row', backgroundColor: '#eee', padding: 10, marginVertical: 5 }}>
                {/* <View> */}
                <Image source={item.img} style={styles.profileImg} />
                {/* </View> */}
                <View style={{ paddingHorizontal: 10 }}>
                    <Text style={styles.ProfileName}>{item.name}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Image source={require('../assets/blueMarker.png')} style={{ width: 20, height: 20 }} />
                        <Text style={{}}>8 miles away</Text>
                    </View>
                </View>

                <View style={{}}>
                    <Text style={styles.Profile}>Musician</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
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
                </View>
            </View>
        </TouchableOpacity>

    );

    render() {

        return (
            <View style={styles.container}>
                <MyHeader
                    back notify profile navigation={this.props.navigation}
                    title={this.props.route.name}
                    onBackPress={() => this.props.navigation.goBack()}
                />
                <ScrollView>
                    <View style={{ paddingHorizontal: 20 }}>
                        <HStack
                            backgroundColor="#eee"
                            marginTop="2"
                            borderRadius={10}
                            alignItems="center"
                            paddingX="3">
                            <Icon as={Feather} name="search" size="sm" color="#aaa" />
                            <Input fontSize={14} placeholder="Search Service Provider" borderWidth={0} />
                        </HStack>
                        <FlatList
                            // numColumns={1}
                            // columnWrapperStyle={styles.teamsListContainer}
                            style={styles.flex1}
                            showsVerticalScrollIndicator={false}
                            data={[
                                { name: 'Alex will', img: require('../assets/1.jpeg') },
                                { name: 'John will', img: require('../assets/2.jpeg') },
                                { name: 'Max will', img: require('../assets/3.jpeg') },
                                { name: 'Marry will', img: require('../assets/4.jpeg') },
                                { name: 'Janifer will', img: require('../assets/3.jpeg') },
                                { name: 'Alex will', img: require('../assets/1.jpeg') },
                                { name: 'John will', img: require('../assets/2.jpeg') },
                                { name: 'Max will', img: require('../assets/5.jpeg') },
                                { name: 'Marry will', img: require('../assets/4.jpeg') },
                                { name: 'Janifer will', img: require('../assets/3.jpeg') },
                            ]}
                            renderItem={({ item }) => this.renderUsersList(item)}
                        />
                    </View>
                </ScrollView>
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
    },
    ProfileName: {
        padding: 8,
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
