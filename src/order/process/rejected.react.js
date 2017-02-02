import React, {View, Text} from 'react-native';
import {format} from '../../intl/store';
import Button from '../../components/button.react';
import style from './basic.style';
import pureRender from '@moonjs/react-native-purerender';

class RejectedOrder extends React.Component {

  static propTypes = {
    msg: React.PropTypes.object.isRequired,
    onCloseButtonClick: React.PropTypes.func.isRequired,
    order: React.PropTypes.object.isRequired,
    user: React.PropTypes.object.isRequired
  };

  render() {
    const {msg, user: {profile: user}, order, onCloseButtonClick} = this.props;

    return (
      <View style={style.container}>
        <Text style={style.heading}>
          {format(msg.title, user)}
        </Text>
        <Text style={style.subHeading}>
          {order.statusDetails || format(msg.description, user)}
        </Text>
        <View style={style.content}>
          <Button
            className='def'
            onPress={onCloseButtonClick}
            title={msg.button.close}
          />
        </View>
      </View>
    );
  }

}

export default pureRender(RejectedOrder);
