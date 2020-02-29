import React from 'react';
import { WebView } from 'react-native-webview';
import { STRIPE } from './stripeSettings';
import { stripeCheckoutRedirectHTML } from './stripeCheckout';


const PaymentScreen = ({navigation}) => {

  // TODO: this should come from some service/state store
  const user = { id: 'someID' };

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

  return (
    <WebView
      originWhitelist={['*']}
      source={{ html: stripeCheckoutRedirectHTML(user.id) }}
      onLoadStart={onLoadStart}
      onNavigationStateChange={(state) => {
          console.log(state, STRIPE.SUCCESS_URL, STRIPE.CANCELED_URL);
          if (state.url === STRIPE.SUCCESS_URL) {
              console.log('attempting to navigate')
              navigation.navigate('CheckoutSuccess');
          } else if (state.url === STRIPE.CANCELED_URL) {
              navigation.navigate('Event');
          }
      }}
    />
  );
  
};

export default PaymentScreen;