import {StyleSheet} from 'react-native';
import {stickToBottom} from '../app/app.style';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 40,
    backgroundColor: '#F5F5F5'
  },
  buttonWrapper: {
    ...stickToBottom,
    paddingLeft: 22,
    paddingRight: 22
  },
  textWrapper: {
    textAlign: 'center',
    paddingBottom: 50,
    fontFamily: 'PlayfairDisplay-Regular',
    fontSize: 20,
    lineHeight: 27,
    paddingLeft: 26,
    paddingRight: 26,
    color: '#696969'
  }
});
