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
import StarRating from 'react-native-star-rating-widget';

// import {Colors} from '../../Styles';



const { width } = Dimensions.get('window');

export default class ServiceDetails extends Component {
    rotation = new Animated.Value(0);

    componentDidMount() {
        // Animated.timing(this.rotation, {
        //   toValue: 1,
        //   duration: 1000,
        //   useNativeDriver: true,
        // }).start();
    }

    renderUsersList = item => (

        <TouchableOpacity onPress={() => this.props.navigation.navigate('OtherProfile')}>
            <View style={{ flexDirection: 'row', backgroundColor: '#eee', padding: 10, marginVertical: 5, width: '100%' }}>
                <View style={{flexDirection:'row',width:'70%'}}>
                    <Image source={require('../../assets/1.jpeg')} style={styles.profileImg} />

                    <View style={{ paddingHorizontal: 10,justifyContent:'center' }}>
                        <Text style={styles.ProfileName}>Stacy Stratus</Text>
                        <View style={{ flexDirection: 'row',marginVertical:10 , alignItems:'center'}}>
                            <Image source={require('../../assets/blueMarker.png')} style={{ width: 15, height: 15 }} />
                            <Text style={{fontSize:11}}>8 miles away</Text>
                        </View>
                    </View>
                </View>

                <View style={{width:'30%',justifyContent:'center'}}>
                    <Text style={styles.Profile}>Musician</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                        <View style={{ alignSelf: 'center',marginHorizontal:5 }}>
                            <StarRating
                                rating={4.5}
                                onChange={() => null}
                                color={'#1D9CD9'}
                                starSize={13}
                                maxStars={5}
                                starStyle={{ width: 2 }}
                            />
                        </View>
                        <Text style={{ textAlignVertical: 'center',fontSize:12 }}>(4.5)</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>

    );

    render() {
        let rotate = this.rotation.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg'],
        });
        return (
            <View style={styles.container}>
                <MyHeader
                    back notify profile navigation={this.props.navigation}
                    title={this.props.route.name}
                    onBackPress={() => this.props.navigation.goBack()}
                />
                <ScrollView>
                    <View style={{ paddingHorizontal: 20 }}>
                        <HStack
                            backgroundColor="#eee"
                            marginTop="2"
                            borderRadius={10}
                            alignItems="center"
                            paddingX="3">
                            <Icon as={Feather} name="search" size="sm" color="#aaa" />
                            <Input fontSize={14} placeholder="Search Service Provider" borderWidth={0} />
                        </HStack>
                        <FlatList
                            // numColumns={1}
                            // columnWrapperStyle={styles.teamsListContainer}
                            style={styles.flex1}
                            showsVerticalScrollIndicator={false}
                            data={[
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
                </ScrollView>
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

    flex1: { flex: 1 },

    teamContainer: {
        marginVertical: 8,
        marginHorizontal: 5,
        backgroundColor: '#eee',
        flex: 1,
        elevation: 2,
        alignItems: 'center',
        //   borderTopEndRadius: 20,
        //   borderTopLeftRadius: 20,
        overflow: 'hidden',
    },
    profileImg: {
        width: 80,
        height: 80,
    },
    teamsListContainer: {
        justifyContent: 'space-between',
    },
    ProfileName: {
        // padding: 8,
        fontSize: 14,
        color: 'black',
        alignSelf: 'flex-start',
        fontWeight: '500',
    },
    Profile: {
        // padding: 8,
        fontSize: 12,
        // color: 'black',
        alignSelf: 'flex-end',
        fontWeight: '500',
    },
});
