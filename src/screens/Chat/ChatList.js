import { HStack, Icon, Input } from 'native-base';
import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MyHeader from '../../components/MyHeader';


export default class ChatList extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    renderUsersList = item => (
        <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Chat')}
            activeOpacity={0.7} style={styles.ListContainer}>
            <View style={{ flexDirection: 'row', alignItems: 'center', width: '70%' }}>
                <Image source={item.img} style={styles.ListImage} />
                <View style={{ marginLeft: 10, }}>
                    <Text style={styles.ListName}>{item.name}</Text>
                    <Text numberOfLines={1} style={{}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Text>
                </View>
            </View>

            {/* <TouchableOpacity style={styles.ListAddImage}>
                <Ionicons name={'person-add'} size={30} color={'#000'} />
            </TouchableOpacity> */}
            <Text style={{}}>3 min ago</Text>
        </TouchableOpacity>
    );

    render() {
        return (
            <View style={{ flex: 1 }}>
                <MyHeader
                    back notify profile navigation={this.props.navigation}
                    // title={this.props.route.name}
                    title={'Chat'}
                    onBackPress={() => this.props.navigation.goBack()}
                />
                <View style={{ justifyContent: 'center', flex: 1 }}>
                    <View style={{ marginHorizontal: 10 }}>
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
                        <View style={{ marginBottom: 15 }}>
                            <Text style={{ fontSize: 28, color: 'black', fontWeight: 'bold', }}>Chat</Text>
                            <Text style={{ fontSize: 15, }}>You have 2 new messages</Text>
                        </View>
                    </View>
                    <FlatList
                        style={{ paddingHorizontal: 10, backgroundColor: '#fff' }}
                        showsVerticalScrollIndicator={false}
                        data={[
                            { name: 'Alex will', img: require('../../assets/1.jpeg') },
                            { name: 'John will', img: require('../../assets/2.jpeg') },
                            { name: 'Max will', img: require('../../assets/3.jpeg') },
                            { name: 'Marry will', img: require('../../assets/4.jpeg') },
                            { name: 'Janifer will', img: require('../../assets/3.jpeg') },
                            { name: 'Alex will', img: require('../../assets/1.jpeg') },
                            { name: 'John will', img: require('../../assets/2.jpeg') },
                            { name: 'Max will', img: require('../../assets/5.jpeg') },
                            { name: 'Marry will', img: require('../../assets/4.jpeg') },
                            { name: 'Janifer will', img: require('../../assets/3.jpeg') },
                        ]}
                        renderItem={({ item }) => this.renderUsersList(item)}
                    // ListFooterComponent={<View style={{ marginBottom: 20, }}><Text></Text></View>}
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
        width: 50,
        height: 50,
        borderRadius: 5
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