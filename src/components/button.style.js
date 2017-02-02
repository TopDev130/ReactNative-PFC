import {createObject} from '@moonjs/react-native-stylesheets';
import colors from '../colors';
import Color from 'color';

const base = {
  marginBottom: 10
};

const baseText = {
  textAlign: 'center',
  fontFamily: 'Montserrat-Bold'
};

export const buttonType = Object.keys(colors.types).reduce((style, type) => {
  style[type] = {
    backgroundColor: colors.types[type]
  };
  return style;
}, {});

export const buttonTextType = Object.keys(colors.types).reduce((style, type) => {
  style[type] = {
    color: Color(colors.types[type]).luminosity() >= 0.5 ? '#000000' : '#FFFFFF'
  };
  return style;
}, {});

export const buttonUnderlayColor = Object.keys(colors.types).reduce((style, type) => {
  style[type] = Color(colors.types[type]).darken(0.4).hexString();
  return style;
}, {});

export const buttonSize = createObject({
  all: {
    big: {
      ...base,
      height: 58
    },
    medium: {
      ...base,
      height: 40
    }
  },
  ip5: {
    big: {
      height: 48
    }
  },
  ip4: {
    big: {
      height: 40
    },
    medium: {
      height: 35
    }
  }
});

export const buttonTextSize = createObject({
  all: {
    big: {
      ...baseText,
      lineHeight: 38,
      fontSize: 14,
      letterSpacing: 1
    },
    medium: {
      ...baseText,
      fontSize: 15,
      lineHeight: 29
    }
  },
  ip5: {
    big: {
      lineHeight: 33,
      fontSize: 13
    }
  },
  ip4: {
    big: {
      lineHeight: 28,
      fontSize: 13
    },
    medium: {
      lineHeight: 26,
      fontSize: 12
    }
  }
});
