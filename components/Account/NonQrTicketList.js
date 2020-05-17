import React, { useEffect } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import {
  fetchRedeemedTicketsByUserId,
  fetchPurchasedTicketsByUserId,
} from '../../redux/actions';
import Ticket from '../Ticket';
import { styles } from './AccountStyles';

const NonQrTicketList = ({ type }) => {
  const dispatch = useDispatch();
  const tickets = useSelector((state) => {
    if (type === 'redeemed') {
      return state.redeemedTickets;
    } else if (type === 'expired') {
      return state.purchasedTickets.filter(
        (t) => new Date(t.event.endTime) < new Date(),
      );
    }
  });
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (type === 'redeemed') {
      dispatch(fetchRedeemedTicketsByUserId(user.id));
    } else if (type === 'expired') {
      dispatch(fetchPurchasedTicketsByUserId(user.id));
    }
  }, []);

  return (
    <View style={styles.redeemedTicketListContainer}>
      {tickets.map((t) => (
        <View key={t.id} style={styles.redeemedTicketContainer}>
          <Text>{t.venue.name}</Text>
          <Text>
            {t.event.title} •{' '}
            {new Date(t.event.startTime).toLocaleString('en-US', {
              time: 'short',
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </Text>
        </View>
      ))}
      {tickets.length === 0 && (
        <View>
          <Text>No {type} tickets.</Text>
        </View>
      )}
    </View>
  );
};

export default NonQrTicketList;
