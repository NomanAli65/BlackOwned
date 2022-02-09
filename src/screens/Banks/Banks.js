import { HStack, Icon, Input } from 'native-base';
import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MyHeader from '../../components/MyHeader';

export default class NetworkList extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    renderUsersList = item => (
        <TouchableOpacity activeOpacity={0.7} style={styles.ListContainer}>
            {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}> */}
            <Image source={require('../../assets/realtor.jpg')} style={styles.ListImage} />
            <View>
                <Text style={styles.ListName}>{item}</Text>
                <Text style={styles.ListDistances}>4 miles</Text>
            </View>

            {/* </View> */}
        </TouchableOpacity>
    );

    render() {
        return (
            <View style={{ flex: 1 }}>
                <MyHeader
                     back notify profile navigation={this.props.navigation}
                    title={'Network'}
                    onBackPress={() => this.props.navigation.goBack()}
                />
                <View style={{ marginHorizontal: 10, justifyContent: 'center' }}>
                    <HStack
                        backgroundColor="#e1e1e1"
                        marginTop="2.5"
                        marginBottom={'2'}
                        borderRadius={10}
                        alignItems="center"
                        paddingX="3"
                    >
                        <Icon as={Feather} name="search" size="sm" color="#aaa" />
                        <Input fontSize={14} placeholder="Search" borderWidth={0} />
                    </HStack>
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
        // justifyContent: 'space-between',
        // backgroundColor: 'red',
    },
    ListImage: {
        width: 55,
        height: 55,
    },
    teamsListContainer: {
        justifyContent: 'space-between',
    },
    ListName: {
        marginLeft: 12,
        fontSize: 16,
        color: 'black',
        fontWeight: 'bold',
    },
    ListDistances: {
        marginLeft: 12,
        fontSize: 13,
        fontWeight: 'normal',
    },
    ListAddImage: {
        marginRight: 5,
    },
})