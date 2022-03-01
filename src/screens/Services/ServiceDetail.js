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
import { Image, Dimensions, View, Animated, TouchableOpacity, Text, FlatList, StyleSheet, ActivityIndicator, RefreshControl } from 'react-native';
import MyHeader from '../../components/MyHeader';
import Feather from 'react-native-vector-icons/Feather';
import Octicons from 'react-native-vector-icons/Octicons';
import StarRating from 'react-native-star-rating-widget';
import { connect } from 'react-redux';
import { ServicesMiddleware } from '../../redux/middleware/ServicesMiddleware';
import { imgURL } from '../../configs/AxiosConfig';
// import {Colors} from '../../Styles';



const { width } = Dimensions.get('window');

class ServiceDetails extends Component {

    state = {
        loader: true,
        search: '',
        detailsData: [],
    };
    componentDidMount() {
        let data = this.props.route.params.data
        // this.setState({ detailsData: data })
        this.props.getAllProviders({ name: '', serviceid: data?.id })
        // .then(() => this.setState({ loader: false }))
        // .catch(() => this.setState({ loader: false }));
    }

    onPressLoadMore = () => {
        this.setState({ loader: true }, () => {
            const { getProvidersData } = this.props;
            this.props
                .getAllProviders(getProvidersData.next_page_url, '')
                .then(() => this.setState({ loader: false }))
                .catch(() => this.setState({ loader: false }));
        });
    };

    renderLoaderMoreButton = () => {
        const { getProvidersData } = this.props;
        const { loader } = this.state;
        return getProvidersData.next_page_url ? (
            loader ? (
                <ActivityIndicator
                    size={'large'}
                    color={'#1D9CD9'}
                    style={styles.loadMoreContentContainer}
                />
            ) : (
                <TouchableOpacity
                    style={{ width: 110, alignSelf: 'center', marginVertical: 13 }}
                    onPress={this.onPressLoadMore}>
                    <View style={styles.loadMoreContainer}>
                        <Text style={styles.loadMoreText}>Load more</Text>
                    </View>
                </TouchableOpacity>
            )
        ) : null;
    };

    onRefreshServices = () => {
        this.setState({ loader: true }, () => {
            this.props.getAllProviders({ name: '' })
        });
    };
    // onChangeSearchText = text => {
    //     let { search } = this.state
    //     this.setState({ loader: true, search: text }, () => {
    //         console.log(this.state.search, text, 'TEXT====>');
    //         this.props
    //             .getAllServices({ search })

    //     });
    // };

    onChangeSearchText = text => {
        clearTimeout(this.searchTimeout)
        this.searchTimeout = setTimeout(() => {
            this.setState({ loader: true, search: text }, () => {
                console.log(this.state.search, text, 'TEXT====>');
                this.props
                    .getAllProviders({ name: text })
                // .then(() => this.setState({ loader: false }))
                // .catch(() => this.setState({ loader: false }));
            });
        }, 500)

    };

    renderUsersList = item => (

        <TouchableOpacity onPress={() => this.props.navigation.navigate('OtherProfile', { data: item })}>
            <View style={{ flexDirection: 'row', backgroundColor: '#eee', padding: 10, marginVertical: 5, width: '100%' }}>
                <View style={{ flexDirection: 'row', width: '70%' }}>
                    <Image source={item?.profile_pic ?
                        {
                            uri: imgURL + item?.profile_pic
                        } : require('../../assets/user.png')
                    } style={styles.profileImg} />

                    <View style={{ paddingHorizontal: 10, justifyContent: 'center' }}>
                        <Text style={styles.ProfileName}>{item?.username}</Text>
                        <View style={{ flexDirection: 'row', marginVertical: 10, alignItems: 'center' }}>
                            <Image source={require('../../assets/blueMarker.png')} style={{ width: 15, height: 15 }} />
                            <Text style={{ fontSize: 11 }}>8 miles away</Text>
                        </View>
                    </View>
                </View>

                <View style={{ width: '30%', justifyContent: 'center' }}>
                    <Text style={styles.Profile}>{item?.service_name}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                        <View style={{ alignSelf: 'center', marginHorizontal: 5 }}>
                            <StarRating
                                rating={item?.rating?.rating}
                                onChange={() => null}
                                color={'#1D9CD9'}
                                starSize={13}
                                maxStars={5}
                                starStyle={{ width: 2 }}
                            />
                        </View>
                        <Text style={{ textAlignVertical: 'center', fontSize: 12 }}>{item?.rating?.rating}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>

    );

    render() {
        const { getProvidersData, getProvidersData_list, loader } = this.props;
        console.warn('Dataa', getProvidersData_list, getProvidersData);
        // const { detailsData } = this.state;
        // console.warn(detailsData);
        return (
            <View style={styles.container}>
                <MyHeader
                    back notify profile navigation={this.props.navigation}
                    title={'Service Details'}
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
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', width: '90%' }}>
                                    <Icon as={Feather} name="search" size="sm" color="#aaa" />
                                    <Input fontSize={14} placeholder="Search Service Provider" borderWidth={0} onChangeText={this.onChangeSearchText} />
                                </View>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('ServicesFilter')}>
                                    <Icon as={Octicons} name="settings" size="sm" color="#aaa" />
                                </TouchableOpacity>
                            </View>
                        </HStack>
                        {!getProvidersData ? (
                            <ActivityIndicator
                                size={'large'}
                                color={'#1D9CD9'}
                                style={styles.loadMoreContentContainer}
                            />
                        ) : null}
                        {getProvidersData_list && getProvidersData_list?.length ? (
                            <FlatList
                                refreshControl={
                                    <RefreshControl
                                        refreshing={loader}
                                        onRefresh={this.onRefreshServices}
                                    />
                                }
                                style={styles.flex1}
                                showsVerticalScrollIndicator={false}
                                data={getProvidersData_list}
                                renderItem={({ item, index }) => this.renderUsersList(item)}
                                ListFooterComponent={this.renderLoaderMoreButton()}
                            />
                        ) : null}

                    </View>
                </ScrollView>
            </View>
        );
    }
}
const mapStateToProps = state => {
    return {
        // role: state.Auth.role,
        // user: state.Auth.user,
        getProvidersData: state.ServicesReducer.getProvidersData,
        getProvidersData_list: state.ServicesReducer.getProvidersData_list,
    };
};
const mapDispatchToProps = dispatch => ({
    // Login: data => dispatch(AuthMiddleware.Login(data)),
    // Login: data => dispatch(AuthMiddleware.Login(data)),

    getAllProviders: (payload) =>
        dispatch(ServicesMiddleware.getAllProviders(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ServiceDetails);

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
