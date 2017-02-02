import ProgressHUD from '@moonjs/react-native-progresshud';
import React, {Animated, View, Text, AlertIOS} from 'react-native';
import pureRender from '@moonjs/react-native-purerender';
import trackKeyboard from '@moonjs/react-native-trackkeyboard';
import Header from '../components/header.react';
import Button from '../components/button.react';
import ResetPasswordForm from '../auth/resetPasswordForm.react';
import style from './resetPassword.style.js';

/**
 * A Reset password page
 */
class ResetPassword extends React.Component {

  static propTypes = {
    actions: React.PropTypes.object.isRequired,
    animations: React.PropTypes.object.isRequired,
    auth: React.PropTypes.object.isRequired,
    msg: React.PropTypes.object.isRequired,
    navigation: React.PropTypes.object.isRequired
  };

  resetPassword() {
    const {
     actions: {auth: actions},
     auth: {resetPasswordForm: form},
     msg: {resetPassword: msg}
    } = this.props;

    actions
      .resetPassword(form.fields.toJS())
      .then(_ => {
        AlertIOS.alert(msg.successTitle, msg.successDescription);
      });
  }

  render() {
    const {
      actions: {auth: actions},
      auth: {resetPasswordForm: form},
      animations: {slideUp, fadeOut},
      msg,
      navigation
    } = this.props;

    return (
      <Animated.View style={[style.container, slideUp]}>

        <Animated.View style={fadeOut}>

          <Header
            iconStyle={{opacity: 0.4}}
            onBackIconClick={navigation.pop}
            title={msg.resetPassword.title}
            type='big'
          />

        </Animated.View>

        <Text style={style.textWrapper}>
          {msg.resetPassword.text}
        </Text>

        <ResetPasswordForm
          form={form}
          msg={msg.auth.resetPasswordForm}
          onInputChange={actions.updateResetPasswordFormField}
          onInputSubmit={this.resetPassword.bind(this)}
        />

        <Animated.View style={[style.buttonWrapper, fadeOut, {paddingBottom: 12}]}>
          <Button
            className='primary'
            disabled={form.isPending}
            onPress={this.resetPassword.bind(this)}
            title={msg.resetPassword.button.submit}
          />
        </Animated.View>

        <ProgressHUD isVisible={form.isPending} />

      </Animated.View>
    );
  }

}

export default trackKeyboard(
  pureRender(ResetPassword, ['app']),
  {scaleFactor: 2}
);
