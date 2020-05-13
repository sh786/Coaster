import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Dimensions, Text, View, Image, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import {
  fetchBars,
  setLocation,
  fetchUserByUsername,
  getUserToken,
  subscribeToHeadCounts,
} from '../../redux/actions';

import VenueItem from './VenueItem';
import { styles } from './styles/VenueLobbyStyles';
import HeaderTitle from '../Header/HeaderTitle';
import Icon from '../Common/Icon';
import SortView from './SortView';
import CoasterSplash from '../../assets/images/CoasterSplash.png';
import moment from 'moment';
import LogInButton from '../Common/LogInButton';
import VenuePortalButton from '../Common/VenuePortalButton';

const VenueLobby = ({ navigation }) => {
  const dispatch = useDispatch();
  const bars = useSelector(state => {
    return state.bars;
  });
  const user = useSelector(state => {
    return state.user;
  });

  const getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      console.log('location access denied.');
    }

    let location = await Location.getCurrentPositionAsync({});
    dispatch(setLocation(location));
  };
  // const user = useSelector(state => state.user); // TODO: move to my tix page
  // const purchasedTickets = useSelector(state => state.purchasedTickets); // TODO: move to my tix page

  useEffect(() => {
    dispatch(getUserToken());
    const fetchLocation = async () => {
      await getLocationAsync();
    };
    fetchLocation();
    dispatch(fetchBars());
    const subscription = dispatch(subscribeToHeadCounts());
      return () => {
        subscription.unsubscribe();
      };
  }, []);

  useEffect(() => {
    if (user.username) {
      dispatch(fetchUserByUsername(user.username));
    }
  }, [user.username]);

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <ScrollView
        style={styles.venueContainer}
        contentContainerStyle={{
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <View style={styles.dateHeader}>
          <Text style={styles.dateHeaderText}>{`${moment().format(
            'MMM Do, YYYY',
          )}`}</Text>
        </View>
        {bars.map((b, i) => (
          <VenueItem
            key={i}
            venue={b}
            navigation={navigation}
            onPress={() => navigation.navigate('Venue', { b })}
          />
        ))}
        <Image
          source={CoasterSplash}
          style={{ width: Dimensions.get('window').width, height: 100 }}
        />
      </ScrollView>
      {!user.email && <LogInButton style={{marginBottom: 100}} navigation={navigation} />}
      {user.barId && <VenuePortalButton style={{marginBottom: 100}} navigation={navigation} />}
      {/* Not totally sure how I feel about doing it this way, but we do need
      to made it clear what page a user is currently on */}
      {/* <View style={commonStyles.screenLabelContainer}>
          <Text style={commonStyles.screenLabelText}>LOBBY</Text>
        </View> */}
    </View>
  );
};

VenueLobby.propTypes = {
  navigation: PropTypes.object,
};

VenueLobby.navigationOptions = ({ navigation }) => ({
  headerTitle: <HeaderTitle title='coaster' />,
  headerLeft: (
    <Icon
      name='md-person'
      size={32}
      color='white'
      style={{ marginLeft: 20 }}
      onPress={() => navigation.navigate('Account')}
    />
  ),
  headerRight: <SortView />,
});

export default VenueLobby;
