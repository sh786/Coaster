import { StyleSheet } from 'react-native';
import Colors from '../../../constants/Colors';

export const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.whiteColor,
		display: 'flex',
		flexDirection: 'column',
		flex: 0.8,
		width: '100%',
		alignItems: 'center',
		padding: 10,
	},
	headCountTitle: {
		fontSize: 24,
		textAlign: 'center',
		marginBottom: 10,
	},
	countContainer: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		textAlign: 'center',
	},
	countInfoContainer: {
		display: 'flex',
		flexDirection: 'column',
		width: 150,
		alignItems: 'center',
		textAlign: 'center'
	},
	currentCount: {
		fontSize: 70,
	},
	totalCapacity: {
		fontSize: 14,
		marginTop: 30,
	},
	buttonsContainer: {
		justifyContent: "space-evenly",
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		width: '80%',
		marginBottom: 15,
		marginTop: 5,
	},
	incrementFiveButtonContainer: {
		display: 'flex',
		backgroundColor: Colors.primaryColor,
		width: 60,
		height: 60,
		borderRadius: 30,
		alignItems: 'center',
	},
	incrementOneButtonContainer: {
		display: 'flex',
		backgroundColor: Colors.primaryColor,
		width: 40,
		height: 40,
		borderRadius: 20,
		alignItems: 'center',
	},
	incrementOneButtonText: {
		color: Colors.whiteColor,
		fontSize: 20,
		lineHeight: 30,
		textAlign: 'center',
		width: '100%',
		height: '100%',
		fontWeight: 'bold'
	},
	incrementFiveButtonText: {
		color: Colors.whiteColor,
		fontSize: 24,
		lineHeight: 50,
		fontWeight: 'bold',
		textAlign: 'center',
		width: '100%',
		height: '100%',
	},
	disabledIncrementFiveButtonContainer: {
		display: 'flex',
		width: 60,
		height: 60,
		borderRadius: 30,
		alignItems: 'center',
	},
	disabledIncrementOneButtonContainer: {
		display: 'flex',
		width: 40,
		height: 40,
		borderRadius: 20,
		alignItems: 'center',
	}
});
