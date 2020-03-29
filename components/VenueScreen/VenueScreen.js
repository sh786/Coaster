import React, { useEffect } from 'react';
import {
  Keyboard,
  View,
  Text,
  TouchableWithoutFeedback,
  ImageBackground,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from 'react-native-maps';

import { fetchEventsByBarId } from '../../redux/actions';

import HeaderTitle from '../Header/HeaderTitle';
import EventItem from './EventItem';
import { styles } from './styles/VenueStyles';
import Colors from '../../constants/Colors';

const VenueScreen = ({ navigation }) => {
  const venue = navigation.getParam('venue');
  const events = useSelector(state => {
    return state.events[venue.id];
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchEventsByBarId(venue.id));
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <ScrollView
          style={{ display: 'flex', flex: 1 }}
          contentContainerStyle={{
            alignItems: 'center',
          }}
        >
          <ImageBackground
            style={styles.image}
            source={{ uri: venue.coverPhoto }}
          />
          <View style={styles.imageOverlay}>
            <Text style={styles.venueName}>{venue.name}</Text>
          </View>
          <Text numberOfLines={10} style={styles.description}>
            {venue.description}
          </Text>
          <Text style={styles.eventListTitle}>Upcoming Events</Text>
          <ScrollView
            styles={styles.eventsContainer}
            contentContainerStyle={{
              alignItems: 'center',
              justifyContent: 'center',
              width: '95%',
            }}
          >
            {events &&
              events.map(event => {
                return (
                  <EventItem
                    key={event.id}
                    event={event}
                    venue={venue}
                    navigation={navigation}
                  />
                );
              })}
          </ScrollView>
          <View style={styles.mapContainer}>
            <Text style={styles.venuePageHeading}>Location</Text>
            <MapView
              style={styles.mapStyle}
              provider={PROVIDER_GOOGLE}
              initialRegion={{
                latitude: parseFloat(venue.lat),
                longitude: parseFloat(venue.lon),
                latitudeDelta: 0.02,
                longitudeDelta: 0.0421,
              }}
            >
              <Marker
                coordinate={{
                  latitude: parseFloat(venue.lat),
                  longitude: parseFloat(venue.lon),
                }}
              ></Marker>
              <Marker
                coordinate={{
                  latitude: parseFloat(venue.lat),
                  longitude: parseFloat(venue.lon),
                }}
              >
                <View
                  style={{
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 1,
                    },
                    shadowOpacity: 0.32,
                    shadowRadius: 3,
                    elevation: 3,
                  }}
                >
                  <Text
                    style={{
                      backgroundColor: Colors.whiteColor,
                      marginBottom: 46,
                      padding: 5,
                      borderRadius: 3,
                      overflow: 'hidden',
                    }}
                  >
                    {venue.name}
                  </Text>
                </View>
              </Marker>
            </MapView>
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

VenueScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: (
    <HeaderTitle title={navigation.getParam('venue', { name: 'venue' }).name} />
  ),
});

export default VenueScreen;
