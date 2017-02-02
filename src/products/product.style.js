import {StyleSheet} from 'react-native';
import colors from '../colors';

export default StyleSheet.create({
  productInBasket: {
    borderLeftWidth: 4,
    borderLeftColor: colors.types.primary
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'column',
    position: 'relative'
  },
  rowInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  rowTop: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  rowDescription: {
    color: '#3A3A3A',
    opacity: 0.8,
    fontSize: 12,
    fontFamily: 'Lato-Regular',
    flex: 1,
    marginTop: 5
  }
});
