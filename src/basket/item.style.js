import {StyleSheet} from 'react-native';

const padding = 15;

export default StyleSheet.create({
  containerStyle: {
    padding: 0
  },
  leftColumn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: padding,
    paddingBottom: padding,
    paddingLeft: padding
  },
  columnCollapse: {
    flex: 1
  },
  rightColumn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: 'transparent'
  },
  quantity: {
    fontFamily: 'Montserrat-Regular',
    color: 'rgba(0, 0, 0, 0.4)',
    fontSize: 11,
    marginRight: 10
  },
  heading: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14
  },
  price: {
    paddingRight: padding,
    paddingTop: padding,
    paddingBottom: padding,
    paddingLeft: padding + 15,
    backgroundColor: 'transparent'
  },
  stockButtons: {
    flexDirection: 'row'
  },
  stockButton: {
    borderLeftWidth: 1,
    borderLeftColor: '#DDDDDD',
    backgroundColor: 'white'
  },
  stockButtonText: {
    textAlign: 'center',
    fontFamily: 'Montserrat-Regular',
    color: 'rgba(0, 0, 0, 0.6)',
    fontSize: 15
  }
});
