import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';

import Colors from '../constants/Colors';

const VenueItem = ({venue, navigation}) => {
  return (
    <TouchableWithoutFeedback onPress={() => navigation.navigate('Venue', {venue})}>
      <View style={styles.venueItemContainer} >
        <View style={styles.venueItemLeftContent}>
          <Text style={styles.venueItemName}>{venue.name}</Text>
          <Text style={styles.venueItemStreetAddress}>{venue.address}</Text>
          <Text style={styles.venueItemDistance}>0.6mi</Text>
        </View>
        <View style={styles.venueItemRightContent}>
          <Text style={styles.venueItemPrice}>$10+</Text>
          <View style={styles.venueItemOffer}>
            <Text style={styles.venueItemOfferText}>20%</Text>
          </View>
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
    width: 300,
    padding: 8,
    marginBottom: 20,
    // boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 2px 4px rgba(0,0,0,0.23)',
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
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    textAlign: 'right',
  },
  venueItemPrice: {
    fontSize: 15,
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
});
