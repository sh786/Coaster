import React, { useEffect } from 'react';
import {
  Keyboard,
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { fetchEventsByBarId } from '../../redux/actions';

import HeaderTitle from '../Header/HeaderTitle';
import EventItem from './EventItem';
import { styles } from './styles/VenueStyles';
import { ScrollView } from 'react-native-gesture-handler';

const VenueScreen = ({ navigation }) => {
  const venue = navigation.getParam('venue');

  const dispatch = useDispatch();
  const events = useSelector(state => {
    return state.events;
  });

  useEffect(() => {
    dispatch(fetchEventsByBarId(venue.barId));
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require('../../assets/poodlesPics.jpg')}
        />

        <Text numberOfLines={10} style={styles.description}>
          {venue.description}
        </Text>
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
          {events.map(
            e => (
              <EventItem key={e} event={venue} navigation={navigation} />
            ), // TODO: hit event endpoint for venue
          )}
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
