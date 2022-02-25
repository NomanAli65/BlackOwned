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
import { Image, Dimensions, View, Animated, TouchableOpacity, Text, FlatList, StyleSheet, ActivityIndicator, RefreshControl, Modal } from 'react-native';
import MyHeader from '../../components/MyHeader';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { connect } from 'react-redux';
import { MarketPlaceMiddleware } from '../../redux/middleware/MarketPlaceMiddleware';
import { imgURL } from '../../configs/AxiosConfig';
// import {Colors} from '../../Styles';



const { width } = Dimensions.get('window');

class MarketPlace extends Component {

    state = {
        loader: true,
        search: '',
    };
    componentDidMount() {
        this.props.getAllMarketPlaceSponsored({ name: '' }),
            this.props.getAllMarketPlaceProducts({ name: '' })
        // .then(() => this.setState({ loader: false }))
        // .catch(() => this.setState({ loader: false }));
    }

    onPressLoadMoreSponsored = () => {
        this.setState({ loader: true }, () => {
            const { getMarketPlaceSponsoredData } = this.props;
            this.props
                .getAllMarketPlaceSponsored(getMarketPlaceSponsoredData.next_page_url, '')
                .then(() => this.setState({ loader: false }))
                .catch(() => this.setState({ loader: false }));
        });
    };
    onPressLoadMoreProducts = () => {
        this.setState({ loader: true }, () => {
            const { getMarketPlaceProductsData } = this.props;
            this.props
                .getAllMarketPlaceProducts(getMarketPlaceProductsData.next_page_url, '')
                .then(() => this.setState({ loader: false }))
                .catch(() => this.setState({ loader: false }));
        });
    };

    renderLoaderMoreButtonSponosred = () => {
        const { getMarketPlaceSponsoredData } = this.props;
        const { loader } = this.state;
        return getMarketPlaceSponsoredData.next_page_url ? (
            loader ? (
                <ActivityIndicator
                    size={'large'}
                    color={'#1D9CD9'}
                    style={styles.loadMoreContentContainer}
                />
            ) : (
                <TouchableOpacity
                    style={{ width: 110, alignSelf: 'center', marginVertical: 13 }}
                    onPress={this.onPressLoadMoreSponsored}>
                    <View style={styles.loadMoreContainer}>
                        <Text style={styles.loadMoreText}>Load more</Text>
                    </View>
                </TouchableOpacity>
            )
        ) : null;
    };
    renderLoaderMoreButtonProducts = () => {
        const { getMarketPlaceProductsData } = this.props;
        const { loader } = this.state;
        return getMarketPlaceProductsData.next_page_url ? (
            loader ? (
                <ActivityIndicator
                    size={'large'}
                    color={'#1D9CD9'}
                    style={styles.loadMoreContentContainer}
                />
            ) : (
                <TouchableOpacity
                    style={{ width: 110, alignSelf: 'center', marginVertical: 13 }}
                    onPress={this.onPressLoadMoreProducts}>
                    <View style={styles.loadMoreContainer}>
                        <Text style={styles.loadMoreText}>Load more</Text>
                    </View>
                </TouchableOpacity>
            )
        ) : null;
    };

    onRefreshServicesSponsored = () => {
        this.setState({ loader: true }, () => {
            this.props.getAllMarketPlaceSponsored({ name: '' });
            // this.props.getAllMarketPlaceProducts({ name: '' })
        });
        this.setState({ loader: true }, () => {
            this.props.getAllMarketPlaceProducts({ name: '' })
        });
    };
    // onRefreshServicesNotSponsored = () => {
    //     this.setState({ loader: true }, () => {
    //         this.props.getAllMarketPlacesNotSponsored({ name: '' })
    //     });
    // };
    // onChangeSearchText = text => {
    //     let { search } = this.state
    //     this.setState({ loader: true, search: text }, () => {
    //         console.log(this.state.search, text, 'TEXT====>');
    //         this.props
    //             .getAllServices({ search })

    //     });
    // };

    // onChangeSearchText = text => {
    //     clearTimeout(this.searchTimeout)
    //     this.searchTimeout = setTimeout(() => {
    //         this.setState({ loader: true, search: text }, () => {
    //             console.log(this.state.search, text, 'TEXT====>');
    //             // this.props
    //             //     .getAllMarketPlacesSponsored({ name: text });
    //             // .then(() => this.setState({ loader: false }))
    //             // .catch(() => this.setState({ loader: false }));
    //             this.props
    //                 .getAllMarketPlacesProducts({ name: text })
    //         });
    //     }, 500)

    // };
    renderSponseredList = item => (
        <View>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('ProductDetails', { data: item })} style={styles.ListContainer}>
                <Image source={item?.image ?
                    {
                        uri: imgURL + item?.image
                    } : require('../../assets/user.png')
                } style={styles.teamImage} />
                <View style={{ position: 'absolute', right: 0, padding: 4, backgroundColor: '#fff', borderRadius: 8, margin: 5 }}>
                    {/* <TouchableOpacity onPress={() => console.warn('Touch')}> */}
                    <FontAwesome5 name={'crown'} size={15} color={'#1872ea'} />
                    {/* </TouchableOpacity> */}
                </View>
                <Text style={styles.sponsorName}>{item?.name}</Text>
                <Text style={styles.sponsorPrice}>{item?.price}</Text>
            </TouchableOpacity>
        </View>

    );

    renderProductsList = item => (
        <View>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('ProductDetails', { data: item })} style={styles.ListContainer}>
                <Image source={item?.image ?
                    {
                        uri: imgURL + item?.image
                    } : require('../../assets/user.png')
                } style={styles.teamImage} />

                <Text style={styles.sponsorName}>{item?.name}</Text>
                <Text style={styles.sponsorPrice}>{item?.price}</Text>
            </TouchableOpacity>
        </View>
    );

    render() {
        const { getMarketPlaceSponsoredData, getMarketPlaceSponsoredData_list, getMarketPlaceProductsData, getMarketPlaceProductsData_list, loader } = this.props;
        console.warn('Dataa', getMarketPlaceSponsoredData_list);
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <MyHeader
                    back notify profile navigation={this.props.navigation}
                    // title={this.props.route.name}
                    title={'Market Place'}
                    onBackPress={() => this.props.navigation.goBack()}
                />
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={loader}
                            onRefresh={this.onRefreshServicesSponsored}
                        />
                    }
                // style={styles.container}
                >

                    <View style={{ paddingHorizontal: 20 }}>
                        {/* <HStack
                            backgroundColor="#eee"
                            marginTop="2"
                            borderRadius={10}
                            alignItems="center"
                            paddingX="3">
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', width: '90%' }}>
                                    <Icon as={Feather} name="search" size="sm" color="#aaa" />
                                    <Input fontSize={14} placeholder="Search Service Provider" borderWidth={0} onChangeText={this.onChangeSearchText} />
                                </View>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('ServicesFilter')}>
                                    <Icon as={Octicons} name="settings" size="sm" color="#aaa" />
                                </TouchableOpacity>
                            </View>
                        </HStack> */}


                        <View style={{ marginVertical: 10 }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Sponsored</Text>
                        </View>
                        {!getMarketPlaceSponsoredData ? (
                            <ActivityIndicator
                                size={'large'}
                                color={'#1D9CD9'}
                                style={styles.loadMoreContentContainer}
                            />
                        ) : null}
                        {getMarketPlaceSponsoredData_list && getMarketPlaceSponsoredData_list?.length ? (
                            <FlatList
                                // refreshControl={
                                //     <RefreshControl
                                //         refreshing={loader}
                                //         onRefresh={this.onRefreshServicesSponsored}
                                //     />
                                // }
                                numColumns={2}
                                columnWrapperStyle={styles.teamsListContainer}
                                style={styles.flex1}
                                showsVerticalScrollIndicator={false}
                                data={getMarketPlaceSponsoredData_list}
                                renderItem={({ item, index }) => this.renderSponseredList(item)}
                                ListFooterComponent={this.renderLoaderMoreButtonSponosred()}
                            // renderItem={({ item }) => this.renderList(item)}
                            />
                        ) : null}


                        <View style={{ marginVertical: 10 }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Products</Text>
                        </View>
                        {!getMarketPlaceProductsData ? (
                            <ActivityIndicator
                                size={'large'}
                                color={'#1D9CD9'}
                                style={styles.loadMoreContentContainer}
                            />
                        ) : null}
                        {getMarketPlaceProductsData_list && getMarketPlaceProductsData_list?.length ? (
                            <FlatList
                                // refreshControl={
                                //     <RefreshControl
                                //         refreshing={loader}
                                //         onRefresh={this.onRefreshServicesNotSponsored}
                                //     />
                                // }
                                numColumns={2}
                                columnWrapperStyle={styles.teamsListContainer}
                                // style={styles.flex1}
                                showsVerticalScrollIndicator={false}
                                data={getMarketPlaceProductsData_list}
                                renderItem={({ item, index }) => this.renderProductsList(item)}
                                ListFooterComponent={this.renderLoaderMoreButtonProducts()}
                            // renderItem={({ item }) => this.renderList(item)}
                            />
                        ) : null}

                        {/* <FlatList
                            numColumns={2}
                            columnWrapperStyle={styles.teamsListContainer}
                            style={styles.flex1}
                            showsVerticalScrollIndicator={false}
                            data={[
                                { name: 'Realtors', img: require('../../assets/realtor.jpg') },
                                { name: 'Artists', img: require('../../assets/c2.jpeg') },

                            ]}
                            renderItem={({ item }) => this.renderSponsorList(item)}
                        /> */}

                    </View>

                </ScrollView>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('AddProduct')}
                    activeOpacity={0.7}
                    style={styles.fabBtn}>
                    <Entypo name="plus" size={28} color={'#fff'} />
                </TouchableOpacity>

                <Modal
                    animationType={'fade'}
                    transparent={true}
                    visible={this.state.SponsorModal}
                    onRequestClose={() => this.setState({ SponsorModal: false })}>
                    <View
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'rgba(0,0,0,0.50)',
                        }}>
                        <View

                            style={{
                                height: 360,
                                width: '90%',
                                borderRadius: 14,
                                //alignItems: 'center',
                                backgroundColor: '#fff',
                                // justifyContent: 'center',
                            }}>

                            <View style={{ width: '100%', alignItems: 'center' }}>
                                <TouchableOpacity
                                    style={{ position: 'absolute', zIndex: 1, alignSelf: 'flex-end', right: 8 }}
                                    onPress={() => {
                                        this.setState({ SponsorModal: false });
                                    }}>
                                    <Entypo
                                        name={'circle-with-cross'}
                                        size={24}
                                        //  color={'#1872ea'}
                                        color={'#fff'}
                                        style={{ marginLeft: 5, marginTop: 7 }}
                                    />
                                </TouchableOpacity>
                                <Image source={require('../../assets/realtor.jpg')} style={{
                                    width: '100%',
                                    height: 220,
                                    resizeMode: 'cover',
                                    borderTopLeftRadius: 14,
                                    borderTopRightRadius: 14,
                                }} />
                                <Text style={{ fontSize: 20, color: '#000', fontWeight: 'bold' }}>Guitar</Text>
                                <Text style={{ fontSize: 16, color: '#000', fontWeight: 'bold' }}>$259.50</Text>
                                <Text numberOfLines={3} style={{ fontSize: 13, color: '#000', fontWeight: 'normal', textAlign: 'center' }}> Lorem Ipsum is simply dummy text of
                                    the printing and typesetting industry.
                                    Lorem Ipsum has been the industry's
                                    standard dummy text ever since
                                </Text>
                            </View>

                        </View>
                    </View>
                </Modal>

            </View>
        );
    }
}
const mapStateToProps = state => {
    console.warn('state', state);
    return {
        // role: state.Auth.role,
        // user: state.Auth.user,
        getMarketPlaceSponsoredData: state.MarketPlaceReducer.getMarketPlaceSponsoredData,
        getMarketPlaceSponsoredData_list: state.MarketPlaceReducer.getMarketPlaceSponsoredData_list,
        getMarketPlaceProductsData: state.MarketPlaceReducer.getMarketPlaceProductsData,
        getMarketPlaceProductsData_list: state.MarketPlaceReducer.getMarketPlaceProductsData_list,
    };
};
const mapDispatchToProps = dispatch => ({
    // Login: data => dispatch(AuthMiddleware.Login(data)),
    // Login: data => dispatch(AuthMiddleware.Login(data)),

    getAllMarketPlaceSponsored: (payload) =>
        dispatch(MarketPlaceMiddleware.getAllMarketPlacesSponsored(payload)),
    getAllMarketPlaceProducts: (payload) =>
        dispatch(MarketPlaceMiddleware.getAllMarketPlacesProducts(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MarketPlace);

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
        width: 100,
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
});
