import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import MyHeader from '../../components/MyHeader';
import Foundation from 'react-native-vector-icons/Foundation';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo'
import { Button } from 'native-base';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { imgURL } from '../../configs/AxiosConfig';

class profileSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <MyHeader title={'Profile'} notify back onBackPress={() => this.props.navigation.goBack()} navigation={this.props.navigation} />
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <View style={styles.body}>
                        <Image
                            source={this.props?.user?.user?.profile_pic ?
                                {
                                    uri: imgURL + this.props?.user?.user?.profile_pic
                                } : require('../../assets/user.png')
                            }
                            style={{
                                width: 130,
                                height: 130,
                                borderRadius: 3,
                                resizeMode: 'cover',
                            }}
                        />
                        <Text adjustsFontSizeToFit numberOfLines={1} style={styles.NameHeading}>{this.props?.user?.user?.username}</Text>
                        <View style={styles.RowView}>
                            <Foundation name={'mail'} size={25} color={'#1872ea'} />
                            <Text adjustsFontSizeToFit numberOfLines={1} style={styles.emailText}>{this.props?.user?.user?.email}</Text>
                        </View>
                        <View style={styles.RowView}>
                            <FontAwesome name={'phone'} size={25} color={'#1872ea'} />
                            <Text adjustsFontSizeToFit numberOfLines={1} style={styles.emailText}>{this.props?.user?.user?.phone}</Text>
                        </View>
                        <View style={styles.RowView}>
                            <Ionicons name={'md-male-female-sharp'} size={25} color={'#1872ea'} />
                            <Text adjustsFontSizeToFit numberOfLines={1} style={styles.emailText}>{this.props?.user?.user?.gender}</Text>
                        </View>
                        <View style={styles.RowView}>
                            <Entypo name={'address'} size={25} color={'#1872ea'} />
                            <Text adjustsFontSizeToFit numberOfLines={1} style={styles.emailText}>{this.props?.user?.user?.address}</Text>
                        </View>
                        <View style={styles.RowView}>
                            <Foundation name={'address-book'} size={25} color={'#1872ea'} />
                            <Text adjustsFontSizeToFit numberOfLines={1} style={styles.emailText}>{this.props?.user?.user?.city},{this.props?.user?.user?.state}</Text>
                        </View>
                        <View style={styles.RowView}>
                            <MaterialIcons name={'my-location'} size={25} color={'#1872ea'} />
                            <Text adjustsFontSizeToFit numberOfLines={1} style={styles.emailText}>{this.props?.user?.user?.zip}</Text>
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
const mapStateToProps = state => ({
    user: state.AuthReducer.user,
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(profileSettings);
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