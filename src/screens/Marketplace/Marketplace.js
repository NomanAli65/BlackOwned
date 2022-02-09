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
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

// import {Colors} from '../../Styles';



const { width } = Dimensions.get('window');

export default class Marketplace extends Component {

    componentDidMount() {
        // Animated.timing(this.rotation, {
        //   toValue: 1,
        //   duration: 1000,
        //   useNativeDriver: true,
        // }).start();
    }

    renderSponsorList = item => (
        <TouchableOpacity onPress={() => this.props.navigation.navigate('ProductDetails')} style={styles.sponsorContainer}>
            <Image source={require('../../assets/realtor.jpg')} style={styles.teamImage} />
            <View style={{ position: 'absolute', right: 0, padding: 4, backgroundColor: '#fff', borderRadius: 8, margin: 5 }}>
                {/* <TouchableOpacity onPress={() => console.warn('Touch')}> */}
                <FontAwesome5 name={'crown'} size={15} color={'#1872ea'} />
                {/* </TouchableOpacity> */}
            </View>
            <Text style={styles.sponsorName}>{item}</Text>
            <Text style={styles.sponsorPrice}>$500.50</Text>
        </TouchableOpacity>
    );

    renderProductList = item => (
        <TouchableOpacity onPress={() => this.props.navigation.navigate('ProductDetails')} style={styles.sponsorContainer}>
            <Image source={require('../../assets/realtor.jpg')} style={styles.teamImage} />
            {/* <View style={{ position: 'absolute', right: 0, padding: 4, backgroundColor: '#fff', borderRadius: 8, margin: 5 }}>
                <TouchableOpacity onPress={() => console.warn('Touch')}>
                    <Image source={require('../../assets/blueMarker.png')} style={{ width: 20, height: 20 }} />
                </TouchableOpacity>
            </View> */}
            <Text style={styles.sponsorName}>{item}</Text>
            <Text style={styles.sponsorPrice}>$500.50</Text>
        </TouchableOpacity>
    );

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <MyHeader
                     back notify profile navigation={this.props.navigation}
                    title={this.props.route.name}
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
                                'Realtors',
                                'Artists',
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
                                'Realtors',
                                'Artists',
                                'Musicians',
                                'Baby Sitter',
                                'Beautician',
                                'Electrition',
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
