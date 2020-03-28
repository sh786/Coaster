import React, {useEffect} from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserByUsername } from '../redux/actions';
import PropTypes from 'prop-types';

import Colors from '../constants/Colors';

const AuthMiddleware = ({navigation}) => {
	let appDestinationScreen = navigation.getParam('appDestinationScreen');
	const user = navigation.getParam('user');
	const authDestinationScreen = navigation.getParam('authDestinationScreen');
    const venue = navigation.getParam('venue');
    const event = navigation.getParam('event');
    const quantity = navigation.getParam('quantity');
    const ticketOffer = navigation.getParam('ticketOffer');
	if (!appDestinationScreen) {
		appDestinationScreen = 'Lobby';
	}

	// If user coming from main app, no need to check their authentication
	if (authDestinationScreen === 'SignIn') {
		navigation.navigate(authDestinationScreen, {appDestinationScreen, venue, event, quantity, ticketOffer});
	}

	const dispatch = useDispatch();
	const userInfo = useSelector(state => state.user);
	// we have successfully fetched our user's info and can redirect to the app
	if (userInfo && userInfo.email && appDestinationScreen) {
		// user is in venues group so redirect them to the venue portal
		if (user && user.signInUserSession.accessToken.payload['cognito:groups'].includes('Venues')) {
			navigation.navigate('VenuePortal', {user: userInfo})
		} else {
			navigation.navigate(appDestinationScreen, {user: userInfo, venue, event, quantity, ticketOffer});
		}
	}

	useEffect(() => {
		if (user && user.signInUserSession.accessToken.jwtToken) {
			dispatch(fetchUserByUsername(user.username));
		}
	}, []);

	return (
		<View style={styles.container}> 
			<ActivityIndicator size="large" color="#fff" />
		</View>
	)
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.primaryColor,
		alignItems: 'center',
		justifyContent: 'center',
	},
});

AuthMiddleware.propTypes = {
	navigation: PropTypes.object.isRequired,
}

export default AuthMiddleware;