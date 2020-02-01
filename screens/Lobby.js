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
import Icon from '../components/Icon';


const Lobby = (props) => {
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
            {bars && bars.map((bar, i) => (
                <Text key={bar.id}>
                {bar.name}, {bar.address}: {bar.phoneNumber}
                </Text>
            ))}
            <Button title="Venue Page" onPress={() => props.navigation.navigate('Venue', {headerTitle: 'Poodles Pics'})} />
            </View>
        </TouchableWithoutFeedback>
    )
}

Lobby.navigationOptions = {
    headerTitle: <Logo />,
    headerLeft: 
        <Icon
            name="md-person"
            size={32}
            color="white"
            style={{marginLeft: 10}}
        />,
    headerRight:
        <Icon
            name="md-funnel"
            size={32}
            color="white"
            style={{marginRight: 10}}
        />,
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

export default Lobby;