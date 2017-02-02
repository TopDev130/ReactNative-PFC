import React, {
  Image,
  Linking,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  AlertIOS,
  ActionSheetIOS
} from 'react-native';
import Header from '../components/header.react';
import ProgressHUD from '@moonjs/react-native-progresshud';
import Button from '../components/button.react';
import pureRender from '@moonjs/react-native-purerender';
import ProfileForm from '../user/profileForm.react';
import CardList from '../user/cardList.react';
import style from './profile.style';
import {format} from '../intl/store';
import {trackEvent} from 'Analytics';
import SectionHeader from '../components/sectionHeader.react';
import * as Row from '../components/row.react';

class Profile extends React.Component {

  static propTypes = {
    actions: React.PropTypes.object.isRequired,
    app: React.PropTypes.object.isRequired,
    msg: React.PropTypes.object.isRequired,
    navigation: React.PropTypes.object.isRequired,
    user: React.PropTypes.object.isRequired
  };

  componentWillMount() {
    this.props.actions.user.toggleProfileEdit();
  }

  saveData() {
    const {
      actions: {user: actions},
      user: {profileForm: {fields}},
      msg: {profile: msg}
    } = this.props;

    actions
      .updateProfile({
        ...fields.toJS(),
        dob: fields.dob || void 0
      })
      .then(_ => {
        AlertIOS.alert(msg.successTitle, msg.successDescription);
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

  addNewCard() {
    this.props.navigation.transitionTo('enterPayment', {
      redirectToProfile: true
    });
  }

  markCardAsDefault(card) {
    const {
      actions: {user: actions},
      msg: {profile: {defaultCardAlert: msg}}
    } = this.props;

    actions
      .setDefaultCard(card)
      .catch(err => {
        AlertIOS.alert(msg.errorTitle, err.global || err.message);
      });
  }

  deleteCard(card) {
    const {
      actions: {user: actions},
      msg: {profile: {defaultCardAlert: msg}}
    } = this.props;

    actions
      .deleteCard(card)
      .then(() => trackEvent('Deleted card'))
      .catch(err => {
        AlertIOS.alert(msg.errorTitle, err.global || err.message);
      });
  }

  showMenu() {
    this.props.actions.app.toggleMenu();
    this.refs.profileForm.blur();
    this.props.actions.user.hideProfileFormDatePicker();
  }

  onCardSelected(card) {
    const {
      msg: {profile: {cardSheet: msg}}
    } = this.props;

    let options = [msg.deleteCard, msg.cancel];

    if (!card.isDefault) {
      options.unshift(msg.makeDefault);
    }

    ActionSheetIOS.showActionSheetWithOptions({
      options,
      destructiveButtonIndex: options.length - 2,
      cancelButtonIndex: options.length - 1,
      title: format(msg.title, card)
    }, (index) => {
      if (index === 0 && !card.isDefault) return this.markCardAsDefault(card);
      if (index === options.length - 2) return this.deleteCard(card);
    });
  }

  openSettings() {
    Linking.openURL(this.props.app.settingsURL);
  }

  renderSettingsRow(msg, onSelected) {
    return (
      <Row.Container onSelected={onSelected}>
        <Row.LeftColumn>
          <Text type='rowSubtext'>{msg}</Text>
        </Row.LeftColumn>
        <Row.RightColumn>
          <Image source={require('../../assets/images/lightgrey_next_arrow.png')} />
        </Row.RightColumn>
      </Row.Container>
    );
  }

  render() {
    const {
      actions: {
        user: {
          updateProfileFormField,
          toggleProfileFormDatePicker,
          hideProfileFormDatePicker
        }
      },
      user: {profile, profileForm: form, isLogoutPending},
      msg: {profile: msg}
    } = this.props;

    return (
      <View style={style.container}>

        <Header
          onMenuIconClick={() => this.showMenu()}
          style={style.header}
          title={msg.title}
          withBorder
        />

        <ScrollView automaticallyAdjustContentInsets={false}>

          <ProfileForm
            form={form}
            msg={msg.form}
            onDateInputPress={toggleProfileFormDatePicker}
            onInputChange={updateProfileFormField}
            onInputFocus={hideProfileFormDatePicker}
            ref='profileForm'
          />

          {profile && !form.isDatePickerVisible && (
            <View style={style.cardContainer}>
              <CardList
                items={profile.cards}
                msg={msg.cardList}
                onSelected={card => this.onCardSelected(card)}
              />

              <TouchableOpacity onPress={() => this.addNewCard()}>
                <Text style={style.addNewCardButton}>
                  {msg.button.addNewCard.toUpperCase()}
                </Text>
              </TouchableOpacity>
            </View>
          )}

          <SectionHeader
            title={msg.settings}
            withBorder
          />

          {this.renderSettingsRow(msg.permissions, this.openSettings.bind(this))}

          <View style={style.buttonContainer}>
            <Button
              className='primary'
              onPress={() => this.saveData()}
              style={style.saveButton}
              title={msg.button.save}
            />

            {!form.isDatePickerVisible && (
              <Text
                onPress={() => this.logout()}
                style={style.logoutButton}>
                {msg.button.logout.toUpperCase()}
              </Text>
            )}
          </View>

        </ScrollView>

        <ProgressHUD isVisible={form.isPending || (profile && profile.isPending) || isLogoutPending} />

      </View>
    );
  }
}

export default pureRender(Profile, ['app']);
