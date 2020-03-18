import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native-gesture-handler';
import { Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBars } from '../../redux/actions';

import VenueItem from './VenueItem';
import { styles } from './styles/VenueLobbyStyles';
import { commonStyles } from '../../common/CommonStyles';
import HeaderTitle from '../Header/HeaderTitle';
import Logo from '../Common/Logo';
import Icon from '../Common/Icon';
import SortView from './SortView';

import moment from 'moment';

const VenueLobby = ({ navigation }) => {
  const dispatch = useDispatch();
  const bars = useSelector(state => {
    return state.bars;
  });

  useEffect(() => {
    dispatch(fetchBars());
  }, []);

  return (
    <View style={{ flex: 1 }}>
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
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 2, 2].map((b, i) => (
          <VenueItem
            key={i}
            venue={bars.length ? bars[0] : {}}
            navigation={navigation}
          />
        ))}
      </ScrollView>
      {/* Not totally sure how I feel about doing it this way, but we do need
      to made it clear what page a user is currently on */}
      <View style={commonStyles.screenLabelContainer}>
        <Text style={commonStyles.screenLabelText}>LOBBY</Text>
      </View>
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
