import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  Linking,
} from 'react-native';
import { useSelector } from 'react-redux';
import haversine from 'haversine';

import { styles } from './styles/VenueItemStyles';
import Icon from '../Common/Icon';

const VenueItem = ({ venue, navigation }) => {
  const openURL = url => {
    console.log(url);
    Linking.openURL(url).catch(err => console.error('An error occurred', err));
  };

  const location = useSelector(state => {
    return state.location;
  });

  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate('Venue', { venue })}
    >
      <View style={styles.venueItemContainer}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: venue.coverPhoto }} />
        </View>
        <View style={styles.venueItemLeftContent}>
          <View style={styles.venueItemNameAddressContainer}>
            <Text style={styles.venueItemNameText}>{venue.name}</Text>
            <Text style={styles.venueItemStreetAddressText}>{`${
              venue.address
            } • ${venue.city}, ${venue.state} • ${location &&
              location.coords &&
              haversine(
                {
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                },
                {
                  latitude: venue.lat,
                  longitude: venue.lon,
                },
                { unit: 'mile' },
              ).toFixed(1)} mi`}</Text>
          </View>
          <View style={styles.socialLogoContainer}>
            <TouchableOpacity
              onPress={e => {
                e.stopPropagation();
                openURL(venue.socialLinks[0]);
              }}
            >
              <Icon
                style={styles.socialLogoIcon}
                name='logo-facebook'
                size={20}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={e => {
                e.stopPropagation();
                openURL(venue.socialLinks[1]);
              }}
            >
              <Icon
                style={styles.socialLogoIcon}
                name='logo-instagram'
                size={20}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={e => {
                e.stopPropagation();
                openURL(venue.socialLinks[2]);
              }}
            >
              <Icon style={styles.socialLogoIcon} name='md-map' size={20} />
            </TouchableOpacity>
          </View>
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
