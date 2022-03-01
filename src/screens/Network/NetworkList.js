import { HStack, Icon, Input } from 'native-base';
import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, ActivityIndicator, RefreshControl } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Octicons from 'react-native-vector-icons/Octicons';
import { connect } from 'react-redux';
import { NetworkMiddleware } from '../../redux/middleware/NetworkMiddleware';
import { imgURL } from '../../configs/AxiosConfig';
class NetworkList extends Component {
    state = {
        loader: true,
        search: '',
        getUserListDataCopy: [],
    };
    componentDidMount() {
        this.props.getAllUserList({ name: '' })

    }

    friendRequest = item => {
        // console.warn('stored', item);
        let getUserListDataCopy = this.props.getUserListData_list;

        let index = getUserListDataCopy.findIndex(val => val.id === item.id);

        if (!getUserListDataCopy[index].is_requested) {
            let updateItem = { ...item, is_requested: true, };

            getUserListDataCopy.splice(index, 1, updateItem);
        } else {
            let index = getUserListDataCopy.findIndex(val => val.id === item.id);
            let updateItem = {
                ...item,
                is_requested: false,
            };

            getUserListDataCopy.splice(index, 1, updateItem);
        }
        this.setState({ getUserListDataCopy });
        this.props.friendRequest({ friendid: item.id });
    };

    onPressLoadMore = () => {
        this.setState({ loader: true }, () => {
            const { getUserListData } = this.props;
            this.props
                .getAllUserList(getUserListData.next_page_url, '')
                .then(() => this.setState({ loader: false }))
                .catch(() => this.setState({ loader: false }));
        });
    };

    renderLoaderMoreButton = () => {
        const { getUserListData } = this.props;
        const { loader } = this.state;
        return getUserListData.next_page_url ? (
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
            this.props.getAllUserList({ name: '' })
        });
    };


    onChangeSearchText = text => {
        clearTimeout(this.searchTimeout)
        this.searchTimeout = setTimeout(() => {
            this.setState({ loader: true, search: text }, () => {
                console.log(this.state.search, text, 'TEXT====>');
                this.props
                    .getAllUserList({ name: text })

            });
        }, 500)

    };
    renderUsersList = item => (
        <TouchableOpacity activeOpacity={0.7} style={styles.ListContainer}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={item.profile_pic ?
                    {
                        uri: imgURL + item.profile_pic
                    } : require('../../assets/user.png')
                } style={styles.ListImage} />
                <Text style={styles.ListName}>{item.username}</Text>
            </View>
            {item?.is_friend ? (
                <Text>Friends</Text>
            ) : (
                <View>
                    {item?.is_requested ? (
                        <Text>Requested</Text>
                    ) : (
                        <TouchableOpacity onPress={() => this.friendRequest(item)} style={styles.ListAddImage}>
                            <Ionicons name={'person-add'} size={30} color={'#000'} />
                        </TouchableOpacity>
                    )
                    }
                </View>
            )}
            {/* <TouchableOpacity style={styles.ListAddImage}>
    <Ionicons name={'person-add'} size={30} color={'#000'} />
</TouchableOpacity> */}
        </TouchableOpacity >
    );

    render() {
        const { getUserListData, getUserListData_list, loader } = this.props;
        console.warn('Dataa', getUserListData_list, getUserListData);
        return (
            <View style={{ marginHorizontal: 10, justifyContent: 'center' }}>
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
                {!getUserListData ? (
                    <ActivityIndicator
                        size={'large'}
                        color={'#1D9CD9'}
                        style={styles.loadMoreContentContainer}
                    />
                ) : null}
                {getUserListData_list && getUserListData_list?.length ? (
                    <FlatList
                        refreshControl={
                            <RefreshControl
                                refreshing={loader}
                                onRefresh={this.onRefreshServices}
                            />
                        }
                        style={styles.flex1}
                        showsVerticalScrollIndicator={false}
                        data={getUserListData_list}
                        renderItem={({ item, index }) => this.renderUsersList(item)}
                        ListFooterComponent={this.renderLoaderMoreButton()}
                    />
                ) : null}
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        // role: state.Auth.role,
        // user: state.Auth.user,
        getUserListData: state.NetworkReducer.getUserListData,
        getUserListData_list: state.NetworkReducer.getUserListData_list,

        friendRequestData: state.NetworkReducer.friendRequestData,
    };
};
const mapDispatchToProps = dispatch => ({
    // Login: data => dispatch(AuthMiddleware.Login(data)),
    // Login: data => dispatch(AuthMiddleware.Login(data)),

    getAllUserList: (payload) =>
        dispatch(NetworkMiddleware.getAllUserList(payload)),

    friendRequest: payload => dispatch(NetworkMiddleware.friendRequest(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NetworkList);
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
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        // backgroundColor: 'red',
    },
    ListImage: {
        width: 50,
        height: 50,
    },
    teamsListContainer: {
        justifyContent: 'space-between',
    },
    ListName: {
        marginLeft: 10,
        fontSize: 15,
        color: 'black',
        fontWeight: 'bold',
    },
    ListAddImage: {
        marginRight: 5,
    },
    loadMoreContentContainer: {
        justifyContent: 'center',
        alignSelf: 'center',
        width: 120,
        marginVertical: 20,
    },
    loadMoreText: {
        color: '#fff',
        fontWeight: '500',
        fontSize: 16,
        marginLeft: 5,
    },
})