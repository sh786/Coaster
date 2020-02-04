import React from 'react';
import { Text, View, TouchableWithoutFeedback } from 'react-native';

import {styles} from './styles/EventItemStyles';

const EventItem = ({event, navigation}) => {
  return (
    <TouchableWithoutFeedback onPress={() => navigation.navigate('Event', {event})}>
      <View style={styles.eventItemContainer} >
        <View style={styles.eventItemLeftContent}>
          <Text style={styles.eventItemName}>{event.name}</Text>
          <Text style={styles.eventItemStreetAddress}>{event.address}</Text>
          <Text style={styles.eventItemDistance}>0.6mi</Text>
        </View>
        <View style={styles.eventItemRightContent}>
          <Text style={styles.eventItemPrice}>$10+</Text>
          <View style={styles.eventItemOffer}>
            <Text style={styles.eventItemOfferText}>20%</Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default EventItem;
