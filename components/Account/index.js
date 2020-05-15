import React from 'react';
import {View, Button} from 'react-native';
import * as Linking from 'expo-linking';
import Auth from '@aws-amplify/auth';
import { clearUserData } from '../../redux/actions';

import { useDispatch, useSelector } from 'react-redux';

const Account = ({navigation}) => {
	const dispatch = useDispatch();
	const user = useSelector(state => {
		return state.user;
	});

	return (
		<View>
			<Button title="sign out"
				onPress={() => {
					Auth.signOut()
						.then(() => {
							dispatch(clearUserData());
							navigation.navigate('Lobby');
						})
						.catch(err => {
							console.log('Error while signing out!', err)
						})
				}} />
			<Button
				title="MyTix"
				onPress={() => navigation.navigate('MyTix')}
			/>
			<Button
				title="Open Email"
				onPress={() => Linking.openURL('mailto:support@example.com?subject=SendMail&body=Description')}
			/>
		</View>
	);
};

export default Account;
