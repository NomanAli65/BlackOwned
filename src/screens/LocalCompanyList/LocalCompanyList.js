import { HStack, Icon, Input } from 'native-base';
import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MyHeader from '../../components/MyHeader';

export default class LocalCompanyList extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    renderUsersList = item => (
        <View activeOpacity={0.7} style={styles.ListContainer}>
            <Image source={require('../../assets/realtor.jpg')} style={styles.ListImage} />
            <View style={{ marginHorizontal: 10 }}>
                <Text adjustsFontSizeToFit numberOfLines={1} style={styles.ListName}>{item}</Text>
                <Text style={styles.ListDistances}>2 miles</Text>
            </View>
        </View>
    );

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <MyHeader
                    back notify profile navigation={this.props.navigation}
                    title={'Listed Companies'}
                    onBackPress={() => this.props.navigation.goBack()}
                />
                <HStack
                    backgroundColor="#eee"
                    marginTop="2"
                    borderRadius={10}
                    alignItems="center"
                    marginVertical={10}
                    marginHorizontal={15}
                    paddingX="3">
                    <Icon as={Feather} name="search" size="sm" color="#aaa" />
                    <Input fontSize={14} placeholder="Search" borderWidth={0} />
                </HStack>
                <View style={{ marginHorizontal: 15, flex: 1 }}>
                    <FlatList
                        // style={styles.flex1}
                        showsVerticalScrollIndicator={false}
                        data={[
                            'Realtors',
                            'Global World',
                            'Strategic Solution',
                            'Trading Co',
                            'Beautician',
                            'Electrition',

                        ]}
                        renderItem={({ item }) => this.renderUsersList(item)}
                    />
                </View>
            </View >
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
        marginVertical: 5,
        elevation: 2,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 15,
    },
    ListImage: {
        width: 80,
        height: 80,
        borderRadius: 4,
        resizeMode: 'cover',
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