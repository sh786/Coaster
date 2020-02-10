import { StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

export const commonStyles = StyleSheet.create({
  screenLabelContainer: {
    height: 60,
    width: '100%',
    textAlign: 'center',
    textAlignVertical: 'center',
    backgroundColor: Colors.primaryColor,
    position: 'absolute',
    bottom: 0,
    flex: 1,
    display: 'flex',
  },
  screenLabelText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.whiteColor,
    textAlign: 'center',
    padding: 10,
    flex: 1,
  },
});
