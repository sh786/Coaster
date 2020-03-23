import React from 'react';
import PropTypes from 'prop-types';
import { WebView } from 'react-native-webview';
import { STRIPE } from './stripeSettings';
import { stripeCheckoutRedirectHTML } from './stripeCheckout';

const PaymentScreen = ({navigation}) => {

  // TODO: this should come from some service/state store
  const user = { id: 'someID' };
  const ticketOffer = navigation.getParam("ticketOffer");
  const venue = navigation.getParam("venue");
  const quantity = navigation.getParam("quantity");
  const event = navigation.getParam('event');

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
      source={{ html: stripeCheckoutRedirectHTML(user.id, quantity) }} // added quantity
      onLoadStart={onLoadStart}
      onNavigationStateChange={(state) => {
          if (state.url === STRIPE.SUCCESS_URL) {
              navigation.navigate('CheckoutSuccess', {ticketOffer, venue, quantity, event});
          } else if (state.url === STRIPE.CANCELED_URL) {
              navigation.navigate('Event');
          }
      }}
    />
  );
};

PaymentScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default PaymentScreen; 