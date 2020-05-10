import React, {useState, useEffect} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import { redeemPurchasedTicket, clearCurrScannedTicket } from '../../redux/actions';
import {styles} from './styles/PostScanStyles';
import ScanButton from './ScanButton';

import { useDispatch, useSelector } from 'react-redux';

const PostScan = ({navigation}) => {
	const [alreadyRedeemed, setAlreadyRedeemed] = useState(false);
	const [isWrongEvent, setIsWrongEvent] = useState(false);
	const dispatch = useDispatch();

	const event = navigation.getParam('event');
	const currScannedTicket = useSelector(state => state.venuePortal.currScannedTicket);
	const successfulRedemption = useSelector(state => state.venuePortal.successfulRedemption);

	const handleOnClick = () => {
		dispatch(clearCurrScannedTicket());
		navigation.navigate('Scanner', {event});
	}
	
	useEffect(() => {
		// verify that ticket is for selected event before redeeming
		if (currScannedTicket.eventId !== event.id) {
			setIsWrongEvent(true);
		} else if (currScannedTicket && currScannedTicket.id && !currScannedTicket.redeemed) {
			dispatch(redeemPurchasedTicket(currScannedTicket));
		} else {
			setAlreadyRedeemed(true);
		}
	}, []);

	return (
		<View style={styles.container} >
			<View style={styles.infoContainer}>
				<View style={styles.messageContainer}>
					{alreadyRedeemed || isWrongEvent && 
						<Text style={styles.bold}>
							Something has gone wrong. Check please verify that this is the correct event.
						</Text>}
					{successfulRedemption && <Text style={styles.bold}>You may admit this patron.</Text>}
				</View>
				<Text style={styles.info}>
					Name: {currScannedTicket.user && currScannedTicket.user.firstName} {currScannedTicket.user && currScannedTicket.user.lastName}
				</Text>
				<Text style={styles.dateText}>
					Date of Birth: {new Date(currScannedTicket.user && currScannedTicket.user.dob).toLocaleDateString()}
				</Text>
			</View>
			<ScanButton event={event} onClick={handleOnClick} />
		</View>
	);
};

export default PostScan;
