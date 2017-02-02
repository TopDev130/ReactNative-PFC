import StyleSheet, {createConst} from '@moonjs/react-native-stylesheets';

export const padding = 40;
export const height = createConst({all: 60, ip5: 50, ip4: 40}) + padding;


export default StyleSheet.create({
  all: {
    container: {
      height,
      position: 'absolute',
      left: 0,
      right: 0,
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingLeft: 20,
      paddingRight: 20,
      paddingTop: 20,
      paddingBottom: 30
    },
    text: {
      fontFamily: 'Montserrat-Regular',
      color: 'white',
      fontSize: 13
    }
  },
  ip4: {
    container: {
      paddingTop: 15,
      paddingBottom: 20
    }
  }
});
