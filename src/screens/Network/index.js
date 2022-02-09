
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import MyHeader from '../../components/MyHeader';
import Feather from 'react-native-vector-icons/Feather';
import Tabs from './NetworkTabs';
export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <MyHeader
                    back notify navigation={this.props.navigation}
                    title={'Network'}
                    onBackPress={() => this.props.navigation.goBack()}
                />
                <Tabs />
                {/* <HStack
                    backgroundColor="#eee"
                    marginTop="2"
                    borderRadius={10}
                    alignItems="center"
                    paddingX="3">
                    <Icon as={Feather} name="search" size="sm" color="#aaa" />
                    <Input fontSize={14} placeholder="Search" borderWidth={0} />
                </HStack> */}

            </View>
        );
    }
}
