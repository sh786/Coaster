import React, { useEffect } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { fetchPurchasedTicketsByUserId } from '../../redux/actions';
import Ticket from '../Ticket';
import { styles } from './AccountStyles';

const TicketList = () => {
  const dispatch = useDispatch();
  const tickets = useSelector((state) => {
    return state.purchasedTickets.filter(
      (t) => new Date(t.event.endTime) > new Date(),
    );
  });
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchPurchasedTicketsByUserId(user.id));
  }, []);

  return (
    <View style={styles.ticketListContainer}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'space-between',
        }}
        horizontal
      >
        {tickets.map((t) => (
          <View key={t.id} style={styles.ticketContainer}>
            <View style={styles.ticketOutline}>
              <View style={styles.ticketVenueImageContainer}>
                <Image
                  style={styles.ticketVenueImage}
                  source={{ uri: t.venue.coverPhoto }}
                />
              </View>
              <View style={styles.ticketInfoContainer}>
                <Text style={styles.ticketVenueText}>{t.venue.name}</Text>
                <Text style={styles.ticketDetailsText}>
                  {t.event.title} •{' '}
                  {new Date(t.event.startTime).toLocaleString('en-US', {
                    time: 'short',
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </Text>
              </View>
              <View style={styles.ticketQrContainer}>
                <Ticket purchasedTicket={t} />
              </View>
            </View>
          </View>
        ))}
        {tickets.filter((t) => new Date(t.event.endTime) > new Date())
          .length === 0 && (
          <View style={styles.ticketContainer}>
            <Text>No active tickets.</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default TicketList;
