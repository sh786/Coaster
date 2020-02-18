import React, {useEffect, useState} from 'react';
import {
    Keyboard,
    View,
    Text,
    TouchableWithoutFeedback,
    TextInput,
} from 'react-native';
import HeaderTitle from '../Header/HeaderTitle';
import API from '@aws-amplify/api';
import WebView from 'react-native-webview';

const Checkout = ({navigation}) => {
    const [webview, setWebview] = useState(null);
    const [clientToken, setClientToken] = useState('');
    const callApi = async () => {
        try {
            const response = await API.get('mainApi', '/client-token');
            // console.log('clientToken: ', response.token);
            setClientToken(response.token)
        } catch (err) {
            console.log({ err });
        }
    };

    // console.log(clientToken, webview)
    useEffect(() => {
        callApi();
    }, []);

    return (
        <TouchableWithoutFeedback style={{flex: 1}} onPress={Keyboard.dismiss} accessible={false}>
            <WebView
                ref={component => setWebview(component)}
                onLoad={() => {
                  console.log('loaded');
                  webview.postMessage({event: 'loaded', clientToken});
                }}
                onMessage={d => console.log(d.nativeEvent.data, 'yo')}
                source={{html: `<!DOCTYPE html>
                <html lang="en">
                  <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0">
                    <title>Checkoutt</title>
                    <script>
                      window.addEventListener("message", function(data) {
                        window.ReactNativeWebView.postMessage(data.data);
                      });
                    </script>
                    <style>
                      body {
                        background-color: white;
                        width: 100%;
                        height: 100%;
                      }

                      form {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        font-size: 20px;
                      }

                      #card-number {
                        height: 30px;
                      }

                      #cvv {
                        height: 30px;
                      }

                      #expiration-date {
                        height: 30px;
                      }
                    </style>
                  </head>
                  <body>
                    <form
                      action="/"
                      id="my-sample-form" 
                      method="post">
                      <label for="card-number">Card Number</label>
                      <div id="card-number"></div>
                
                      <label for="cvv">CVV</label>
                      <div id="cvv"></div>
                
                      <label for="expiration-date">Expiration Date</label>
                      <div id="expiration-date"></div>
                
                      <input type="submit" value="Pay" disabled />
                    </form>
                
                    <script src="https://js.braintreegateway.com/web/3.57.0/js/client.min.js"></script>
                    <script src="https://js.braintreegateway.com/web/3.57.0/js/hosted-fields.min.js"></script>
                    <script>
                      var form = document.querySelector('#my-sample-form');
                      var submit = document.querySelector('input[type="submit"]');

                      braintree.client.create({
                        authorization: '${clientToken}'
                      }, function (clientErr, clientInstance) {
                        if (clientErr) {
                          console.error(clientErr);
                          return;
                        }
                
                        // This example shows Hosted Fields, but you can also use this
                        // client instance to create additional components here, such as
                        // PayPal or Data Collector.
                
                        braintree.hostedFields.create({
                          client: clientInstance,
                          styles: {
                            'input': {
                              'font-size': '14px',
                            },
                            'input.invalid': {
                              'color': 'red'
                            },
                            'input.valid': {
                              'color': 'green'
                            }
                          },
                          fields: {
                            number: {
                              selector: '#card-number',
                              placeholder: '4111 1111 1111 1111'
                            },
                            cvv: {
                              selector: '#cvv',
                              placeholder: '123'
                            },
                            expirationDate: {
                              selector: '#expiration-date',
                              placeholder: '10/2019'
                            }
                          }
                        }, function (hostedFieldsErr, hostedFieldsInstance) {
                          if (hostedFieldsErr) {
                            console.error(hostedFieldsErr);
                            return;
                          }
                
                          submit.removeAttribute('disabled');
                
                          form.addEventListener('submit', function (event) {
                            event.preventDefault();
                
                            hostedFieldsInstance.tokenize(function (tokenizeErr, payload) {
                              if (tokenizeErr) {
                                console.error(tokenizeErr);
                                return;
                              }
                
                              // If this was a real integration, this is where you would
                              // send the nonce to your server.
                              console.log('Got a nonce: ' + payload.nonce);
                            });
                          }, false);
                        });
                      });
                    </script>
                  </body>
                </html>
                `}}
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