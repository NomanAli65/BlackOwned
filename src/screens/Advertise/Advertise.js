import { Button, HStack, Icon, Input } from 'native-base';
import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MyHeader from '../../components/MyHeader';
import CheckBox from '@react-native-community/checkbox';
export default class Advertise extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    renderUsersList = item => (
        <TouchableOpacity
            activeOpacity={0.7} style={styles.ListContainer}>
            <CheckBox
                disabled={false}
                value={this.state.toggleCheckBox1}
            // onValueChange={(newValue) => this.setState({ toggleCheckBox1: newValue, toggleCheckBox2: false, toggleCheckBox3: false })}
            />
            <Image source={item.img} style={styles.ListImage} />
            <View style={{ marginLeft: 5 }}>
                <Text adjustsFontSizeToFit numberOfLines={1} style={styles.ListName}>{item.name}</Text>
                <Text style={styles.ListDistances}>Price: <Text style={{ fontSize: 16, fontWeight: 'bold', color: "#1872ea" }}>$275.25</Text></Text>
                <Text numberOfLines={3} style={styles.ListDescription}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</Text>
            </View>
        </TouchableOpacity>
    );

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <MyHeader
                    notify profile navigation={this.props.navigation}
                    title={'Advertise'}
                    onBackPress={() => this.props.navigation.goBack()}
                />
                <HStack
                    backgroundColor="#eee"
                    marginTop="2"
                    borderRadius={10}
                    alignItems="center"
                    marginHorizontal={15}
                    paddingX="3">
                    <Icon as={Feather} name="search" size="sm" color="#aaa" />
                    <Input fontSize={14} placeholder="Search" borderWidth={0} />
                </HStack>
                <Button
                    onPress={() => this.props.navigation.navigate('SubcriptionPlans')}
                    backgroundColor="primary.100"
                    style={{
                        alignSelf: 'flex-end',
                        width: '40%',
                        borderRadius: 4,
                        marginRight: 15,
                        height: 45,
                        marginVertical: 10,
                    }}>
                    Promote
                </Button>
                <View style={{ marginHorizontal: 15 }}>
                    <FlatList
                        style={styles.flex1}
                        showsVerticalScrollIndicator={false}
                        data={[
                            { name: 'Realtors', img: require('../../assets/realtor.jpg') },
                            { name: 'Artists', img: require('../../assets/c1.jpeg') },
                            { name: 'Musicians', img: require('../../assets/realtor.jpg') },
                            { name: 'Baby Sitter', img: require('../../assets/c2.jpeg') },
                            { name: 'Electrition', img: require('../../assets/realtor.jpg') },
                            { name: 'Beautician', img: require('../../assets/c1.jpeg') },
                            { name: 'Realtors', img: require('../../assets/realtor.jpg') },
                            { name: 'Artists', img: require('../../assets/c1.jpeg') },
                            { name: 'Musicians', img: require('../../assets/realtor.jpg') },
                            { name: 'Baby Sitter', img: require('../../assets/c2.jpeg') },
                            { name: 'Electrition', img: require('../../assets/realtor.jpg') },
                            { name: 'Beautician', img: require('../../assets/c1.jpeg') },

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
        marginVertical: 5,
        elevation: 2,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#eee',
        paddingVertical: 10,
    },
    ListImage: {
        width: 80,
        height: 80,
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
        width: '20%',
        fontSize: 10,
        fontWeight: 'normal',
        color: 'black',
    },
    ListAddImage: {
        marginRight: 5,
    },
})