import React, { useState } from 'react';
import {View, Text, TouchableWithoutFeedback} from 'react-native';
import Icon from '../Common/Icon';
import Colors from '../../constants/Colors';
import {styles} from './styles/SortViewStyles';

const SortView = () => {
    const [enableEdit, setEnableEdit] = useState(false);

    /* TODO: bind redux action to sort bars by whatever option user selects */
    return (
        <TouchableWithoutFeedback onPress={() => setEnableEdit(!enableEdit)}>
            <View style={styles.container}>
                <Icon
                    name="md-funnel"
                    size={32}
                    color={enableEdit ? Colors.accentColor : 'white'}
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

export default SortView;
