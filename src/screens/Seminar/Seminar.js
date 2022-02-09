import { HStack, Icon, Input } from 'native-base';
import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MyHeader from '../../components/MyHeader';

export default class Seminar extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    renderUsersList = item => (
        <TouchableOpacity activeOpacity={0.7} style={styles.ListContainer}>
            <Image source={require('../../assets/realtor.jpg')} style={styles.ListImage} />
            <View>
                <Text adjustsFontSizeToFit numberOfLines={1} style={styles.ListName}>{item}</Text>
                <Text style={styles.ListDistances}>15 january 2022 | 09:30</Text>
                <Text style={styles.ListDescription}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Text>
            </View>
        </TouchableOpacity>
    );

    render() {
        return (
            <View style={{ flex: 1 }}>
                <MyHeader
                     back notify profile navigation={this.props.navigation}
                    title={'Seminar'}
                    onBackPress={() => this.props.navigation.goBack()}
                />
                <View style={{ marginHorizontal: 15 }}>
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
    },
    ListImage: {
        width: '100%',
        height: 180,
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
        fontSize: 13,
        fontWeight: 'normal',
        color: 'black',
    },
    ListAddImage: {
        marginRight: 5,
    },
})