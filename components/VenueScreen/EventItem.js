import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, TouchableWithoutFeedback } from 'react-native';

import {styles} from './styles/EventItemStyles';

const EventItem = ({event, venue, navigation}) => {
  return (
    <TouchableWithoutFeedback onPress={() => navigation.navigate('Event', {venue, event})}>
      <View style={styles.eventItemContainer} >
        <View style={styles.eventItemLeftContent}>
          <Text style={styles.eventItemName}>{event.title}</Text>
          <Text style={styles.eventItemStreetAddress}>{venue.address}</Text>
          <Text style={styles.eventItemDistance}>0.6mi</Text>
        </View>
        <View style={styles.eventItemRightContent}>
          <Text style={styles.eventItemPrice}>{event.description}</Text>
          <View style={styles.eventItemOffer}>
            <Text style={styles.eventItemOfferText}>20%</Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

EventItem.propTypes = {
  event: PropTypes.object.isRequired,
  venue: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
}

export default EventItem;
