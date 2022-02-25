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
import { ItemClick } from 'native-base/lib/typescript/components/composites/Typeahead/useTypeahead/types';
import { imgURL } from '../../configs/AxiosConfig';


export default class ProductDetails extends Component {
    state = {
        loader: true,
        detailsData: [],
    };

    componentDidMount() {
        let data = this.props.route.params.data
        this.setState({ detailsData: data })

    }

    render() {
        const { detailsData } = this.state;
        // console.warn(detailsData?.user?.email);
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

                        <Image source={detailsData.image ?
                            {
                                uri: imgURL + detailsData.image
                            } : require('../../assets/user.png')
                        } style={styles.ListImage}  resizeMode="contain" />
                        <View>
                            <Text adjustsFontSizeToFit numberOfLines={1} style={styles.ListName}>{detailsData.name}</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.sponsorPrice}>{detailsData.discounted_price}</Text>
                                <Text style={styles.discountPrice}>{detailsData.price}</Text>
                            </View>

                            <Text style={styles.ListDescription}>{detailsData.description}</Text>
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
        // fontWeight: 'bold',
        marginHorizontal: 5,
    },
    discountPrice: {
        fontSize: 14,
        color: '#1D9CD9',
        alignSelf: 'flex-start',
        // fontWeight: 'bold',
        textDecorationLine: 'line-through',
        marginHorizontal: 5,
    },

})