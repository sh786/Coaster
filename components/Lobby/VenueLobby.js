import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native-gesture-handler';
import { Dimensions, Text, View, ImageBackground } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import { fetchBars, setLocation } from '../../redux/actions';

import VenueItem from './VenueItem';
import { styles } from './styles/VenueLobbyStyles';
import HeaderTitle from '../Header/HeaderTitle';
import Icon from '../Common/Icon';
import SortView from './SortView';
import CoasterSplash from '../../assets/images/CoasterSplash.png';

import moment from 'moment';

const VenueLobby = ({ navigation }) => {
  const dispatch = useDispatch();
  const bars = useSelector(state => {
    return state.bars;
  });

  const getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      console.log('location access denied.');
    }

    let location = await Location.getCurrentPositionAsync({});
    dispatch(setLocation(location));
  };

  useEffect(() => {
    const fetchLocation = async () => {
      await getLocationAsync();
    };
    fetchLocation();

    dispatch(fetchBars());
  }, []);

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
          <VenueItem key={i} venue={b} navigation={navigation} />
        ))}
      </ScrollView>
      <ImageBackground
        source={CoasterSplash}
        style={{
          width: Dimensions.get('window').width,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
        }}
      />
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

VenueLobby.navigationOptions = {
  headerTitle: <HeaderTitle title='coaster' />,
  headerLeft: (
    <Icon name='md-person' size={32} color='white' style={{ marginLeft: 20 }} />
  ),
  headerRight: <SortView />,
};

export default VenueLobby;
