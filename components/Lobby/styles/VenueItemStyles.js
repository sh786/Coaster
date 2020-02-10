import { StyleSheet } from 'react-native';
import Colors from '../../../constants/Colors';

export const styles = StyleSheet.create({
  venueItemContainer: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: Colors.lightGrayColor,
    height: 80,
    width: '95%',
    padding: 10,
    marginBottom: 20,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 8,
    borderRadius: 4,
    fontFamily: 'san-francisco',
  },
  venueItemLeftContent: {
    display: 'flex',
    flex: 2,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  venueItemName: {
    flex: 5,
    fontSize: 18,
  },
  venueItemStreetAddress: {
    flex: 3,
    fontSize: 12,
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
  arrowContainer: {
    flex: 0.4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowIcon: {
    color: Colors.primaryColorDark,
  },
});
