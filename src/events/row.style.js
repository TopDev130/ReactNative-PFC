import {Dimensions} from 'react-native';
import StyleSheet from '@moonjs/react-native-stylesheets';

const window = Dimensions.get('window');

export default StyleSheet.create({
  all: {
    container: {
      flex: 1,
      height: 178,
      backgroundColor: 'transparent',
      marginBottom: 1
    },
    gradient: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    },
    content: {
      flex: 1,
      height: 178
    },
    backgroundImage: {
      width: window.width,
      height: 178,
      backgroundColor: '#2C2C2C'
    },
    title: {
      backgroundColor: 'transparent',
      fontFamily: 'PlayfairDisplay-Regular',
      fontSize: 22,
      color: '#FFFFFF',
      position: 'absolute',
      left: 15,
      bottom: 15
    },
    date: {
      backgroundColor: 'transparent',
      fontFamily: 'Montserrat-Regular',
      fontSize: 15,
      color: '#FFFFFF',
      position: 'absolute',
      top: 15,
      left: 15
    }
  },
  ip5: {
    container: {
      height: 150
    },
    backgroundImage: {
      height: 150
    },
    content: {
      height: 150
    },
    title: {
      fontSize: 18
    },
    distance: {
      fontSize: 12
    }
  }
});
