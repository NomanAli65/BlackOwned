import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import MyHeader from '../../components/MyHeader';
import { AppMiddleware } from '../../redux/middleware/AppMiddleware';

class TermsAndConditions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            Terms: "",
        };
    }
    componentDidMount() {
        this.setState({ refreshing: true })
        this.Terms()
    }
    Terms = () => {
        this.props.DATA({
            callback: response => {

                if (response) {
                    console.warn("DATA,", response);
                    this.setState({
                        Terms: response?.data?.terms,
                        refreshing: false,
                    })

                } else {
                    this.setState({ loading: false, refreshing: false, });
                }
            },
        });
    }
    render() {
        return (
            <View style={styles.container}>
                <MyHeader title={'Terms & Condition'} notify back onBackPress={() => this.props.navigation.goBack()} navigation={this.props.navigation} />
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.Terms}
                        />
                    }
                    style={styles.body}>
                    <Text style={styles.TextAll}>{this.state.Terms}</Text>
                </ScrollView>
            </View>
        );
    }
}
const mapStateToProps = state => ({

})
const mapDispatchToProps = dispatch => ({
    DATA: paylaod => dispatch(AppMiddleware.Data(paylaod)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TermsAndConditions);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    body: {
        width: '94%',
        alignSelf: "center",

    },
    TextAll: {
        fontSize: 13,
        color: '#000',
        marginVertical: 10,


    },
})