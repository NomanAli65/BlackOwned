import { HStack, Icon, Input } from 'native-base';
import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

export default class FriendList extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    renderUsersList = item => (
        <TouchableOpacity activeOpacity={0.7} style={styles.ListContainer}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={require('../../assets/realtor.jpg')} style={styles.ListImage} />
                <Text style={styles.ListName}>{item}</Text>
            </View>

            {/* <TouchableOpacity style={styles.ListAddImage}>
                <Ionicons name={'person-add'} size={30} color={'#000'} />
            </TouchableOpacity> */}
        </TouchableOpacity>
    );

    render() {
        return (
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
                    ListFooterComponent={<View style={{ marginBottom: 20, }}><Text></Text></View>}

                />
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
        width: 50,
        height: 50,
    },
    teamsListContainer: {
        justifyContent: 'space-between',
    },
    ListName: {
        marginLeft: 10,
        fontSize: 15,
        color: 'black',
        fontWeight: 'bold',
    },
    ListAddImage: {
        marginRight: 5,
    },
})