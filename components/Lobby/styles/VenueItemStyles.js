import { StyleSheet } from 'react-native';
import Colors from '../../../constants/Colors';

export const styles = StyleSheet.create({
  venueItemContainer: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: Colors.whiteColor,
    marginTop: 12,
    marginBottom: 12,
    marginHorizontal: 20,
    borderRadius: 3,
    fontFamily: 'san-francisco-medium',
    height: 100,
  },
  imageContainer: {
    width: 99,
    height: 99,
    marginRight: 10,
  },
  image: {
    maxWidth: 99,
    height: 99,
    borderRadius: 3,
  },
  venueItemLeftContent: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  venueItemNameAddressContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  venueItemNameText: {
    marginTop: 4,
    fontSize: 20,
    fontFamily: 'san-francisco-semibold',
    fontWeight: '700',
  },
  venueItemStreetAddressText: {
    marginTop: 5,
    paddingRight: 10,
    fontSize: 12,
    color: Colors.accentColor,
    opacity: 0.7,
  },
  venueItemDistance: {
    flex: 3,
    fontSize: 10,
  },
  bottomContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    alignContent: 'center',
    alignItems: 'center'
  },
  capacityCount: {
    flex: 1.5,
    display: 'flex',
    flexDirection: 'row',
  },
  capacityIcons: {
    marginLeft: 10,
    display: 'flex',
    flexDirection: 'row',
  },
  capacityCountText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  socialLogoContainer: {
    display: 'flex',
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 4,
  },
  socialLogoIcon: {
    marginRight: 10,
  },
});
