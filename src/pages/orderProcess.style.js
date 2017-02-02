import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: -40
  },
  closeButton: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
    position: 'absolute',
    top: 12,
    right: 10,
    padding: 20,
    color: '#FFFFFF',
    backgroundColor: 'transparent',
    fontFamily: 'Montserrat-Regular'
  },
  cancelButton: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
    position: 'absolute',
    top: 12,
    left: 10,
    padding: 20,
    color: '#FFFFFF',
    backgroundColor: 'transparent',
    fontFamily: 'Montserrat-Regular'
  },
  indicators: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0
  }
});
