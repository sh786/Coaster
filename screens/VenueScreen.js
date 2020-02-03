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
                <Text numberOfLines={10} style={styles.description}>{venue.description}</Text>
                <View style={styles.partition}></View>
                <Text style={styles.eventListTitle}>Upcoming Events</Text>
                <ScrollView
                    styles={styles.eventContainer}
                    contentContainerStyle={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '95%',
                      }}
                >
                    {
                        [1,2,13,21,12,32,25,72,92].map(e => 
                            <EventItem key={e} event={venue} navigation={navigation} /> // TODO: hit event endpoint for venue
                        )
                    }
                </ScrollView>
            </View>
        </TouchableWithoutFeedback>
    )
}

VenueScreen.navigationOptions = ({navigation}) => ({
    headerTitle: <HeaderTitle title={navigation.getParam('venue', {name: 'venue'}).name} />,
})

export default VenueScreen;