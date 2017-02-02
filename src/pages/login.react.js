import ProgressHUD from '@moonjs/react-native-progresshud';
import React, {Animated, View, Text} from 'react-native';
import pureRender from '@moonjs/react-native-purerender';
import trackKeyboard from '@moonjs/react-native-trackkeyboard';
import Header from '../components/header.react';
import Button from '../components/button.react';
import LoginForm from '../auth/loginForm.react';
import style, {trackKeyboardValue} from './register.style.js';
import {trackEvent} from 'Analytics';

/**
 * Login page
 */
class Login extends React.Component {

  static propTypes = {
    actions: React.PropTypes.object.isRequired,
    animations: React.PropTypes.object.isRequired,
    auth: React.PropTypes.object.isRequired,
    msg: React.PropTypes.object.isRequired,
    navigation: React.PropTypes.object.isRequired,
    user: React.PropTypes.object.isRequired
  };

  onUserLogged(user) {
    const {navigation, user: {hasSeenLocationPopup}} = this.props;

    trackEvent('Logged in');

    if (user.cards.length === 0) {
      navigation.transitionTo('enterPayment');
    } else if (!hasSeenLocationPopup) {
      navigation.transitionTo('location');
    } else {
      navigation.transitionToTop('venues');
    }
  }

  loginUser() {
    this.props.actions.auth
      .login(this.props.auth.loginForm.fields)
      .then(this.onUserLogged.bind(this));
  }

  resetPassword() {
    return this.props.navigation.transitionTo('resetPassword');
  }

  loginUserWithFacebook() {
    this.props.actions.auth
      .loginWithFacebook()
      .then(this.onUserLogged.bind(this));
  }

  render() {
    const {
      actions: {auth: actions},
      auth: {loginForm: form, isFacebookLoginPending},
      msg,
      navigation,
      animations: {fadeOut, slideUp}
    } = this.props;

    return (
      <Animated.View style={[style.container, slideUp]}>

        <Animated.View style={fadeOut}>

          <Header
            iconStyle={{opacity: 0.4}}
            onBackIconClick={navigation.pop}
            title={msg.login.welcome}
            type='big'
          />

          <View style={style.buttonWrapper}>
            <Button
              className='info'
              disabled={form.isPending}
              onPress={() => this.loginUserWithFacebook()}
              title={msg.login.button.facebookLogin}
            />
          </View>

          <Text style={style.alternativeWay}>
            {msg.login.alternativeWay.toUpperCase()}
          </Text>

        </Animated.View>

        <LoginForm
          form={form}
          msg={msg.auth.loginForm}
          onInputChange={actions.updateLoginFormField}
          onInputSubmit={() => this.loginUser()}
        />

        <Text
          onPress={() => this.resetPassword()}
          style={style.forgotText}>
          {msg.login.forgotPassword.toUpperCase()}
        </Text>

        <View style={[style.buttonWrapper, style.lastWrapper]}>
          <Button
            className='primary'
            disabled={form.isPending}
            onPress={() => this.loginUser()}
            title={msg.login.button.signIn}
          />
        </View>

        <ProgressHUD isVisible={form.isPending || isFacebookLoginPending} />

      </Animated.View>
    );
  }

}

export default trackKeyboard(
  pureRender(Login, ['app']),
  {scaleFactor: trackKeyboardValue}
);
