import {StyleSheet} from 'react-native';

const indicatorStyle = {
  width: 13,
  height: 4,
  backgroundColor: 'gray',
  marginLeft: 3,
  marginRight: 3
};

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row'
  },
  indicator: indicatorStyle,
  activeIndicator: {
    ...indicatorStyle,
    backgroundColor: 'white'
  }
});
