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
import TabBarIcon from '../components/TabBarIcon';
import HeaderTitle from '../components/HeaderTitle';

import {styles} from '../styles/VenueStyles';

const VenueScreen = ({navigation}) => {
    const venue = navigation.getParam('venue');
    const dispatch = useDispatch();

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <Image
                    style={styles.image}
                    source={require('../assets/poodlesPics.jpg')}
                />
                <Text style={styles.description}>{venue.description}</Text>
            </View>
        </TouchableWithoutFeedback>
    )
}

VenueScreen.navigationOptions = ({navigation}) => ({
    headerTitle: <HeaderTitle title={navigation.getParam('venue', {name: 'venue'}).name} />,
})

export default VenueScreen;