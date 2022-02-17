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
import { Image, Dimensions, View, Animated, TouchableOpacity, Text, FlatList, StyleSheet, Modal } from 'react-native';
import MyHeader from '../../components/MyHeader';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

// import {Colors} from '../../Styles';



const { width } = Dimensions.get('window');

export default class Marketplace extends Component {
    state = {
        SponsorModal: true,
    };
    componentDidMount() {
        // Animated.timing(this.rotation, {
        //   toValue: 1,
        //   duration: 1000,
        //   useNativeDriver: true,
        // }).start();
    }

    renderSponsorList = item => (
        <TouchableOpacity onPress={() => this.props.navigation.navigate('ProductDetails')} style={styles.sponsorContainer}>
            <Image source={item.img} style={styles.teamImage} />
            <View style={{ position: 'absolute', right: 0, padding: 4, backgroundColor: '#fff', borderRadius: 8, margin: 5 }}>
                {/* <TouchableOpacity onPress={() => console.warn('Touch')}> */}
                <FontAwesome5 name={'crown'} size={15} color={'#1872ea'} />
                {/* </TouchableOpacity> */}
            </View>
            <Text style={styles.sponsorName}>{item.name}</Text>
            <Text style={styles.sponsorPrice}>$500.50</Text>
        </TouchableOpacity>
    );

    renderProductList = item => (
        <TouchableOpacity onPress={() => this.props.navigation.navigate('ProductDetails')} style={styles.sponsorContainer}>
            <Image source={item.img} style={styles.teamImage} />
            {/* <View style={{ position: 'absolute', right: 0, padding: 4, backgroundColor: '#fff', borderRadius: 8, margin: 5 }}>
                <TouchableOpacity onPress={() => console.warn('Touch')}>
                    <Image source={require('../../assets/blueMarker.png')} style={{ width: 20, height: 20 }} />
                </TouchableOpacity>
            </View> */}
            <Text style={styles.sponsorName}>{item.name}</Text>
            <Text style={styles.sponsorPrice}>$500.50</Text>
        </TouchableOpacity>
    );

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <MyHeader
                    back notify profile navigation={this.props.navigation}
                    // title={this.props.route.name}
                    title={'Market Place'}
                    onBackPress={() => this.props.navigation.goBack()}
                />
                <ScrollView style={styles.container}>

                    <View style={{ paddingHorizontal: 20 }}>
                        <HStack
                            backgroundColor="#eee"
                            marginTop="2"
                            borderRadius={10}
                            alignItems="center"
                            paddingX="3">
                            <Icon as={Feather} name="search" size="sm" color="#aaa" />
                            <Input fontSize={14} placeholder="Search" borderWidth={0} />
                        </HStack>

                        <View style={{ marginVertical: 10 }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Sponsored</Text>
                        </View>
                        <FlatList
                            numColumns={2}
                            columnWrapperStyle={styles.teamsListContainer}
                            style={styles.flex1}
                            showsVerticalScrollIndicator={false}
                            data={[
                                { name: 'Realtors', img: require('../../assets/realtor.jpg') },
                                { name: 'Artists', img: require('../../assets/c2.jpeg') },

                            ]}
                            renderItem={({ item }) => this.renderSponsorList(item)}
                        />

                        <View style={{ marginVertical: 10 }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Products</Text>
                        </View>
                        <FlatList
                            numColumns={2}
                            columnWrapperStyle={styles.teamsListContainer}
                            style={styles.flex1}
                            showsVerticalScrollIndicator={false}
                            data={[
                                { name: 'Realtors', img: require('../../assets/realtor.jpg') },
                                { name: 'Artists', img: require('../../assets/c1.jpeg') },

                                { name: 'Baby Sitter', img: require('../../assets/c2.jpeg') },

                                { name: 'Beautician', img: require('../../assets/c1.jpeg') },
                                { name: 'Realtors', img: require('../../assets/realtor.jpg') },
                                { name: 'Artists', img: require('../../assets/c1.jpeg') },

                                { name: 'Baby Sitter', img: require('../../assets/c2.jpeg') },
                                { name: 'Electrition', img: require('../../assets/realtor.jpg') },
                                { name: 'Beautician', img: require('../../assets/c1.jpeg') },
                            ]}
                            renderItem={({ item }) => this.renderProductList(item)}
                        />
                    </View>

                </ScrollView>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('AddProduct')}
                    activeOpacity={0.7}
                    style={styles.fabBtn}>
                    <Entypo name="plus" size={28} color={'#fff'} />
                </TouchableOpacity>

                <Modal
                    animationType={'fade'}
                    transparent={true}
                    visible={this.state.SponsorModal}
                    onRequestClose={() => this.setState({ SponsorModal: false })}>
                    <View
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'rgba(0,0,0,0.50)',
                        }}>
                        <View

                            style={{
                                height: 360,
                                width: '90%',
                                borderRadius: 14,
                                //alignItems: 'center',
                                backgroundColor: '#fff',
                                // justifyContent: 'center',
                            }}>

                            <View style={{ width: '100%', alignItems: 'center' }}>
                                <TouchableOpacity
                                    style={{ position: 'absolute', zIndex: 1, alignSelf: 'flex-end', right: 8 }}
                                    onPress={() => {
                                        this.setState({ SponsorModal: false });
                                    }}>
                                    <Entypo
                                        name={'circle-with-cross'}
                                        size={24}
                                        //  color={'#1872ea'}
                                        color={'#fff'}
                                        style={{ marginLeft: 5, marginTop: 7 }}
                                    />
                                </TouchableOpacity>
                                <Image source={require('../../assets/realtor.jpg')} style={{
                                    width: '100%',
                                    height: 220,
                                    resizeMode: 'cover',
                                    borderTopLeftRadius: 14,
                                    borderTopRightRadius: 14,
                                }} />
                                <Text style={{ fontSize: 20, color: '#000', fontWeight: 'bold' }}>Guitar</Text>
                                <Text style={{ fontSize: 16, color: '#000', fontWeight: 'bold' }}>$259.50</Text>
                                <Text numberOfLines={3} style={{ fontSize: 13, color: '#000', fontWeight: 'normal', textAlign: 'center' }}> Lorem Ipsum is simply dummy text of
                                    the printing and typesetting industry.
                                    Lorem Ipsum has been the industry's
                                    standard dummy text ever since
                                </Text>
                            </View>

                        </View>
                    </View>
                </Modal>

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

    sponsorContainer: {
        marginVertical: 8,
        marginHorizontal: 5,
        flex: 1,

    },
    teamImage: {
        width: '100%',
        height: 100,
        borderRadius: 5
    },
    teamsListContainer: {
        justifyContent: 'space-between',
    },
    sponsorName: {
        paddingTop: 8,
        fontSize: 12,
        color: 'black',
        alignSelf: 'center',
        fontWeight: '500',
    },
    sponsorPrice: {
        fontSize: 12,
        color: '#1D9CD9',
        alignSelf: 'center',
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
