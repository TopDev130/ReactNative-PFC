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
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
    lineHeight: 22,
    color: '#757575',
    paddingHorizontal: 40,
    paddingBottom: 40,
    textAlign: 'center'
  }
});
