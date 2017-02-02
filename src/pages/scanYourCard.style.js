import {Dimensions, StyleSheet} from 'react-native';

const window = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#F5F5F5'
  },
  cardView: {
    backgroundColor: '#CDCDCD',
    height: window.height * 0.65,
    marginTop: -(window.height * 0.05)
  },
  cardContainer: {
    backgroundColor: '#CDCDCD'
  },
  instructions: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: '#909090',
    marginBottom: 25,
    textAlign: 'center'
  }
});
