import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, TouchableWithoutFeedback } from 'react-native';

import { styles } from './styles/EventItemStyles';

const EventItem = ({ event, venue, navigation }) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate('Event', { venue, event })}
    >
      <View style={styles.eventItemContainer}>
        <View style={styles.eventItemLeftContent}>
          <Text style={styles.eventItemName}>{event.title}</Text>
          <Text style={styles.eventItemStreetAddress}>{venue.address}</Text>
        </View>
        <View style={styles.eventItemRightContent}>
          {/* <Text style={styles.eventItemDate}>
            {new Date(event.startTime).toLocaleDateString([], {
              dateStyle: 'long',
            })}
          </Text> */}
          <Text style={styles.eventItemTime}>
            {new Date(event.startTime).toLocaleTimeString([], {
              timeStyle: 'short',
            })}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

EventItem.propTypes = {
  event: PropTypes.object.isRequired,
  venue: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

export default EventItem;
