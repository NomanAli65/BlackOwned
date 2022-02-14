import React, { Component } from 'react';
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
import { View, Text, Image, StyleSheet } from 'react-native';
import MyHeader from '../../components/MyHeader';
import Feather from 'react-native-vector-icons/Feather';


export default class ProductDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <MyHeader
                     back notify profile navigation={this.props.navigation}
                    // title={this.props.route.name}
                    title={'Product Details'}
                    onBackPress={() => this.props.navigation.goBack()}
                />
                <View style={styles.ListContainer}>

                    <ScrollView>

                        <Image source={require('../../assets/realtor.jpg')} style={styles.ListImage} />
                        <View>
                            <Text adjustsFontSizeToFit numberOfLines={1} style={styles.ListName}>Electro Music Instrument</Text>
                            <Text style={styles.sponsorPrice}>$500.50</Text>

                            <Text style={styles.ListDescription}>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                Lorem Ipsum has been the industry's standard dummy text ever since
                                the 1500s, when an unknown printer took a galley of type and scrambled it to
                                make a type specimen book.
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                Lorem Ipsum has been the industry's standard dummy text ever since
                                the 1500s, when an unknown printer took a galley of type and scrambled it to
                                make a type specimen book.
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.

                            </Text>
                        </View>

                        <HStack marginY={10} alignSelf={'center'} space={'md'}>
                            <Button
                                onPress={this.onClick}
                                flex={1}
                                borderRadius={5}
                                paddingX={0}
                                bgColor="#1872ea">
                                <Heading fontSize="13" color="#fff">
                                    Chat
                                </Heading>
                            </Button>
                            <Button
                                onPress={this.onClick}
                                flex={1}
                                borderRadius={5}
                                backgroundColor="#1872ea">
                                <Heading fontSize="13" color="#fff">
                                    Email
                                </Heading>
                            </Button>
                            <Button
                                onPress={() => this.props.navigation.navigate('FriendList')}
                                flex={1}
                                borderRadius={5}
                                backgroundColor="#1872ea">
                                <Heading fontSize="13" color="#fff">
                                    Call
                                </Heading>
                            </Button>
                        </HStack>
                    </ScrollView>

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

    ListContainer: {
        flex: 1,
        width: '93%',
        marginVertical: 10,
        alignSelf: 'center',
        backgroundColor: '#fff'
    },
    ListImage: {
        width: '100%',
        height: 240,
        resizeMode: 'cover'
    },
    teamsListContainer: {
        justifyContent: 'space-between',
    },
    ListName: {
        marginTop: 5,
        fontSize: 18,
        color: 'black',
        fontWeight: 'bold',
    },
    ListDistances: {
        fontSize: 13,
        fontWeight: 'normal',
    },
    ListDescription: {
        marginVertical: 5,
        fontSize: 13,
        fontWeight: 'normal',
        color: 'black',
    },
    ListAddImage: {
        marginRight: 5,
    },
    sponsorPrice: {
        fontSize: 14,
        color: '#1D9CD9',
        alignSelf: 'flex-start',
        fontWeight: 'bold'
    },

})