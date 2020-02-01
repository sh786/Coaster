import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBars } from '../redux/actions';

import { StyleSheet, Text, View } from 'react-native';

import VenueItem from '../components/VenueItem';
import colors from '../constants/Colors.js';
import Logo from '../components/Logo';
import TabBarIcon from '../components/TabBarIcon';

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
      {bars.map((b, i) => {
        return <VenueItem key={i} venue={b} navigation={props.navigation} />;
      })}
    </View>
  );
};

VenueLobby.navigationOptions = {
  headerTitle: <Logo />,
  headerLeft: 
      <TabBarIcon
          name="md-person"
          size={32}
          color="white"
          style={{marginLeft: 10}}
      />,
  headerRight:
      <TabBarIcon
          name="md-funnel"
          size={32}
          color="white"
          style={{marginRight: 10}}
      />,
}

const styles = StyleSheet.create({
  venueContainer: {
    flex: 1,
    backgroundColor: colors.primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
