import StyleSheet from '@moonjs/react-native-stylesheets';
import {createConst} from '@moonjs/react-native-stylesheets';

export const windowHeight = createConst({all: 250, ip5: 210, ip6p: 340});

export default StyleSheet.create({
  all: {
    container: {
      flex: 1,
      marginTop: -40
    },
    topImage: {
      flex: 1,
      backgroundColor: '#2C2C2C'
    },
    bottomContent: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      paddingTop: 30,
      paddingBottom: 30,
      paddingLeft: 20,
      paddingRight: 20
    },
    buttonWrapper: {
      flex: 1,
      alignItems: 'stretch',
      alignSelf: 'stretch'
    },
    iconContainer: {
      height: 60,
      backgroundColor: 'transparent',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0
    },
    description: {
      marginTop: 20,
      lineHeight: 24,
      marginBottom: 40,
      textAlign: 'left'
    },
    button: {
      color: '#929292',
      fontFamily: 'Montserrat-Regular',
      fontSize: 14,
      paddingVertical: 10,
      textAlign: 'center'
    },
    backLink: {
      top: 25,
      left: 10,
      padding: 10,
      overflow: 'visible'
    },
    backIcon: {
      backgroundColor: 'transparent',
      width: 20,
      height: 20,
      resizeMode: 'contain'
    }
  },
  ip5: {
    button: {
      fontSize: 13,
      paddingTop: 5
    },
    description: {
      marginTop: 10,
      marginBottom: 20
    }
  }
});
