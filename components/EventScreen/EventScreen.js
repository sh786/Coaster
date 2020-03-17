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
    console.log(state);
    return state.events[venue.id];
  });

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchEventsByBarId(venue.id));
  }, []);

  useEffect(() => {
    if (event && event.length) {
      dispatch(fetchTicketOffersByEventId(event[0].id)); // should be calling on individual bar
    }
  });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View>
        <Text>Event Screen</Text>
        <Button
          title="checkout"
          onPress={() => navigation.navigate("Payment")}
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
