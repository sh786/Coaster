import React from 'react'
import {
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native'
import Colors from '../../constants/Colors';

const AuthLoadingScreen = ({navigation}) => {
	return (
		<View style={styles.container}> 
			<ActivityIndicator size="large" color="#fff" />
		</View>
	)
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.primaryColor,
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default AuthLoadingScreen;