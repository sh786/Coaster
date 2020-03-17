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
  createNewUser,
  fetchUsers,
  createNewEvent,
  createNewTicketOffer,
  updateEventWithTicketOffer,
  fetchTicketOffers,
  fetchEventsByBarId
} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

const EventScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => {
    return state.user;
  });
  const event = useSelector(state => {
      console.log(state)
      return state.events;
  });
  const venue = navigation.getParam("venue");

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchEventsByBarId(venue.id));
    dispatch(fetchTicketOffers());
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View>
        <Text>Event Screen</Text>
        <Button
          title="checkout"
          onPress={() => navigation.navigate("Payment")}
        />
        <Button
          title="add test user"
          onPress={() => {
            dispatch(
              createNewUser(
                "moneyman18",
                "moneyman18@dk.com",
                "jonny",
                "levenfeld",
                "999-214-2030",
                "05/22/1996"
              )
            );
          }}
        />
        <Button
          title="add test event"
          onPress={() => {
            dispatch(
              createNewEvent(
                "St. Paddys Day",
                "Drink like an Irishman",
                "Saturday",
                "Never",
                "You do not talk about fight club"
              )
            );
          }}
        />
        <Button
          title="add test ticket offer"
          onPress={() => {
            dispatch(
              createNewTicketOffer(
                "Friday night cover",
                "Come enjoy a friday night with dancing and cute chicas",
                100,
                "4/20/20",
                10
              )
            );
          }}
        />
        <Button
          title="link test ticket offer to event"
          onPress={() => {
            dispatch(
              updateEventWithTicketOffer(
                event,
                "2a559613-912e-48af-8c8f-1ac7ca2dfd4e"
              )
            );
          }}
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
