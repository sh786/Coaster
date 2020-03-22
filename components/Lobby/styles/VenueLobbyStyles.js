import { StyleSheet } from 'react-native';
import Colors from '../../../constants/Colors';

export const styles = StyleSheet.create({
  venueContainer: {
    flex: 1,
    paddingBottom: 15,
    backgroundColor: 'transparent',
  },
  dateHeader: {
    marginTop: 16,
    fontSize: 16,
  },
  dateHeaderText: {
    color: Colors.accentColor,
    fontWeight: '600',
  },
});
