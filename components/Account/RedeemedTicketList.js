import React, { useEffect } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { fetchRedeemedTicketsByUserId } from '../../redux/actions';
import Ticket from '../Ticket';
import { styles } from './AccountStyles';

const RedeemedTicketList = () => {
  const dispatch = useDispatch();
  const tickets = useSelector((state) => {
    return state.redeemedTickets;
  });
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchRedeemedTicketsByUserId(user.id));
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
    </View>
  );
};

export default RedeemedTicketList;
