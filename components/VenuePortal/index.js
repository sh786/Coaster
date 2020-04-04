import React, {useState, useEffect} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import { fetchBar } from '../../redux/actions';

import { useDispatch, useSelector } from 'react-redux';

const VenuePortal = ({navigation}) => {
	const dispatch = useDispatch();
	const user = useSelector(state => {
		return state.user;
	});

	const venue = useSelector(state => state.venuePortal.venue);
	console.log(venue, 'ahahah')

	useEffect(() => {
		dispatch(fetchBar(user.barId));
	}, []);

	return (
		<View style={{flex:1}} >
			{venue.events && venue.events &&
				venue.events.map(e => 
					<Button title={e.description} key={e.id} onPress={() => navigation.navigate('EventList', {event: e})}/>)
			}
		</View>
	);
};

export default VenuePortal;
