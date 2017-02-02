import Header from '../components/header.react';
import React, {Image, View, Text} from 'react-native';
import pureRender from '@moonjs/react-native-purerender';
import * as Row from '../components/row.react';

import style from './legal.style';

class LegalPage extends React.Component {

  static propTypes = {
    actions: React.PropTypes.object.isRequired,
    msg: React.PropTypes.object.isRequired,
    navigation: React.PropTypes.object.isRequired
  };

  openLegalPage(item) {
    this.props.navigation.transitionTo('legalItem', {item});
  }

  renderRow(item, index) {
    const containerStyle = index === 0
      ? style.firstRowStyle
      : {};

    return (
      <View key={index}>
        <Row.Container onSelected={() => this.openLegalPage(item)} style={containerStyle}>
          <Row.LeftColumn>
            <Text type='rowSubtext'>{item.title}</Text>
          </Row.LeftColumn>
          <Row.RightColumn>
            <Image source={require('../../assets/images/lightgrey_next_arrow.png')} />
          </Row.RightColumn>
        </Row.Container>
      </View>
    );
  }

  render() {
    const {
      navigation,
      msg: {legal: msg}
    } = this.props;

    return (
      <View style={style.container}>

        <Header
          iconStyle={{opacity: 0.4}}
          onBackIconClick={navigation.pop}
          title={msg.title}
          type='big'
        />

        {msg.terms.map(this.renderRow.bind(this))}
      </View>
    );
  }
}

export default pureRender(
  LegalPage,
  ['app']
);
