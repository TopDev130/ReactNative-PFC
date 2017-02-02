import StyleSheet from '@moonjs/react-native-stylesheets';
import {stickToBottom, fullWidth} from '../app/app.style';

export default StyleSheet.create({
  all: {
    container: {
      flex: 1,
      backgroundColor: 'transparent'
    },
    heading: {
      paddingTop: 20,
      flex: 1,
      alignItems: 'center'
    },
    stickToBottom: {
      ...stickToBottom,
      paddingBottom: 12,
      paddingLeft: 22,
      paddingRight: 22,
      backgroundColor: 'transparent'
    },
    buttonSpacing: {
      marginBottom: 15
    },
    backgroundImage: {
      ...fullWidth,
      flex: 1,
      marginTop: -40
    },
    button: {
      fontSize: 12,
      fontFamily: 'Lato-Regular',
      color: '#474747',
      textAlign: 'center',
      paddingTop: 20,
      paddingBottom: 20
    }
  },
  ip4: {
    backgroundImage: {
      right: 50
    }
  }
});
