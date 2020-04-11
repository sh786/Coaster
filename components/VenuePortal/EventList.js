import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {View, Text, Button} from 'react-native';
import { fetchPurchasedTicketsByEventId } from '../../redux/actions';
import {styles} from './styles/EventListStyles';
import Icon from '../Common/Icon';
import ScanButton from './ScanButton';

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

	const refreshList = () => {
		console.log('fetching')
		dispatch(fetchPurchasedTicketsByEventId(event.id));
	}
	
	useEffect(() => {
		console.log('fetching purchased tix')
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
			<ScrollView style={styles.scrollView}>
				{
					tickets && tickets.map((t) => (
						<View key={t.id} style={styles.line}>
							<Text style={styles.lineItem}>{t.user.firstName} {t.user.lastName}</Text>
							<Text style={styles.lineItem}>{t.redeemed ? 'Admitted' : 'Not Admitted'}</Text>
						</View>
					))
				}
			</ScrollView>
			{/* <Text>The following users are on the list for your event</Text>
			{
				tickets && tickets.map((t) => (
					<Text key={t.id}>{t.user.firstName} {t.user.lastName} | {t.redeemed ? 'Admitted' : 'Not Admitted'}</Text>
				))
			}
			<Button title="Scan Tickets"
				onPress={() => navigation.navigate('Scanner')} />
			<Button title="Refresh List"
				onPress={() => refreshList()} /> */}
			<ScanButton event={event} navigation={navigation} />
		</View>
	);
};

EventList.propTypes = {
	navigation: PropTypes.object.isRequired,
}

export default EventList;
