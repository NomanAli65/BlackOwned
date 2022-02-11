import { HStack, Icon, Input, Button } from 'native-base';
import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MyHeader from '../../components/MyHeader';


export default class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    renderUsersList = item => (
        <View style={styles.ListContainer}>
            <Image source={require('../../assets/realtor.jpg')} style={styles.ListImage} />
            <View style={{ flex: 1, paddingHorizontal: 10 }}>
                <View style={styles.inviteRecipientNameContainer}>
                    <Text style={styles.inviteRecipientName}>
                        John Doe
                    </Text>
                    <Text style={styles.fontSize16}>Wants to like this application</Text>
                    {/* <Text style={styles.inviteRecipientName}>
                        John Doe
                    </Text> */}
                </View>

                <View style={styles.flexRow}>
                    <Button
                        onPress={this.Login}
                        backgroundColor="primary.100"
                        style={{
                            width: 80,
                            borderRadius: 5,
                            marginHorizontal: 5,
                            height: 40,
                            elevation: 5,
                        }}>
                        Accept
                    </Button>
                    <Button
                        onPress={this.Login}
                        backgroundColor="grey"
                        style={{
                            width: 80,
                            borderRadius: 5,
                            marginHorizontal: 5,
                            height: 40,
                            elevation: 5,
                        }}>
                        Decline
                    </Button>

                </View>
                <Text style={{ alignSelf: 'flex-end', fontSize: 10, fontWeight: 'bold' }}>
                    8:30 pm
                </Text>

            </View>
        </View>
    );

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <MyHeader
                    back notify profile navigation={this.props.navigation}
                    title={this.props.route.name}
                    onBackPress={() => this.props.navigation.goBack()}
                />


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
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        //   paddingHorizontal: 25,
        backgroundColor: "#fff",
    },
    avatarImage: {
        width: 60,
        height: 60,
    },
    ListContainer: {
        width: '92%',
        alignSelf: 'center',
        marginVertical: 5,
        elevation: 3,
        alignItems: 'center',
        flexDirection: 'row',
        // justifyContent: 'space-between',
        padding: 10,
        backgroundColor: '#eee',
    },
    ListImage: {
        width: 100,
        height: 100,
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
    inviteRecipientNameContainer: {
        // flexDirection: 'row',
        // flexWrap: 'wrap',
        // flex: 1,
        // paddingHorizontal: 20,
        // alignItems: 'center',
    },
    inviteRecipientName: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    flex1: {
        flex: 1,
    },
    fontSize16: {
        fontSize: 16,
    },
    userContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 15,
    },
    flexRow: { flexDirection: 'row', marginVertical: 5 },
    actionBtnLeft: {
        width: 80,
        height: 40,
        marginRight: 3,
    },
    actionBtnRight: {
        width: 80,
        height: 40,
        marginLeft: 3,
    },
    colorWhite: {
        fontSize: 12,
        color: '#fff',
    },
})