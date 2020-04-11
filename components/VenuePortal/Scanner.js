import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {View, Text, StyleSheet} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { fetchPurchasedTicketById, clearCurrScannedTicket } from '../../redux/actions';


import { useDispatch, useSelector } from 'react-redux';

const Scanner = ({navigation}) => {
	const [hasPermission, setHasPermission] = useState(null);
	const dispatch = useDispatch();

	const currScannedTicket = useSelector(state => state.venuePortal.currScannedTicket);

	useEffect(() => {
		dispatch(clearCurrScannedTicket());
		BarCodeScanner.requestPermissionsAsync()
			.then(({status}) => setHasPermission(status === 'granted'));
	}, []);

	if (currScannedTicket && currScannedTicket.id && currScannedTicket.user) {
		navigation.navigate('PostScan');
	}

	if (hasPermission === null) {
		return <Text>Requesting for camera permission</Text>;
	}
	if (hasPermission === false) {
		return <Text>No access to camera</Text>;
	}

	const handleBarCodeScanned = ({data}) => {
		dispatch(fetchPurchasedTicketById(data));
	}

	return (
		<View style={{flex:1}} >
			<BarCodeScanner
				onBarCodeScanned={handleBarCodeScanned}
				style={StyleSheet.absoluteFillObject}
			/>
		</View>
	);
};

Scanner.propTypes = {
	navigation: PropTypes.object.isRequired,
}

export default Scanner;
