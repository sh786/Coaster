import React, { useState, useEffect } from 'react';
import {View, Text} from 'react-native';
import {styles} from '../styles/HeaderStyles';

const HeaderTitle = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{props.title}</Text>
        </View>
    )
}

export default HeaderTitle;
