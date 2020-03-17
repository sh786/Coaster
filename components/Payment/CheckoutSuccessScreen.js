import React, {useState, useEffect} from 'react';
import {View, Text, Button} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { createNewPurchasedTicket } from '../../redux/actions';

const CheckoutSuccessScreen = ({ navigation }) => {
    const [ticket, setTicket] = useState(null);
    const ticketOffer = navigation.getParam("ticketOffer");
    const venue = navigation.getParam("venue");

    const dispatch = useDispatch();
    const user = useSelector(state => {
        return state.user;
    });
    const event = useSelector(state => {
        return state.events[venue.id];
    });

    useEffect(() => {
        dispatch(createNewPurchasedTicket(ticketOffer.id, event[0].id, user.id));
    }, [])

    return (
        <View>
            <Text>Success!</Text>
            <Text>{ticket}</Text>
            <Button title="View My Tix" onPress={() => navigation.navigate('Lobby')} />
        </View>
    );
};

CheckoutSuccessScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: "You did it!",
  headerLeft: null
});

export default CheckoutSuccessScreen;