import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, TouchableWithoutFeedback } from 'react-native';
import { styles } from './styles/HeaderStyles';
import logoWhite from '../../assets/images/logoWhite.png';
import { withNavigation } from 'react-navigation';

const HeaderTitle = ({navigation}) => {
  return (
    <TouchableWithoutFeedback onPress={() => navigation.navigate('Lobby')}>
      <View style={styles.container}>
        <Image source={logoWhite} style={{ maxWidth: '60%', maxHeight: '60%' }} />
      </View>
    </TouchableWithoutFeedback>
  );
};

HeaderTitle.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default withNavigation(HeaderTitle);
