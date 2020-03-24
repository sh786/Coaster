import React from 'react';
import {Button} from 'react-native';
import Auth from '@aws-amplify/auth';

const Account = ({navigation}) => {
	return (
		<Button title="sign out"
			onPress={() => {
				Auth.signOut()
					.then(() => {
						console.log('Sign out complete')
						navigation.navigate('AuthLoadingScreen');
					})
					.catch(err => console.log('Error while signing out!', err))
			}} />
	);
};

export default Account;
