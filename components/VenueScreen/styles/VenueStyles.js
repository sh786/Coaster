import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../../constants/Colors';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.whiteColor,
    alignItems: 'center',
    display: 'flex',
    flex: 1,
    width: '100%',
  },
  image: {
    width: Dimensions.get('window').width,
    height: 200,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  imageOverlay: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    height: 200,
    width: Dimensions.get('window').width,
  },
  venueName: {
    fontSize: 26,
    color: Colors.whiteColor,
  },
  description: {
    fontFamily: 'san-francisco',
    fontSize: 16,
    textAlign: 'center',
    color: Colors.darkGrayColor,
    marginHorizontal: 10,
  },
  partition: {
    backgroundColor: Colors.darkGrayColor,
    height: 1,
    width: '95%',
    marginVertical: 5,
  },
  eventListTitle: {
    fontFamily: 'san-francisco',
    fontSize: 20,
    textAlign: 'center',
    color: Colors.darkGrayColor,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  eventsContainer: {
    display: 'flex',
    flex: 1,
    width: '95%',
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapContainer: {
    display: 'flex',
    flex: 1,
  },
  venuePageHeading: {
    fontSize: 20,
    fontFamily: 'san-francisco-semibold',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: 240,
  },
});
