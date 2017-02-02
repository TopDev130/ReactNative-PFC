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
    bottomContent: {
      flex: 1,
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      padding: 15,
      paddingTop: 150
    },
    backgroundImage: {
      width: window.width,
      height: 178,
      backgroundColor: '#2C2C2C'
    },
    labels: {
      flexDirection: 'row',
      position: 'absolute',
      left: 5,
      top: 30
    },
    title: {
      backgroundColor: 'transparent',
      fontFamily: 'PlayfairDisplay-Regular',
      fontSize: 22,
      color: '#FFFFFF',
      textAlign: 'right'
    },
    distance: {
      backgroundColor: 'transparent',
      fontFamily: 'Montserrat-Regular',
      fontSize: 14,
      color: '#FFFFFF',
      position: 'absolute',
      right: 15,
      bottom: 0
    }
  },
  ip5: {
    container: {
      height: 150
    },
    backgroundImage: {
      height: 150
    },
    title: {
      fontSize: 18
    },
    distance: {
      fontSize: 12
    },
    labels: {
      top: 50
    }
  },
  ip4: {
    container: {
      height: 150
    },
    distance: {
      fontSize: 12
    },
    backgroundImage: {
      height: 150
    },
    labels: {
      top: 55
    }
  }
});
