import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../../constants/Colors';

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    fontFamily: 'san-francisco',
  },
  dragBar: {
    marginTop: 8,
    borderTopWidth: 2,
    marginHorizontal: Dimensions.get('window').width / 2 - 20,
    borderTopColor: Colors.greyDisabled,
  },
  venueName: {
    fontFamily: 'san-francisco-bold',
    fontSize: 18,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  divider: {
    borderBottomColor: 'rgba(0,0,0,0.10)',
    borderBottomWidth: 1,
  },
  ticketTier: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  ticketInfo: {
    flex: 2,
  },
  title: {
    fontFamily: 'san-francisco-semibold',
    fontSize: 18,
  },
  startTime: {
    fontFamily: 'san-francisco',
    fontSize: 12,
    color: 'rgba(0, 0, 0, 0.6)',
    paddingTop: 4,
    paddingBottom: 4,
  },
  ticketQuantityContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  quantityMinusIconContainer: {
    paddingRight: 10,
  },
  quantityText: {
    paddingHorizontal: 10,
    fontSize: 16,
  },
  quantityPlusIconContainer: {
    paddingLeft: 10,
  },
  summaryContainer: {
    display: 'flex',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  summaryTitle: {
    fontFamily: 'san-francisco-semibold',
    fontSize: 18,
  },
  summaryContent: {
    marginTop: 4,
    display: 'flex',
    flexDirection: 'row',
  },
  summaryLeft: {
    flex: 1,
  },
  summaryItemsText: {
    fontFamily: 'san-francisco-semibold',
    fontSize: 14,
    paddingBottom: 4,
  },
  summaryRight: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  summaryTotalText: {
    fontFamily: 'san-francisco-semibold',
    fontSize: 14,
    paddingBottom: 4,
    textAlign: 'right',
  },
  checkoutButton: {
    margin: 20,
    marginTop: 24,
    borderRadius: 6,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 46,
    backgroundColor: Colors.primaryColor,
  },
  buttonText: {
    color: Colors.whiteColor,
    fontFamily: 'san-francisco-semibold',
    fontSize: 16,
  },
});
