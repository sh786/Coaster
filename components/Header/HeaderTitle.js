import React from 'react';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import { styles } from './styles/HeaderStyles';
import logoWhite from '../../assets/images/logoWhite.png';

const HeaderTitle = props => {
  return (
    <TouchableWithoutFeedback>
      <View style={styles.container}>
        <Image
          source={logoWhite}
          style={{ maxWidth: '60%', maxHeight: '60%' }}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default HeaderTitle;
