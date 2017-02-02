import React, {View, Image} from 'react-native';
import pureRender from '@moonjs/react-native-purerender';
import Button from '../components/button.react';

import style from './welcome.style';
import branding from '../branding';

class Welcome extends React.Component {

  static propTypes = {
    actions: React.PropTypes.object.isRequired,
    msg: React.PropTypes.object.isRequired,
    navigation: React.PropTypes.object.isRequired
  };

  goToRegisterPage() {
    this.props.navigation.transitionTo('register');
  }

  goToLoginPage() {
    this.props.navigation.transitionTo('login');
  }

  render() {
    const {msg} = this.props;

    return (
      <View style={style.container}>
        <Image source={branding.images.splash} style={style.backgroundImage} />
        <View style={style.heading}>
          <Image source={branding.images.logo} />
        </View>
        <View style={style.stickToBottom}>
          <Button
            className='primary'
            onPress={this.goToRegisterPage.bind(this)}
            style={style.buttonSpacing}
            title={msg.welcome.button.signUp}
          />
          <Button
            className='secondary'
            onPress={this.goToLoginPage.bind(this)}
            size='medium'
            title={msg.welcome.button.login}
          />
        </View>
      </View>
    );
  }

}

export default pureRender(Welcome, ['app']);
