import React from 'react';
import { WebView } from 'react-native-webview';
import { STRIPE } from './stripeSettings';
import { stripeCheckoutRedirectHTML } from './stripeCheckout';


const PaymentScreen = ({navigation}) => {

  // TODO: this should come from some service/state store
  const user = { id: 'someID' };
  const ticketOffer = navigation.getParam("ticketOffer");
  const venue = navigation.getParam("venue");

  const onSuccessHandler = () => { /* TODO: do something */ };
  const onCanceledHandler = () => { /* TODO: do something */ };

  // Called everytime the URL stats to load in the webview
  const onLoadStart = (syntheticEvent) => {
    const { nativeEvent } = syntheticEvent;
    if (nativeEvent.url === STRIPE.SUCCESS_URL) {
      onSuccessHandler();
      return;
    }
    if (nativeEvent.url === STRIPE.CANCELED_URL) {
      onCanceledHandler();
    }
  };

  // Render
  if (!user) {
    return null;
  }

  // TODO: prefill inputs in webview
  return (
    <WebView
      originWhitelist={['*']}
      source={{ html: stripeCheckoutRedirectHTML(user.id, 1) }} // added quantity
      onLoadStart={onLoadStart}
      onNavigationStateChange={(state) => {
          if (state.url === STRIPE.SUCCESS_URL) {
              navigation.navigate('CheckoutSuccess', {ticketOffer, venue});
          } else if (state.url === STRIPE.CANCELED_URL) {
              navigation.navigate('Event'); // need to change to event screen
          }
      }}
    />
  );

};

export default PaymentScreen; 