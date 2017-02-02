import React, {PushNotificationIOS} from 'react-native';
import {notifications as config} from '../config';

export default class Notifications extends React.Component {

  static propTypes = {
    onSessionRegistered: React.PropTypes.func.isRequired,
    onSessionRequested: React.PropTypes.func.isRequired,
    user: React.PropTypes.object
  };

  componentWillMount() {
    PushNotificationIOS.addEventListener('register', this.props.onSessionRegistered);
  }

  // Atempt to login for remote notifications
  // if user has launched the app and does not have the remote session
  // yet
  // Mainly for debugging
  componentDidMount() {
    const {hasRemoteSession} = this.props.user;

    if (hasRemoteSession) return;

    this.registerForPushNotifications();
  }

  // Request push notifications only if user has changed
  // and has already seen notifications popup
  componentDidUpdate(prevProps) {
    const shouldRegister = prevProps.user.profile !== this.props.user.profile
      && this.props.user.hasSeenNotificationsPopup;

    if (!shouldRegister) return;

    this.registerForPushNotifications();
  }

  componentWillUnmount() {
    PushNotificationIOS.removeEventListener(this.props.onSessionRegistered);
  }

  registerForPushNotifications() {
    const {profile, hasSeenNotificationsPopup} = this.props.user;

    if (profile && hasSeenNotificationsPopup) {
      this.props.onSessionRequested(config.permissions);
    }
  }

  render() {
    return null;
  }

}
