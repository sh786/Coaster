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

const VenueScreen = (props) => {
    const dispatch = useDispatch();

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <Image
                    style={styles.image}
                    source={require('../assets/poodlesPics.jpg')}
                />
                <Text style={styles.description}>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</Text>
            </View>
        </TouchableWithoutFeedback>
    )
}

VenueScreen.navigationOptions = ({navigation}) => ({
    headerTitle: <HeaderTitle title={navigation.getParam('headerTitle', 'Venue')} />,
})

export default VenueScreen;