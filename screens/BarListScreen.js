import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBars, createNewBar } from '../redux/actions';
import {
    Button,
    Keyboard,
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableWithoutFeedback,
} from 'react-native';

export const BarListScreen = () => {
    const dispatch = useDispatch();
    const bars = useSelector(state => {
      return state.bars.bars;
    });
  
    const [barFormData, onBarFormDataChange] = useState({
        name: '',
        address: '',
        phoneNumber: '',
    });

    useEffect(() => {
      dispatch(fetchBars());
    }, []);

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
              dispatch(createNewBar({
                name: barFormData.name,
                address: barFormData.address,
                phoneNumber: barFormData.phoneNumber,
              }));
              Keyboard.dismiss();
            }}
          />
          {bars && bars.map((bar, i) => (
            <Text key={bar.id}>
              {bar.name}, {bar.address}: {bar.phoneNumber}
            </Text>
          ))}
        </View>
      </TouchableWithoutFeedback>
    )
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