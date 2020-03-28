import React from 'react';
import {Button} from 'react-native';
import Auth from '@aws-amplify/auth';
import { clearUserData } from '../../redux/actions';

import { useDispatch, useSelector } from 'react-redux';

const Account = ({navigation}) => {
	const dispatch = useDispatch();
	const user = useSelector(state => {
		return state.user;
	});

	return (
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
	);
};

export default Account;
