import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  Text,
  View,
  Image,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
} from 'react-native';
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
import Colors from '../../constants/Colors';

const VenueLobby = ({ navigation }) => {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [currentFilters, setCurrentFilters] = useState({
    search: '',
  });
  const dispatch = useDispatch();
  const bars = useSelector((state) => {
    return state.bars;
  });
  const user = useSelector((state) => {
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
        {bars
          .filter(
            (b) =>
              b.name
                .toLowerCase()
                .includes(currentFilters.search.toLowerCase()) ||
              b.city
                .toLowerCase()
                .includes(currentFilters.search.toLowerCase()) ||
              b.state
                .toLowerCase()
                .includes(currentFilters.search.toLowerCase()) ||
              b.address
                .toLowerCase()
                .includes(currentFilters.search.toLowerCase()),
          )
          .map((b, i) => (
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
      <TouchableOpacity
        onPress={() => setFiltersOpen(true)}
        style={styles.filterBtnContainer}
      >
        <Icon faIcon name='search' size={28} color={Colors.whiteColor} />
        <Text style={styles.filterBtnText}>Search</Text>
        {currentFilters.search.length > 0 && (
          <View style={styles.filterCount}>
            <Text style={styles.filterCountText}>1</Text>
          </View>
        )}
      </TouchableOpacity>
      <Modal transparent={true} visible={filtersOpen}>
        <TouchableWithoutFeedback onPress={() => setFiltersOpen(false)}>
          <View style={styles.filterModalContainer}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.filterModal}>
                  <View style={styles.filterItem}>
                    <Text style={styles.filterLabel}>Search</Text>
                    <TextInput
                      style={styles.filterInput}
                      placeholder='Search...'
                      value={currentFilters.search}
                      onChangeText={(text) =>
                        setCurrentFilters({
                          ...currentFilters,
                          search: text,
                        })
                      }
                    />
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      {!user.email && (
        <LogInButton style={{ marginBottom: 100 }} navigation={navigation} />
      )}
      {user.barId && (
        <VenuePortalButton
          style={{ marginBottom: 100 }}
          navigation={navigation}
        />
      )}
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
      faIcon
      name='ticket'
      size={32}
      color='white'
      style={{ marginLeft: 20 }}
      onPress={() => navigation.navigate('MyTix')}
    />
  ),
  headerRight: (
    <Icon
      name='md-person'
      size={32}
      color='white'
      style={{ marginRight: 24 }}
      onPress={() => navigation.navigate('Account')}
    />
  ),
});

export default VenueLobby;
