import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { createNewPurchasedTicket } from '../../redux/actions';
import Icon from '../Common/Icon';
import Colors from '../../constants/Colors';
import { HeaderTitle } from '../Header/HeaderTitle';

const CheckoutSuccessScreen = ({ navigation }) => {
  const [ticket, setTicket] = useState(null);
  const ticketOffer = navigation.getParam('ticketOffer');
  const venue = navigation.getParam('venue');
  const quantity = navigation.getParam('quantity');
  const event = navigation.getParam('event');

  const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state.user;
  });

  useEffect(() => {
    for (let i = 0; i < quantity; i++) {
      dispatch(createNewPurchasedTicket(ticketOffer.id, event.id, user.id));
    }
    navigation.navigate('AccountScreen');
  }, []);

  return (
    <View
      style={{
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon
          antIcon
          name='checkcircleo'
          size={80}
          style={{
            marginTop: -60,
            marginBottom: 10,
            color: Colors.successColor,
          }}
        />
        <Text style={{ fontSize: 24, color: Colors.successColor }}>
          Purchase Successful!
        </Text>
      </View>
    </View>
  );
};

CheckoutSuccessScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: <HeaderTitle />,
  headerLeft: null,
});

CheckoutSuccessScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default CheckoutSuccessScreen;
