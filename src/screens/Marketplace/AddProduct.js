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
import { Image, Dimensions, View, Animated, TouchableOpacity, Text, FlatList, StyleSheet, TextInput, Alert } from 'react-native';
import MyHeader from '../../components/MyHeader';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import { OpenImagePicker } from '../../configs';
import { connect } from 'react-redux';
import { MarketPlaceMiddleware } from '../../redux/middleware/MarketPlaceMiddleware';
import { imgURL } from '../../configs/AxiosConfig';

// import {Colors} from '../../Styles';



const { width } = Dimensions.get('window');

class AddProduct extends Component {
    state = {
        name: '',
        price: '',
        discounted_price: '',
        description: '',
        image: null,
    };
    componentDidMount() {
        // Animated.timing(this.rotation, {
        //   toValue: 1,
        //   duration: 1000,
        //   useNativeDriver: true,
        // }).start();
    }

    storeProduct = () => {
        let {
            name,
            price,
            discounted_price,
            description,
            image
        } = this.state;

        if (
            !name ||
            !price ||
            !discounted_price ||
            !description ||
            !image
        ) {
            Alert.alert('Warning', 'Please enter all fileds!');
        } else {
            // console.warn(
            //     name,
            //     price,
            //     discounted_price,
            //     description,
            //     image,
            // );
            this.props.storeProduct({
                name,
                price,
                discounted_price,
                description,
                image,
            });
            this.props.navigation.goBack();
        }
    };


    uploadImage = () => {
        OpenImagePicker(img => {
            let uri_script = img.path.split('/');
            let name = uri_script[uri_script.length - 1];

            let imgObj = {
                name,
                uri: img.path,
                size: img.size,
                type: img.mime,
            };

            this.setState({ image: imgObj });
        });
    };

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <MyHeader
                    back notify profile navigation={this.props.navigation}
                    // title={this.props.route.name}
                    title={'Add Product'}
                    onBackPress={() => this.props.navigation.goBack()}
                />
                <ScrollView style={styles.container}>

                    <View style={{ paddingHorizontal: 5 }}>
                        <View
                            style={{
                                alignItems: 'center',
                                // borderWidth: 1,
                                // borderColor: '#ccc',
                                // marginHorizontal: '10%',
                                marginVertical: 20,
                                borderRadius: 20,
                                // padding: 20,
                            }}>
                            <Input
                                placeholder="Name"
                                style={styles.input}
                                onChangeText={name => this.setState({ name: name })}
                                value={this.state.name}
                            />
                            <Input
                                placeholder="Price"
                                keyboardType='numeric'
                                style={styles.input}
                                onChangeText={price => this.setState({ price: price })}
                                value={this.state.price}
                            />
                            <Input
                                placeholder="Discount"
                                keyboardType='numeric'
                                style={styles.input}
                                onChangeText={discount => this.setState({ discounted_price: discount })}
                                value={this.state.discount}
                            />
                            <TextInput
                                placeholder={'Description'}
                                multiline
                                style={styles.inputDescription}
                                onChangeText={text => {
                                    this.setState({ description: text });
                                }}
                                value={this.state.description}
                            />
                            <View style={styles.input}>
                                <View >
                                    {this.state.image?.uri ? (
                                        <TouchableOpacity
                                            onPress={this.uploadImage}
                                            style={{
                                                backgroundColor: '#fff',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                margin: 15,
                                                borderRadius: 20,
                                            }}>
                                            <Image
                                                source={{ uri: this.state.image?.uri }}
                                                style={{
                                                    width: 150,
                                                    height: 150,
                                                    borderRadius: 12,
                                                    elevation: 3,
                                                }}
                                            />
                                            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
                                                Change Image
                                            </Text>
                                        </TouchableOpacity>
                                    ) : (
                                        <View>
                                            <TouchableOpacity
                                                onPress={this.uploadImage}
                                                style={{
                                                    backgroundColor: "#fff",
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    margin: 15,
                                                    borderRadius: 20,
                                                    flexDirection: 'row'
                                                }}>
                                                <Image
                                                    source={require('../../assets/imageIcon.png')}
                                                    resizeMode="contain"
                                                    style={{ width: 20, height: 20, marginHorizontal: 10 }}
                                                />
                                                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
                                                    Add Image
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                </View>
                            </View>
                            <Button
                                onPress={this.storeProduct}
                                backgroundColor="primary.100"
                                style={{
                                    width: '80%',
                                    borderRadius: 10,
                                    marginVertical: 10,
                                    height: 45,
                                }}>
                                Add Product
                            </Button>

                        </View>
                    </View>

                </ScrollView>

            </View>
        );
    }
}
const mapStateToProps = state => {
    return {

        storeProductData: state.MarketPlaceReducer.storeProductData,
    };
};
const mapDispatchToProps = dispatch => ({

    storeProduct: payload => dispatch(MarketPlaceMiddleware.storeProduct(payload)),

});

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        //   paddingHorizontal: 25,
        backgroundColor: "#fff",
    },

    flex1: { flex: 1 },

    sponsorContainer: {
        marginVertical: 8,
        marginHorizontal: 5,
        flex: 1,

    },
    teamImage: {
        width: '100%',
        height: 100,
        borderRadius: 5
    },
    teamsListContainer: {
        justifyContent: 'space-between',
    },
    sponsorName: {
        paddingTop: 8,
        fontSize: 12,
        color: 'black',
        alignSelf: 'center',
        fontWeight: '500',
    },
    sponsorPrice: {
        fontSize: 12,
        color: '#1D9CD9',
        alignSelf: 'center',
        fontWeight: '500',
    },
    fabBtn: {
        width: 56,
        height: 56,
        bottom: 15,
        right: 15,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#1D9CD9",
        position: 'absolute',
    },
    selectContainer: {
        backgroundColor: '#fff',
        // paddingVertical: 10,
    },
    input: {
        width: '80%',
        borderRadius: 10,
        textAlign: 'center',
        marginBottom: 15,
        backgroundColor: '#fff',
        elevation: 3,
        borderWidth: 0,
    },
    inputDescription: {
        width: '80%',
        borderRadius: 10,
        textAlign: 'center',
        marginBottom: 15,
        backgroundColor: '#fff',
        elevation: 3,
        borderWidth: 0,
        height: 140,
        textAlignVertical: 'top',
        // multiline
    },
});
