import React from 'react';
import {View, Image} from 'react-native';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    logo: {
        width: 80,
        height: 80,
    }
  });
  

const Logo = () => (
    <View>
        <Image
            style={styles.logo}
            source={require('../../assets/drunk_leprechaun.png')}
        />
    </View>
);

export default Logo;
