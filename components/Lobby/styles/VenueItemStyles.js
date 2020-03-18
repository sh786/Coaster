import { StyleSheet } from 'react-native';
import Colors from '../../../constants/Colors';

export const styles = StyleSheet.create({
  venueItemContainer: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: Colors.whiteColor,
    marginTop: 16,
    marginBottom: 16,
    marginHorizontal: 20,
    fontFamily: 'san-francisco',
  },
  imageContainer: {
    width: 120,
    height: 100,
  },
  image: {
    maxWidth: 110,
    height: 100,
  },
  venueItemLeftContent: {
    display: 'flex',
    flex: 2,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  venueItemNameContainer: {
    flex: 5,
    justifyContent: 'center',
  },
  venueItemNameText: {
    fontSize: 20,
    fontFamily: 'san-francisco',
    fontWeight: '600',
  },
  venueItemStreetAddressContainer: {
    marginTop: 4,
    flex: 2,
    justifyContent: 'flex-end',
  },
  venueItemStreetAddressText: {
    fontSize: 12,
    color: Colors.accentColor,
    opacity: 0.6,
  },
  venueItemDistance: {
    flex: 3,
    fontSize: 10,
  },
  venueItemRightContent: {
    display: 'flex',
    position: 'relative',
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    textAlign: 'right',
    marginHorizontal: 10,
  },
  venueItemPrice: {
    fontSize: 12,
  },
  venueItemOffer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 30,
    height: 30,
    borderRadius: 50,
    backgroundColor: Colors.accentColor,
    textAlign: 'center',
    marginRight: -23,
    marginBottom: -23,
  },
  venueItemOfferText: {
    lineHeight: 30,
    fontSize: 10,
    color: '#fff',
  },
  socialLogoContainer: {
    marginTop: 6,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  socialLogoIcon: {
    marginRight: 12,
  },
  arrowContainer: {
    flex: 0.4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowIcon: {
    color: Colors.primaryColor,
  },
});
