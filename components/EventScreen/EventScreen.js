import React, {useState, useEffect} from 'react';
import {
    Keyboard,
    View,
    Text,
    TouchableWithoutFeedback,
    Button,
} from 'react-native';
import HeaderTitle from '../Header/HeaderTitle';
import {createNewUser, fetchUsers} from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';

const EventScreen = ({navigation}) => {
    const dispatch = useDispatch();
    const user = useSelector(state => {
        return state.user;
    });

    const venue = navigation.getParam('venue');

    useEffect(() => {
        dispatch(fetchUsers());
    }, [])

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View>
                <Text>Event Screen</Text>
                <Button title="checkout" onPress={() => navigation.navigate('Payment')} />
                <Button title="add test user" onPress={() => {
                    dispatch(createNewUser(
                        'moneyman18',
                        'moneyman18@dk.com',
                        'jonny',
                        'levenfeld',
                        '999-214-2030',
                        '05/22/1996'
                    ));
                }} />
            </View>
        </TouchableWithoutFeedback>
    )
}

EventScreen.navigationOptions = ({navigation}) => ({
    headerTitle: <HeaderTitle title={navigation.getParam('event', {name: 'Event'}).name} />,
})

export default EventScreen;