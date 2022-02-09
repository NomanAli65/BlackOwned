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
        <TouchableOpacity onPress={() => this.props.navigation.navigate('ServicesFilter')} activeOpacity={0.7} style={styles.teamContainer}>
            <Image source={require('../../assets/realtor.jpg')} style={styles.teamImage} />
            <Text style={styles.teamName}>{item}</Text>
        </TouchableOpacity>
    );

    render() {
        return (
            <ScrollView style={styles.container}>
                <MyHeader
                     back notify profile navigation={this.props.navigation}
                    title={this.props.route.name}
                    onBackPress={() => this.props.navigation.goBack()}
                />
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
