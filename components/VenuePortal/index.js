import React from 'react';
import {Button} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';

const VenuePortal = ({navigation}) => {
	const dispatch = useDispatch();
	const user = useSelector(state => {
		return state.user;
	});
	console.log(user, 'this is the venue user')

	return (
		<Button title="Venue"
			onPress={() => {
				console.log('yo')
			}} />
	);
};

export default VenuePortal;
