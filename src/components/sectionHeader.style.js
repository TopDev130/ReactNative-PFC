import StyleSheet from '@moonjs/react-native-stylesheets';

export default StyleSheet.create({
  all: {
    container: {
      height: 50,
      backgroundColor: '#F5F5F5'
    },
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      height: 49,
      backgroundColor: '#e86567',
      borderBottomWidth: 1,
      borderBottomColor: '#dc464a'
    },
    containerWithBorder: {
      borderBottomWidth: 1,
      borderBottomColor: '#DDDDDD'
    },
    errorHeading: {
      color: '#FFFFFF',
      textAlign: 'center',
      fontSize: 11,
      fontFamily: 'Montserrat-Bold'
    },
    errorText: {
      color: '#FFFFFF',
      fontSize: 13,
      textAlign: 'center',
      fontFamily: 'Montserrat-Regular'
    },
    text: {
      lineHeight: 30,
      color: '#3A3A3A',
      opacity: 0.56,
      fontSize: 11,
      textAlign: 'center',
      letterSpacing: 1,
      fontFamily: 'Montserrat-Regular'
    },
    textDark: {
      opacity: 0.8
    }
  },
  ip5: {
    container: {
      height: 40
    },
    errorContainer: {
      height: 39
    },
    text: {
      lineHeight: 28
    }
  }
});
