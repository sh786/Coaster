import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {View, Text, Button} from 'react-native';
import { fetchPurchasedTicketsByUserId } from '../../redux/actions';
import QRCode from 'qrcode';
import SvgUri from 'react-native-svg-uri-reborn';

import { useDispatch, useSelector } from 'react-redux';

const generateQR = async text => {
	try {
		console.log('trying to create file')
		return await QRCode.toString('0422019b-13a3-47d7-a3b8-bad324ad6799', {type: 'svg'});
	} catch (err) {
		console.error(err)
	}
}

const MyTix = ({navigation}) => {
	const [tick, setTick] = useState(null);
	const dispatch = useDispatch();
	const tickets = useSelector(state => {
		return state.purchasedTickets;
	});
	const user = useSelector(state => state.user)

	useEffect(() => {
		dispatch(fetchPurchasedTicketsByUserId(user.id));
	}, []);

	if (tickets.length) {
		generateQR(tickets[0].id).then((d) => setTick(d));
	}

	console.log(tick, typeof tick)

	return (
		<View>
			{
				tickets.map(t => <Text key={t.id}>{t.id}</Text>)
			}
			<SvgUri
				fill="#fff"
				width="200"
				height="200"
				svgXmlData={tick}
			/>
			<Button
				title="Lobby"
				onPress={() => navigation.navigate('Lobby')}
			/>
		</View>
	);
};

MyTix.propTypes = {
	navigation: PropTypes.object.isRequired,
};

export default MyTix;
