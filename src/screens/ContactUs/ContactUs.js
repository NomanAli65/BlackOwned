
import { Button } from 'native-base';
import React, { Component } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import MyHeader from '../../components/MyHeader';

export default class ContactUs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            country: ['Queries', 'Suggestions', 'Claims', 'Complaints'],
            description: '',
        };
    }
    handleChangeDescription = value => {
        this.setState({ description: value });
    };
    render() {
        return (
            <View style={styles.container}>
                <MyHeader title={'Contact Us'} notify back onBackPress={() => this.props.navigation.goBack()} navigation={this.props.navigation} />
                <View style={styles.body}>
                    <View style={styles.selectContainer}>
                        <SelectDropdown
                            data={this.state.country}
                            // defaultValue={this.state.country[0]}
                            defaultButtonText="Select an option"
                            dropdownIconPosition="right"
                            renderDropdownIcon={() => {
                                return (
                                    <Image
                                        resizeMode="contain"
                                        source={require('../../assets/dropdown.png')}
                                        style={{ height: 15, width: 15, tintColor: 'rgb(160, 160, 160)' }}
                                    />
                                );
                            }}
                            buttonTextStyle={styles.dropDownBtnText}
                            buttonStyle={styles.btnStyle}
                            onSelect={(selectedItem, index) => {
                                // this.setState({ selectedRole: selectedItem, selectedUsersIDs: [] });
                                // this.props.getUsersByType({ role: selectedItem });
                            }}
                        />
                    </View>
                    <TextInput
                        placeholder="Description"
                        style={[styles.input, { height: 235, textAlignVertical: 'top' }]}
                        value={this.state.description}
                        onChangeText={this.handleChangeDescription}
                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Button
                            onPress={() => this.props.navigation.goBack()}
                            backgroundColor="primary.100"
                            style={{
                                width: '50%',
                                borderRadius: 4,
                                marginVertical: 5,
                                height: 45,
                                marginVertical: 10,
                                marginHorizontal: 10,
                            }}>
                            Submit
                        </Button>
                        <Button
                            onPress={() => this.props.navigation.goBack()}
                            backgroundColor="primary.100"
                            style={{
                                width: '40%',
                                borderRadius: 4,
                                marginVertical: 5,
                                height: 45,
                                marginVertical: 10,
                                marginHorizontal: 10,
                                backgroundColor: 'rgb(180,180,180)'
                            }}>
                            Cancel
                        </Button>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    body: {
        width: '92%',
        alignSelf: "center",
        paddingTop: 30,
    },
    TextAll: {
        fontSize: 13,
        color: '#000',
        marginBottom: 10,


    },
    selectContainer: {
        backgroundColor: '#eee',
        marginVertical: 5,
        elevation: 3,
        // paddingVertical: 10,
    },
    selectContainerHalf: {
        backgroundColor: '#eee',
        width: '40%'
        // paddingVertical: 10,
    },
    dropDownBtnText: {
        color: 'rgb(160,160,160)',
        fontSize: 14,
        textAlign: 'left',
    },
    btnStyle: {
        backgroundColor: '#eee',
        alignSelf: 'center',
        width: '100%',
    },
    input: {
        width: '100%',
        marginVertical: 25,
        paddingLeft: 12,
        alignSelf: 'center',
        backgroundColor: '#eee',
    },
})