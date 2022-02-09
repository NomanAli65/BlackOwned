// import {
//     Avatar,
//     Box,
//     Button,
//     Heading,
//     HStack,
//     Icon,
//     Input,
//     ScrollView,
//     VStack,
// } from 'native-base';
// import React, { Component } from 'react';
// import { Image, Dimensions, View, Animated, TouchableOpacity, Text, FlatList, StyleSheet } from 'react-native';
// import MyHeader from '../components/MyHeader';
// import Feather from 'react-native-vector-icons/Feather';
// import StarRating from 'react-native-star-rating-widget';

// export class Chat extends Component {
//     state = {
//         message: '',
//         loader: false,
//         sendMessageLoader: false,
//     };

//     componentDidMount() {
//         // const chatHead = this.props.route?.params?.chatHead;
//         // this.setState({loader: true}, () => {
//         //   this.props
//         //     .getChatMessages({recipient_user: chatHead.user.id})
//         //     .then(() => this.setState({loader: false}))
//         //     .catch(() => this.setState({loader: false}));
//         // });
//         // this.initiatePusher();
//     }
//     componentWillUnmount() {
//         // this.props.resetChat();
//         // this.chatChannel?.unsubscribe();
//     }
//     //   initiatePusher = () => {
//     //     const chatHead = this.props.route?.params?.chatHead;
//     //     this.pusher = new Pusher('e0fcb609bae9fe71a981', {cluster: 'ap2'});
//     //     this.chatChannel = this.pusher.subscribe(String(chatHead.user.id));
//     //     this.chatChannel.bind('App\\Events\\MessageSent', data => {
//     //       if (chatHead.id === data.chat.chathead_id) {
//     //         this.props.updateChatMessages(data.chat);
//     //       }
//     //     });
//     //   };

//     //   sendMessage = () => {
//     //     if (this.state.message) {
//     //       const chatHead = this.props.route?.params?.chatHead;
//     //       this.setState({sendMessageLoader: true}, () => {
//     //         this.props
//     //           .sendMessage({
//     //             chathead_id: chatHead.id,
//     //             recipient_user: chatHead.user.id,
//     //             message: this.state.message,
//     //           })
//     //           .then(() => this.setState({message: '', sendMessageLoader: false}))
//     //           .catch(() => this.setState({sendMessageLoader: false}));
//     //       });
//     //     }
//     //   };

//     renderMessages = ({ item }) => {
//         // const {chatMessages, user} = this.props;
//         // const chatHead = this.props.route?.params?.chatHead;
//         // console.log('chatHead', chatHead);
//         // let avatarImage =
//         //   item.from_id == user.id
//         //     ? `${img_url}${user.profile_image}`
//         //     : `${img_url}${chatHead.user.profile_image}`;
//         return (
//             <View
//                 style={{
//                     marginVertical: 12,
//                     flexDirection: item.from_id == user.id ? 'row-reverse' : 'row',
//                     alignItems: 'center',
//                 }}>
//                 <View style={{ paddingHorizontal: 10 }}>
//                     <Image source={{ uri: avatarImage }} style={styles.userImg} />
//                 </View>

//                 <View style={{ width: '60%' }}>
//                     <Text
//                         style={{
//                             textAlign: item.from_id == user.id ? 'right' : 'left',
//                             color: '#eee',
//                         }}>
//                         {item.messages}
//                     </Text>

//                     <Text
//                         style={{
//                             textAlign: item.from_id == user.id ? 'right' : 'left',
//                             color: '#eee',
//                             fontSize: 12,
//                         }}>
//                         {item.send_date}
//                     </Text>
//                 </View>
//             </View>
//         );
//     };

//     //   loardMoreMessages = () => {
//     //     const {chatMessagesPaginatedObj} = this.props;
//     //     const {loader} = this.state;
//     //     const chatHead = this.props.route?.params?.chatHead;

//     //     if (chatMessagesPaginatedObj.next_page_url && loader === false) {
//     //       this.setState({loader: true}, () => {
//     //         this.props
//     //           .getChatMessages({
//     //             next_page_url: chatMessagesPaginatedObj.next_page_url,
//     //             recipient_user: chatHead.user.id,
//     //           })
//     //           .then(() => this.setState({loader: false}))
//     //           .catch(() => this.setState({loader: false}));
//     //       });
//     //     }
//     //   };

//     render() {
//         // const chatHead = this.props.route?.params?.chatHead;
//         // const {chatMessages, chatMessagesPaginatedObj} = this.props;
//         // console.log('this.state.message=>', this.state.message);
//         return (
//             <View style={styles.container}>
//                 <MyHeader
//                      back notify profile navigation={this.props.navigation}
//                     title={this.props.route.name}
//                     onBackPress={() => this.props.navigation.goBack()}
//                 />
//                 {/* {this.state.loader ? (
//                     <ActivityIndicator size={'large'} color={Colors.GREEN} />
//                 ) : null}
//                 {chatMessagesPaginatedObj ? ( */}
//                     <FlatList
//                         data={chatMessages}
//                         renderItem={this.renderMessages}
//                         keyExtractor={(item, index) => index.toString()}
//                         showsVerticalScrollIndicator={false}
//                         inverted={chatMessages.length > 0 ? true : false}
//                         onEndReached={() => this.loardMoreMessages()}
//                         onEndReachedThreshold={0.6}
//                         ListEmptyComponent={
//                             <View
//                                 style={{
//                                     justifyContent: 'center',
//                                     alignItems: 'center',
//                                     paddingVertical: 40,
//                                 }}>
//                                 <Text style={{ color: '#eee', fontSize: 17 }}>
//                                     No Chat Found
//                                 </Text>
//                             </View>
//                         }
//                     />
//                 {/* ) : (
//                     <View style={{ flex: 1 }} />
//                 )} */}

//                 <View style={styles.footer}>
//                     <TextInput
//                         value={this.state.message}
//                         onChangeText={text => this.setState({ message: text })}
//                         placeholder="Write a message"
//                         placeholderTextColor={'#eee'}
//                         style={styles.input}
//                     />
//                     <TouchableOpacity
//                         // disabled={this.state.message ? false : true}
//                         onPress={this.sendMessage}
//                         style={{ paddingHorizontal: 10 }}>
//                         {/* {this.state.sendMessageLoader ? (
//                             <ActivityIndicator />
//                         ) : (
//                             <Image source={Send} style={{ width: 22, height: 22 }} />
//                         )} */}
//                     </TouchableOpacity>
//                 </View>
//             </View>
//         );
//     }
// }

// const styles = StyleSheet.create({
//     container: { flex: 1, backgroundColor: '#fff' },
//     input: { flex: 1, paddingLeft: 14, color: '#eee' },
//     userImg: { width: 55, height: 55, borderRadius: 100 },
//     msgDay: {
//         fontWeight: 'bold',
//         textAlign: 'center',
//         color: 'black',
//         fontSize: 16,
//     },
//     footer: {
//         paddingVertical: 4,
//         flexDirection: 'row',
//         borderTopWidth: 1,
//         borderTopColor: '#eee',
//         alignItems: 'center',
//     },
// });


// export default connect(mapStateToProps, mapsDispatchToProps)(index);
