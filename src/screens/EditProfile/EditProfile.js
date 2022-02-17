import { Box, Button, Heading, HStack, Input, VStack } from 'native-base';
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import MyHeader from '../../components/MyHeader';
const { width } = Dimensions.get('window');
export default class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            phone: '',
            address: "",
            country: ['USA', 'Canada', 'UK'],
            city: ['Newyork', 'California', 'New Mexico', 'Washington'],
            state: ['Newyork', 'California', 'New Mexico', 'Washington'],
            zip: '',
        };
    }
    uploadImage = () => {
        OpenImagePicker(img => {
            let uri_script = img.path.split('/');
            let name = uri_script[uri_script.length - 1];

            let imgObj = {
                name,
                uri: img.path,
                size: img.size,
                type: img.mime,
            };

            this.setState({ image: imgObj });
        });
    };
    render() {
        return (
            <View style={styles.container}>
                <MyHeader title={'Edit Profile'} notify profile back onBackPress={() => this.props.navigation.goBack()} navigation={this.props.navigation} />
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    style={styles.body}>
                    <HStack
                        padding={5}
                        marginBottom={2}
                        backgroundColor="#eee"
                        space="md"
                        alignItems="center">
                        <Image
                            source={require('../../assets/user.png')}
                            style={{
                                width: width * 0.3,
                                height: width * 0.3,
                                borderRadius: 3,
                            }}
                        />
                        <VStack space="lg">
                            <Box>
                                <Heading fontSize="lg">John Doe</Heading>
                                <Text adjustsFontSizeToFit numberOfLines={1} style={{ width: '97%', fontSize: 13, }}>Johndoe@blackowned.biz</Text>
                            </Box>
                            <Button backgroundColor="primary.100" maxWidth={150}>
                                Change Photo
                            </Button>
                        </VStack>
                    </HStack>
                    <Input
                        placeholder="Username"
                        style={styles.input}
                        onChangeText={name => this.setState({ name })}
                        value={this.state.name}
                    />
                    <Input
                        placeholder="Contact no"
                        style={styles.input}
                        onChangeText={phone => this.setState({ phone })}
                        value={this.state.phone}
                        keyboardType={'numeric'}
                    />
                    <Input
                        placeholder="Address"
                        style={styles.input}
                        onChangeText={address => this.setState({ address })}
                        value={this.state.address}
                    />
                    <View style={styles.selectContainer}>
                        <SelectDropdown
                            data={this.state.country}
                            // defaultValue={this.state.country[0]}
                            defaultButtonText="Country"
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
                    <View style={styles.selectContainer}>
                        <SelectDropdown
                            data={this.state.city}
                            // defaultValue={this.state.city[0]}
                            defaultButtonText="City"
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
                    <View style={styles.selectContainer}>
                        <SelectDropdown
                            data={this.state.state}
                            // defaultValue={this.state.state[0]}
                            defaultButtonText="State"
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
                    <Input
                        placeholder="Zip code"
                        style={styles.input}
                        onChangeText={zip => this.setState({ zip })}
                        value={this.state.zip}
                        keyboardType={'numeric'}
                    />
                    <Button
                        onPress={() => this.props.navigation.goBack()}
                        backgroundColor="primary.100"
                        style={{
                            width: '100%',
                            borderRadius: 4,
                            marginVertical: 5,
                            height: 45,
                            marginVertical: 10,
                        }}>
                        Update
                    </Button>
                </ScrollView>
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
        alignSelf: 'center',
    },
    input: {
        width: '100%',
        height: 50,
        borderRadius: 3,
        textAlign: 'left',
        marginBottom: 5,
        backgroundColor: '#eee',
        elevation: 3,
        borderWidth: 0,
        alignSelf: 'center',
        marginVertical: 5,
        paddingLeft: 15,

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
})