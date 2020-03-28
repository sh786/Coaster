import React, { useEffect } from "react";
import {
  Keyboard,
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import HeaderTitle from '../Header/HeaderTitle';
import EventItem from './EventItem';
import { useDispatch, useSelector } from "react-redux";
import {fetchEventsByBarId} from "../../redux/actions";
import { styles } from './styles/VenueStyles';
import { ScrollView } from 'react-native-gesture-handler';

const VenueScreen = ({ navigation }) => {
  const venue = navigation.getParam('venue');
  const event = useSelector(state => {
		return state.events[venue.id];
  });

  const dispatch = useDispatch();
  useEffect(() => {
		dispatch(fetchEventsByBarId(venue.id));
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
          {event && event.map(
            e => {
              return <EventItem key={e.id} event={e} venue={venue} navigation={navigation} />
            },
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
