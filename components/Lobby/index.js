import React, { useEffect } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBars } from '../../redux/actions';

import VenueItem from './VenueItem';
import {styles} from './styles/VenueLobbyStyles';
import Logo from '../Common/Logo';
import Icon from '../Common/Icon';
import SortView from './SortView';

const VenueLobby = (props) => {
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

export default VenueLobby;
