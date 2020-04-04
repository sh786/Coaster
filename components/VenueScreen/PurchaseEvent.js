import React, { useState, useEffect } from 'react';
import {
  Keyboard,
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';

import { fetchTicketOffersByEventId } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { styles } from './styles/PurchaseEventStyles';
import Icon from '../Common/Icon';
import Colors from '../../constants/Colors';

const PurchaseEvent = ({ event, navigation, closeModal }) => {
  const [quantity, setQuantity] = useState(1);
  const user = useSelector((state) => {
    return state.user;
  });

  const venue = navigation.getParam('venue');

  const dispatch = useDispatch();
  const ticketOffers = useSelector((state) => {
    return state.ticketOffers[event.id];
  });

  useEffect(() => {
    dispatch(fetchTicketOffersByEventId(event.id));
  }, []);

  const ticketOffer =
    ticketOffers && ticketOffers.length ? ticketOffers[0] : {}; // clean up
  if (venue && ticketOffers && ticketOffers.length > 0) {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <Text style={styles.venueName}>{venue.name}</Text>
          <View style={styles.divider} />
          <View style={styles.ticketTier}>
            <View style={styles.ticketInfo}>
              <Text style={styles.title}>
                {event.title} - ${ticketOffers[0].price}
              </Text>
              <Text style={styles.startTime}>
                {new Date(event.startTime).toLocaleString([], {
                  dateStyle: 'long',
                  timeStyle: 'short',
                })}
              </Text>
            </View>
            <View style={styles.ticketQuantityContainer}>
              <View style={styles.quantityMinusIconContainer}>
                <Icon
                  antIcon
                  name='minuscircleo'
                  size={28}
                  color={
                    quantity === 1 ? Colors.greyDisabled : Colors.accentBlue
                  }
                  onPress={() => quantity > 1 && setQuantity(quantity - 1)}
                />
              </View>
              <Text style={styles.quantityText}>{quantity}</Text>
              <View style={styles.quantityPlusIconContainer}>
                <Icon
                  antIcon
                  name='pluscircleo'
                  size={28}
                  color={
                    quantity === 9 ? Colors.greyDisabled : Colors.accentBlue
                  }
                  onPress={() => quantity < 9 && setQuantity(quantity + 1)}
                />
              </View>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryContainer}>
            <Text style={styles.summaryTitle}>Summary</Text>
            <View style={styles.summaryContent}>
              <View style={styles.summaryLeft}>
                <Text style={styles.summaryItemsText}>Items</Text>
                <Text>
                  {quantity} {event.title} Ticket{quantity > 1 && 's'}
                </Text>
              </View>
              <View style={styles.summaryRight}>
                <View>
                  <Text style={styles.summaryTotalText}>Total</Text>
                  <Text>${quantity * ticketOffers[0].price}.00</Text>
                </View>
              </View>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              closeModal(false);
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
            <View style={styles.checkoutButton}>
              <Text style={styles.buttonText}>{`Purchase ${quantity} Ticket${
                quantity > 1 ? 's' : ''
              }`}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    );
  }
  return null;
};

export default PurchaseEvent;
