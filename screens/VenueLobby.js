import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBars } from '../redux/actions';

import { StyleSheet, Text, View } from 'react-native';

import VenueItem from '../components/VenueItem';
import colors from '../constants/Colors.js';
import Logo from '../components/Logo';
import Icon from '../components/Icon';
import SortView from '../components/SortView';

export const VenueLobby = (props) => {
  const dispatch = useDispatch();
  const bars = useSelector(state => {
    return state.bars.bars;
  });

  useEffect(() => {
    dispatch(fetchBars());
  }, []);

  return (
    <View style={styles.venueContainer}>
      {[1,2,3,4,5,6,7,8,9,1,2,2,2].map((b, i) => {
        return <VenueItem key={i} venue={bars.length ? bars[0] : {}} navigation={props.navigation} />;
      })}
    </View>
  );
};

VenueLobby.navigationOptions = {
  headerTitle: <Logo />,
  headerLeft: 
      <Icon
          name="md-person"
          size={32}
          color="white"
          style={{marginLeft: 10}}
      />,
  headerRight:
      <SortView />,
}

const styles = StyleSheet.create({
  venueContainer: {
    flex: 1,
    backgroundColor: colors.primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
