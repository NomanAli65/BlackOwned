import { HStack, Icon, Input } from 'native-base';
import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MyHeader from '../../components/MyHeader';

export default class Jobs extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    renderUsersList = item => (
        <TouchableOpacity activeOpacity={0.7} style={styles.ListContainer}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={require('../../assets/realtor.jpg')} style={styles.ListImage} />
                <View style={{ marginLeft: 10, }}>
                    <Text style={styles.ListName}>John Doe</Text>
                    <Text >{item}</Text>
                </View>
            </View>

            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity style={styles.ListAddImage}>
                    <Image source={require('../../assets/callBlue.png')} style={{ width: 30, height: 30 }} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.ListAddImage}>
                    <Image source={require('../../assets/chatBlue.png')} style={{ width: 30, height: 30 }} />
                </TouchableOpacity>
            </View>
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
                <View style={{ marginHorizontal: 10, justifyContent: 'center' }}>


                    <FlatList
                        style={styles.flex1}
                        showsVerticalScrollIndicator={false}
                        data={[
                            'Realtors',
                            'Artists',
                            'Musicians',
                            'Baby Sitter',
                            'Beautician',
                            'Electrition',
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
        width: '100%',
        marginVertical: 10,
        elevation: 2,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        // backgroundColor: 'red',
    },
    ListImage: {
        width: 80,
        height: 80,
    },
    teamsListContainer: {
        justifyContent: 'space-between',
    },
    ListName: {
        fontSize: 15,
        color: 'black',
        fontWeight: 'bold',
    },
    ListAddImage: {
        marginRight: 5,
    },
})