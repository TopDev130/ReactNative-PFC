import React, {Text, Image, View} from 'react-native';
import pureRender from '@moonjs/react-native-purerender';
import * as Row from '../components/row.react';
import {grid} from '../app/app.style';

import style from './deliveryOption.style';

class DeliveryOption extends React.Component {

  static propTypes = {
    isSelected: React.PropTypes.bool,
    msg: React.PropTypes.object,
    onSelected: React.PropTypes.func,
    pending: React.PropTypes.bool,
    value: React.PropTypes.string
  };

  static defaultProps = {
    onSelected: () => {}
  };

  renderText() {
    const {msg, value, pending} = this.props;

    return value !== null
    ? (
      <View style={grid.row}>
        <Text style={style.text}>
          {msg.title}
        </Text>
        <Text style={style.pendingText}>
          {value}
        </Text>
      </View>
    )
    : (
      <Text style={style.pendingText}>
        {pending ? msg.pending : msg.empty}
      </Text>
    );

  }

  render() {
    const {onSelected, isSelected} = this.props;

    return (
      <Row.Container onSelected={onSelected}>
        {this.renderText()}
        <Row.RightColumn>
          {isSelected && (
            <Image
              source={require('../../assets/images/checkmark.png')}
              style={{width: 16, height: 16}}
            />
          )}
        </Row.RightColumn>
      </Row.Container>
    );
  }

}

export default pureRender(DeliveryOption);
