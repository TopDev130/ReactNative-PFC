import {stickToBottom, verticallyCentered} from '../app/app.style';
import StyleSheet from '@moonjs/react-native-stylesheets';

export default StyleSheet.create({
  all: {
    container: {
      flex: 1
    },
    centeredContent: {
      ...verticallyCentered,
      paddingBottom: 100,
      paddingLeft: 40,
      paddingRight: 40
    },
    title: {
      fontFamily: 'PlayfairDisplay-Regular',
      fontSize: 36,
      color: '#0E1113',
      marginBottom: 30
    },
    subTitle: {
      fontFamily: 'PlayfairDisplay-Regular',
      fontSize: 20,
      color: '#696969',
      textAlign: 'center'
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
    }
  },
  ip5: {
    title: {
      fontSize: 30,
      marginBottom: 15
    },
    subTitle: {
      fontSize: 17
    }
  }
});
