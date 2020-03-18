import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, TouchableWithoutFeedback, Image } from 'react-native';

import { styles } from './styles/VenueItemStyles';
import Icon from '../Common/Icon';

const VenueItem = ({ venue, navigation }) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate('Venue', { venue })}
    >
      <View style={styles.venueItemContainer}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require('../../assets/bar_stock.jpg')}
          />
        </View>
        <View style={styles.venueItemLeftContent}>
          <View style={styles.venueItemNameContainer}>
            <Text style={styles.venueItemNameText}>{venue.name}</Text>
          </View>
          <View style={styles.venueItemStreetAddressContainer}>
            <Text
              style={styles.venueItemStreetAddressText}
            >{`${venue.address} • ${venue.city}, ${venue.state} • 0.6mi`}</Text>
            <View style={styles.socialLogoContainer}>
              {/* Facebook */}
              {/* Instagram show if has */}
              {/* Maps/GoogleMaps */}
              {/* Twitter show if has */}
              {/* Will not use Ionicons, but shown below */}
              <Icon
                style={styles.socialLogoIcon}
                name='logo-facebook'
                size={20}
              />
              <Icon
                style={styles.socialLogoIcon}
                name='logo-instagram'
                size={20}
              />
              <Icon style={styles.socialLogoIcon} name='md-map' size={20} />
            </View>
          </View>
        </View>
        {/* SO OUT ON ARROWS, what apps have that shit? */}
        {/* <View style={styles.arrowContainer}>
          <Icon name='ios-arrow-forward' size={20} style={styles.arrowIcon} />
        </View> */}
      </View>
    </TouchableWithoutFeedback>
  );
};

VenueItem.propTypes = {
  venue: PropTypes.object,
  navigation: PropTypes.object,
};

export default VenueItem;
