import {
    Avatar,
    Box,
    Button,
    Heading,
    HStack,
    Icon,
    Input,
    ScrollView,
    VStack,
} from 'native-base';
import React, { Component } from 'react';
import { Image, Dimensions, View, Animated, TouchableOpacity, Text, FlatList, StyleSheet, TextInput } from 'react-native';
import MyHeader from '../../components/MyHeader';
import Feather from 'react-native-vector-icons/Feather';
import StarRating from 'react-native-star-rating-widget';
import Entypo from 'react-native-vector-icons/Entypo';

export class Chat extends Component {
    state = {
        loader: false,
        sendMessageLoader: false,
        text: '',
        messages: [
            {
                id: 2,
                message: 'Hello, How are you?',
                img: require('../../assets/2.jpeg')
            },
            {
                id: 1,
                message: 'I am doing good, Thanks',
                img: require('../../assets/3.jpeg'),
            },
            {
                id: 2,
                message: 'Will you be available for an event on Thursday',
                img: require('../../assets/2.jpeg')
            },
            {
                id: 1,
                message: 'I will let you know, after checking my schedule.',
                img: require('../../assets/3.jpeg')
            },

        ],
    };

    componentDidMount() {
        // const chatHead = this.props.route?.params?.chatHead;
        // this.setState({loader: true}, () => {
        //   this.props
        //     .getChatMessages({recipient_user: chatHead.user.id})
        //     .then(() => this.setState({loader: false}))
        //     .catch(() => this.setState({loader: false}));
        // });
        // this.initiatePusher();
    }

    sendMessage = () => {
        let { text, messages } = this.state;

        let dummyMessage = {
            id: 1,
            message: text,
        };

        messages.push(dummyMessage);
        this.setState({ messages, text: '' });
    };

    renderMessages = ({ item }) => (
        <View
            style={{
                marginVertical: 12,
                flexDirection: item.id == 1 ? 'row-reverse' : 'row',
                alignItems: 'center',
            }}>
            <View style={{ paddingHorizontal: 10 }}>
                <Image source={item.img} style={styles.userImg} />
            </View>

            <View style={{ width: '60%', backgroundColor: item.id == 1 ? '#ABABAB' : '#EEEBEB', padding: 20, borderRadius: 5 }}>
                <Text
                    style={{
                        textAlign: item.id == 1 ? 'right' : 'left',
                        color: '#636060',
                    }}>
                    {item.message}
                </Text>

                <Text
                    style={{
                        textAlign: item.id == 1 ? 'right' : 'left',
                        color: '#636060',
                        fontSize: 12,
                    }}>
                    Just now
                </Text>
            </View>
        </View>
    );


    render() {
        return (
            <View style={styles.container}>

                <View style={{ paddingHorizontal: 14 }}>
                    <MyHeader
                        notify profile navigation={this.props.navigation}
                        title={this.props.route.name}
                        onBackPress={() => this.props.navigation.goBack()}
                    />
                </View>

                <Text style={styles.msgDay}>Today</Text>

                <FlatList
                    data={this.state.messages}
                    renderItem={this.renderMessages}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                />

                <View style={styles.footer}>
                    <TouchableOpacity style={{ marginLeft: 10 }}>
                        <Entypo name={'attachment'} size={22} color={'#1872ea'} />
                    </TouchableOpacity>
                    <TextInput
                        value={this.state.text}
                        onChangeText={text => this.setState({ text })}
                        placeholder="Type something"
                        placeholderTextColor={'#8D8D8D'}
                        style={styles.input}
                    />

                    <TouchableOpacity
                        onPress={this.sendMessage}
                        style={{ paddingHorizontal: 10 }}>
                        <Image source={require('../../assets/send.png')} style={{ width: 22, height: 22 }} />
                    </TouchableOpacity>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    input: { flex: 1, paddingLeft: 14, color: '#636060' },
    userImg: { width: 55, height: 55, borderRadius: 5 },
    msgDay: {
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#000',
        fontSize: 16,
    },
    footer: {
        paddingVertical: 4,
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#8D8D8D',
        alignItems: 'center',
    },
});


export default (Chat);
