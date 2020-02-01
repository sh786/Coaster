import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';

import Colors from '../constants/Colors';
import Icon from './Icon';

const VenueItem = ({venue, navigation}) => {
  return (
    <TouchableWithoutFeedback onPress={() => navigation.navigate('Venue', {venue})}>
      <View style={styles.venueItemContainer} >
        <View style={styles.venueItemLeftContent}>
          <Text style={styles.venueItemName}>{venue.name}</Text>
          <Text style={styles.venueItemStreetAddress}>{venue.address}</Text>
          <Text style={styles.venueItemStreetAddress}>{`${venue.city}, ${venue.state}`}</Text>
          <Text style={styles.venueItemDistance}>0.6mi</Text>
        </View>
        <View style={styles.venueItemRightContent}>
          <Text style={styles.venueItemPrice}>{venue.description}</Text>
        </View>
        <View style={styles.arrowContainer}>
          <Icon name="ios-arrow-forward"
            size={32}
            color="#051622"
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default VenueItem;

const styles = StyleSheet.create({
  venueItemContainer: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#fff',
    height: 80,
    width: '95%',
    padding: 10,
    marginBottom: 20,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    fontFamily: 'san-francisco',
    borderRadius: 10,
  },
  venueItemLeftContent: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  venueItemName: {
    flex: 5,
    fontSize: 18,
  },
  venueItemStreetAddress: {
    flex: 3,
    fontSize: 12,
  },
  venueItemDistance: {
    flex: 3,
    fontSize: 10,
  },
  venueItemRightContent: {
    display: 'flex',
    position: 'relative',
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    textAlign: 'right',
    marginHorizontal: 10,
  },
  venueItemPrice: {
    fontSize: 12,
  },
  venueItemOffer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 30,
    height: 30,
    borderRadius: 50,
    backgroundColor: Colors.accentColor,
    textAlign: 'center',
    marginRight: -23,
    marginBottom: -23,
  },
  venueItemOfferText: {
    lineHeight: 30,
    fontSize: 10,
    color: '#fff',
  },
  arrowContainer: {
    flex: 0.4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
