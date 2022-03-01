import {
    Avatar,
    Box,
    Button,
    Heading,
    HStack,
    Icon,
    Input,
    ScrollView,
    VStack,
} from 'native-base';
import React, { Component } from 'react';
import { Image, Dimensions, View, Animated, TouchableOpacity, Text, FlatList, StyleSheet, TextInput, Alert, Modal } from 'react-native';
import MyHeader from '../../components/MyHeader';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import { OpenImagePicker } from '../../configs';
import { connect } from 'react-redux';
import { MarketPlaceMiddleware } from '../../redux/middleware/MarketPlaceMiddleware';
import { imgURL } from '../../configs/AxiosConfig';
import SelectDropdown from 'react-native-select-dropdown';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { ServicesMiddleware } from '../../redux/middleware/ServicesMiddleware';
import { JobsMiddleware } from '../../redux/middleware/JobsMiddleware';


// import {Colors} from '../../Styles';



const { width } = Dimensions.get('window');

class PostJobCustomer extends Component {
    state = {
        service: '',
        allServices: [],
        time: '',
        date: '',
        location: '',
        coachVisit: ['yes', 'no'],
        note: '',
        timeModal: false,
        dateModal: false,
        address: '',
        geoLocationCoordinates: [],
        lat: '',
        lng: '',
        modalVisible: false,
        service_id: '',
    };
    componentDidMount() {
        this.props.getAllServices({ name: '' });

    }

    showTimePicker = () => {
        this.setState({ timeModal: true });
    };

    hideTimePicker = () => {
        this.setState({ timeModal: false });
    };

    handleTimeConfirm = (time) => {
        // console.warn("A date has been picked: ", time);
        // this.setState({ time: time })
        this.hideTimePicker();
        var hours = new Date(time).getHours(); //Current Hours
        var min = new Date(time).getMinutes(); //Current Minutes
        var sec = new Date(time).getSeconds(); //Current Seconds
        this.setState({
            time: hours + ':' + min + ':' + sec
        });
    };

    showDatePicker = () => {
        this.setState({ dateModal: true });
    };

    hideDatePicker = () => {
        this.setState({ dateeModal: false });
    };

    handleDateConfirm = (date) => {
        // console.warn("A date has been picked: ", time);
        // this.setState({ time: time })
        this.hideTimePicker();
        var date = new Date(date).toISOString(); //Current Hours
        this.setState({
            date
        });
    };

    postJob = () => {
        let {
            service_id,
            time,
            date,
            address,
            note,
            lat,
            lng
        } = this.state;

        if (
            service_id == '' ||
            time == '' ||
            date == '' ||
            address == '' ||
            note == '' ||
            lat == '' ||
            lng == ''
        ) {
            Alert.alert('Warning', 'Please enter all fields!');
        } else {
            // console.warn(
            //     service_id,
            //     time,
            //     date,
            //     address,
            //     note,
            //     lat,
            //     lng
            // );
            this.props.postJob({
                service_id,
                time,
                date,
                address,
                note,
                lat,
                lng
            });
            this.props.navigation.goBack();
        }
    };



    render() {
        const { getServicesData_list, } = this.props;

        console.warn('dataaaaaa', this.state.service_id, this.state.time, this.state.date, this.state.lat, this.state.lng, this.state.note);
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <MyHeader
                    back notify profile navigation={this.props.navigation}
                    // title={this.props.route.name}
                    title={'Post Job'}
                    onBackPress={() => this.props.navigation.goBack()}
                />
                <ScrollView style={styles.container}>

                    <View style={{ paddingHorizontal: 5 }}>
                        <View
                            style={{
                                alignItems: 'center',
                                // borderWidth: 1,
                                // borderColor: '#ccc',
                                // marginHorizontal: '10%',
                                marginVertical: 20,
                                borderRadius: 20,
                                // padding: 20,
                            }}>
                            <View style={styles.input}>
                                <SelectDropdown
                                    data={getServicesData_list}
                                    // defaultValue={item => console.warn('idd ===', item.id)}
                                    // defaultButtonText='Service'
                                    rowTextForSelection={(item) => <Text>{item?.name}</Text>}
                                    buttonTextAfterSelection={(selectedItem, index) => {
                                        return selectedItem.name;
                                    }}
                                    dropdownIconPosition="right"
                                    renderDropdownIcon={() => {
                                        return (
                                            <Image
                                                resizeMode="contain"
                                                source={require('../../assets/dropdown.png')}
                                                style={{ width: 20 }}
                                            />
                                        );
                                    }}
                                    // buttonTextStyle={styles.dropDownBtnText}
                                    buttonStyle={{ width: '100%', backgroundColor: '#fff' }}
                                    onSelect={(selectedItem, index) => { this.setState({ service_id: selectedItem.id }) }}
                                />
                            </View>
                            <TouchableOpacity onPress={this.showTimePicker} style={[styles.input, { padding: 15, alignItems: 'center' }]}>

                                {this.state.time == '' ? (
                                    <Text>Time</Text>
                                ) : (
                                    <Text>{this.state.time}</Text>
                                    // null
                                )}
                                <DateTimePickerModal

                                    isVisible={this.state.timeModal}
                                    mode="time"
                                    onConfirm={this.handleTimeConfirm}
                                    onCancel={this.hideTimePicker}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={this.showDatePicker} style={[styles.input, { padding: 15, alignItems: 'center' }]}>

                                {this.state.date == '' ? (
                                    <Text>Date</Text>
                                ) : (
                                    <Text>{new Date(this.state.date).toLocaleDateString()}</Text>
                                    // null
                                )}
                                <DateTimePickerModal

                                    isVisible={this.state.dateModal}
                                    mode="date"
                                    onConfirm={this.handleDateConfirm}
                                    onCancel={this.hideDatePicker}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.input} onPress={() => this.setState({ modalVisible: true })}>
                                {this.state.address == '' ?
                                    (
                                        <View style={{ height: 40, alignItems: 'center', justifyContent: 'center' }}>
                                            <Text style={{ textAlign: 'center' }}>Select Location</Text>
                                        </View>
                                    ) : (
                                        <View style={{ height: 40, alignItems: 'center', justifyContent: 'center' }}>
                                            <Text numberOfLines={1} style={{ textAlign: 'center', padding: 10 }}>{this.state.address}</Text>
                                        </View>
                                    )}
                            </TouchableOpacity>

                            {/* <Input
                                placeholder="location"
                                keyboardType='numeric'
                                style={styles.input}
                                onChangeText={discount => this.setState({ location: location })}
                                value={this.state.location}
                            /> */}
                            <TextInput
                                placeholder={'Additional Note'}
                                multiline
                                style={styles.inputDescription}
                                onChangeText={text => {
                                    this.setState({ note: text });
                                }}
                                value={this.state.note}
                            />

                            <Button
                                onPress={this.postJob}
                                backgroundColor="primary.100"
                                style={{
                                    width: '80%',
                                    borderRadius: 10,
                                    marginVertical: 10,
                                    height: 45,
                                }}>
                                Post
                            </Button>

                        </View>
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
                                                    address: data.description, // selected address
                                                    geoLocationCoordinates: `${details.geometry.location.lat},${details.geometry.location.lng}`, // selected coordinates,
                                                    modalVisible: false,
                                                    lat: details.geometry.location.lat,
                                                    lng: details.geometry.location.lng,
                                                }
                                            );
                                            console.warn(data, details);
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

                </ScrollView>

            </View>
        );
    }
}
const mapStateToProps = state => {
    return {

        postJobData: state.JobsReducer.postJobData,
        getServicesData: state.ServicesReducer.getServicesData,
        getServicesData_list: state.ServicesReducer.getServicesData_list,
    };
};
const mapDispatchToProps = dispatch => ({

    postJob: payload => dispatch(JobsMiddleware.postJob(payload)),
    getAllServices: (payload) =>
        dispatch(ServicesMiddleware.getAllServices(payload)),

});

export default connect(mapStateToProps, mapDispatchToProps)(PostJobCustomer);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        //   paddingHorizontal: 25,
        backgroundColor: "#fff",
    },

    flex1: { flex: 1 },

    sponsorContainer: {
        marginVertical: 8,
        marginHorizontal: 5,
        flex: 1,

    },
    teamImage: {
        width: '100%',
        height: 100,
        borderRadius: 5
    },
    teamsListContainer: {
        justifyContent: 'space-between',
    },
    sponsorName: {
        paddingTop: 8,
        fontSize: 12,
        color: 'black',
        alignSelf: 'center',
        fontWeight: '500',
    },
    sponsorPrice: {
        fontSize: 12,
        color: '#1D9CD9',
        alignSelf: 'center',
        fontWeight: '500',
    },
    fabBtn: {
        width: 56,
        height: 56,
        bottom: 15,
        right: 15,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#1D9CD9",
        position: 'absolute',
    },
    selectContainer: {
        backgroundColor: '#fff',
        // paddingVertical: 10,
    },
    input: {
        width: '80%',
        borderRadius: 10,
        textAlign: 'center',
        marginBottom: 15,
        backgroundColor: '#fff',
        elevation: 3,
        borderWidth: 0,
    },
    inputDescription: {
        width: '80%',
        borderRadius: 10,
        textAlign: 'center',
        marginBottom: 15,
        backgroundColor: '#fff',
        elevation: 3,
        borderWidth: 0,
        height: 140,
        textAlignVertical: 'top',
        // multiline
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
    }
});
