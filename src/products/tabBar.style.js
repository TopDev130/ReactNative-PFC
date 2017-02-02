import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 14,
    paddingTop: 14,
    paddingLeft: 10,
    paddingRight: 10
  },
  activeTab: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 14,
    paddingTop: 14,
    marginLeft: 10,
    marginRight: 10,
    borderBottomColor: 'black',
    borderBottomWidth: 3
  },
  tabText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 13,
    color: 'rgba(0, 0, 0, 0.5)'
  },
  activeTabText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 13,
    color: 'black'
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: '#ccc'
  }
});
