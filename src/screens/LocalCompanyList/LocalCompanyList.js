import { HStack, Icon, Input } from 'native-base';
import React, { Component } from 'react';
import { Image, Dimensions, View, Animated, TouchableOpacity, Text, FlatList, StyleSheet, ActivityIndicator, RefreshControl } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Octicons from 'react-native-vector-icons/Octicons';
import MyHeader from '../../components/MyHeader';
import { connect } from 'react-redux';
import { ListedCompaniesMiddleware } from '../../redux/middleware/ListedCompaniesMiddleware';
import { imgURL } from '../../configs/AxiosConfig';

class LocalCompanyList extends Component {

    state = {
        loader: true,
        search: '',
    };
    componentDidMount() {
        this.props.getAllListedCompanies({ name: '' })
        // .then(() => this.setState({ loader: false }))
        // .catch(() => this.setState({ loader: false }));
    }

    onPressLoadMore = () => {
        this.setState({ loader: true }, () => {
            const { getLisetdCompaniesData } = this.props;
            this.props
                .getAllListedCompanies(getLisetdCompaniesData.next_page_url, '')
                .then(() => this.setState({ loader: false }))
                .catch(() => this.setState({ loader: false }));
        });
    };

    renderLoaderMoreButton = () => {
        const { getLisetdCompaniesData } = this.props;
        const { loader } = this.state;
        return getLisetdCompaniesData.next_page_url ? (
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
            this.props.getAllListedCompanies({ name: '' })
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
                    .getAllListedCompanies({ name: text })
                // .then(() => this.setState({ loader: false }))
                // .catch(() => this.setState({ loader: false }));
            });
        }, 500)

    };
    renderUsersList = item => (
        <View activeOpacity={0.7} style={styles.ListContainer}>
            <Image source={item.image ?
                {
                    uri: imgURL + item.profile_pic
                } : require('../../assets/user.png')
            } style={styles.ListImage} />
            <View style={{ marginHorizontal: 10 }}>
                <Text adjustsFontSizeToFit numberOfLines={1} style={styles.ListName}>{item.company_name}</Text>
                <Text style={styles.ListDistances}>2 miles</Text>
            </View>
        </View>
    );

    render() {
        const { getLisetdCompaniesData, getLisetdCompaniesData_list, loader } = this.props;
        console.warn('Dataa',  getLisetdCompaniesData_list);
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <MyHeader
                    back notify profile navigation={this.props.navigation}
                    title={'Listed Companies'}
                    onBackPress={() => this.props.navigation.goBack()}
                />
                <View style={{  flex: 1 }}>
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
                    {!getLisetdCompaniesData ? (
                        <ActivityIndicator
                            size={'large'}
                            color={'#1D9CD9'}
                            style={styles.loadMoreContentContainer}
                        />
                    ) : null}
                    {getLisetdCompaniesData_list && getLisetdCompaniesData_list?.length ? (
                        <FlatList
                            refreshControl={
                                <RefreshControl
                                    refreshing={loader}
                                    onRefresh={this.onRefreshServices}
                                />
                            }
                            showsVerticalScrollIndicator={false}
                            data={getLisetdCompaniesData_list}
                            renderItem={({ item, index }) => this.renderUsersList(item)}
                            ListFooterComponent={this.renderLoaderMoreButton()}
                        />
                    ) : null}

                </View>
            </View >
        );
    }
}
const mapStateToProps = state => {
    return {
        // role: state.Auth.role,
        // user: state.Auth.user,
        getLisetdCompaniesData: state.ListedCompaniesReducer.getLisetdCompaniesData,
        getLisetdCompaniesData_list: state.ListedCompaniesReducer.getLisetdCompaniesData_list,
    };
};
const mapDispatchToProps = dispatch => ({
    // Login: data => dispatch(AuthMiddleware.Login(data)),
    // Login: data => dispatch(AuthMiddleware.Login(data)),

    getAllListedCompanies: (payload) =>
        dispatch(ListedCompaniesMiddleware.getAllListedCompanies(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LocalCompanyList);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        //   paddingHorizontal: 25,
        backgroundColor: "#fff",
    },

    ListContainer: {
        width: '100%',
        marginVertical: 5,
        elevation: 2,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 15,
    },
    ListImage: {
        width: 80,
        height: 80,
        borderRadius: 4,
        resizeMode: 'cover',
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
        fontWeight: 'normal',
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