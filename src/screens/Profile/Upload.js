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
import { Image, Dimensions, View, Animated, TouchableOpacity, Text, FlatList, StyleSheet,TextInput, Alert } from 'react-native';
import MyHeader from '../../components/MyHeader';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { OpenImagePicker } from '../../configs';

// import {Colors} from '../../Styles';



const { width } = Dimensions.get('window');

export default class Upload extends Component {
    state = {
        description: '',
        title: '',
        image: null,
        loader: false,
    };
    componentDidMount() {
        // Animated.timing(this.rotation, {
        //   toValue: 1,
        //   duration: 1000,
        //   useNativeDriver: true,
        // }).start();
    }

    postCreate = () => {
        let {
            // description,
            // title,
            image,
        } = this.state;

        // let productCategoryItem = this.props.getProductCategories.find(item => {
        //   if (productType === item.productcategory_name) {
        //     return item;
        //   }
        // });

        if (
            // !description ||
            // !title ||
            !image
        ) {
            Alert.alert('Warning', 'Please enter all fileds!');
        } else {
            // this.setState({ loader: true });
            // this.props
            //     .postCreate({
            //         description,
            //         title,
            //         image,
            //     })
            // this.setState({ loader: false });
            this.props.navigation.navigate('UserProfile', { type: 'upload' })
            // this.props.navigation.navigate('UserProfile', {
            //     type: 'upload',
            // })
            // .then(() => {
            //   this.setState({ loader: false });
            //   this.props.navigation.navigate('UserProfile')
            // })
            // .catch(error => {
            //   this.setState({ loader: false });
            // });
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
                    title={this.props.route.name}
                    onBackPress={() => this.props.navigation.goBack()}
                />
                <View
                    style={{
                        backgroundColor: '#EEEBEB',
                        borderRadius: 20,
                        padding: 10,
                        flex: 0.99,
                        marginVertical: 10,
                    }}>
                    <ScrollView showsVerticalScrollIndicator={false}>

                        <View >
                            {this.state.image?.uri ? (
                                <TouchableOpacity
                                    onPress={this.uploadImage}
                                    style={{
                                        backgroundColor: '#fff',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        height: 300,
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
                                        Change Image/Video
                                    </Text>
                                </TouchableOpacity>
                            ) : (
                                <View>
                                    <TouchableOpacity
                                        onPress={this.uploadImage}
                                        style={{
                                            backgroundColor: '#fff',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            height: 300,
                                            margin: 15,
                                            borderRadius: 20,
                                        }}>
                                        <Image
                                            source={require('../../assets/imageIcon.png')}
                                            resizeMode="contain"
                                            style={{ width: 20, height: 20, marginHorizontal: 10 }}
                                        />
                                        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
                                            Select Image/Video
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>



                        {/* <View
                            style={{
                                backgroundColor: '#fff',
                                margin: 15,
                                borderRadius: 20,
                            }}>
                            <TextInput
                                style={{ height: 60, textAlignVertical: 'top', padding: 20 }}
                                placeholder="Title...."
                                value={this.state.title}
                                onChangeText={text => this.setState({ title: text })}
                                multiline
                            />
                        </View>

                        <View
                            style={{
                                backgroundColor: '#fff',
                                margin: 15,
                                borderRadius: 20,
                            }}>
                            <TextInput
                                style={{ height: 120, textAlignVertical: 'top', padding: 20 }}
                                placeholder="Give your description here...."
                                value={this.state.description}
                                onChangeText={text => this.setState({ description: text })}
                                multiline
                            />
                        </View> */}

                        <View style={{ marginVertical: 0, marginHorizontal: 20,alignItems:'center' }}>
                            <Button
                                onPress={this.postCreate}
                                backgroundColor="primary.100"
                                bgColor="#fff"
                                color="primary.100"
                                borderRadius={10}
                                borderWidth={1}
                                borderColor="primary.100"
                                style={{
                                    marginVertical: 10,
                                    width: '50%',
                                    height: 45,
                                }}>
                                <Text style={{ color: '#1872ea' }}>Upload</Text>
                            </Button>
                            {/* onPress={this.postCreate} */}
                        </View>
                    </ScrollView>
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

    flex1: { flex: 1 },

    tagsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginVertical: 10,
    },
    isSelectedView: {
        backgroundColor: 'green',
        width: 100,
        height: 80,
        padding: 10,
        justifyContent: 'center',
        marginHorizontal: 5,
        borderRadius: 10,
    },
    isNotSelectedView: {
        backgroundColor: '#F8F8F8',
        width: 100,
        height: 80,
        padding: 10,
        justifyContent: 'center',
        marginHorizontal: 5,
        borderRadius: 10,
    },
    confirmationSheetContainer: {
        backgroundColor: '#EFF8FD',
        height: 280,
        paddingHorizontal: 35,
        paddingTop: 20,
    },
    sheetBody: {
        marginVertical: 20,
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    closeImage: { width: 60, height: 20 },
});
