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
  },
  eventListTitle: {
    fontFamily: 'san-francisco',
    fontSize: 20,
    textAlign: 'center',
    color: Colors.darkGrayColor,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  dateContainer: {
    display: 'flex',
    flex: 1,
    marginLeft: 40,
    marginRight: 20,
    marginBottom: 5,
    marginTop: 4,
    alignItems: 'flex-end',
  },
  dateText: {
    fontFamily: 'san-francisco-semibold',
  },
  eventsContainer: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headingContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  headingIcon: {
    marginLeft: 20,
    marginRight: 10,
    marginTop: 2,
  },
  eventListHeading: {
    fontSize: 20,
    fontFamily: 'san-francisco-semibold',
    marginBottom: 5,
  },
  ticketCount: {
    fontSize: 16,
    fontFamily: 'san-francisco',
    marginBottom: 5,
    textAlign: 'center',
    fontWeight: '400',
  },
  scrollView: {
	display: 'flex',
	flexDirection: 'column',
  },
  line: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 4,
    marginTop: 4,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 4,
    borderRadius: 2,
    shadowOpacity: 0.5,
    shadowColor: 'rgb(0,0,0)',
    shadowRadius: 1,
    shadowOffset: { width: 0, height: 0 },
  },
	lineItem: {
		alignItems: 'center',
		display: 'flex',
		flex: 1,
		fontSize: 15,
		color: Colors.darkGrayColor,
		textAlign: 'center'
  },
});
