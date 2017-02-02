import React, {View, Text} from 'react-native';
import pureRender from '@moonjs/react-native-purerender';
import Button from '../components/button.react';

import style from './location.style';

class Location extends React.Component {

  static propTypes = {
    actions: React.PropTypes.object.isRequired,
    msg: React.PropTypes.object.isRequired,
    navigation: React.PropTypes.object.isRequired
  };

  requestLocation() {
    this.props.actions.user.registerForLocationUpdates();

    // Transition in the timeout to prevent
    // blocking popup stopping the animation in the middle
    setTimeout(_ => {
      this.props.navigation.transitionToTop('venues');
    });
  }

  render() {
    const {
      msg: {
        location: msg
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
          onPress={() => this.requestLocation()}
          style={style.allowButton}
          title={msg.button.allow}
        />

      </View>
    );
  }
}

export default pureRender(
  Location,
  ['app']
);
