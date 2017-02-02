import StyleSheet from '@moonjs/react-native-stylesheets';

export default StyleSheet.create({
  all: {
    container: {
      flex: 1,
      backgroundColor: '#F5F5F5',
      padding: 10
    },
    textContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    allowButton: {
      marginLeft: 15,
      marginRight: 15
    },
    title: {
      fontSize: 36,
      lineHeight: 48,
      textAlign: 'center',
      fontFamily: 'PlayfairDisplay-Regular'
    },
    message: {
      fontSize: 13,
      color: '#4B4B4B',
      textAlign: 'center',
      lineHeight: 18,
      letterSpacing: 0.3,
      fontFamily: 'Montserrat-Regular',
      padding: 20,
      opacity: 0.6
    }
  },
  ip5: {
    title: {
      fontSize: 34,
      lineHeight: 42
    },
    message: {
      fontSize: 12,
      lineHeight: 16
    }
  }
});
