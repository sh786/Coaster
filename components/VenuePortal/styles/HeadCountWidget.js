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
		textAlign: 'center'
	},
	countContainer: {
		display: 'flex',
		marginTop: 20,
		flexDirection: 'row',
	},
	currentCount: {
		fontSize: 48,
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
		marginTop: 20,
	},
	minusButtonContainer: {
		display: 'flex',
		backgroundColor: Colors.primaryColor,
		width: 60,
		height: 60,
		borderRadius: 50,
		alignItems: 'center',
	},
	plusButtonContainer: {
		display: 'flex',
		backgroundColor: Colors.primaryColor,
		width: 100,
		height: 100,
		borderRadius: 50,
		alignItems: 'center',
	},
	minusButtonText: {
		color: Colors.whiteColor,
		fontSize: 50,
		lineHeight: 50,
		textAlign: 'center',
		width: '100%',
		height: '100%',
	},
	plusButtonText: {
		color: Colors.whiteColor,
		fontSize: 70,
		lineHeight: 80,
		textAlign: 'center',
		width: '100%',
		height: '100%',
	}
});
