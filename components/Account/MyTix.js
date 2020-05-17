import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, ScrollView } from 'react-native';

import HeaderTitle from '../Header/HeaderTitle';
import Icon from '../Common/Icon';
import NonQrTicketList from './NonQrTicketList';
import TicketList from './TicketList';
import { styles } from './AccountStyles';

const MyTix = () => {
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
      {['Redeemed', 'Expired'].map((type) => (
        <View key={type}>
          <Text style={styles.sectionHeaderText}>{type} Tickets</Text>
          <NonQrTicketList type={type.toLowerCase()} />
        </View>
      ))}
    </ScrollView>
  );
};

MyTix.propTypes = {
  navigation: PropTypes.object.isRequired,
};

MyTix.navigationOptions = ({ navigation }) => ({
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

export default MyTix;
