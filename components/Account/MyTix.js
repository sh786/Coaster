import React from 'react';
import PropTypes from 'prop-types';
import { View, Button, Text, ScrollView } from 'react-native';

import RedeemedTicketList from './RedeemedTicketList';
import TicketList from './TicketList';
import { styles } from './AccountStyles';

const MyTix = ({ navigation }) => {
  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
      }}
    >
      <View>
        <Text style={styles.sectionHeaderText}>Active Tickets</Text>
        <TicketList />
      </View>
      <View>
        <Text style={styles.sectionHeaderText}>Redeemed Tickets</Text>
        <RedeemedTicketList />
      </View>
    </ScrollView>
  );
};

MyTix.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default MyTix;
