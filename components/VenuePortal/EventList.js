import React, {useState, useEffect} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import { fetchPurchasedTicketsByEventId } from '../../redux/actions';

import { useDispatch, useSelector } from 'react-redux';

const EventList = ({navigation}) => {
	const dispatch = useDispatch();
	const event = navigation.getParam('event');

	const tickets = useSelector(state => {
		const events = state.venuePortal.venue.events;
		const currEvent = events.find(e => e.id === event.id);
		return currEvent.tickets;
	});
	console.log(tickets);

	useEffect(() => {
		dispatch(fetchPurchasedTicketsByEventId(event.id));
	}, []);

	return (
		<View style={{flex:1}} >
			<Text>The following users are on the list for your event</Text>
			{
				tickets.map((t) => (
					<Text key={t.id}>{t.user.firstName} {t.user.lastName}</Text>
				))
			}
			<Button title="Scan Tickets"
				onPress={() => navigation.navigate('Scanner')} />
		</View>
	);
};

export default EventList;
