import React, {View, Text} from 'react-native';
import {format} from '../../intl/store';
import style from './basic.style';
import Button from '../../components/button.react';
import pureRender from '@moonjs/react-native-purerender';

class NewOrder extends React.Component {

  state = {
    didClickNotifications: false
  };

  static propTypes = {
    msg: React.PropTypes.object.isRequired,
    onNotificationsClick: React.PropTypes.func.isRequired,
    onShareButtonClick: React.PropTypes.func.isRequired,
    order: React.PropTypes.object.isRequired,
    user: React.PropTypes.object.isRequired
  };

  requestNotifications() {
    this.props.onNotificationsClick();
    this.setState({
      didClickNotifications: true
    });
  }

  hideNotifications() {
    this.setState({
      didClickNotifications: true
    });
  }

  render() {
    const {
      msg,
      user: {profile: user, hasSeenNotificationsPopup},
      order,
      onShareButtonClick
    } = this.props;

    const {didClickNotifications} = this.state;

    return (
      <View style={style.container}>

        <Text style={style.heading}>
          {format(msg.title, user)}
        </Text>

        <Text style={style.subHeading}>
          {order.statusDetails || format(msg.description, user)}
        </Text>

        {!hasSeenNotificationsPopup && !didClickNotifications && (
          <View style={style.content}>
            <Text style={[style.paragraph, {marginBottom: 15}]}>
              {msg.notifications}
            </Text>
            <Button
              className='def'
              onPress={() => this.requestNotifications()}
              title={msg.button.notifications}
            />
            <Button
              className='tertiary'
              onPress={() => this.hideNotifications()}
              title={msg.button.decline}
            />
          </View>
        )}

        {(hasSeenNotificationsPopup || didClickNotifications) && (
          <View style={style.content}>
            <Text style={style.paragraph}>
              {msg.password}
            </Text>
            <View style={style.passwordContainer}>
              <Text style={style.password}>
                {order.password}
              </Text>
            </View>
            <Button
              className='def'
              onPress={onShareButtonClick}
              title={msg.button.share}
            />
          </View>
        )}

      </View>
    );
  }

}

export default pureRender(NewOrder);
