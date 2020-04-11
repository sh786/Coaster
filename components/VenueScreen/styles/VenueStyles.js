import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../../constants/Colors';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.whiteColor,
    alignItems: 'center',
    display: 'flex',
    flex: 1,
    width: '100%',
    marginBottom: 20,
  },
  modal: {
    flex: 1,
    display: 'flex',
    backgroundColor: 'white',
    shadowOpacity: 1,
    shadowColor: 'rgba(0,0,0, 0.2)',
    shadowRadius: 2,
    shadowOffset: { width: 0, height: -2 },
    borderRadius: 20,
  },
  overlay: modalVisible => {
    if (modalVisible)
      return {
        flex: 1,
        position: 'absolute',
        left: 0,
        top: 0,
        opacity: 0.5,
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        backgroundColor: '#000',
        zIndex: 1,
      };
    return {};
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
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: 10,
    marginBottom: 15,
  },
  venueName: {
    fontSize: 26,
    color: Colors.whiteColor,
    textShadowColor: 'rgba(0,0,0,1)',
    textShadowRadius: 5,
    textShadowOffset: { width: 2, height: 2 },
    marginBottom: 2,
  },
  venueAddress: {
    color: Colors.whiteColor,
    textShadowColor: 'rgba(0,0,0,1)',
    textShadowRadius: 5,
    textShadowOffset: { width: 2, height: 2 },
    marginTop: 2,
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
  aboutContainer: {
    display: 'flex',
    flex: 1,
    width: '100%',
    marginBottom: 20,
  },
  description: {
    flex: 1,
    marginLeft: 47,
    marginRight: 20,
    fontFamily: 'san-francisco',
    fontSize: 16,
    textAlign: 'left',
    color: Colors.darkGrayColor,
  },
  exploreContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 20,
  },
  exploreIconContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: Dimensions.get('window').width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialLogoIcon: {
    marginHorizontal: 20,
  },
  mapContainer: {
    display: 'flex',
    flex: 1,
  },
  mapDirections: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 28,
    height: 28,
    paddingTop: 4,
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
  venuePageHeading: {
    fontSize: 20,
    fontFamily: 'san-francisco-semibold',
    marginBottom: 10,
  },
  mapStyle: {
    marginTop: 5,
    width: Dimensions.get('window').width,
    height: 240,
  },
});
