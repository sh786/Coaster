import React, { useState, useEffect } from 'react';
import {
  Keyboard,
  View,
  Text,
  TouchableWithoutFeedback,
  Picker,
  TouchableOpacity,
} from 'react-native';

import { fetchTicketOffersByEventId } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { styles } from './styles/PurchaseEventStyles';

const PurchaseEvent = ({ event, navigation }) => {
  const [quantity, setQuantity] = useState(1);
  const user = useSelector(state => {
    return state.user;
  });

  const venue = navigation.getParam('venue');

  const dispatch = useDispatch();
  const ticketOffers = useSelector(state => {
    return state.ticketOffers[event.id];
  });

  useEffect(() => {
    dispatch(fetchTicketOffersByEventId(event.id));
  }, []);

  const ticketOffer =
    ticketOffers && ticketOffers.length ? ticketOffers[0] : {}; // clean up

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.venueName}>{venue.name}</Text>
        <View style={styles.divider} />
        <View style={styles.ticketTier}>
          <View style={styles.ticketInfo}>
            <Text style={styles.title}>{event.title}</Text>
            <Text style={styles.startTime}>{event.startTime}</Text>
          </View>
        </View>
        <View style={styles.checkoutButton}>
          <TouchableOpacity
            onPress={() => {
              if (user.username) {
                navigation.navigate('Payment', {
                  ticketOffer,
                  venue,
                  quantity,
                  event,
                  user,
                });
              } else {
                navigation.navigate('AuthMiddleware', {
                  ticketOffer,
                  venue,
                  quantity,
                  event,
                  authDestinationScreen: 'SignIn',
                  appDestinationScreen: 'Payment',
                });
              }
            }}
          >
            <Text
              style={styles.buttonText}
            >{`Purchase ${quantity} Tickets`}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default PurchaseEvent;
