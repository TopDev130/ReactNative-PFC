import React, {View, Linking, Text} from 'react-native';
import pureRender from '@moonjs/react-native-purerender';
import Button from '../components/button.react';

import style from './location.style';

class LocationError extends React.Component {

  static propTypes = {
    app: React.PropTypes.object.isRequired,
    msg: React.PropTypes.object.isRequired
  };

  openSettings() {
    Linking.openURL(this.props.app.settingsURL);
  }

  render() {
    const {
      msg: {
        locationError: msg
      }
    } = this.props;

    return (
      <View style={style.container}>

        <View style={style.textContainer}>
          <Text style={style.title}>{msg.title}</Text>
          <Text style={style.message}>{msg.message}</Text>
        </View>

        <Button
          className='primary'
          onPress={() => this.openSettings()}
          style={style.allowButton}
          title={msg.button.allow}
        />

      </View>
    );
  }
}

export default pureRender(
  LocationError,
  ['app']
);
