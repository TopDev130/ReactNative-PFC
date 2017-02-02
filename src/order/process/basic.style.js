import StyleSheet from '@moonjs/react-native-stylesheets';
import {stickToBottom} from '../../app/app.style';

export default StyleSheet.create({
  all: {
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom: 140
    },
    heading: {
      textAlign: 'center',
      fontFamily: 'PlayfairDisplay-Regular',
      fontSize: 36,
      marginBottom: 5,
      color: '#FFFFFF'
    },
    subHeading: {
      fontFamily: 'Montserrat-Regular',
      color: '#ECECEC',
      fontSize: 14,
      textAlign: 'center',
      paddingLeft: 20,
      paddingRight: 20
    },
    note: {
      fontFamily: 'Montserrat-Regular',
      color: 'gray',
      textAlign: 'center',
      fontSize: 13
    },
    paragraph: {
      fontFamily: 'Montserrat-Regular',
      color: '#ECECEC',
      textAlign: 'center',
      fontSize: 14
    },
    smallParagraph: {
      fontFamily: 'Montserrat-Regular',
      color: '#FFFFFF',
      textAlign: 'center',
      fontSize: 12,
      lineHeight: 18
    },
    passwordContainer: {
      paddingTop: 10,
      paddingBottom: 14,
      backgroundColor: 'transparent',
      borderTopColor: '#444444',
      borderBottomColor: '#444444',
      borderRightColor: '#444444',
      borderLeftColor: '#444444',
      borderTopWidth: 1,
      borderLeftWidth: 1,
      borderBottomWidth: 1,
      borderRightWidth: 1,
      marginBottom: 30,
      marginTop: 15
    },
    password: {
      fontFamily: 'PlayfairDisplay-Regular',
      fontSize: 26,
      color: '#FFFFFF',
      textAlign: 'center'
    },
    content: {
      ...stickToBottom,
      paddingLeft: 20,
      paddingRight: 20,
      bottom: 20,
      alignItems: 'stretch',
      flex: 1
    }
  },
  ip4: {
    password: {
      fontSize: 22
    },
    smallParagraph: {
      fontSize: 8
    },
    paragraph: {
      fontSize: 12
    },
    note: {
      fontSize: 11
    },
    heading: {
      fontSize: 32
    }
  }
});
