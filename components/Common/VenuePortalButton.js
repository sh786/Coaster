import React from 'react';
import {Text} from 'react-native';
import { Button } from 'native-base';

export default function VenuePortalButton(props) {
  return (
    <Button
		light
		onPress={() => props.navigation.navigate('VenuePortal')}
		style={{marginBottom: 20, alignContent: 'center', justifyContent: 'center'}}>
		<Text style={{textAlign: 'center'}}>Manage Events</Text>
	</Button>
  );
}
