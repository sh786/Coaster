import React, { useEffect, useState } from 'react';
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
  const openURL = (url) => {
    Linking.openURL(url).catch((err) =>
      console.error('An error occurred', err),
    );
  };

  const location = useSelector((state) => {
    return state.location;
  });

  // only show counts that have been updated recently
  const {lastHeadCountUpdate} = venue;
  const millisecondsLastUpdate = new Date(lastHeadCountUpdate).getTime();
  const updatedInLastHour = (Date.now() - millisecondsLastUpdate) < 3600000;

  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();

  const crowdMetric = Math.round((venue.headCount / venue.capacity) * 4) + 1;

  useEffect(() => {
    if (location.coords) {
      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);
    }
  }, [location]);

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
            } • ${venue.city}, ${venue.state} • ${
              latitude &&
              longitude &&
              haversine(
                {
                  latitude,
                  longitude,
                },
                {
                  latitude: venue.lat,
                  longitude: venue.lon,
                },
                { unit: 'mile' },
              ).toFixed(1)
            } mi`}</Text>
          </View>
          <View style={styles.bottomContainer}>
            {venue.headCount && updatedInLastHour &&
              <View style={styles.capacityCount}>
                <Text style={styles.capacityCountText}>
                  {venue.headCount}/{venue.capacity}
                </Text>
                <View style={styles.capacityIcons}>
                  {[...Array(crowdMetric)].map((x, i) => (
                    <Icon
                      key={i}
                      name='md-person'
                      size={14}
                      color='black'
                      style={{ marginRight: 3 }}
                    />
                  ))}
                </View>
              </View>
            }
            <View style={styles.socialLogoContainer}>
              <TouchableOpacity
                onPress={(e) => {
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
                onPress={(e) => {
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
                onPress={(e) => {
                  e.stopPropagation();
                  openURL(venue.socialLinks[2]);
                }}
              >
                <Icon style={styles.socialLogoIcon} name='md-map' size={20} />
              </TouchableOpacity>
            </View>
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
