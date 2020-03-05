import React, {useState, useEffect} from 'react';
import {View, Text, Button} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { fetchBars } from '../../redux/actions';

const CheckoutSuccessScreen = ({ navigation }) => {
    const [ticket, setTicket] = useState(null);

    return (
        <View>
            <Text>Success!</Text>
            <Text>{ticket}</Text>
            <Button title="View My Tix" onPress={() => navigation.navigate('Lobby')} />
        </View>
    );
};

CheckoutSuccessScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: "You did it!",
  headerLeft: null
});

export default CheckoutSuccessScreen;