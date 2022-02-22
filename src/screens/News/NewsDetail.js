import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import MyHeader from '../../components/MyHeader';
import { imgURL } from '../../configs/AxiosConfig';

export default class NewsDetail extends Component {
    state = {
        loader: true,
        detailsData: [],
    };

    componentDidMount() {
        let data = this.props.route.params.data
        this.setState({ detailsData: data })
        
    }

    render() {
        const { detailsData } = this.state;
        console.warn(detailsData);
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <MyHeader
                    back notify profile navigation={this.props.navigation}
                    title={'News'}
                    onBackPress={() => this.props.navigation.goBack()}
                />
                <View style={styles.ListContainer}>

                    <ScrollView>
                        <Image source={detailsData.image ?
                            {
                                uri: imgURL + detailsData.image
                            } : require('../../assets/user.png')
                        } style={styles.ListImage} />
                        <View>
                            <Text adjustsFontSizeToFit numberOfLines={1} style={styles.ListName}>{detailsData.name}</Text>

                            <Text style={styles.ListDescription}>{detailsData.description}</Text>
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

    ListContainer: {
        flex: 1,
        width: '93%',
        marginVertical: 10,
        alignSelf: 'center',
        backgroundColor: '#fff'
    },
    ListImage: {
        width: '100%',
        height: 240,
        resizeMode: 'cover'
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
        marginVertical: 5,
        fontSize: 13,
        fontWeight: 'normal',
        color: 'black',
    },
    ListAddImage: {
        marginRight: 5,
    },

})