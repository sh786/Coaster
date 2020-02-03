import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBars } from '../redux/actions';

import { StyleSheet} from 'react-native';

import VenueItem from '../components/VenueItem';
import colors from '../constants/Colors.js';
import Logo from '../components/Logo';
import Icon from '../components/Icon';
import SortView from '../components/SortView';
import { ScrollView } from 'react-native-gesture-handler';

export const VenueLobby = (props) => {
  const dispatch = useDispatch();
  const bars = useSelector(state => {
    return state.bars.bars;
  });

  useEffect(() => {
    dispatch(fetchBars());
  }, []);

  return (
    <ScrollView
      style={styles.venueContainer}
      contentContainerStyle={{
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {[1,2,3,4,5,6,7,8,9,1,2,2,2].map((b, i) => 
        <VenueItem key={i} venue={bars.length ? bars[0] : {}} navigation={props.navigation} />
      )}
    </ScrollView>
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
    paddingVertical: 5,
  },
});
