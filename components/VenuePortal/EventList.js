import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {View, Text, Button} from 'react-native';
import { fetchPurchasedTicketsByEventId } from '../../redux/actions';

import { useDispatch, useSelector } from 'react-redux';

const EventList = ({navigation}) => {
	const dispatch = useDispatch();
	const event = navigation.getParam('event');

	const tickets = useSelector(state => {
		const events = state.venuePortal.venue.events;
		const currEvent = events ? events.find(e => e.id === event.id) : {};
		return currEvent.tickets;
	});

	const refreshList = () => {
		console.log('fetching')
		dispatch(fetchPurchasedTicketsByEventId(event.id));
	}
	
	useEffect(() => {
		console.log('fetching purchased tix')
		dispatch(fetchPurchasedTicketsByEventId(event.id));
	}, []);

	return (
		<View style={{flex:1}} >
			<Text>The following users are on the list for your event</Text>
			{
				tickets && tickets.map((t) => (
					<Text key={t.id}>{t.user.firstName} {t.user.lastName} | {t.redeemed ? 'Admitted' : 'Not Admitted'}</Text>
				))
			}
			<Button title="Scan Tickets"
				onPress={() => navigation.navigate('Scanner')} />
			<Button title="Refresh List"
				onPress={() => refreshList()} />
		</View>
	);
};

EventList.propTypes = {
	navigation: PropTypes.object.isRequired,
}

export default EventList;
