import StyleSheet from '@moonjs/react-native-stylesheets';
import {CardScanManager} from 'CardScan';

const alternativeWay = {
  textAlign: 'center',
  marginTop: 22,
  marginBottom: 28,
  fontFamily: 'Montserrat-Regular',
  fontSize: 10,
  color: '#B3B3B3'
};

const isScanAvailable = CardScanManager.isAvailable;

export const trackKeyboardValue = StyleSheet.createConst({
  all: 1, ip5: 1.45, ip6p: 1.4, ip4: 1.35
});
export const cardTrackKeyboardValue = StyleSheet.createConst({
  all: isScanAvailable ? 1.1 : 2.2,
  ip5: isScanAvailable ? 1.3 : 2.65,
  ip6p: isScanAvailable ? 1.5 : 4
});

export default StyleSheet.create({
  all: {
    container: {
      flex: 1,
      paddingBottom: 40,
      backgroundColor: '#F5F5F5'
    },
    stripeWrapper: {
      alignItems: 'center'
    },
    stripeIcon: {
      width: 120,
      height: 60,
      resizeMode: 'contain'
    },
    buttonWrapper: {
      paddingLeft: 22,
      paddingRight: 22
    },
    lastWrapper: {
      marginTop: 20
    },
    alternativeWay: alternativeWay,
    forgotText: {
      textAlign: 'center',
      marginBottom: 28,
      fontFamily: 'Montserrat-Regular',
      fontSize: 10,
      color: '#B3B3B3'
    },
    termsLink: {
      ...alternativeWay,
      marginTop: -15,
      paddingTop: 10,
      paddingBottom: 10
    },
    bolded: {
      fontFamily: 'Montserrat-Bold',
      color: '#8A8A8A'
    },
    logoutButton:{
      color: '#929292',
      fontFamily: 'Montserrat-Regular',
      fontSize: 14,
      textAlign: 'center',
      paddingVertical: 10,
      marginTop: 10
    }
  },
  ip5: {
    container: {
      paddingBottom: 0
    },
    logoutButton: {
      fontSize: 13,
      marginTop: 3
    },
    lastWrapper: {
      marginTop: 0
    },
    alternativeWay: {
      marginTop: 10,
      marginBottom: 18
    }
  },
  ip4: {
    container: {
      paddingBottom: 0
    },
    logoutButton: {
      fontSize: 13,
      marginTop: 3
    },
    lastWrapper: {
      marginTop: 0
    },
    alternativeWay: {
      marginTop: 10,
      marginBottom: 18
    },
    termsLink: {
      marginBottom: 10,
      paddingTop: 5,
      paddingBottom: 5
    }
  }
});
