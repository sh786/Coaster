import React, { useState, useEffect } from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import Icon from './Icon';


const SortView = (props) => {
    const [enableEdit, setEnableEdit] = useState(false);

    /* TODO: bind redux action to sort bars by whatever option user selects */
    return (
        <TouchableWithoutFeedback onPress={() => setEnableEdit(!enableEdit)}>
            <View style={styles.container}>
                <Icon
                    name="md-funnel"
                    size={32}
                    color={enableEdit ? '#DEB992' : 'white'}
                    style={{flex: 1, marginRight: 20, marginTop: 10}}
                />
                {
                    enableEdit &&
                        <View style={styles.editContainer}>
                            <Text style={styles.editTitle}>Sort By:</Text>
                            <Text style={styles.editItem}>Venue Name</Text>
                            <Text style={styles.editItem}>Distance</Text>
                        </View>
                }
            </View>
        </TouchableWithoutFeedback>
    )
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      display: 'flex',
      flexDirection: 'column',
    },
    editContainer: {
        width: 150,
        height: 150,
        backgroundColor: 'white',
        position: 'absolute',
        top: 50,
        right: 0,
        borderRadius: 10,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        display: 'flex',
        flexDirection: 'column',
        padding: 10,
    },
    editTitle: {
        textAlign: 'center',
        fontFamily: 'san-francisco',
        fontSize: 18,
    },
    editItem: {
        margin: 10,
        textAlign: 'left',
        fontFamily: 'san-francisco',
        fontSize: 16,
    }
  });

export default SortView;
