import React, {Animated, View, Text} from 'react-native';
import ProgressHUD from '@moonjs/react-native-progresshud';
import pureRender from '@moonjs/react-native-purerender';
import trackKeyboard from '@moonjs/react-native-trackkeyboard';
import Header from '../components/header.react';
import Button from '../components/button.react';
import NewPasswordForm from '../auth/newPasswordForm.react';
import style from './newPassword.style.js';

/**
 * New password page
 */
class NewPassword extends React.Component {

  static propTypes = {
    actions: React.PropTypes.object.isRequired,
    animations: React.PropTypes.object.isRequired,
    auth: React.PropTypes.object.isRequired,
    msg: React.PropTypes.object.isRequired,
    navigation: React.PropTypes.object.isRequired,
    resetPasswordToken: React.PropTypes.string.isRequired
  };

  setNewPassword() {
    const {
      actions: {auth: actions},
      auth: {newPasswordForm: {fields}},
      resetPasswordToken
    } = this.props;

    actions
      .setNewPassword({...fields.toJS(), resetPasswordToken})
      .then(this.onUserLogged.bind(this));
  }

  onUserLogged(user) {
    const {navigation} = this.props;

    if (user.cards.length === 0) {
      navigation.transitionTo('enterPayment');
    } else {
      navigation.transitionToTop('venues');
    }
  }

  render() {
    const {
      actions: {auth: actions},
      auth: {newPasswordForm: form},
      animations: {slideUp, fadeOut},
      msg
    } = this.props;


    return (
      <Animated.View style={[style.container, slideUp]}>

        <Animated.View style={fadeOut}>

          <Header
            iconStyle={{opacity: 0.4}}
            title={msg.newPassword.title}
            type='big'
          />

        </Animated.View>

        <Text style={style.textWrapper}>
          {msg.newPassword.text}
        </Text>

        <NewPasswordForm
          form={form}
          msg={msg.auth.newPasswordForm}
          onInputChange={actions.updateNewPasswordFormField}
          onInputSubmit={() => this.setNewPassword()}
        />

        <View style={[style.buttonWrapper, {paddingBottom: 12}]}>
          <Button
            className='primary'
            disabled={form.isPending}
            onPress={() => this.setNewPassword()}
            title={msg.newPassword.button.save}
          />
        </View>

        <ProgressHUD isVisible={form.isPending} />

      </Animated.View>
    );
  }

}

export default trackKeyboard(
  pureRender(NewPassword, ['app']),
  {scaleFactor: 2}
);
