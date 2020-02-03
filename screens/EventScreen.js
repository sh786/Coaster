import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBars } from '../redux/actions';
import {
    Keyboard,
    View,
    Text,
    TouchableWithoutFeedback,
    Button,
    Image,
} from 'react-native';
import Logo from '../components/Logo';
import Icon from '../components/Icon';
import HeaderTitle from '../components/HeaderTitle';
import EventItem from '../components/Events/EventItem';

import {styles} from '../styles/VenueStyles';
import { ScrollView } from 'react-native-gesture-handler';

const EventScreen = ({navigation}) => {
    const venue = navigation.getParam('venue');
    const dispatch = useDispatch();

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <Text>Event Screen</Text>
            </View>
        </TouchableWithoutFeedback>
    )
}

EventScreen.navigationOptions = ({navigation}) => ({
    headerTitle: <HeaderTitle title={navigation.getParam('event', {name: 'Event'}).name} />,
})

export default EventScreen;