import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Keyboard,
  View,
  Text,
  TouchableWithoutFeedback,
  ImageBackground,
} from 'react-native';
import API from '@aws-amplify/api';

import HeaderTitle from '../Header/HeaderTitle';
import EventItem from './EventItem';

import { styles } from './styles/VenueStyles';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from '../Common/Icon';

const VenueScreen = ({ navigation }) => {
  const venue = navigation.getParam('venue');

  const [photoData, setPhotoData] = useState(null);

  const callApi = async () => {
    try {
      const photoData = await API.get('mainApi', '/stockPhoto');
      console.log('photoData: ', photoData);
      setPhotoData(photoData);
    } catch (err) {
      console.log({ err });
    }
  };

  useEffect(() => {
    callApi();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.image}
          source={
            photoData && photoData.photo
              ? { uri: photoData.photo.results[0].urls.raw }
              : require('../../assets/images/poodlesPics.jpg')
          }
        >
          <View style={styles.imageOverlay}>
            <Text style={styles.venueName}>{venue.name}</Text>
            <Text style={styles.venueAddress}>{venue.address}</Text>
            <Text
              style={styles.venueCityState}
            >{`${venue.city}, ${venue.state}`}</Text>
          </View>
        </ImageBackground>
        <View style={styles.details}>
          <View style={styles.detailsRow}>
            {/* <Icon name={''} /> */}
            <Text numberOfLines={10} style={styles.detailsRowText}>
              {venue.description}
            </Text>
          </View>
        </View>

        <View style={styles.partition}></View>
        <Text style={styles.eventListTitle}>Upcoming Events</Text>
        <ScrollView
          styles={styles.eventContainer}
          contentContainerStyle={{
            alignItems: 'center',
            justifyContent: 'center',
            width: '95%',
          }}
        >
          {[1, 2, 13, 21, 12, 32, 25, 72, 92].map(
            e => (
              <EventItem key={e} event={venue} navigation={navigation} />
            ), // TODO: hit event endpoint for venue
          )}
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

VenueScreen.propTypes = {
  navigation: PropTypes.object,
};

VenueScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: (
    <HeaderTitle title={navigation.getParam('venue', { name: 'venue' }).name} />
  ),
});

export default VenueScreen;
