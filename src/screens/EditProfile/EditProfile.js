import { Box, Button, Heading, HStack, Input, Radio, VStack } from 'native-base';
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions, TouchableOpacity, Modal } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import SelectDropdown from 'react-native-select-dropdown';
import { connect } from 'react-redux';
import MyHeader from '../../components/MyHeader';
import { OpenImagePicker } from '../../configs';

const { width } = Dimensions.get('window');
class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props?.user?.user?.username ? this.props?.user?.user?.username : '',
            phone: this.props?.user?.user?.phone ? this.props?.user?.user?.phone : '',
            address: this.props?.user?.user?.address ? this.props?.user?.user?.address : '',
            country: ['USA', 'Canada', 'UK'],
            selectedCountry: this.props.user.user?.country ? this.props.user.user?.country : "Country",
            selectedCity: this.props.user.user?.city ? this.props.user.user?.city : "City",
            selectedState: this.props.user.user?.state ? this.props.user.user?.state : "State",
            city: ['Newyork', 'California', 'New Mexico', 'Washington'],
            state: ['Newyork', 'California', 'New Mexico', 'Washington'],
            zip: this.props?.user?.user?.zip ? this.props?.user?.user?.zip : '',
            Profile_Image: this.props?.user?.user?.profile_pic ?
                { uri: this.props?.user?.user?.profile_pic }
                : require('../../assets/user.png'),
            gender: ['Male', 'Female'],
            selectedgender: this.props?.user?.user?.gender ? this.props?.user?.user?.gender : 'Gender',
            provider_as: this.props?.user?.user?.provider_as ? this.props?.user?.user?.provider_as : '',
            company_name: this.props?.user?.user?.company_name ? this.props?.user?.user?.company_name : '',
            modalVisible: false,
            geoLocationAddress: this.props?.user?.user?.company_address ? this.props?.user?.user?.company_address : '',
            geoLocationCoordinates: [],
            lat: '',
            lng: '',
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

            this.setState({ Profile_Image: imgObj });
        });
    };
    UpdateProfile = () => {
        let { name, phone, address, zip, Profile_Image, selectedCountry, selectedCity, selectedState } = this.state
    }
    render() {
        console.warn("User", this.props.user.user);
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
                            source={this.state.Profile_Image}
                            style={{
                                width: width * 0.3,
                                height: width * 0.3,
                                borderRadius: 3,
                            }}
                        />
                        <VStack space="lg">
                            <Box>
                                <Heading fontSize="lg">{this.props?.user?.user?.username}</Heading>
                                <Text adjustsFontSizeToFit numberOfLines={1} style={{ width: '97%', fontSize: 13, }}>{this.props?.user?.user?.email}</Text>
                            </Box>
                            <Button onPress={this.uploadImage} backgroundColor="primary.100" maxWidth={150}>
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
                    {this.props.user?.user?.role == 'provider' ? (
                        <Radio.Group
                            name="myRadioGroup"
                            value={this.state.provider_as}
                            flexDirection="row"
                            // style={{ justifyContent: 'space-around', width: '100%' }}
                            style={styles.Radioinput}
                            marginBottom={3}
                            tintColor="#1872ea"
                            onChange={nextValue => {
                                this.setState({ provider_as: nextValue });
                            }}>
                            <Radio value="individual" >
                                <Text style={{ color: '#aaa', marginStart: 5 }}>
                                    Individual
                                </Text>
                            </Radio>
                            <Radio marginLeft={5} value="business">
                                <Text style={{ color: '#aaa', marginStart: 5 }}>
                                    Business
                                </Text>
                            </Radio>
                        </Radio.Group>



                    ) : null}

                    {this.state.provider_as == 'business' ? (
                        <View style={{ width: '100%', alignItems: 'center' }}>
                            <Input
                                placeholder="Company Name"
                                style={styles.input}
                                value={this.state.company_name}
                                onChangeText={company_name => this.setState({ company_name })}
                            />
                            <TouchableOpacity style={styles.inputAddress} onPress={() => this.setState({ modalVisible: true })}>
                                {this.state.geoLocationAddress == '' ?
                                    (
                                        <View style={{ height: 50, alignItems: 'flex-start', justifyContent: 'center' }}>
                                            <Text style={{ textAlign: 'center' }}>Select Location</Text>
                                        </View>
                                    ) : (
                                        <View style={{ height: 50, alignItems: 'flex-start', justifyContent: 'center' }}>
                                            <Text style={styles.dropDownBtnText} numberOfLines={1}>{this.state.geoLocationAddress}</Text>
                                        </View>
                                    )}
                            </TouchableOpacity>
                        </View>
                    ) : null}
                    <View style={styles.selectContainer}>
                        <SelectDropdown
                            data={this.state.gender}
                            // defaultValue={'Gender'}
                            defaultButtonText={this.state.selectedgender}
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
                                this.setState({ selectedgender: selectedItem });
                                // this.props.getUsersByType({ role: selectedItem });
                            }}
                        />
                    </View>
                    <View style={styles.selectContainer}>
                        <SelectDropdown
                            data={this.state.country}
                            // defaultValue={this.state.country[0]}
                            defaultButtonText={this.state.selectedCountry}
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
                                this.setState({ selectedCountry: selectedItem, });
                                // this.props.getUsersByType({ role: selectedItem });
                            }}
                        />
                    </View>
                    <View style={styles.selectContainer}>
                        <SelectDropdown
                            data={this.state.state}
                            // defaultValue={this.state.state[0]}
                            defaultButtonText={this.state.selectedState}
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
                                this.setState({ selectedState: selectedItem, });
                                // this.props.getUsersByType({ role: selectedItem });
                            }}
                        />
                    </View>
                    <View style={styles.selectContainer}>
                        <SelectDropdown
                            data={this.state.city}
                            // defaultValue={this.state.city[0]}
                            defaultButtonText={this.state.selectedCity}
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
                                this.setState({ selectedCity: selectedItem, });
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
                        onPress={() => this.UpdateProfile()}
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

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.setState({ modalVisible: false });
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Select Location</Text>
                            <GooglePlacesAutocomplete
                                placeholder='Search'
                                GooglePlacesDetailsQuery={{ fields: "geometry" }}
                                onPress={(data, details = null) => {

                                    this.setState(
                                        {
                                            geoLocationAddress: data.description, // selected address
                                            geoLocationCoordinates: `${details.geometry.location.lat},${details.geometry.location.lng}`, // selected coordinates,
                                            modalVisible: false,
                                            lat: details.geometry.location.lat,
                                            lng: details.geometry.location.lng,
                                        }
                                    );
                                    // console.warn(data, details);
                                }}
                                value={this.state.geoLocationAddress}
                                onChangeText={this.state.geoLocationAddress}
                                fetchDetails={true}
                                onBlur={() => console.warn(("ok"))}
                                styles={{
                                    container: {
                                        width: "100%",
                                    },
                                    textInputContainer: {
                                        elevation: 5,
                                        backgroundColor: "#fff",
                                        borderRadius: 5,
                                    },
                                }}
                                query={{
                                    key: 'AIzaSyBBVMEPDktEjcindc7_NjCpFWsSWVspyKI',
                                    language: 'en',
                                }}
                            />
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}
const mapStateToProps = state => ({
    user: state.AuthReducer.user,
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);

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
    Radioinput: {
        width: '100%',
        // justifyContent: 'space-around',
        height: 50,
        borderRadius: 3,
        textAlign: 'left',
        marginBottom: 5,
        backgroundColor: '#eee',
        elevation: 3,
        borderWidth: 0,
        alignItems: 'center',
        marginVertical: 5,
        paddingLeft: 15,
    },
    inputAddress: {
        width: '100%',
        // justifyContent: 'space-around',
        height: 50,
        borderRadius: 3,
        textAlign: 'left',
        marginBottom: 5,
        backgroundColor: '#eee',
        elevation: 3,
        borderWidth: 0,
        alignItems: 'center',
        marginVertical: 5,
        // paddingLeft: 15,
    },
    dropDownBtnText: {
        //  color: 'rgb(160,160,160)',
        color: '#000',
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
    centeredView: {
        flex: 1,
        justifyContent: "center",
        // alignItems: "center",
    },
    modalView: {
        flex: 1,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 25,
        alignItems: "center",

    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
})