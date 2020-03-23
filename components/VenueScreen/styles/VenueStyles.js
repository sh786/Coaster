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
    width: '90%',
    height: 200,
    marginVertical: '4%',
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
