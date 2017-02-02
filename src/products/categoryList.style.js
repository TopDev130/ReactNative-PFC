import {StyleSheet, Dimensions} from 'react-native';

const window = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  },
  splash: {
    width: window.width,
    height: 180,
    resizeMode: 'cover'
  },
  gradient: {
    position: 'absolute',
    backgroundColor: 'transparent',
    top: 0,
    left: 0,
    height: 180,
    right: 0,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    fontFamily: 'PlayfairDisplay-Regular',
    fontSize: 32,
    color: '#FFFFFF'
  }
});
