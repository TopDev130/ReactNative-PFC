import StyleSheet from '@moonjs/react-native-stylesheets';
import colors from '../colors';

export default StyleSheet.create({
  all: {
    container: {
      flex: 1,
      backgroundColor: '#F5F5F5'
    },
    orderHeader: {
      color: '#3A3A3A',
      opacity: 0.6,
      fontSize: 12,
      fontFamily: 'Montserrat-Regular',
      paddingTop: 18,
      paddingBottom: 18,
      textAlign: 'center'
    },
    venueBox: {
      alignItems: 'center',
      paddingTop: 12,
      paddingBottom: 12
    },
    summaryBox: {
      padding: 20,
      backgroundColor: '#FFFFFF',
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderTopColor: '#DDDDDD',
      borderBottomColor: '#DDDDDD'
    },
    quantityRow: {
      paddingBottom: 5
    },
    basketItem: {
      padding: 0,
      paddingBottom: 15
    },
    summaryBorder: {
      paddingBottom: 15,
      marginBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#E6E6E6'
    },
    summaryText: {
      fontSize: 14,
      fontFamily: 'Montserrat-Regular',
      color: '#525252'
    },
    summaryTextGray: {
      fontSize: 13,
      fontFamily: 'Montserrat-Regular',
      color: '#909090'
    },
    summaryTextBold: {
      fontSize: 16,
      fontFamily: 'Montserrat-Regular',
      color: '#525252'
    },
    password: {
      fontFamily: 'Courier',
      textAlign: 'center',
      fontSize: 24,
      marginTop: -10,
      marginBottom: 15,
      color: '#616161'
    },
    rowStatus: {
      color: colors.types.primary,
      fontSize: 13,
      fontFamily: 'Montserrat-Regular',
      marginTop: -15,
      textAlign: 'center'
    },
    rowStatusPast: {
      color: colors.types.gray,
      fontSize: 13,
      fontFamily: 'Montserrat-Regular',
      marginTop: -15,
      textAlign: 'center'
    },
    reportProblemButton: {
      marginLeft: 15,
      marginRight: 15,
      marginTop: 10
    }
  },
  ip5: {
    orderHeader: {
      fontSize: 12,
      paddingTop: 10,
      paddingBottom: 5
    },
    rowStatus: {
      marginTop: 0
    },
    password: {
      marginTop: 0
    }
  },
  ip4: {}
});
