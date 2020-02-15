import { StyleSheet } from 'react-native';
import Colors from '../../../constants/Colors';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.lightGrayColor,
    alignItems: 'center',
    flex: 1,
    width: '100%',
  },
  image: {
    width: '96%',
    height: 200,
    marginVertical: '4%',
    marginLeft: '4%',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    right: '4%',
    bottom: 0,
    left: 0,
    padding: 8,
    display: 'flex',
    justifyContent: 'flex-end',
    color: Colors.whiteColor,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  venueName: {
    fontSize: 30,
    color: Colors.whiteColor,
  },
  venueAddress: {
    color: Colors.whiteColor,
    fontSize: 16,
  },
  venueCityState: {
    color: Colors.whiteColor,
    fontSize: 16,
  },
  details: {
    display: 'flex',
  },
  detailsRow: {
    display: 'flex',
  },
  detailsRowText: {
    fontFamily: 'san-francisco',
    fontSize: 16,
    textAlign: 'left',
    color: Colors.darkGrayColor,
    marginHorizontal: 10,
  },
  partition: {
    backgroundColor: Colors.accentColor,
    height: 1,
    width: '95%',
    marginVertical: 5,
  },
  eventListTitle: {
    fontFamily: 'san-francisco',
    fontSize: 20,
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  eventContainer: {
    display: 'flex',
    flex: 1,
    width: '95%',
    height: 'auto',
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
