import React from "react";
import {connect} from 'react-redux';
import { createNewUser } from '../../redux/actions';

import {
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  Text,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Keyboard,
  View,
  Alert,
  Modal,
  FlatList,
  Animated
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { Container, Item, Input, DatePicker } from "native-base";
import moment from 'moment';

// AWS Amplify modular import
import Auth from "@aws-amplify/auth";

// Load the app logo
const logo = require("../../assets/images/Coaster.png");
import Colors from "../../constants/Colors";

class SignUpScreen extends React.Component {
  state = {
	firstName: "",
	lastName: "",
    username: "",
    password: "",
    email: "",
    phoneNumber: "",
    fadeIn: new Animated.Value(0), // Initial value for opacity: 0
    fadeOut: new Animated.Value(1), // Initial value for opacity: 1
    isHidden: false,
    flag: "",
    modalVisible: false,
    authCode: "",
    dob: new Date(1996, 5, 22),
  };
  // Get user input
  onChangeText(key, value) {
    this.setState({
      [key]: value
    });
  }
  // Methods for logo animation
  componentDidMount() {
    this.fadeIn();
  }
  fadeIn() {
    Animated.timing(this.state.fadeIn, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true
    }).start();
    this.setState({ isHidden: true });
  }
  fadeOut() {
    Animated.timing(this.state.fadeOut, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true
    }).start();
    this.setState({ isHidden: false });
  }
  // Sign up user with AWS Amplify Auth
  async signUp() {
    const { username, password, email, phoneNumber } = this.state;
    // rename variable to conform with Amplify Auth field phone attribute
    const phone_number = phoneNumber;
    await Auth.signUp({
      username,
      password,
      attributes: { email, phone_number: `+${phone_number}` }
    })
      .then(() => {
        console.log("sign up successful!");
        Alert.alert("Enter the confirmation code you received.");
      })
      .catch(err => {
        if (!err.message) {
          console.log("Error when signing up: ", err);
          Alert.alert("Error when signing up: ", err);
        } else {
          console.log("Error when signing up: ", err.message);
          Alert.alert("Error when signing up: ", err.message);
        }
      });
  }
  // Confirm users and redirect them to the SignIn page 
  // also create user in our backend
  async confirmSignUp() {
    const { username, authCode, email, phoneNumber, dob, firstName, lastName } = this.state;
    await Auth.confirmSignUp(username, authCode)
      .then(() => {
        // adding user to backend
        this.props.createNewUser(username, email, firstName, lastName, phoneNumber, dob);
        const appDestinationScreen = this.props.navigation.getParam('appDestinationScreen');
        const venue = this.props.navigation.getParam('venue');
        const event = this.props.navigation.getParam('event');
        const quantity = this.props.navigation.getParam('quantity');
        const ticketOffer = this.props.navigation.getParam('ticketOffer');
        this.props.navigation.navigate("SignIn", {appDestinationScreen, venue, event, quantity, ticketOffer});
        console.log("Confirm sign up successful");
      })
      .catch(err => {
        if (!err.message) {
          console.log("Error when entering confirmation code: ", err);
          Alert.alert("Error when entering confirmation code: ", err);
        } else {
          console.log("Error when entering confirmation code: ", err.message);
          Alert.alert("Error when entering confirmation code: ", err.message);
        }
      });
  }
  // Resend code if not received already
  async resendSignUp() {
    const { username } = this.state;
    await Auth.resendSignUp(username)
      .then(() => console.log("Confirmation code resent successfully"))
      .catch(err => {
        if (!err.message) {
          console.log("Error requesting new confirmation code: ", err);
          Alert.alert("Error requesting new confirmation code: ", err);
        } else {
          console.log("Error requesting new confirmation code: ", err.message);
          Alert.alert("Error requesting new confirmation code: ", err.message);
        }
      });
  }
  render() {
    let { fadeOut, fadeIn, isHidden, flag } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar />
        <KeyboardAvoidingView
          style={styles.container}
          behavior="padding"
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
                    style={{ opacity: fadeIn, width: 110.46, height: 117 }}
                  />
                ) : (
                  <Animated.Image
                    source={logo}
                    style={{ opacity: fadeOut, width: 110.46, height: 117 }}
                  />
                )}
              </View>
              <Container style={styles.infoContainer}>
                <View style={styles.container}>
					<Item style={styles.itemStyle}>
						<Ionicons name="ios-person" style={styles.iconStyle} />
						<Input
						style={styles.input}
						placeholder="First Name"
						placeholderTextColor="#adb4bc"
						keyboardType={"email-address"}
						returnKeyType="next"
						autoCapitalize="none"
						autoCorrect={false}
						onSubmitEditing={event => {
							this.refs.SecondInput._root.focus();
						}}
						onChangeText={value =>
							this.onChangeText("firstname", value)
						}
						onFocus={() => this.fadeOut()}
						onEndEditing={() => this.fadeIn()}
						/>
                  </Item>
				  <Item style={styles.itemStyle}>
                    <Ionicons name="ios-person" style={styles.iconStyle} />
                    <Input
                      style={styles.input}
                      placeholder="Last Name"
                      placeholderTextColor="#adb4bc"
                      keyboardType={"email-address"}
                      returnKeyType="next"
                      autoCapitalize="none"
                      autoCorrect={false}
                      onSubmitEditing={event => {
                        this.refs.SecondInput._root.focus();
                      }}
                      onChangeText={value =>
                        this.onChangeText("lastname", value)
                      }
                      onFocus={() => this.fadeOut()}
                      onEndEditing={() => this.fadeIn()}
                    />
                  </Item>
                <Item style={styles.itemStyle}>
                  <DatePicker
                      defaultDate={new Date(1996, 5, 22)}
                      minimumDate={new Date(1930, 1, 1)}
                      maximumDate={new Date(2018, 12, 31)}
                      locale={"en-US"}
                      formatChosenDate={date => moment(date).format('MM/DD/YYYY')}
                      timeZoneOffsetInMinutes={undefined}
                      modalTransparent={false}
                      animationType={"fade"}
                      androidMode={"default"}
                      placeHolderText="Select your date of birth"
                      textStyle={{ marginLeft: 30, color: Colors.darkGrayColor, textAlign: 'center', fontSize: 17,
                        fontWeight: "bold" }}
                      placeHolderTextStyle={{ marginLeft: 30, color: '#adb4bc', textAlign: 'center', fontSize: 17,
                        fontWeight: "bold" }}
                      onDateChange={value => this.onChangeText('dob', value)}
                      disabled={false}
                      />
                </Item>
                  {/* username section  */}
                  <Item style={styles.itemStyle}>
                    <Ionicons name="ios-person" style={styles.iconStyle} />
                    <Input
                      style={styles.input}
                      placeholder="Username"
                      placeholderTextColor="#adb4bc"
                      keyboardType={"email-address"}
                      returnKeyType="next"
                      autoCapitalize="none"
                      autoCorrect={false}
                      onSubmitEditing={event => {
                        this.refs.SecondInput._root.focus();
                      }}
                      onChangeText={value =>
                        this.onChangeText("username", value)
                      }
                      onFocus={() => this.fadeOut()}
                      onEndEditing={() => this.fadeIn()}
                    />
                  </Item>
                  {/*  password section  */}
                  <Item style={styles.itemStyle}>
                    <Ionicons name="ios-lock" style={styles.iconStyle} />
                    <Input
                      style={styles.input}
                      placeholder="Password"
                      placeholderTextColor="#adb4bc"
                      returnKeyType="next"
                      autoCapitalize="none"
                      autoCorrect={false}
                      secureTextEntry={true}
                      // ref={c => this.SecondInput = c}
                      ref="SecondInput"
                      onSubmitEditing={event => {
                        this.refs.ThirdInput._root.focus();
                      }}
                      onChangeText={value =>
                        this.onChangeText("password", value)
                      }
                      onFocus={() => this.fadeOut()}
                      onEndEditing={() => this.fadeIn()}
                    />
                  </Item>
                  {/* email section */}
                  <Item style={styles.itemStyle}>
                    <Ionicons name="ios-mail" style={styles.iconStyle} />
                    <Input
                      style={styles.input}
                      placeholder="Email"
                      placeholderTextColor="#adb4bc"
                      keyboardType={"email-address"}
                      returnKeyType="next"
                      autoCapitalize="none"
                      autoCorrect={false}
                      secureTextEntry={false}
                      ref="ThirdInput"
                      onSubmitEditing={event => {
                        this.refs.FourthInput._root.focus();
                      }}
                      onChangeText={value => this.onChangeText("email", value)}
                      onFocus={() => this.fadeOut()}
                      onEndEditing={() => this.fadeIn()}
                    />
                  </Item>
                  {/* phone section  */}
                  <Item style={styles.itemStyle}>
                    <Ionicons name="ios-call" style={styles.iconStyle} />
                    {/* country flag */}
                    <View>
                      <Text style={{ fontSize: 40 }}>{flag}</Text>
                    </View>
                    {/* open modal */}
                    <Ionicons
                      name="md-arrow-dropdown"
                      style={[styles.iconStyle, { marginLeft: 5 }]}
                      onPress={() => this.showModal()}
                    />
                    <Input
                      style={styles.input}
                      placeholder="1 (xxx) xxx-xxxx"
                      placeholderTextColor="#adb4bc"
                      keyboardType={"phone-pad"}
                      returnKeyType="done"
                      autoCapitalize="none"
                      autoCorrect={false}
                      secureTextEntry={false}
                      ref="FourthInput"
                      value={this.state.phoneNumber}
                      onChangeText={val => {
                        this.onChangeText("phoneNumber", val);
                      }}
                      onFocus={() => this.fadeOut()}
                      onEndEditing={() => this.fadeIn()}
                    />
                  </Item>
                  {/* End of phone input */}
                  <TouchableOpacity
                    onPress={() => this.signUp()}
                    style={styles.buttonStyle}
                  >
                    <Text style={styles.buttonText}>Sign Up</Text>
                  </TouchableOpacity>
                  {/* code confirmation section  */}
                  <Item style={styles.itemStyle}>
                    <Ionicons name="md-apps" style={styles.iconStyle} />
                    <Input
                      style={styles.input}
                      placeholder="Confirmation code"
                      placeholderTextColor="#adb4bc"
                      keyboardType={"numeric"}
                      returnKeyType="done"
                      autoCapitalize="none"
                      autoCorrect={false}
                      secureTextEntry={false}
                      onChangeText={value =>
                        this.onChangeText("authCode", value)
                      }
                      onFocus={() => this.fadeOut()}
                      onEndEditing={() => this.fadeIn()}
                    />
                  </Item>
                  <TouchableOpacity
                    onPress={() => this.confirmSignUp()}
                    style={styles.buttonStyle}
                  >
                    <Text style={styles.buttonText}>Confirm Sign Up</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => this.resendSignUp()}
                    style={styles.buttonStyle}
                  >
                    <Text style={styles.buttonText}>Resend code</Text>
                  </TouchableOpacity>
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
    backgroundColor: "#fff",
    justifyContent: "center",
    flexDirection: "column"
  },
  input: {
    flex: 1,
    fontSize: 17,
    fontWeight: "bold",
    color: Colors.darkGrayColor
  },
  infoContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 370,
    bottom: 25,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30
  },
  itemStyle: {
    marginBottom: 10
  },
  iconStyle: {
    color: "#fff",
    fontSize: 28,
    marginRight: 15
  },
  buttonStyle: {
    alignItems: "center",
    backgroundColor: Colors.primaryColor,
    padding: 14,
    marginBottom: 10,
    borderRadius: 3
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff"
  },
  logoContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 600,
    bottom: 270,
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },
  textStyle: {
    padding: 5,
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold"
  },
  countryStyle: {
    flex: 1,
    borderTopColor: "#211f",
    borderTopWidth: 1,
    padding: 12
  },
  closeButtonStyle: {
    flex: 1,
    padding: 12,
    alignItems: "center",
    backgroundColor: "#b44666"
  }
});

const mapDispatchToProps = dispatch => ({
  createNewUser: (
    username,
    email,
    firstName,
    lastName,
    phoneNumber,
    dob
  ) => dispatch(createNewUser(username, email, firstName, lastName, phoneNumber, dob)),
});

export default connect(null, mapDispatchToProps)(SignUpScreen);
