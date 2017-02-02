import StyleSheet from '@moonjs/react-native-stylesheets';

const label = {
  fontFamily: 'Montserrat-Regular',
  fontSize: 13,
  color: '#464646',
  paddingLeft: 15,
  paddingRight: 15,
  opacity: 0.6
};

export default StyleSheet.create({
  all: {

    container: {},

    inputWrapper: {
      borderTopColor: '#DDDDDD',
      backgroundColor: '#FCFCFC',
      borderTopWidth: 1,
      paddingTop: 10,
      paddingBottom: 10
    },

    inlineInputWrapper: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between'
    },

    inputInline: {
      flex: 1
    },

    label: {
      fontFamily: 'Montserrat-Regular',
      fontSize: 13,
      color: '#B5B5B5',
      paddingLeft: 15,
      paddingRight: 15
    },

    labelInline: {
      ...label,
      lineHeight: 24,
      paddingRight: 0
    },

    inputWithErrorWrapper: {
      backgroundColor: '#FFF5F5'
    },

    input: {
      height: 30,
      paddingLeft: 15,
      paddingRight: 15,
      fontFamily: 'Montserrat-Regular',
      fontSize: 13,
      color: '#464646'
    },

    inputWithMultilines: {
      height: 200
    },

    errorWrapper: {
      paddingLeft: 15,
      paddingRight: 15,
      paddingBottom: 0,
      flex: 1
    },

    errorText: {
      flex: 1,
      fontFamily: 'Montserrat-Regular',
      fontSize: 10,
      color: '#F45E5E'
    },

    lastWrapper: {
      marginBottom: 20,
      borderBottomColor: '#DDDDDD',
      borderBottomWidth: 1
    }

  },
  ip5: {
    input: {
      fontSize: 12,
      height: 27
    },
    label: {
      fontSize: 12
    },
    labelInline: {
      fontSize: 12,
      lineHeight: 20
    }
  }
});
