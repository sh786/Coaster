import React from 'react';
import {Text} from 'react-native';
import { Button } from 'native-base';

export default function ScanButton(props) {
  return (
    <Button
		light
		onPress={() => {
			props.onClick()
		}}
		style={{marginBottom: 20, alignContent: 'center', justifyContent: 'center'}}>
		<Text style={{textAlign: 'center'}}>Scan Tickets</Text>
	</Button>
  );
}
