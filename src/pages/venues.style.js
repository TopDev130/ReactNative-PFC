import {StyleSheet} from 'react-native';
import {fullWidth, h1} from '../app/app.style';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5'
  },
  button: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20
  },
  content: {
    flex: 1,
    paddingTop: 40
  },
  fullWidth: {
    ...fullWidth,
    justifyContent: 'center'
  },
  titleSmall: {
    ...h1,
    fontSize: 20,
    color: 'white',
    paddingLeft: 40,
    paddingRight: 40,
    marginBottom: 80
  },
  emptyList: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 60
  },
  emptyListText: {
    textAlign: 'center',
    marginTop: 22,
    marginBottom: 28,
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
    color: '#B3B3B3'
  }
});
