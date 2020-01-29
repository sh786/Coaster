import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBars } from '../redux/actions';
import {
    Keyboard,
    StyleSheet,
    View,
    Text,
    TouchableWithoutFeedback,
    Button,
} from 'react-native';
import Logo from '../components/Logo';
import TabBarIcon from '../components/TabBarIcon';


const VenueScreen = (props) => {
    const dispatch = useDispatch();
    const bars = useSelector(state => {
      return state.bars.bars;
    });

    useEffect(() => {
      dispatch(fetchBars());
    }, []);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <Text>{props.navigation.getParam('exampleProp', 'default value')}</Text>
            </View>
        </TouchableWithoutFeedback>
    )
}

VenueScreen.navigationOptions = {
    headerTitle: <Logo />,
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#1BA098',
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

export default VenueScreen;