import {createObject} from '@moonjs/react-native-stylesheets';

export default createObject({
  all: {
    rowContainer: {
      borderBottomWidth: 1,
      borderBottomColor: '#DDDDDD'
    },
    row: {
      padding: 15,
      backgroundColor: '#FFFFFF',
      flex: 1,
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center'
    },
    rowInfo: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: 5
    },
    rowDate: {
      fontFamily: 'Montserrat-Regular'
    },
    rowText: {
      color: '#525252',
      fontSize: 17,
      fontFamily: 'Montserrat-Regular'
    },
    rowDescriptionText: {
      color: '#3A3A3A',
      opacity: 0.8,
      fontSize: 12,
      fontFamily: 'Lato-Regular',
      flex: 1
    },
    rowSubtext: {
      color: '#525252',
      fontSize: 13,
      fontFamily: 'Montserrat-Regular'
    },
    rowSubtextLowOpacity: {
      color: '#3A3A3A',
      opacity: 0.8,
      fontSize: 13,
      fontFamily: 'Montserrat-Regular'
    },
    rowButton: {
      flex: 1,
      backgroundColor: 'red',
      alignSelf: 'flex-end'
    }
  },
  ip5: {
    rowText: {
      fontSize: 16
    },
    rowSubtext: {
      fontSize: 12
    },
    rowStatus: {
      fontSize: 12,
      lineHeight: 17
    }
  },
  ip4: {
    rowStatus: {
      fontSize: 10,
      lineHeight: 14
    },
    row: {
      padding: 10
    },
    rowText: {
      fontSize: 14
    },
    rowSubtext: {
      fontSize: 11
    }
  }
});
