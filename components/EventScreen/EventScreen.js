import React from 'react';
import {
    Keyboard,
    View,
    Text,
    TouchableWithoutFeedback,
    Button,
} from 'react-native';
import HeaderTitle from '../Header/HeaderTitle';


const EventScreen = ({navigation}) => {
    const venue = navigation.getParam('venue');

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View>
                <Text>Event Screen</Text>
                <Button title="checkout" onPress={() => navigation.navigate('Payment')} />
            </View>
        </TouchableWithoutFeedback>
    )
}

EventScreen.navigationOptions = ({navigation}) => ({
    headerTitle: <HeaderTitle title={navigation.getParam('event', {name: 'Event'}).name} />,
})

export default EventScreen;