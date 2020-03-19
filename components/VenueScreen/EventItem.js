import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, TouchableWithoutFeedback } from 'react-native';

import {styles} from './styles/EventItemStyles';

const EventItem = ({event, venue, navigation}) => {
  console.log(event)
  return (
    <TouchableWithoutFeedback onPress={() => navigation.navigate('Event', {venue: navigation.getParam("venue")})}>
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
  event: PropTypes.object,
}

EventItem.defaultProps = {
  event: {},
}
export default EventItem;
