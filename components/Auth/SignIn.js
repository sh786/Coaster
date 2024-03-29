import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Keyboard,
  Alert,
  Animated,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { Container, Item, Input } from 'native-base';

// AWS Amplify modular import
import Auth from '@aws-amplify/auth';

// Load the app logo
const logo = require('../../assets/images/Coaster.png');
import Colors from '../../constants/Colors';

export default class SignIn extends React.Component {
  state = {
    username: '',
    password: '',
    fadeIn: new Animated.Value(0),
    fadeOut: new Animated.Value(0),
    isHidden: false,
  };
  componentDidMount() {
    this.fadeIn();
  }
  fadeIn() {
    Animated.timing(this.state.fadeIn, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
    this.setState({ isHidden: true });
  }
  fadeOut() {
    Animated.timing(this.state.fadeOut, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
    this.setState({ isHidden: false });
  }
  onChangeText(key, value) {
    this.setState({
      [key]: value,
    });
  }
  // Sign in users with Auth
  async signIn() {
    const { username, password } = this.state;
    await Auth.signIn(username, password)
      .then(user => {
        const appDestinationScreen = this.props.navigation.getParam(
          'appDestinationScreen',
        );
        const venue = this.props.navigation.getParam('venue');
        const event = this.props.navigation.getParam('event');
        const quantity = this.props.navigation.getParam('quantity');
        const ticketOffer = this.props.navigation.getParam('ticketOffer');
        this.props.navigation.navigate('AuthMiddleware', {
          appDestinationScreen,
          user,
          venue,
          event,
          quantity,
          ticketOffer,
        });
      })
      .catch(err => {
        if (!err.message) {
          Alert.alert('Error when signing in: ', err);
        } else {
          Alert.alert('Error when signing in: ', err.message);
        }
      });
  }
  render() {
    let { fadeOut, fadeIn, isHidden } = this.state;

    const appDestinationScreen = this.props.navigation.getParam(
      'appDestinationScreen',
    );
    const venue = this.props.navigation.getParam('venue');
    const event = this.props.navigation.getParam('event');
    const quantity = this.props.navigation.getParam('quantity');
    const ticketOffer = this.props.navigation.getParam('ticketOffer');
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar />
        <KeyboardAvoidingView
          style={styles.container}
          behavior='padding'
          enabled
        >
          <TouchableWithoutFeedback
            style={styles.container}
            onPress={Keyboard.dismiss}
          >
            <View style={styles.container}>
              {/* App Logo */}
              <View style={styles.logoContainer}>
                {isHidden ? (
                  <Animated.Image
                    source={logo}
                    style={{ opacity: fadeIn, width: 160, height: 167 }}
                  />
                ) : (
                  <Animated.Image
                    source={logo}
                    style={{ opacity: fadeOut, width: 120, height: 127 }}
                  />
                )}
              </View>
              <Container style={styles.infoContainer}>
                <View style={styles.container}>
                  <Item style={styles.itemStyle}>
                    <Ionicons name='ios-person' style={styles.iconStyle} />
                    <Input
                      style={styles.input}
                      placeholder='Username'
                      placeholderTextColor='#adb4bc'
                      keyboardType={'email-address'}
                      returnKeyType='next'
                      autoCapitalize='none'
                      autoCorrect={false}
                      onSubmitEditing={event => {
                        this.refs.SecondInput._root.focus();
                      }}
                      onChangeText={value =>
                        this.onChangeText('username', value)
                      }
                      onFocus={() => this.fadeOut()}
                      onEndEditing={() => this.fadeIn()}
                    />
                  </Item>
                  <Item style={styles.itemStyle}>
                    <Ionicons style={styles.iconStyle} name='ios-lock' />
                    <Input
                      style={styles.input}
                      placeholder='Password'
                      placeholderTextColor='#adb4bc'
                      returnKeyType='go'
                      autoCapitalize='none'
                      autoCorrect={false}
                      secureTextEntry={true}
                      ref='SecondInput'
                      onChangeText={value =>
                        this.onChangeText('password', value)
                      }
                      onFocus={() => this.fadeOut()}
                      onEndEditing={() => this.fadeIn()}
                    />
                  </Item>
                  <TouchableOpacity
                    onPress={() => this.signIn()}
                    style={styles.buttonStyle}
                  >
                    <Text style={styles.buttonText}>Sign In</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('SignUp', {
                        appDestinationScreen,
                        venue,
                        event,
                        quantity,
                        ticketOffer,
                      })
                    }
                    style={styles.buttonStyle}
                  >
                    <Text style={styles.buttonText}>Sign Up</Text>
                  </TouchableOpacity>
                  <Text
                    style={{
                      flex: 1,
                      textAlign: 'center',
                      color: Colors.darkGrayColor,
                      borderColor: Colors.primaryColor,
                    }}
                    onPress={() =>
                      this.props.navigation.navigate('ForgotPassword', {
                        appDestinationScreen,
                        venue,
                        event,
                        quantity,
                        ticketOffer,
                      })
                    }
                  >
                    Forgot password?
                  </Text>
                </View>
              </Container>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  input: {
    flex: 1,
    fontSize: 17,
    fontWeight: 'bold',
    color: Colors.darkGrayColor,
  },
  infoContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 300,
    bottom: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  itemStyle: {
    marginBottom: 20,
  },
  iconStyle: {
    color: '#adb4bc',
    fontSize: 30,
    marginRight: 15,
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: Colors.primaryColor,
    padding: 14,
    marginBottom: 20,
    borderRadius: 3,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  logoContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 400,
    bottom: 180,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
