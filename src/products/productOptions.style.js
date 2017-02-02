import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  options: {
    flex: 1,
    top: 0,
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'stretch',
    backgroundColor: 'white'
  },
  option: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 10,
    marginRight: 10
  },
  scrollContent: {
    flex: 1,
    paddingRight: 50
  },
  optionLeftGradient: {
    resizeMode: 'stretch',
    width: 15,
    left: 0,
    position: 'absolute',
    backgroundColor: 'transparent',
    top: 0
  },
  optionRightGradient: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 50,
    resizeMode: 'stretch',
    backgroundColor: 'transparent'
  },
  optionBackButton: {
    marginLeft: 10,
    marginRight: 20,
    padding: 10,
    justifyContent: 'center'
  },
  optionBackImage: {
    resizeMode: 'contain',
    width: 7,
    backgroundColor: 'transparent'
  },
  optionQuantity: {
    color: 'rgba(0, 0, 0, 0.5)',
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
    lineHeight: 14,
    marginTop: -10
  },
  optionPrice: {
    color: 'black',
    fontFamily: 'Montserrat-Regular',
    fontSize: 15,
    marginBottom: 2
  },
  optionKind: {
    color: 'rgba(0, 0, 0, 0.5)',
    fontFamily: 'Montserrat-Regular',
    fontSize: 12
  }
});
