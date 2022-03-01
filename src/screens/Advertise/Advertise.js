import { Button, HStack, Icon, Input } from 'native-base';
import React, { Component } from 'react';
import { Image, Dimensions, View, Animated, TouchableOpacity, Text, FlatList, StyleSheet, ActivityIndicator, RefreshControl, Modal } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import MyHeader from '../../components/MyHeader';
import CheckBox from '@react-native-community/checkbox';
import { connect } from 'react-redux';
import { MarketPlaceMiddleware } from '../../redux/middleware/MarketPlaceMiddleware';
import { imgURL } from '../../configs/AxiosConfig';

class Advertise extends Component {
    state = {
        loader: true,
        search: '',
        getProductsDataCopy: [],
    };
    componentDidMount() {
        this.props.getAllUserProducts({ name: '' })
        // .then(() => this.setState({ loader: false }))
        // .catch(() => this.setState({ loader: false }));
    }

    // promoteProduct = (item) => {

    //     this.props.promoteProduct(
    //         item.id,
    //     );
    // }

    promoteProduct = item => {
        // console.warn('stored', item);
        let getProductsDataCopy = this.props.getUserProductsData_list;

        let index = getProductsDataCopy.findIndex(val => val.id === item.id);

        if (!getProductsDataCopy[index].stored) {
            let updateItem = { ...item, is_sponsored: 1, };

            getProductsDataCopy.splice(index, 1, updateItem);
        } else {
            let index = getProductsDataCopy.findIndex(val => val.id === item.id);
            let updateItem = {
                ...item,
                is_sponsored: 0,
            };

            getProductsDataCopy.splice(index, 1, updateItem);
        }
        this.setState({ getProductsDataCopy });
        this.props.promoteProduct({ productid: item.id });
    };

    onPressLoadMoreProducts = () => {
        this.setState({ loader: true }, () => {
            const { getUserProductsData } = this.props;
            this.props
                .getAllUserProducts(getUserProductsData.next_page_url, '')
                .then(() => this.setState({ loader: false }))
                .catch(() => this.setState({ loader: false }));
        });
    };


    renderLoaderMoreButtonProducts = () => {
        const { getUserProductsData } = this.props;
        const { loader } = this.state;
        return getUserProductsData.next_page_url ? (
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

    onRefreshProducts = () => {
        this.setState({ loader: true }, () => {
            this.props.getAllUserProducts({ name: '' })
        });
    };
    renderUsersList = item => (
        <TouchableOpacity
            activeOpacity={0.7} style={styles.ListContainer}>
            {/* <CheckBox
                disabled={false}
                value={this.state.toggleCheckBox1}
            // onValueChange={(newValue) => this.setState({ toggleCheckBox1: newValue, toggleCheckBox2: false, toggleCheckBox3: false })}
            /> */}
            <Image source={item.image ?
                {
                    uri: imgURL + item.image
                } : require('../../assets/user.png')
            } style={styles.ListImage} />
            <View style={{ width: '70%', marginLeft: 2 }}>
                <Text adjustsFontSizeToFit numberOfLines={1} style={styles.ListName}>{item.name}</Text>
                <View style={styles.FlexRow}>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.ListDistances}>Price:</Text>
                        <Text style={styles.sponsorPrice}>{'$' + item.discounted_price}</Text>
                        <Text style={styles.discountPrice}>{'$' + item.price}</Text>
                    </View>
                    {item.is_sponsored == 0 ? (
                        <TouchableOpacity onPress={() => this.promoteProduct(item)} style={styles.promoteButton}>
                            <Text style={styles.promoteText}>Promote</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity style={styles.promotedButton}>
                            <Text style={styles.promoteText}>Promoted</Text>
                        </TouchableOpacity>
                    )}
                </View>
                <Text numberOfLines={3} style={styles.ListDescription}>{item.description}</Text>
            </View>
        </TouchableOpacity>
    );

    render() {
        const { getUserProductsData, getUserProductsData_list, loader } = this.props;
        console.warn('Dataa', getUserProductsData_list);
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <MyHeader
                    notify profile navigation={this.props.navigation}
                    title={'Advertise'}
                    onBackPress={() => this.props.navigation.goBack()}
                />
                <HStack
                    backgroundColor="#eee"
                    marginTop="2"
                    borderRadius={10}
                    alignItems="center"
                    marginHorizontal={15}
                    paddingX="3"
                    marginBottom={2}
                >

                    <Icon as={Feather} name="search" size="sm" color="#aaa" />
                    <Input fontSize={14} placeholder="Search" borderWidth={0} />
                </HStack>
                {/* <Button
                    onPress={() => this.props.navigation.navigate('SubcriptionPlans')}
                    backgroundColor="primary.100"
                    style={{
                        alignSelf: 'flex-end',
                        width: '40%',
                        borderRadius: 4,
                        marginRight: 15,
                        height: 45,
                        marginVertical: 10,
                    }}>
                    Promote
                </Button> */}
                <View style={{ flex: 1, marginHorizontal: 15 }}>
                    {!getUserProductsData ? (
                        <ActivityIndicator
                            size={'large'}
                            color={'#1D9CD9'}
                            style={styles.loadMoreContentContainer}
                        />
                    ) : null}
                    {getUserProductsData_list && getUserProductsData_list?.length ? (
                        <FlatList
                            refreshControl={
                                <RefreshControl
                                    refreshing={loader}
                                    onRefresh={this.onRefreshProducts}
                                />
                            }
                            style={styles.flex1}
                            showsVerticalScrollIndicator={false}
                            data={getUserProductsData_list}
                            renderItem={({ item }) => this.renderUsersList(item)}
                            ListFooterComponent={this.renderLoaderMoreButtonProducts()}

                        />
                    ) : null}
                </View>
            </View>
        );
    }
}
const mapStateToProps = state => {
    console.warn('state', state);
    return {

        getUserProductsData: state.MarketPlaceReducer.getUserProductsData,
        getUserProductsData_list: state.MarketPlaceReducer.getUserProductsData_list,

        promoteProductData: state.MarketPlaceReducer.promoteProductData,
    };
};
const mapDispatchToProps = dispatch => ({

    getAllUserProducts: (payload) =>
        dispatch(MarketPlaceMiddleware.getAllUserProducts(payload)),

    promoteProduct: payload => dispatch(MarketPlaceMiddleware.promoteProduct(payload)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Advertise);

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
        backgroundColor: '#eee',
        paddingVertical: 10,
    },
    ListImage: {
        width: 80,
        height: 80,
        resizeMode: 'cover',
        marginLeft: 10,
        marginRight: 5,
        borderRadius: 4,
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
        width: '98%',
        fontSize: 10,
        fontWeight: 'normal',
        color: 'black',
        marginTop: 5,
        // backgroundColor: 'red',
    },
    ListAddImage: {
        marginRight: 5,
    },
    FlexRow: {
        width: '98%',
        // backgroundColor: 'red',
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    promoteButton: {
        width: 80,
        height: 35,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#1872ea",
    },
    promotedButton: {
        width: 80,
        height: 35,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#ABABAB",
    },
    promoteText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold'
    },
    flex1: {
        flex: 1,
    },
    sponsorPrice: {
        fontSize: 14,
        color: '#1D9CD9',
        alignSelf: 'flex-start',
        // fontWeight: 'bold',
        marginHorizontal: 5,
    },
    discountPrice: {
        fontSize: 14,
        color: '#1D9CD9',
        alignSelf: 'flex-start',
        // fontWeight: 'bold',
        textDecorationLine: 'line-through',
        marginHorizontal: 5,
    },
})