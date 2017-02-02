import {Dimensions, StyleSheet} from 'react-native';
import {createObject, createConst} from '@moonjs/react-native-stylesheets';
import colors from '../colors';

const window = Dimensions.get('window');

export const stickToBottom = {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0
};

export const verticallyCentered = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center'
};

export const fullWidth = {
  width: window.width,
  height: window.height,
  position: 'absolute',
  left: 0,
  top: 0
};

export const globalError = {
  flex: 1,
  fontFamily: 'Montserrat-Regular',
  fontSize: 13,
  color: '#F45E5E',
  textAlign: 'center',
  marginBottom: 10
};

export const h1 = createObject({
  all: {
    fontFamily: 'PlayfairDisplay-Regular',
    marginBottom: 5,
    color: '#000000',
    fontSize: 26
  },
  ip5: {
    fontSize: 22
  }
});

export const h2 = {
  fontSize: 12,
  color: '#474747',
  fontFamily: 'Montserrat-Regular',
  opacity: 0.8
};

export const paragraph = createObject({
  all: {
    fontFamily: 'Lora-Regular',
    textAlign: 'justify',
    lineHeight: 24,
    fontSize: 15,
    color: '#686868'
  },
  ip5: {
    fontSize: 14
  }
});

export const text = createObject({
  all: {
    opacity: 0.68,
    color: '#3A3A3A',
    fontFamily: 'Montserrat-Regular',
    fontSize: 13,
    paddingHorizontal: 30,
    textAlign: 'center',
    lineHeight: 19
  },
  ip5: {
    fontSize: 12,
    lineHeight: 17
  }
});

// Grid container
export const grid = StyleSheet.create({
  row: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row'
  }
});

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.routes.def,
    overflow: 'hidden'
  },
  containerWithBar: {
    paddingBottom: createConst({all: 60, ip5: 50, ip4: 40})
  }
});
