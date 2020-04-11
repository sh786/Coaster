import React, {useState, useEffect} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import { redeemPurchasedTicket } from '../../redux/actions';

import { useDispatch, useSelector } from 'react-redux';

const PostScan = ({navigation}) => {
	const [redeemed, setRedeemed] = useState(null);
	const dispatch = useDispatch();
	const currScannedTicket = useSelector(state => state.venuePortal.currScannedTicket);
	
	useEffect(() => {
		setRedeemed(currScannedTicket.redeemed === true);
		if (currScannedTicket && currScannedTicket.id && !currScannedTicket.redeemed) {
			dispatch(redeemPurchasedTicket(currScannedTicket));
		}
	}, []);

	return (
		<View style={{flex:1}} >
			{redeemed && <Text>This ticket has already been redeemed.</Text>}
			<Text>{currScannedTicket.user.firstName}</Text>
			<Text>{currScannedTicket.user.lastName}</Text>
			<Text>{currScannedTicket.user.id}</Text>
			<Text>{currScannedTicket.id}</Text>
			<Button title="Scan More Tickets"
				onPress={() => navigation.navigate('Scanner')} />
		</View>
	);
};

export default PostScan;
