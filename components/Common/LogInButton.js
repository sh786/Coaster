import React from 'react';
import {Text} from 'react-native';
import { Button } from 'native-base';

export default function LogInButton(props) {
  return (
    <Button
		light
		onPress={() => props.navigation.navigate('AuthMiddleware', {authDestinationScreen: 'SignIn'})}
		style={{marginBottom: 20, alignContent: 'center', justifyContent: 'center'}}>
		<Text style={{textAlign: 'center'}}>Log In / Sign Up</Text>
	</Button>
  );
}
