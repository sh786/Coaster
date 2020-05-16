import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, Text} from 'react-native';
import {styles} from './styles/HeadCountWidget'; 
import { Button } from 'native-base';
import {updateCountForBar, subscribeToHeadCountForBar} from '../../redux/actions';



const HeadCountWidget = ({barId}) => {
	const countObj = useSelector((state) => state.venuePortal.headCount);
	const capacity = useSelector((state) => state.venuePortal.venue.capacity);
	const dispatch = useDispatch();

	useEffect(() => {
		const subscription = dispatch(subscribeToHeadCountForBar(barId));
		return () => {
			subscription.unsubscribe();
		};
	}, []);

	return (
		<View style={styles.container}>
			<Text style={styles.headCountTitle}>Head Count</Text>
			<View style={styles.countContainer}>
				<Text style={styles.currentCount}>{countObj.count}</Text>
				<Text style={styles.totalCapacity}>/ {capacity}</Text>
			</View>
			<Text >Total Tickets Sold</Text>
			<View style={styles.buttonsContainer}>
				<Button light disabled={countObj.count === 0}
					onPress={() => {
						dispatch(updateCountForBar(barId, countObj.count - 1, countObj.id));
					}}
					style={countObj.count > 0 ? styles.minusButtonContainer : styles.disabledMinusButtonContainer}>
					<Text style={styles.minusButtonText}>-</Text>
				</Button>
				<Button light disabled={countObj.count >= capacity}
					onPress={() => {
						dispatch(updateCountForBar(barId, countObj.count + 1, countObj.id));
					}}
					style={countObj.count < capacity ? styles.plusButtonContainer : styles.disabledPlusButtonContainer}>
					<Text style={styles.plusButtonText}>+</Text>
				</Button>
			</View>
		</View>
	);
};

export default HeadCountWidget;
