import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, Text} from 'react-native';
import {styles} from './styles/HeadCountWidget'; 
import { Button } from 'native-base';
import {updateCountForBar, subscribeToHeadCountForBar} from '../../redux/actions';


const HeadCountWidget = ({barId}) => {
	const [subscription, setSubscription] = useState(null);
	const countObj = useSelector((state) => state.venuePortal.headCount);
	const dispatch = useDispatch();

	useEffect(() => {
		setSubscription(dispatch(subscribeToHeadCountForBar(barId)));
	}, []);

	return (
		<View style={styles.container}>
			<Text style={styles.headCountTitle}>Head Count</Text>
			<View style={styles.countContainer}>
				<Text style={styles.currentCount}>{countObj.count}</Text>
				<Text style={styles.totalCapacity}>/ 200</Text>
			</View>
			<Text >Total Tickets Sold</Text>
			<View style={styles.buttonsContainer}>
				<Button light
					onPress={() => {
						console.log('u')
					}}
					style={styles.minusButtonContainer}>
					<Text style={styles.minusButtonText}>-</Text>
				</Button>
				<Button light
					onPress={() => {
						dispatch(updateCountForBar(barId, countObj.count + 1, countObj.id));
					}}
					style={styles.plusButtonContainer}>
					<Text style={styles.plusButtonText}>+</Text>
				</Button>
			</View>
		</View>
	);
};

export default HeadCountWidget;
