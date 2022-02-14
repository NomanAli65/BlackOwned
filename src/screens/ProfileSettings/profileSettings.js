import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import MyHeader from '../../components/MyHeader';
import Foundation from 'react-native-vector-icons/Foundation';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Button } from 'native-base';
export default class profileSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <MyHeader title={'Profile'} notify profile back onBackPress={() => this.props.navigation.goBack()} navigation={this.props.navigation} />
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <View style={styles.body}>
                        <Image
                            source={require('../../assets/1.jpeg')}
                            style={{
                                width: 130,
                                height: 130,
                                borderRadius: 3,
                                resizeMode: 'cover',
                            }}
                        />
                        <Text adjustsFontSizeToFit numberOfLines={1} style={styles.NameHeading}>John Doe</Text>
                        <View style={styles.RowView}>
                            <Foundation name={'mail'} size={25} color={'#1872ea'} />
                            <Text adjustsFontSizeToFit numberOfLines={1} style={styles.emailText}>Johndoe@blackowned.biz</Text>
                        </View>
                        <View style={styles.RowView}>
                            <FontAwesome name={'phone'} size={25} color={'#1872ea'} />
                            <Text adjustsFontSizeToFit numberOfLines={1} style={styles.emailText}>+1 555-1234</Text>
                        </View>
                        <View style={styles.RowView}>
                            <Foundation name={'address-book'} size={25} color={'#1872ea'} />
                            <Text adjustsFontSizeToFit numberOfLines={1} style={styles.emailText}>New York, USA</Text>
                        </View>
                        <View style={styles.RowView}>
                            <Foundation name={'address-book'} size={25} color={'#1872ea'} />
                            <Text adjustsFontSizeToFit numberOfLines={1} style={styles.emailText}>New York, USA</Text>
                        </View>

                        <Button
                            onPress={() => this.props.navigation.navigate("EditProfile")}
                            backgroundColor="primary.100"
                            style={{
                                width: '55%',
                                borderRadius: 4,
                                marginVertical: 10,
                                height: 45,
                                marginVertical: 30,
                            }}>
                            Edit Profile
                        </Button>
                    </View>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',

    },
    body: {
        alignSelf: 'center',
        width: '92%',
        backgroundColor: "#eee",
        paddingVertical: 30,
        paddingHorizontal: 10,
        alignItems: 'center',

    },
    NameHeading: {
        fontSize: 20,
        color: '#000',
        fontWeight: 'bold',
        marginVertical: 10,
    },
    RowView: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 5,
    },
    emailText: {
        fontSize: 14,
        fontWeight: 'normal',
        marginHorizontal: 10,
    },
})