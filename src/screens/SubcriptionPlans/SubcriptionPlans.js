import { Button, HStack, Icon, Input } from 'native-base';
import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MyHeader from '../../components/MyHeader';
import AntDesign from 'react-native-vector-icons/AntDesign';
export default class SubcriptionPlans extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    renderUsersList = item => (
        <TouchableOpacity
            onPress={() => this.props.navigation.navigate('NewsDetail')}
            activeOpacity={0.7} style={styles.ListContainer}>
            <Button
                backgroundColor="primary.100"
                style={{
                    width: '40%',
                    borderRadius: 4,
                    height: 45,
                    top: -43,
                }}>
                {item}
            </Button>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{
                    fontSize: 20,
                    color: '#000',
                    fontWeight: 'bold',
                    top: 6,
                }}>$</Text>
                <Text style={{
                    fontSize: 35,
                    color: "#1872ea",
                    fontWeight: 'bold',
                }}>210</Text>
                <Text style={{
                    fontSize: 20,
                    color: '#000',
                    fontWeight: 'bold',
                    top: 6,
                }}>/month</Text>
            </View>
            {[1, 1, 1].map(() => {
                return (
                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 7, }}>
                        <AntDesign name={'checkcircle'} size={20} color={'#000'} />
                        <Text style={{ fontSize: 13, marginLeft: 10 }}>Lorem Ipsum is simply dummy text.</Text>
                    </View>

                );
            })}
            <Button
                backgroundColor="primary.100"
                style={{
                    width: '90%',
                    borderRadius: 8,
                    height: 45,
                    marginTop: 10,
                }}>
                Buy Plan
            </Button>

        </TouchableOpacity>
    );

    render() {
        return (
            <View style={{ flex: 1 }}>
                <MyHeader
                    back notify profile
                    size={'lg'}
                    title={'Subcription Plans'}
                    onBackPress={() => this.props.navigation.goBack()}
                />
                <View style={{ marginHorizontal: 15 }}>
                    <FlatList
                        style={styles.flex1}
                        showsVerticalScrollIndicator={false}
                        data={[
                            'Standard',
                            'Premium',
                            'Gold',

                        ]}
                        renderItem={({ item }) => this.renderUsersList(item)}
                        ListFooterComponent={<View style={{ marginTop: 30 }}><Text></Text></View>}
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
        paddingVertical: 20,
        marginVertical: 25,
        elevation: 4,
        backgroundColor: '#eee',
        alignItems: 'center',

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