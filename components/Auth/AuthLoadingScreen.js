import React, {useEffect} from 'react'
import {
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native'
import Colors from '../../constants/Colors';
import Auth from '@aws-amplify/auth';

const AuthLoadingScreen = ({navigation}) => {
	const loadApp = async () => {
		await Auth.currentAuthenticatedUser()
			.then(user => {
				if (user.signInUserSession.accessToken.jwtToken) {
					navigation.navigate('Lobby', {user});
				}
			})
			.catch(err => {
				console.log(err);
				navigation.navigate('SignIn');
			})
	}

	useEffect(() => {
		loadApp();
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

export default AuthLoadingScreen;