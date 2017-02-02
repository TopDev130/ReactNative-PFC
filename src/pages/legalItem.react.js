import Header from '../components/header.react';
import React, {View, WebView} from 'react-native';
import pureRender from '@moonjs/react-native-purerender';

import style from './helpItem.style';

class LegalItem extends React.Component {

  static propTypes = {
    actions: React.PropTypes.object.isRequired,
    item: React.PropTypes.object.isRequired,
    msg: React.PropTypes.object.isRequired,
    navigation: React.PropTypes.object.isRequired
  };

  render() {
    const {
      item,
      navigation
    } = this.props;

    return (
      <View style={style.container}>

        <Header
          onBackIconClick={navigation.pop}
          title={item.title}
          withBorder
        />

        <WebView
          automaticallyAdjustContentInsets={false}
          scalesPageToFit
          startInLoadingState
          url={item.url}
        />

      </View>
    );
  }
}

export default pureRender(
  LegalItem,
  ['app']
);
