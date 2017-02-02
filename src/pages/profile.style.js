import StyleSheet from '@moonjs/react-native-stylesheets';

export default StyleSheet.create({
  all: {
    container: {
      flex: 1,
      backgroundColor: '#F5F5F5'
    },
    sectionHeader: {
      lineHeight: 30,
      marginBottom: 15,
      color: '#3A3A3A',
      opacity: 0.36,
      fontSize: 11,
      textAlign: 'center',
      letterSpacing: 1,
      fontFamily: 'Montserrat-Regular'
    },
    buttonContainer: {
      padding: 18,
      backgroundColor: 'transparent'
    },
    saveButton: {
      marginBottom: 0
    },
    logoutButton: {
      color: '#929292',
      fontFamily: 'Montserrat-Regular',
      fontSize: 13,
      textAlign: 'center',
      paddingVertical: 10,
      marginTop: 10
    },
    cardContainer: {
      borderBottomWidth: 1,
      borderBottomColor: '#DDDDDD'
    },
    addNewCardButton: {
      paddingVertical: 15,
      textAlign: 'center',
      backgroundColor: '#FFFFFF',
      color: '#B5B5B5',
      fontSize: 13,
      fontFamily: 'Montserrat-Regular'
    }
  },
  ip5: {
    logoutButton: {
      fontSize: 13,
      marginTop: 3
    },
    addNewCardButton: {
      fontSize: 12
    }
  },
  ip6p: {
    logoutButton: {
      paddingTop: 20
    }
  }
});
