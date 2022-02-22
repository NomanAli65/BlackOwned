import { HStack, Icon, Input } from 'native-base';
import React, { Component } from 'react';
import { Image, Dimensions, View, Animated, TouchableOpacity, Text, FlatList, StyleSheet, ActivityIndicator, RefreshControl } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Octicons from 'react-native-vector-icons/Octicons';
import MyHeader from '../../components/MyHeader';
import { connect } from 'react-redux';
import { SeminarsMiddleware } from '../../redux/middleware/SeminarsMiddleware';
import { imgURL } from '../../configs/AxiosConfig';
class Seminars extends Component {

    state = {
        loader: true,
        search: '',
    };
    componentDidMount() {
        this.props.getAllSeminars({ name: '' })
        // .then(() => this.setState({ loader: false }))
        // .catch(() => this.setState({ loader: false }));
    }

    onPressLoadMore = () => {
        this.setState({ loader: true }, () => {
            const { getSeminarsData } = this.props;
            this.props
                .getAllSeminars(getSeminarsData.next_page_url, '')
                .then(() => this.setState({ loader: false }))
                .catch(() => this.setState({ loader: false }));
        });
    };

    renderLoaderMoreButton = () => {
        const { getSeminarsData } = this.props;
        const { loader } = this.state;
        return getSeminarsData.next_page_url ? (
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
            this.props.getAllSeminars({ name: '' })
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
                    .getAllSeminars({ name: text })
                // .then(() => this.setState({ loader: false }))
                // .catch(() => this.setState({ loader: false }));
            });
        }, 500)

    };
    renderUsersList = item => (
        <TouchableOpacity activeOpacity={0.7} style={styles.ListContainer}>
            <Image source={item.image ?
                {
                    uri: imgURL + item.image
                } : require('../../assets/user.png')
            } style={styles.ListImage} />
            <View>
                <Text adjustsFontSizeToFit numberOfLines={1} style={styles.ListName}>{item.name}</Text>
                <Text style={styles.ListDistances}>15 January 2022 | 09:30</Text>
                <Text style={styles.ListDescription}>{item.description}</Text>
            </View>
        </TouchableOpacity>
    );

    render() {
        const { getSeminarsData, getSeminarsData_list, loader } = this.props;
        console.warn('Dataa', getSeminarsData_list, getSeminarsData);
        return (
            <View style={{ flex: 1 }}>
                <MyHeader
                    back notify profile navigation={this.props.navigation}
                    title={'Seminar'}
                    onBackPress={() => this.props.navigation.goBack()}
                />
                <View style={{ paddingHorizontal: 20, flex: 1 }}>
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
                    {!getSeminarsData ? (
                        <ActivityIndicator
                            size={'large'}
                            color={'#1D9CD9'}
                            style={styles.loadMoreContentContainer}
                        />
                    ) : null}
                    {getSeminarsData_list && getSeminarsData_list?.length ? (
                        <FlatList
                            refreshControl={
                                <RefreshControl
                                    refreshing={loader}
                                    onRefresh={this.onRefreshServices}
                                />
                            }
                            showsVerticalScrollIndicator={false}
                            data={getSeminarsData_list}
                            renderItem={({ item, index }) => this.renderUsersList(item)}
                            ListFooterComponent={this.renderLoaderMoreButton()}
                        />
                    ) : null}

                </View>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        // role: state.Auth.role,
        // user: state.Auth.user,
        getSeminarsData: state.SeminarsReducer.getSeminarsData,
        getSeminarsData_list: state.SeminarsReducer.getSeminarsData_list,
    };
};
const mapDispatchToProps = dispatch => ({
    // Login: data => dispatch(AuthMiddleware.Login(data)),
    // Login: data => dispatch(AuthMiddleware.Login(data)),

    getAllSeminars: (payload) =>
        dispatch(SeminarsMiddleware.getAllSeminars(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Seminars);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        //   paddingHorizontal: 25,
        backgroundColor: "#fff",
    },

    ListContainer: {
        width: '100%',
        marginVertical: 10,
        elevation: 2,
    },
    ListImage: {
        width: '100%',
        height: 180,
    },
    teamsListContainer: {
        justifyContent: 'space-between',
    },
    ListName: {
        marginTop: 5,
        fontSize: 18,
        color: 'black',
        fontWeight: 'bold',
    },
    ListDistances: {
        fontSize: 13,
        fontWeight: 'bold',
    },
    ListDescription: {
        fontSize: 13,
        fontWeight: 'normal',
        color: 'black',
    },
    ListAddImage: {
        marginRight: 5,
    },
})