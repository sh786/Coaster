import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Auth from '@aws-amplify/auth';
import { clearUserData } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';

import {
  fetchPurchasedTicketsByUserId,
  fetchRedeemedTicketsByUserId,
} from '../../redux/actions';
import { styles } from './AccountStyles';
import HeaderTitle from '../Header/HeaderTitle';
import Icon from '../Common/Icon';
import Colors from '../../constants/Colors';

const Account = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state.user;
  });
  const activeTickets = useSelector((state) => {
    return state.purchasedTickets.filter(
      (t) => new Date(t.event.endTime) > new Date(),
    );
  });
  const expiredTickets = useSelector((state) => {
    return state.purchasedTickets.filter(
      (t) => new Date(t.event.endTime) < new Date(),
    );
  });
  const redeemedTickets = useSelector((state) => {
    return state.redeemedTickets;
  });

  useEffect(() => {
    dispatch(fetchPurchasedTicketsByUserId(user.id));
    dispatch(fetchRedeemedTicketsByUserId(user.id));
  }, []);

  const getTicketCatCount = (cat) => {
    if (cat === 'Active') return activeTickets.length;
    if (cat === 'Redeemed') return redeemedTickets.length;
    if (cat === 'Expired') return expiredTickets.length;
  };

  return user && user.firstName ? (
    <>
      <View style={styles.accountContainer}>
        <View style={styles.ticketBar}>
          {['Active', 'Redeemed', 'Expired'].map((ticketCat) => (
            <View
              // style={styles[`${ticketCat.split(' ')[0].toLowerCase()}Count`]}
              style={styles.ticketBarItem}
              key={ticketCat}
            >
              <Icon
                faIcon
                name={getIconFromCat(ticketCat)}
                size={24}
                onPress={() => navigation.navigate('MyTix')}
                color={Colors.whiteColor}
              />
              <Text style={styles.ticketBarItemText}>
                {getTicketCatCount(ticketCat)} {ticketCat}
              </Text>
            </View>
          ))}
        </View>
        <View style={styles.accountAvatar}>
          <Text style={styles.accountAvatarText}>
            {user.firstName[0]}
            {user.lastName[0]}
          </Text>
        </View>
        <View style={styles.accountFirstName}>
          <Text style={styles.accountFirstNameText}>{user.firstName}</Text>
        </View>
        <View style={styles.accountInfoContainer}>
          <View style={styles.accountInfo}>
            <View style={styles.accountInfoItem}>
              <Icon
                style={{
                  paddingLeft: 2,
                  width: 16,
                  color: Colors.darkGrayColor,
                }}
                faIcon
                name='user'
                size={16}
              />
              <Text style={styles.accountInfoItemText}>@{user.username}</Text>
            </View>
            <View style={styles.accountInfoItem}>
              <Icon
                style={styles.accountInfoItemIcon}
                faIcon
                name='envelope'
                size={16}
              />
              <Text style={styles.accountInfoItemText}>{user.email}</Text>
            </View>
            <View style={styles.accountInfoItem}>
              <Icon
                style={{
                  paddingLeft: 2,
                  width: 16,
                  color: Colors.darkGrayColor,
                }}
                faIcon
                name='phone'
                size={16}
              />
              <Text style={styles.accountInfoItemText}>{user.phoneNumber}</Text>
            </View>
            <View style={styles.accountInfoItem}>
              <Icon
                style={styles.accountInfoItemIcon}
                faIcon
                name='birthday-cake'
                size={16}
              />
              <Text style={styles.accountInfoItemText}>
                {new Date(user.dob).toLocaleString([], {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </Text>
            </View>
          </View>
          <View style={styles.accountInfoAttended}>
            <Text style={styles.accountInfoAttendedText}>
              {redeemedTickets.length}
            </Text>
            <Text style={styles.accountInfoAttendedLabeled}>
              Events Attended
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={styles.signOutBtn}
        onPress={() => {
          Auth.signOut()
            .then(() => {
              dispatch(clearUserData());
              navigation.navigate('Lobby');
            })
            .catch((err) => {
              console.log('Error while signing out!', err);
            });
        }}
      >
        <Text style={styles.signOutBtnText}>Sign Out</Text>
      </TouchableOpacity>
    </>
  ) : (
    <View>
      <Text>Please log in.</Text>
    </View>
  );
};

const getIconFromCat = (ticketCat) => {
  switch (ticketCat) {
    case 'Active':
      return 'ticket';
    case 'Redeemed':
      return 'history';
    case 'Expired':
      return 'close';
    default:
      return null;
  }
};

Account.navigationOptions = ({ navigation }) => ({
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

export default Account;
