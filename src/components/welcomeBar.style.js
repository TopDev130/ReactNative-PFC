import {StyleSheet} from 'react-native';

export const height = 84;

const baseStyle = {
  color: '#FFFFFF',
  opacity: 1,
  textAlign: 'center',
  fontFamily: 'Montserrat-Regular'
};

export default StyleSheet.create({
  container: {
    height,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    flex: 1,
    paddingVertical: 20,
    backgroundColor: '#68CA9A'
  },
  closeButton: {
    lineHeight: 35,
    opacity: 0.8,
    fontSize: 28,
    color: '#FFFFFF'
  },
  link: {
    position: 'absolute',
    top: 37,
    right: 10,
    padding: 10
  },
  title: {
    ...baseStyle,
    lineHeight: 14,
    letterSpacing: 0.79,
    fontSize: 11,
    marginTop: 20
  },
  name: {
    ...baseStyle,
    lineHeight: 18,
    fontSize: 14
  }
});
