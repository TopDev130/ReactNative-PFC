import {StyleSheet} from 'react-native';
import {createConst} from '@moonjs/react-native-stylesheets';

export const titleLength = createConst({all: 26, ip5: 20, ip6p: 29});

export default StyleSheet.create({
  summary: {
    marginBottom: 10,
    backgroundColor: 'white',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD'
  },
  summaryText: {
    fontSize: 13,
    color: '#555555',
    fontFamily: 'Montserrat-Regular',
    marginBottom: 12
  },
  summaryPrice: {
    fontSize: 13,
    color: '#555555',
    fontFamily: 'Montserrat-Regular',
    marginBottom: 12,
    opacity: 0.75
  },
  summaryBorder: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#CDCDCD'
  },
  summaryBolded: {
    fontSize: 14,
    color: '#555555',
    fontFamily: 'Montserrat-Regular',
    marginBottom: 5
  }
});
