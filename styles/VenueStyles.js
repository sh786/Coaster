import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    container: {
      backgroundColor: '#1BA098',
      alignItems: 'center',
      flex: 1,
      width: '100%',
    },
    image: {
      width: '100%',
      height: 200,
    },
    description: {
      fontFamily: 'san-francisco',
      fontSize: 16,
      textAlign: 'center',
      color: '#fff',
      marginHorizontal: 10,
    },
    partition: {
      backgroundColor: '#DEB992',
      height: 1,
      width: '95%',
      marginVertical: 5,
    },
    eventListTitle: {
      fontFamily: 'san-francisco',
      fontSize: 20,
      textAlign: 'center',
      color: '#fff',
      fontWeight: 'bold',
      marginBottom: 5,
    },
    eventContainer: {
      display: 'flex',
      flex: 1,
      width: '950%',
      height: 'auto',
      paddingVertical: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });