import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import {
  Keyboard,
  View,
  Text,
  TouchableWithoutFeedback,
  Button,
  Picker,
  TouchableOpacity,
} from "react-native";
import HeaderTitle from "../Header/HeaderTitle";
import {fetchTicketOffersByEventId} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import {styles} from './styles/EventScreenStyles';

const EventScreen = ({ navigation }) => {
	const [quantity, setQuantity] = useState(1);

	const venue = navigation.getParam('venue');
	const event = navigation.getParam('event');

	const dispatch = useDispatch();
	const ticketOffers = useSelector(state => {
		return state.ticketOffers[event.id];
	});

	useEffect(() => {
		dispatch(fetchTicketOffersByEventId(event.id));
	}, []);

	const ticketOffer = ticketOffers && ticketOffers.length ? ticketOffers[0] : {}; // clean up

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
		<View style={styles.container}>
			<Text style={styles.title}>{event.title}</Text>
			<Picker
				selectedValue={quantity}
				style={{height: 50, width: 100}}
				onValueChange={(i) => setQuantity(i)}>
				{[1,2,3,4,5,6,7,8,9,10].map(i => <Picker.Item key={i} label={i.toString()} value={i} />)}
			</Picker>
			<View
				style={styles.checkoutButton}
				onPress={() => navigation.navigate("Payment", {ticketOffer, venue, quantity, event})}
			>
				<TouchableOpacity onPress={() => navigation.navigate("Payment", {ticketOffer, venue, quantity, event})}>
					<Text style={styles.buttonText}>{`Purchase ${quantity} Tickets`}</Text>
				</TouchableOpacity>
			</View>
		</View>
		</TouchableWithoutFeedback>
	);
};

EventScreen.navigationOptions = ({ navigation }) => ({
	headerTitle: (
		<HeaderTitle title={navigation.getParam("event").title} />
	)
});

EventScreen.propTypes = {
	navigation: PropTypes.object.isRequired,
  }

export default EventScreen;
