import React from 'react';
import { View, Text, Image } from 'react-native';
import { styles } from './styles/HeaderStyles';
import logoWhite from '../../assets/images/logoWhite.png';

const HeaderTitle = props => {
  return (
    <View style={styles.container}>
      <Image source={logoWhite} style={{ maxWidth: '60%', maxHeight: '60%' }} />
    </View>
  );
};

export default HeaderTitle;
