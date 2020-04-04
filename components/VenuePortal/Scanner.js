import React, {useState, useEffect} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { fetchPurchasedTicketById, redeemPurchasedTicket } from '../../redux/actions';


import { useDispatch, useSelector } from 'react-redux';

const Scanner = ({navigation}) => {
	const [hasPermission, setHasPermission] = useState(null);
	const [scanned, setScanned] = useState(false);
	const dispatch = useDispatch();
	const user = useSelector(state => {
		return state.user;
	});

	const currScannedTicket = useSelector(state => state.venuePortal.currScannedTicket);
	console.log(currScannedTicket)

	useEffect(async () => {
		const { status } = await BarCodeScanner.requestPermissionsAsync();
		setHasPermission(status === 'granted');
	}, []);

	if (currScannedTicket && currScannedTicket.id && !currScannedTicket.redeemed) {
		dispatch(redeemPurchasedTicket(currScannedTicket));
	} else if (currScannedTicket && currScannedTicket.id && currScannedTicket.redeemed) {
		return <Text>This ticket has already been redeemed.</Text>;
	}

	if (hasPermission === null) {
		return <Text>Requesting for camera permission</Text>;
	}
	if (hasPermission === false) {
		return <Text>No access to camera</Text>;
	}

	const handleBarCodeScanned = ({type, data}) => {
		setScanned(true);
		dispatch(fetchPurchasedTicketById(data));
	}

	return (
		<View style={{flex:1}} >
			<BarCodeScanner
				onBarCodeScanned={handleBarCodeScanned}
				style={StyleSheet.absoluteFillObject}
			/>
			{scanned && (
				<Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
			)}
			<Button title="Venue"
			onPress={() => {
				console.log('yo')
			}} />
		</View>
	);
};

export default Scanner;
