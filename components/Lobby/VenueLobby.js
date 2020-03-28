import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native-gesture-handler';
import { Dimensions, Text, View, ImageBackground } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import { fetchBars, setLocation, fetchUserByUsername, getUserToken } from '../../redux/actions';

import VenueItem from './VenueItem';
import { styles } from './styles/VenueLobbyStyles';
import { commonStyles } from '../../common/CommonStyles';
import HeaderTitle from '../Header/HeaderTitle';
import Logo from '../Common/Logo';
import Icon from '../Common/Icon';
import SortView from './SortView';
import CoasterLogo from '../../assets/images/Coaster.png';
import Auth from '@aws-amplify/auth';
import moment from 'moment';
import { Button } from 'native-base';

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
  }, []);

  useEffect(() => {
    if (user.username) {
      dispatch(fetchUserByUsername(user.username));
    }
  }, [user.username])

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fafafa',
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
        source={require('../../assets/images/CoasterSplash.png')}
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

VenueLobby.navigationOptions = ({navigation}) => ({
  headerTitle: <HeaderTitle title='coaster' />,
  headerLeft: (
    <Icon name='md-person' size={32} color='white' style={{ marginLeft: 20 }}
      onPress={() => navigation.navigate('Account')}/>
  ),
  headerRight: <SortView />,
});

export default VenueLobby;
