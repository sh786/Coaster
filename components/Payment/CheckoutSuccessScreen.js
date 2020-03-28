import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {View, Text, Button} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { createNewPurchasedTicket } from '../../redux/actions';

const CheckoutSuccessScreen = ({ navigation }) => {
    const [ticket, setTicket] = useState(null);
    const ticketOffer = navigation.getParam("ticketOffer");
    const venue = navigation.getParam("venue");
    const quantity = navigation.getParam("quantity");
    const event = navigation.getParam('event');

    const dispatch = useDispatch();
    const user = useSelector(state => {
        return state.user;
    });

    useEffect(() => {
        for (let i = 0; i < quantity; i++) {
            dispatch(createNewPurchasedTicket(ticketOffer.id, event.id, user.id));
        }
    }, []);

    return (
        <View>
            <Text>Success!</Text>
            <Text>{`You successfully bought ${quantity} tickets`}</Text>
            <Text>{ticket}</Text>
            <Button title="View My Tix" onPress={() => navigation.navigate('Lobby')} />
        </View>
    );
};

CheckoutSuccessScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: "You did it!",
  headerLeft: null
});

CheckoutSuccessScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
}

export default CheckoutSuccessScreen;