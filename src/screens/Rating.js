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

export default class Rating extends Component {
    state = {
        rate: 2.5,

    };

    componentDidMount() {
        // Animated.timing(this.rotation, {
        //   toValue: 1,
        //   duration: 1000,
        //   useNativeDriver: true,
        // }).start();
    }



    render() {

        return (
            <View style={styles.container}>
                <MyHeader
                     back notify profile navigation={this.props.navigation}
                    title={this.props.route.name}
                    onBackPress={() => this.props.navigation.goBack()}
                />
                <View style={{height:'100%',justifyContent:'center',padding:20}}>
                    <View style={{ backgroundColor: '#eee', paddingVertical: 50, marginVertical: 5, alignItems: 'center' }}>
                        <Image source={require('../assets/1.jpeg')} style={styles.profileImg} />
                        <View style={{ alignItems: 'center' }}>
                            <View>
                                <Text style={styles.ProfileName}>Stacy Stratus</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ alignSelf: 'center' }}>
                                    <StarRating
                                        rating={this.state.rate}
                                        onChange={(value) => this.setState({ rate: value })}
                                        color={'#1D9CD9'}
                                        starSize={30}
                                        maxStars={5}
                                        starStyle={{}}
                                    />
                                </View>
                            </View>
                        </View>
                        <View>
                            <View style={{ marginVertical: 20 }}>
                                <TouchableOpacity onPress={() => this.props.navigation.goBack()}
                                    style={{ borderRadius: 2, backgroundColor: '#1872ea', alignItems: 'center', justifyContent: 'center', paddingVertical: 10, paddingHorizontal: 50 }}>
                                    <Text style={{ color: '#fff', fontSize: 14, fontWeight: 'bold' }}>Submit</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
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
        width: 120,
        height: 120,
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
