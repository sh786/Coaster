import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';

import Colors from '../constants/Colors';

const EventItem = ({event, navigation}) => {
  return (
    <TouchableWithoutFeedback onPress={() => navigation.navigate('event', {event})}>
      <View style={styles.eventItemContainer} >
        <View style={styles.eventItemLeftContent}>
          <Text style={styles.eventItemName}>{event.name}</Text>
          <Text style={styles.eventItemStreetAddress}>{event.address}</Text>
          <Text style={styles.eventItemDistance}>0.6mi</Text>
        </View>
        <View style={styles.eventItemRightContent}>
          <Text style={styles.eventItemPrice}>$10+</Text>
          <View style={styles.eventItemOffer}>
            <Text style={styles.eventItemOfferText}>20%</Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default EventItem;

const styles = StyleSheet.create({
  eventItemContainer: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#fff',
    height: 80,
    width: 300,
    padding: 8,
    marginBottom: 20,
    // boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 2px 4px rgba(0,0,0,0.23)',
  },
  eventItemLeftContent: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  eventItemName: {
    flex: 5,
    fontSize: 18,
  },
  eventItemStreetAddress: {
    flex: 3,
    fontSize: 12,
  },
  eventItemDistance: {
    flex: 3,
    fontSize: 10,
  },
  eventItemRightContent: {
    display: 'flex',
    position: 'relative',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    textAlign: 'right',
  },
  eventItemPrice: {
    fontSize: 15,
  },
  eventItemOffer: {
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
  eventItemOfferText: {
    lineHeight: 30,
    fontSize: 10,
    color: '#fff',
  },
});
