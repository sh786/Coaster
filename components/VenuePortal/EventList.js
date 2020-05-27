import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {View, Text, Button} from 'react-native';
import { fetchPurchasedTicketsByEventId } from '../../redux/actions';
import {styles} from './styles/EventListStyles';
import Icon from '../Common/Icon';
import ScanButton from './ScanButton';
import HeadCountWidget from './HeadCountWidget';

import { useDispatch, useSelector } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';

const EventList = ({navigation}) => {
	const dispatch = useDispatch();
	const event = navigation.getParam('event');

	const tickets = useSelector(state => {
		const events = state.venuePortal.venue.events;
		const currEvent = events ? events.find(e => e.id === event.id) : {};
		return currEvent.tickets;
	});

	const refreshList = useSelector(state => state.venuePortal.refreshList);

	if (refreshList) {
		console.log('fetching !!!!!    -----------    !!!!!!')
		dispatch(fetchPurchasedTicketsByEventId(event.id));
	}
	
	useEffect(() => {
		dispatch(fetchPurchasedTicketsByEventId(event.id));
	}, []);

	return (
		<View style={styles.container} >
			<View style={styles.headingContainer}>
				<Icon
					style={styles.headingIcon}
					name='md-calendar'
					size={20}
					color='black'
				/>
				<Text style={styles.eventListHeading}>Event</Text>
				<View style={styles.dateContainer}>
					<Text style={styles.dateText}>
						{new Date(event.startTime).toLocaleString()}
					</Text>
				</View>
			</View>
			<Text style={styles.ticketCount}>{tickets && tickets.length} Total Tickets Sold</Text>
			<HeadCountWidget barId={event.barId} />
			<ScrollView style={styles.scrollView}>
				{
					tickets && tickets.map((t) => (
						<View key={t.id} style={styles.line}>
							<Text style={styles.lineItem}>{t.user.firstName} {t.user.lastName}</Text>
							<Text style={styles.lineItem}>{t.redeemed ? 'Admitted' : ''}</Text>
						</View>
					))
				}
			</ScrollView>
			<ScanButton event={event} onClick={() => navigation.navigate('Scanner', {event})} />
		</View>
	);
};

EventList.propTypes = {
	navigation: PropTypes.object.isRequired,
}

export default EventList;
