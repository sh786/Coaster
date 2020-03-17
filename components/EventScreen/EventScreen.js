import React, { useState, useEffect } from "react";
import {
  Keyboard,
  View,
  Text,
  TouchableWithoutFeedback,
  Button
} from "react-native";
import HeaderTitle from "../Header/HeaderTitle";
import {
  fetchUsers,
  fetchTicketOffersByEventId,
  fetchEventsByBarId
} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

const EventScreen = ({ navigation }) => {
	const dispatch = useDispatch();
	const venue = navigation.getParam("venue");
	const user = useSelector(state => {
		return state.user;
	});
	const event = useSelector(state => {
		return state.events[venue.id];
	});
	const ticketOffers = useSelector(state => {
		return event && event.length ? state.ticketOffers[event[0].id] : [];
	});

	useEffect(() => {
		dispatch(fetchUsers());
		dispatch(fetchEventsByBarId(venue.id));
	}, []);

	useEffect(() => {
		if (event && event.length && (!ticketOffers || !ticketOffers.length)) {
		dispatch(fetchTicketOffersByEventId(event[0].id));
		}
	});

	const ticketOffer = ticketOffers && ticketOffers.length ? ticketOffers[0] : {}; // clean up

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
		<View>
			<Text>Event Screen</Text>
			<Button
			title="checkout"
			onPress={() => navigation.navigate("Payment", {ticketOffer, venue})}
			/>
		</View>
		</TouchableWithoutFeedback>
	);
};

EventScreen.navigationOptions = ({ navigation }) => ({
	headerTitle: (
		<HeaderTitle title={navigation.getParam("event", { name: "Event" }).name} />
	)
});

export default EventScreen;
