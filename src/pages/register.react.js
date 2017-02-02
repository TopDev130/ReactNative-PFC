import ProgressHUD from '@moonjs/react-native-progresshud';
import React, {Animated, View, Text} from 'react-native';
import pureRender from '@moonjs/react-native-purerender';
import trackKeyboard from '@moonjs/react-native-trackkeyboard';
import Header from '../components/header.react';
import Button from '../components/button.react';
import RegisterForm from '../auth/registerForm.react';
import style, {trackKeyboardValue} from './register.style.js';
import {trackEvent} from 'Analytics';

/**
 * A Register page
 */
class Register extends React.Component {

  static propTypes = {
    actions: React.PropTypes.object.isRequired,
    animations: React.PropTypes.object.isRequired,
    auth: React.PropTypes.object.isRequired,
    msg: React.PropTypes.object.isRequired,
    navigation: React.PropTypes.object.isRequired,
    user: React.PropTypes.object.isRequired
  };

  onUserRegistered(user) {
    const {navigation, user: {hasSeenLocationPopup}} = this.props;

    trackEvent('Registered');

    if (user.cards.length === 0) {
      navigation.transitionTo('enterPayment');
    } else if (!hasSeenLocationPopup) {
      navigation.transitionTo('location');
    } else {
      navigation.transitionToTop('venues');
    }
  }

  showTermsAndConditions() {
    this.props.navigation.transitionTo('legal');
  }

  /*
   * Register user and go to the app immediately
   */
  registerUser() {
    this.props.actions.auth
      .register(this.props.auth.registerForm.fields)
      .then(user => this.onUserRegistered(user));
  }

  registerUserWithFacebook() {
    this.props.actions.auth
      .loginWithFacebook()
      .then(user => this.onUserRegistered(user));
  }

  render() {
    const {
      actions: {auth: actions},
      auth: {registerForm: form, isFacebookLoginPending},
      navigation,
      animations: {fadeOut, slideUp},
      msg
    } = this.props;

    return (
      <Animated.View style={[slideUp, style.container]}>

        <Animated.View style={fadeOut}>

          <Header
            iconStyle={{opacity: 0.4}}
            onBackIconClick={navigation.pop}
            title={msg.register.preTitle}
            type='big'
          />

          <View style={style.buttonWrapper}>
            <Button
              className='info'
              disabled={form.isPending}
              onPress={() => this.registerUserWithFacebook()}
              title={msg.register.button.facebookLogin}
            />
          </View>

          <Text style={style.alternativeWay}>
            {msg.register.alternativeWay.toUpperCase()}
          </Text>

        </Animated.View>

        <RegisterForm
          form={form}
          msg={msg.auth.registerForm}
          onInputChange={actions.updateRegisterFormField}
          onInputSubmit={() => this.registerUser()}
        />

        <Text
          onPress={() => this.showTermsAndConditions()}
          style={style.termsLink}>
          {msg.register.terms.toUpperCase()}
          <Text style={style.bolded}>{msg.register.termsLink.toUpperCase()}</Text>
        </Text>

        <View style={[style.buttonWrapper, style.lastWrapper]}>
          <Button
            className='primary'
            disabled={form.isPending}
            onPress={() => this.registerUser()}
            title={msg.register.button.signUp}
          />
        </View>

        <ProgressHUD isVisible={form.isPending || isFacebookLoginPending} />

      </Animated.View>
    );
  }

}

export default trackKeyboard(
  pureRender(Register, ['app']),
  {scaleFactor: trackKeyboardValue}
);
