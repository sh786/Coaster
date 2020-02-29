import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { PaymentsStripe as Stripe } from 'expo-payments-stripe';

export const PaymentScreen = () => {
    const [clientToken, setClientToken] = useState('');

    const params = {
        // mandatory
        number: '4242424242424242',
        expMonth: 11,
        expYear: 17,
        cvc: '223',
        // optional
        name: 'Test User',
        currency: 'usd',
        addressLine1: '123 Test Street',
        addressLine2: 'Apt. 5',
        addressCity: 'Test City',
        addressState: 'Test State',
        addressCountry: 'Test Country',
        addressZip: '55555',
    };

    useEffect(() => {
        Stripe.setOptionsAsync({
            publishableKey: 'pk_test_av78hRbdxylUZDz0R4l0mhqo00mBjnB8oa'
        });
        const initPayment = async () => {
            console.log('init payment');
            const result = await Stripe.createTokenWithCardAsync({
                number: '4242424242424242',
                expMonth: 4,
                expYear: 2019,
                cvc: '123',
                currency: 'USD',
                country: 'US',
            });
            console.log('result', result)
            return result;
        }
        const result = initPayment();
        console.log('effect', result, Stripe)
    }, []);

    return (
        <View style={styles.container}>
            <Text>yo</Text>
        </View>
        );
    }

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
};