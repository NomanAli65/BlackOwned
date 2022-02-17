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
import Octicons from 'react-native-vector-icons/Octicons';
// import {Colors} from '../../Styles';



const { width } = Dimensions.get('window');

export default class Services extends Component {

    componentDidMount() {
        // Animated.timing(this.rotation, {
        //   toValue: 1,
        //   duration: 1000,
        //   useNativeDriver: true,
        // }).start();
    }

    renderUsersList = item => (
        <TouchableOpacity onPress={() => this.props.navigation.navigate('ServiceDetail', { name: item })} activeOpacity={0.7} style={styles.teamContainer}>
            <Image source={item.img} style={styles.teamImage} />
            <Text style={styles.teamName}>{item.name}</Text>
        </TouchableOpacity>
    );

    render() {
        return (
            <ScrollView style={styles.container}>
                <MyHeader
                    notify profile navigation={this.props.navigation}
                    title={'Services'}
                    onBackPress={() => this.props.navigation.goBack()}
                />
                <View style={{ paddingHorizontal: 20 }}>
                    <HStack
                        backgroundColor="#eee"
                        marginTop="2"
                        borderRadius={10}
                        alignItems="center"
                        paddingX="3">
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', width: '90%' }}>
                                <Icon as={Feather} name="search" size="sm" color="#aaa" />
                                <Input fontSize={14} placeholder="Search Service Provider" borderWidth={0} />
                            </View>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('ServicesFilter')}>
                                <Icon as={Octicons} name="settings" size="sm" color="#aaa" />
                            </TouchableOpacity>
                        </View>
                    </HStack>
                    <FlatList
                        numColumns={2}
                        columnWrapperStyle={styles.teamsListContainer}
                        style={styles.flex1}
                        showsVerticalScrollIndicator={false}
                        data={[
                            { name: 'Realtors', img: require('../../assets/realtor.jpg') },
                            { name: 'Artists', img: require('../../assets/c1.jpeg') },
                            { name: 'Plumber', img: require('../../assets/c3.jpeg') },
                            { name: 'Electrician', img: require('../../assets/c2.jpeg') },
                            { name: 'Baby Sitter', img: require('../../assets/realtor.jpg') },
                            { name: 'Musicians', img: require('../../assets/c1.jpeg') },
                            { name: 'Plumber', img: require('../../assets/c3.jpeg') },
                            { name: 'Beautician', img: require('../../assets/c2.jpeg') },

                        ]}
                        renderItem={({ item }) => this.renderUsersList(item)}
                    />
                </View>
            </ScrollView>
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
        //   backgroundColor: 'grey',
        flex: 1,
        elevation: 2,
        alignItems: 'center',
        //   borderTopEndRadius: 20,
        //   borderTopLeftRadius: 20,
        overflow: 'hidden',
    },
    teamImage: {
        width: '100%',
        height: 100,
    },
    teamsListContainer: {
        justifyContent: 'space-between',
    },
    teamName: {
        padding: 8,
        fontSize: 12,
        color: 'black',
        alignSelf: 'flex-start',
        fontWeight: '500',
    },
});
