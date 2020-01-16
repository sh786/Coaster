import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { useState, useReducer, useEffect } from 'react';
import {
  Button,
  Platform,
  Keyboard,
  StatusBar,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
// AWS
import API, { graphqlOperation } from '@aws-amplify/api';
import PubSub from '@aws-amplify/pubsub';
// GraphQL
import { createBar } from './src/graphql/mutations';
import { listBars } from './src/graphql/queries';

import AppNavigator from './navigation/AppNavigator';

import config from './aws-exports';
API.configure(config); // Configure Amplify
PubSub.configure(config);

async function createNewBar({ name, address, phoneNumber }) {
  const bar = {
    name,
    address,
    phoneNumber,
  };
  await API.graphql(graphqlOperation(createBar, { input: bar }));
}

const initialState = { bars: [] };
const reducer = (state, action) => {
  switch (action.type) {
    case 'QUERY':
      return { ...state, bars: action.bars };
    case 'SUBSCRIPTION':
      return { ...state, bars: [...state.bars, action.bar] };
    default:
      return state;
  }
};

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [barFormData, onBarFormDataChange] = useState({
    name: '',
    address: '',
    phoneNumber: '',
  });

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const todoData = await API.graphql(graphqlOperation(listBars));
    dispatch({ type: 'QUERY', bars: todoData.data.listBars.items });
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.formTitle}>Add a Custom Bar</Text>

        <TextInput
          style={styles.barFormInput}
          onChangeText={text =>
            onBarFormDataChange({ ...barFormData, name: text })
          }
          placeholder='Name'
          value={barFormData.name}
        />
        <TextInput
          style={styles.barFormInput}
          onChangeText={text =>
            onBarFormDataChange({ ...barFormData, address: text })
          }
          placeholder='Address'
          value={barFormData.address}
        />
        <TextInput
          style={styles.barFormInput}
          onChangeText={text =>
            onBarFormDataChange({ ...barFormData, phoneNumber: text })
          }
          placeholder='Phone #'
          value={barFormData.phoneNumber}
        />
        <Button
          title='Add Bar'
          onPress={() => {
            createNewBar({
              name: barFormData.name,
              address: barFormData.address,
              phoneNumber: barFormData.phoneNumber,
            });
            getData();
            Keyboard.dismiss();
          }}
        />
        {state.bars.map((bar, i) => (
          <Text key={bar.id}>
            {bar.name}, {bar.address}: {bar.phoneNumber}
          </Text>
        ))}
      </View>
    </TouchableWithoutFeedback>
  );

  // if (!isLoadingComplete && !props.skipLoadingScreen) {
  //   return (
  //     <AppLoading
  //       startAsync={loadResourcesAsync}
  //       onError={handleLoadingError}
  //       onFinish={() => handleFinishLoading(setLoadingComplete)}
  //     />
  //   );
  // } else {
  //   return (
  //     <View style={styles.container}>
  //       {Platform.OS === 'ios' && <StatusBar barStyle='default' />}
  //       <AppNavigator />
  //     </View>
  //   );
  // }
}

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([
      require('./assets/images/robot-dev.png'),
      require('./assets/images/robot-prod.png'),
    ]),
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Ionicons.font,
      // We include SpaceMono because we use it in HomeScreen.js. Feel free to
      // remove this if you are not using it in your app
      'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
    }),
  ]);
}

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ddeeff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
    color: 'deepskyblue',
  },
  barFormInput: {
    height: 40,
    width: 200,
    borderColor: '#f1f1f1',
    borderWidth: 1,
    backgroundColor: '#fff',
    padding: 4,
    marginTop: 4,
    marginBottom: 4,
  },
});
