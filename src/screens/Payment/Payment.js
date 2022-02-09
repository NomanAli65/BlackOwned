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
import { Image, Dimensions, View, Animated, TouchableOpacity, Text, FlatList, StyleSheet } from 'react-native';
import MyHeader from '../../components/MyHeader';
import Feather from 'react-native-vector-icons/Feather';
// import {Colors} from '../../Styles';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';


const { width } = Dimensions.get('window');

export default class Payment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: [],
            isActive: true,
            selectedCardId: undefined,
            loading: true,
        };
    }
    componentDidMount() {
        // Animated.timing(this.rotation, {
        //   toValue: 1,
        //   duration: 1000,
        //   useNativeDriver: true,
        // }).start();
    }

    renderPaymentCards = ({ item, index }) => (
        <View style={styles.cardsContainer}>
            <TouchableOpacity
                // onPress={() => this.setState({ selectedCardId: item.id })}
                style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <MaterialIcons
                    color={'#636060'}
                    size={16}
                    name={
                        this.state.selectedCardId === item.id
                            ? 'radio-button-checked'
                            : 'radio-button-off'
                    }
                />

                <FontAwesome
                    name="cc-visa"
                    size={20}
                    color={'#1D9CD9'}
                    style={{ paddingLeft: 5 }}
                />

                <Text style={{ paddingHorizontal: 22, color: '#000' }}>
                    ***********
                </Text>
            </TouchableOpacity>

            {/* <TouchableOpacity>
            <MaterialIcons name="edit" size={22} color={Colors.GRAY_3} />
          </TouchableOpacity> */}

            <TouchableOpacity
                onPress={() => this.removeCard(item, index)}
                style={{ marginHorizontal: 4 }}>
                <MaterialIcons name="delete" size={22} />
            </TouchableOpacity>
        </View>
    );

    removeCard = (item, index) => {
        let {cards} = this.state;
        // cards = this.props.PaymentCard;
        cards.splice(index, 1);
        this.setState({cards});
    
        // this.props.deletePaymentCard({id: item.id});
      };

    render() {
        return (
            <ScrollView style={styles.container}>
                <MyHeader
                    back notify profile navigation={this.props.navigation}
                    title={this.props.route.name}
                    onBackPress={() => this.props.navigation.goBack()}
                />
                <View style={{ paddingHorizontal: 20 }}>
                    <View style={{ marginHorizontal: 30, marginVertical: 15 }}>
                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20 }}>
                            Credit or debit card
                        </Text>
                    </View>

                    <View>
                        <FlatList
                            // refreshing={this.state.refreshing}
                            // onRefresh={this.onRefresh}
                            data={'1'}
                            renderItem={this.renderPaymentCards}
                        // keyExtractor={(item, index) => index.toString()}
                        />
                    </View>

                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('AddCard')}
                        style={styles.addCardBtn}>
                        <AntDesign
                            name="pluscircleo"
                            size={16}
                            color={'#8D8D8D'}
                            style={{ paddingRight: 22 }}
                        />
                        <Text style={styles.addCardText}>Add new card</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        // disabled={this.props.PaymentCard.length < 1}
                        onPress={this.PayNow}
                        style={{
                            // bottom: 12,
                            // position: 'absolute',
                            width: '90%',
                            alignSelf: 'center',
                            paddingVertical: 12,
                            backgroundColor: '#1D9CD9',
                        }}>
                        <Text
                            style={{ textAlign: 'center', fontSize: 18, color: '#fff' }}>
                            Pay Now
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //   paddingHorizontal: 25,
        backgroundColor: "#fff",
    },
    addCardBtn: {
        paddingVertical: 16,
        marginVertical: 10,
        width: '90%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EEEBEB',
        flexDirection: 'row',
    },
    cardsContainer: {
        flexDirection: 'row',
        width: '90%',
        alignSelf: 'center',
        paddingVertical: 16,
        paddingHorizontal: 8,
        backgroundColor: '#F8F8F8',
        marginVertical: 8,
    },
    //   container: {flex: 1, backgroundColor: Colors.backgroundColor},
    addCardText: { textAlign: 'center', fontSize: 16, color: 'black' },
});
