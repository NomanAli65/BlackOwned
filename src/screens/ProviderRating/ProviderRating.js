
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, StyleSheet, RefreshControl } from 'react-native';
import StarRating from 'react-native-star-rating-widget';
import { connect } from 'react-redux';
import MyHeader from '../../components/MyHeader';
import { imgURL } from '../../configs/AxiosConfig';
import { AppMiddleware } from '../../redux/middleware/AppMiddleware';

class ProviderRating extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            refreshing: true,
        };
    }
    componentDidMount = () => {
        this.GetRating();
    }
    GetRating = () => {
        this.props.Provider_Rating({
            callback: response => {

                if (response) {
                    console.warn("DATA,", response.data);
                    this.setState({
                        data: response?.data,
                        refreshing: false,
                    })

                } else {
                    this.setState({ loading: false, refreshing: false, });
                }
            },
        });
    }
    renderRateList = item => (
        <TouchableOpacity activeOpacity={0.7} style={styles.ListContainer}>
            {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}> */}
            <Image source={item?.user?.profile_pic ?
                {
                    uri: imgURL + item?.user?.profile_pic
                } : require('../../assets/user.png')
            } style={styles.ListImage} />
            <View style={{ width: '80%', marginLeft: 6, }}>
                <Text style={styles.ListName}>{item?.user?.username}</Text>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ alignSelf: 'center', }}>
                        <StarRating
                            rating={item?.rating}
                            onChange={() => null}
                            color={'#1D9CD9'}
                            starSize={20}
                            maxStars={5}
                            starStyle={{ width: 10 }}
                        />
                    </View>
                </View>
                <Text style={styles.Description}>{item.comments}</Text>
            </View>

            {/* </View> */}
        </TouchableOpacity>
    );

    render() {
        return (
            <View style={styles.container}>
                <MyHeader
                    back notify profile navigation={this.props.navigation}
                    title={'Ratings'}
                    onBackPress={() => this.props.navigation.goBack()}
                />
                <FlatList
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.GetRating}
                        />
                    }
                    style={styles.flex1}
                    // numColumns={2}
                    // columnWrapperStyle={styles.teamsListContainer}
                    showsVerticalScrollIndicator={false}
                    data={this.state.data}
                    renderItem={({ item, index }) => this.renderRateList(item)}
                />
            </View>
        );
    }
}
const mapStateToProps = state => ({

})
const mapDispatchToProps = dispatch => ({
    Provider_Rating: paylaod => dispatch(AppMiddleware.Provider_Rating(paylaod)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProviderRating);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        //   paddingHorizontal: 25,
        backgroundColor: "#fff",
    },

    ListContainer: {
        alignSelf: 'center',
        width: '94%',
        paddingVertical: 15,
        paddingHorizontal: 10,
        marginVertical: 5,
        elevation: 2,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#eee',
        borderRadius: 4,
        // justifyContent: 'space-between',
        // backgroundColor: 'red',
    },
    ListImage: {
        width: 65,
        height: 65,
        resizeMode: 'cover',
        borderRadius: 4,
    },
    teamsListContainer: {
        justifyContent: 'space-between',
    },
    ListName: {

        fontSize: 16,
        color: 'black',
        fontWeight: 'bold',
    },
    Description: {
        width: '100%',
        //backgroundColor: 'red',
        fontSize: 13,
        color: 'black',
        fontWeight: 'normal',
    },
    ListDistances: {

        fontSize: 13,
        fontWeight: 'normal',
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