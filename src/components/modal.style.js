import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  contentView: {
    marginLeft: 20,
    marginRight: 20
  }
});
