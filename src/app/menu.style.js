import {Dimensions} from 'react-native';
import StyleSheet from '@moonjs/react-native-stylesheets';
import colors from '../colors';

const window = Dimensions.get('window');

const menuLogo = {
  flex: 1,
  resizeMode: 'contain',
  width: window.width * 0.4,
  height: 150,
  marginBottom: 20,
  backgroundColor: 'transparent'
};

export default StyleSheet.create({
  all: {
    menu: {
      flex: 1,
      width: window.width,
      height: window.height,
      backgroundColor: colors.types.dark
    },
    container: {
      flex: 1,
      width: window.width * 0.7,
      height: window.height,
      padding: 20,
      backgroundColor: 'transparent'
    },
    avatarContainer: {
      marginBottom: 25,
      marginTop: 50,
      height: 150,
      width: window.width * 0.6,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent'
    },
    appLogo: menuLogo,
    venueLogo: {
      ...menuLogo,
      width: window.width * 0.4,
      height: 150,
      resizeMode: 'contain'
    },
    userProfile: {
      fontSize: 18,
      fontFamily: 'Lato-Light',
      color: colors.types.def
    },
    item: {
      fontFamily: 'Montserrat-Regular',
      marginLeft: -20,
      fontSize: 16,
      paddingHorizontal: 30,
      paddingVertical: 15,
      color: colors.types.def
    },
    rowInfo: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'flex-start'
    },
    activeOrdersCounter: {
      marginTop: 15,
      paddingHorizontal: 6,
      paddingVertical: 1,
      marginLeft: 5,
      fontSize: 12,
      backgroundColor: colors.types.primary,
      color: colors.types.dark,
      fontFamily: 'Montserrat-Bold'
    }
  },
  ip5: {
    item: {
      fontSize: 14,
      paddingHorizontal: 25,
      paddingVertical: 10
    }
  },
  ip4: {
    avatarContainer: {
      height: 100
    },
    venueLogo: {
      height: 100
    },
    item: {
      fontSize: 14,
      paddingHorizontal: 25,
      paddingVertical: 10
    }
  }
});
