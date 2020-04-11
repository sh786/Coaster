import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {View, Button} from 'react-native';
import { fetchBar } from '../../redux/actions';

import { useDispatch, useSelector } from 'react-redux';

const VenuePortal = ({navigation}) => {
	const dispatch = useDispatch();
	const user = useSelector(state => {
		return state.user;
	});

	const venue = useSelector(state => state.venuePortal.venue);

	useEffect(() => {
		dispatch(fetchBar(user.barId));
	}, []);

	return (
		<View style={{flex:1}} >
			{venue.events && venue.events &&
				venue.events.map(e => 
					<Button title={e.description} key={e.id} onPress={() => navigation.navigate('EventList', {event: e})}/>)
			}
			<Button title="Lobby"
				onPress={() => navigation.navigate('Lobby')} />
		</View>
	);
};

VenuePortal.propTypes = {
	navigation: PropTypes.object.isRequired,
}

export default VenuePortal;
