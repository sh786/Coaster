import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  eventItemContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    height: 60,
    width: '100%',
    padding: 8,
    marginTop: 10,
    borderRadius: 2,
    shadowOpacity: 0.5,
    shadowColor: 'rgb(0,0,0)',
    shadowRadius: 1,
    shadowOffset: { width: 0, height: 0 },
  },
  eventItemLeftContent: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  eventItemName: {
    flex: 2,
    fontSize: 16,
  },
  eventItemStreetAddress: {
    flex: 1,
    fontSize: 12,
  },
  eventItemRightContent: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  eventItemDate: {
    flex: 2,
    fontSize: 16,
  },
  eventItemTime: {
    flex: 1,
    fontSize: 14,
  },
  eventItemOfferText: {
    lineHeight: 30,
    fontSize: 10,
    color: '#fff',
  },
});
