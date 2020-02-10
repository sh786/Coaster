import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, TouchableWithoutFeedback } from 'react-native';

import { styles } from './styles/VenueItemStyles';
import Icon from '../Common/Icon';

const VenueItem = ({ venue, navigation }) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate('Venue', { venue })}
    >
      <View style={styles.venueItemContainer}>
        <View style={styles.venueItemLeftContent}>
          <Text style={styles.venueItemName}>{venue.name}</Text>
          <Text style={styles.venueItemStreetAddress}>{venue.address}</Text>
          <Text
            style={styles.venueItemStreetAddress}
          >{`${venue.city}, ${venue.state}`}</Text>
          <Text style={styles.venueItemDistance}>0.6mi</Text>
        </View>
        <View style={styles.venueItemRightContent}>
          <Text style={styles.venueItemPrice}>{venue.description}</Text>
        </View>
        <View style={styles.arrowContainer}>
          <Icon name='ios-arrow-forward' size={20} style={styles.arrowIcon} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

VenueItem.propTypes = {
  venue: PropTypes.object,
  navigation: PropTypes.object,
};

export default VenueItem;
