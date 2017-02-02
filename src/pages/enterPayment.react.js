import pureRender from '@moonjs/react-native-purerender';
import ProgressHUD from '@moonjs/react-native-progresshud';
import React, {ActionSheetIOS, Animated, View, Text, Image} from 'react-native';
import {CardScanManager} from 'CardScan';
import trackKeyboard from '@moonjs/react-native-trackkeyboard';
import Header from '../components/header.react';
import Button from '../components/button.react';
import PaymentForm from '../auth/paymentForm.react';
import {fullWidth} from '../app/app.style';
import style, {cardTrackKeyboardValue} from './register.style';
import {trackEvent} from 'Analytics';

const isScanAvailable = CardScanManager.isAvailable;

/*
 * EnterPayment page
 * Asks user to provide payment details
 */
class EnterPayment extends React.Component {

  static propTypes = {
    actions: React.PropTypes.object.isRequired,
    animations: React.PropTypes.object.isRequired,
    auth: React.PropTypes.object.isRequired,
    msg: React.PropTypes.object.isRequired,
    navigation: React.PropTypes.object.isRequired,
    redirectToProfile: React.PropTypes.bool,
    user: React.PropTypes.object.isRequired
  };

  /**
   * Saves payment info and redirects back to the application
   */
  savePaymentInfo() {
    const {
      actions: {auth: actions},
      auth: {paymentForm: form},
      navigation,
      redirectToProfile,
      user: {hasSeenLocationPopup}
    } = this.props;

    actions
      .addPayment(form.stripeForm, {cardName: form.fields.cardName})
      .then(_ => {
        trackEvent('Added card');

        if (redirectToProfile) {
          return navigation.pop();
        }

        if (!hasSeenLocationPopup) {
          navigation.transitionTo('location');
        } else {
          navigation.transitionToTop('venues');
        }
      });
  }

  logout() {
    const {
      actions: {auth: actions},
      msg: {profile: {logoutConfirmation: msg}}
    } = this.props;

    let options = [msg.title, msg.cancel];

    ActionSheetIOS.showActionSheetWithOptions({
      options: options,
      destructiveButtonIndex: 0,
      cancelButtonIndex: 1,
      title: msg.message
    }, index => {
      if (index === 0) {
        actions.logout();
        trackEvent('Logged out');
      }
    });
  }

  scanUserCard() {
    this.props.navigation.transitionTo('scanYourCard');
  }

  // Render all the things
  render() {
    const {
      actions: {auth: actions},
      auth: {paymentForm: form},
      redirectToProfile,
      navigation,
      animations: {fadeOut, slideUp},
      msg: {enterPayment: msg, auth: authMsg},
      user: {isLogoutPending}
    } = this.props;

    return (
      <Animated.View style={[style.container, fullWidth, slideUp]}>

        <Animated.View style={[fadeOut, {paddingTop: 20}]}>

          <Header
            iconStyle={{opacity: 0.4}}
            onBackIconClick={redirectToProfile ? navigation.pop : null}
            title={msg.addPayment}
            type='big'
          />

          {isScanAvailable && (
            <View>
              <View style={style.buttonWrapper}>
                <Button
                  className='primary'
                  onPress={() => this.scanUserCard()}
                  title={msg.button.scanYourCard}
                />
              </View>
              <Text style={style.alternativeWay}>
                {msg.alternativeWay.toUpperCase()}
              </Text>
            </View>
          )}

        </Animated.View>

        <PaymentForm
          form={form}
          msg={authMsg.paymentForm}
          onInputChange={actions.updatePaymentFormField}
          onInputSubmit={() => this.savePaymentInfo()}
        />

        <View style={[style.buttonWrapper, style.lastWrapper]}>
          <Button
            className='secondary'
            disabled={form.isPending}
            onPress={() => this.savePaymentInfo()}
            title={msg.button.continue}
          />
        </View>

        {!redirectToProfile && (
          <Text
            onPress={() => this.logout()}
            style={style.logoutButton}>
            {msg.button.logout.toUpperCase()}
          </Text>
        )}

        <View style={[style.stripeWrapper, style.lastWrapper]}>
          <Image
            source={require('../../assets/images/outline.png')}
            style={style.stripeIcon}
          />
        </View>

        <ProgressHUD isVisible={form.isPending || isLogoutPending} />

      </Animated.View>
    );
  }

}

export default trackKeyboard(
  pureRender(
    EnterPayment,
    ['app']
  ),
  {scaleFactor: cardTrackKeyboardValue}
);
