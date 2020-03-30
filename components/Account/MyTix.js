import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {View, Text, Button} from 'react-native';
import { fetchPurchasedTicketsByUserId } from '../../redux/actions';
import Ticket from '../Ticket';

import { useDispatch, useSelector } from 'react-redux';

const MyTix = ({navigation}) => {
	const dispatch = useDispatch();
	const tickets = useSelector(state => {
		return state.purchasedTickets;
	});
	const user = useSelector(state => state.user)

	useEffect(() => {
		dispatch(fetchPurchasedTicketsByUserId(user.id));
	}, []);

	return (
		<View>
			{
				tickets.map(t => <Ticket key={t.id} purchasedTicket={t} />)
			}
			<Button
				title="Lobby"
				onPress={() => navigation.navigate('Lobby')}
			/>
		</View>
	);
};

MyTix.propTypes = {
	navigation: PropTypes.object.isRequired,
};

export default MyTix;
