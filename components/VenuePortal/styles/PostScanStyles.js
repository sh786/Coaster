import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../../constants/Colors';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.whiteColor,
	display: 'flex',
	flexDirection: 'column',
    flex: 1,
    width: '100%',
    marginBottom: 20,
	marginTop: 10,
	justifyContent: 'center',
  },
  infoContainer: {
	display: 'flex',
	flexDirection: 'column',
    flex: 0.5,
    width: '100%',
	alignItems: 'center',
  },
  messageContainer: {
	display: 'flex',
	flexDirection: 'column',
    flex: 0.2,
    width: '100%',
	alignItems: 'center',
	marginBottom: 20,
	padding: 10,
  },
  info: {
	fontSize: 16,
	color: Colors.darkGrayColor,
	textAlign: 'center'
  },
  bold: {
	fontSize: 16,
	color: Colors.darkGrayColor,
	textAlign: 'center',
	fontWeight: '500',
  },
  dateText: {
    fontFamily: 'san-francisco-semibold',
  },
});
