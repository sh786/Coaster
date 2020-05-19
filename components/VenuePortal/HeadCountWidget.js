import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, Text} from 'react-native';
import {styles} from './styles/HeadCountWidget'; 
import { Button } from 'native-base';
import {updateCountForBar, subscribeToHeadCountForBar} from '../../redux/actions';
import Icon from '../Common/Icon';
import Colors from '../../constants/Colors';

const HeadCountWidget = ({barId}) => {
	const [showConfirmRefresh, setShowConfirmRefresh] = useState(false);
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
			<View style={styles.refreshContainer}>
				<Icon
					name="ios-refresh"
					size={30}
					color={Colors.whiteColor}
					onPress={() => setShowConfirmRefresh(!showConfirmRefresh)}
				/>
			</View>
			{showConfirmRefresh && 
				<View style={styles.confirmRefresh}>
					<Text style={styles.areYouSureTitleText}>Are you sure you want to reset your current capacity count?</Text>
					<View style={styles.refreshAreYouSureContainer}>
						<View>
							<Button light
								onPress={() => setShowConfirmRefresh(!showConfirmRefresh)}
								style={styles.areYouSureButton}>
								<Text style={styles.areYouSureButtonText}>No</Text>
							</Button>
						</View>
						<View>
							<Button light
								onPress={() => {
									dispatch(updateCountForBar(barId, 0, countObj.id));
									setShowConfirmRefresh(!showConfirmRefresh);
								}}
								style={styles.areYouSureButton}>
								<Text style={styles.areYouSureButtonText}>Yes</Text>
							</Button>
						</View>
					</View>
				</View>}
			{!showConfirmRefresh && 
			<View style={styles.container}>
				<View>
					<Button light disabled={countObj.count >= capacity}
						onPress={() => {
							dispatch(updateCountForBar(barId, countObj.count + 1, countObj.id));
						}}
						style={countObj.count < capacity ? styles.incrementOneButtonContainer : styles.disabledIncrementOneButtonContainer}>
						<Text style={styles.incrementOneButtonText}>+1</Text>
					</Button>
				</View>
				<View style={styles.buttonsContainer}>
					<Button light disabled={countObj.count < 5}
						onPress={() => {
							dispatch(updateCountForBar(barId, countObj.count - 5, countObj.id));
						}}
						style={countObj.count >= 5 ? styles.incrementFiveButtonContainer : styles.disabledIncrementFiveButtonContainer}>
						<Text style={styles.incrementFiveButtonText}>-5</Text>
					</Button>
					<View style={styles.countInfoContainer}>
						<View style={styles.countContainer}>
							<Text style={styles.currentCount}>{countObj.count}</Text>
							<Text style={styles.totalCapacity}>/ {capacity}</Text>
						</View>
						<Text >Total Tickets Sold</Text>
					</View>
					<Button light disabled={countObj.count > capacity - 5}
						onPress={() => {
							dispatch(updateCountForBar(barId, countObj.count + 5, countObj.id));
						}}
						style={countObj.count + 5 <= capacity ? styles.incrementFiveButtonContainer : styles.disabledIncrementFiveButtonContainer}>
						<Text style={styles.incrementFiveButtonText}>+5</Text>
					</Button>
				</View>
				<View>
					<Button light disabled={countObj.count === 0}
						onPress={() => {
							dispatch(updateCountForBar(barId, countObj.count - 1, countObj.id));
						}}
						style={countObj.count > 0 ? styles.incrementOneButtonContainer : styles.disabledIncrementOneButtonContainer}>
						<Text style={styles.incrementOneButtonText}>-1</Text>
					</Button>
				</View>
			</View>}
		</View>
	);
};

export default HeadCountWidget;
