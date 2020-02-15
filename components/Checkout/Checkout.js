import React, {useEffect, useState} from 'react';
import {
    Keyboard,
    View,
    Text,
    TouchableWithoutFeedback,
} from 'react-native';
import HeaderTitle from '../Header/HeaderTitle';
import API from '@aws-amplify/api';
import WebView from 'react-native-webview';


const Checkout = ({navigation}) => {
    const [clientToken, setClientToken] = useState('');
    const callApi = async () => {
        try {
            const response = await API.get('mainApi', '/client-token');
            console.log('clientToken: ', response.token);
            setClientToken(response.token)
        } catch (err) {
            console.log({ err });
        }
    };

    console.log(clientToken)
    useEffect(() => {
        callApi();
    }, []);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <WebView
                source={{html: `<head>
                <meta charset="utf-8">
                <script src="https://js.braintreegateway.com/web/dropin/1.22.0/js/dropin.min.js"></script>
              </head>
              <body>
                <div id="dropin-container"></div>
                <button id="submit-button">Request payment method</button>
                <script>
                  var button = document.querySelector('#submit-button');
              
                  braintree.dropin.create({
                    authorization: '${clientToken}',
                    container: '#dropin-container'
                  }, function (createErr, instance) {
                    button.addEventListener('click', function () {
                      instance.requestPaymentMethod(function (err, payload) {
                        // Submit payload.nonce to your server
                      });
                    });
                  });
                </script>
              </body>`}}
              style={{height: 800}}
            >
            </WebView>
        </TouchableWithoutFeedback>
    )
}

Checkout.navigationOptions = ({navigation}) => ({
    headerTitle: <HeaderTitle title={navigation.getParam('event', {name: 'Event'}).name} />,
})

export default Checkout;