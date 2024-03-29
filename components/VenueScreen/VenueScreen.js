import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  ImageBackground,
  Linking,
  TouchableOpacity,
  Modal,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import haversine from 'haversine';

import {
  fetchBar,
  fetchEventsByBarId,
  subscribeToHeadCountForBar,
} from '../../redux/actions';

import PurchaseEvent from './PurchaseEvent';
import HeaderTitle from '../Header/HeaderTitle';
import EventItem from './EventItem';
import { styles } from './styles/VenueStyles';
import Colors from '../../constants/Colors';
import Icon from '../Common/Icon';

const VenueScreen = ({ navigation }) => {
  const openURL = (url) => {
    Linking.openURL(url).catch((err) =>
      console.error('An error occurred', err),
    );
  };

  const venue = navigation.getParam('venue');
  const events = useSelector((state) => {
    return state.events[venue.id];
  });
  const headCount = useSelector((state) => {
    const currBar = state.bars.find(b => b.id === venue.id);
    return currBar ? currBar.headCount : null;
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBar(venue.id));
    dispatch(fetchEventsByBarId(venue.id));
    const subscription = dispatch(subscribeToHeadCountForBar(venue.id));
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const location = useSelector((state) => {
    return state.location;
  });

  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [activeEvent, setActiveEvent] = useState(null);

  // only show counts that have been updated recently
  const {lastHeadCountUpdate, capacity} = venue;
  const millisecondsLastUpdate = new Date(lastHeadCountUpdate).getTime();
  const updatedInLastHour = (Date.now() - millisecondsLastUpdate) < 3600000;

  const crowdMetric = Math.round((headCount / capacity) * 4) + 1;

  useEffect(() => {
    if (location.coords) {
      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);
    }
  }, [location]);

  const handleEventClick = (modalState, event) => {
    console.log(event);
    setActiveEvent(event);
    setModalVisible(modalState);
  };

  return (
    <>
      {modalVisible && activeEvent && (
        <>
          <Modal
            animationType='slide'
            visible={modalVisible}
            closeOnClick
            transparent
            onRequestClose={() => {
              setModalVisible(false);
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
              style={{ height: Dimensions.get('window').height - 300 }}
            />
            <View style={styles.modal}>
              <PurchaseEvent
                event={activeEvent}
                navigation={navigation}
                closeModal={setModalVisible}
              />
            </View>
          </Modal>
        </>
      )}
      <View style={styles.container}>
        <View style={styles.overlay(modalVisible)} />
        <ScrollView style={{ display: 'flex', flex: 1 }}>
          <ImageBackground
            style={styles.image}
            source={{ uri: venue.coverPhoto }}
          />
          <View style={styles.imageOverlay}>
            <Text style={styles.venueName}>{venue.name}</Text>
            <Text style={styles.venueAddress}>{venue.address}</Text>
            <View style={styles.venueSubDetailContainer}>
              <Text style={styles.venueAddress}>
                {venue.city}, {venue.state} •{' '}
                {latitude &&
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
                  ).toFixed(1)}{' '}
                mi • {headCount && Boolean(updatedInLastHour) ? headCount : 'No Current Count '}
                {venue.headCount && Boolean(updatedInLastHour)
                  ? `/${venue.capacity}`
                  : `• Max: ${venue.capacity}`}
              </Text>
              {Boolean(updatedInLastHour) && venue.headCount && venue.capacity && (
                <View style={styles.capacityIcons}>
                  {[...Array(crowdMetric)].map((x, i) => (
                    <Icon
                      key={i}
                      name='md-person'
                      size={14}
                      color='white'
                      style={{ marginRight: 3 }}
                    />
                  ))}
                </View>
              )}
            </View>
          </View>
          <View style={styles.headingContainer}>
            <Icon
              style={styles.headingIcon}
              name='md-calendar'
              size={20}
              color='black'
            />
            <Text style={styles.venuePageHeading}>Events</Text>
            <View style={styles.dateContainer}>
              <Text style={styles.dateText}>
                {new Date().toLocaleDateString([], { dateStyle: 'long' })}
              </Text>
            </View>
          </View>
          <View styles={styles.eventsContainer}>
            {events && events.length > 0 ? (
              events.map((e) => {
                return (
                  <TouchableOpacity key={e.id}>
                    <EventItem
                      event={e}
                      venue={venue}
                      navigation={navigation}
                      handleEventClick={handleEventClick}
                    />
                  </TouchableOpacity>
                );
              })
            ) : (
              <Text style={styles.centeredText}>
                No upcoming events this week.
              </Text>
            )}
          </View>

          <View style={styles.aboutContainer}>
            <View style={styles.headingContainer}>
              <Icon
                style={styles.headingIcon}
                name='md-information-circle'
                size={20}
                color='black'
              />
              <Text style={styles.venuePageHeading}>About</Text>
            </View>
            <Text style={styles.description}>{venue.description}</Text>
          </View>

          <View style={styles.mapContainer}>
            <View style={styles.headingContainer}>
              <Icon
                style={styles.headingIcon}
                name='md-compass'
                size={20}
                color='black'
              />
              <Text style={styles.venuePageHeading}>Map</Text>
            </View>
            <TouchableOpacity style={styles.mapDirections}>
              <Icon
                name='md-navigate'
                size={20}
                color='black'
                onPress={() =>
                  openURL(
                    `https://www.google.com/maps/dir/?api=1&destination=${venue.address}, ${venue.city}, ${venue.state}`,
                  )
                }
              />
            </TouchableOpacity>

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

          <View style={styles.exploreContainer}>
            <View style={styles.headingContainer}>
              <Icon
                style={styles.headingIcon}
                name='md-people'
                size={20}
                color='black'
              />
              <Text style={styles.venuePageHeading}>Social</Text>
            </View>
            <View style={styles.exploreIconContainer}>
              <TouchableOpacity
                onPress={(e) => {
                  e.stopPropagation();
                  openURL(venue.socialLinks[0]);
                }}
              >
                <Icon
                  style={styles.socialLogoIcon}
                  name='logo-facebook'
                  size={50}
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
                  size={50}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={(e) => {
                  e.stopPropagation();
                  openURL(venue.socialLinks[2]);
                }}
              >
                <Icon style={styles.socialLogoIcon} name='md-map' size={50} />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

VenueScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: (
    <HeaderTitle title={navigation.getParam('venue', { name: 'venue' }).name} />
  ),
});

export default VenueScreen;
