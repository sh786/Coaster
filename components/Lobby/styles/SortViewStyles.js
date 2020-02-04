import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      display: 'flex',
      flexDirection: 'column',
    },
    editContainer: {
        width: 150,
        height: 150,
        backgroundColor: 'white',
        position: 'absolute',
        top: 50,
        right: 0,
        borderRadius: 10,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        display: 'flex',
        flexDirection: 'column',
        padding: 10,
    },
    editTitle: {
        textAlign: 'center',
        fontFamily: 'san-francisco',
        fontSize: 18,
    },
    editItem: {
        margin: 10,
        textAlign: 'left',
        fontFamily: 'san-francisco',
        fontSize: 16,
    }
  });