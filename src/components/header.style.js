import {StyleSheet} from 'react-native';
import Style from '@moonjs/react-native-stylesheets';
import colors from '../colors';

const base = {
  header: {
    alignItems: 'center',
    position: 'relative'
  }
};

const bigBase = {
  header: {
    ...base.header,
    paddingTop: 25,
    paddingBottom: 48,
    justifyContent: 'center'
  },
  heading: {
    fontFamily: 'PlayfairDisplay-Regular',
    fontSize: 36,
    flex: 1,
    color: '#0E1113'
  },
  backLink: {
    position: 'absolute',
    left: -5,
    top: 24,
    padding: 20
  },
  backIcon: {
    width: 9,
    height: 15
  }
};

export const big = Style.create({
  all: {
    ...bigBase
  },
  ip5: {
    header: {
      paddingBottom: 28
    },
    heading: {
      fontSize: 30
    },
    backIcon: {
      marginTop: -3
    }
  },
  ip4: {
    header: {
      paddingTop: 10,
      paddingBottom: 20
    },
    heading: {
      fontSize: 25
    },
    backIcon: {
      marginTop: -22
    }
  }
});

export const bigLight = StyleSheet.create({
  ...bigBase,
  heading: {
    ...bigBase.heading,
    color: '#FFFFFF'
  }
});

const navbarBase = {
  header: {
    ...base.header,
    height: 35,
    backgroundColor: '#FFFFFF'
  },
  heading: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    marginTop: -2,
    letterSpacing: 1
  },
  headerBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD'
  },
  menuLink: {
    position: 'absolute',
    left: 10,
    top: -13,
    width: 44,
    height: 44,
    padding: 10
  },
  menuIcon: {
    width: 20,
    height: 20,
    backgroundColor: 'transparent'
  },
  backLink: {
    position: 'absolute',
    left: 0,
    top: -20,
    padding: 20
  },
  backIcon: {
    width: 9,
    height: 15
  },
  forwardLink: {
    position: 'absolute',
    right: 0,
    top: -20,
    padding: 20
  },
  forwardIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain'
  }
};

export const navbarDark = StyleSheet.create({
  ...navbarBase,
  header: {
    ...base.header,
    height: 35,
    backgroundColor: colors.types.dark
  },
  heading: {
    ...navbarBase.heading,
    color: '#FFFFFF'
  },
  backIcon: {
    transform: [{rotate: '-90deg'}]
  }
});

export const navbar = StyleSheet.create(navbarBase);

export const navbarIcon = StyleSheet.create({
  ...navbarBase,
  header: {
    ...base.header,
    height: 35,
    backgroundColor: 'transparent'
  }
});
