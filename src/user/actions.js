export const actions = create();
import {actions as app} from '../app/actions';
import {PushNotificationIOS} from 'react-native';
import Beacons from 'react-native-ibeacon';
export const feature = 'user';
export const deps = [PushNotificationIOS, Beacons];

export function create(dispatch, api, notifications, beacons) {

  return {

    registerForLocationUpdates() {
      dispatch(actions.registerForLocationUpdates);
      beacons.requestWhenInUseAuthorization();
    },

    registerForRemoteNotifications(config) {
      dispatch(actions.registerForRemoteNotifications);
      notifications.requestPermissions(config);
    },

    registerRemoteSessionSuccess() {},
    registerRemoteSessionError() {},
    registerRemoteSession(token) {
      dispatch(actions.registerRemoteSession);

      return api
        .fetch(`users/me/currentSession`, {
          method: 'PUT',
          body: JSON.stringify({
            deviceId: token,
            platform: 'ios'
          })
        })
        .tap(payload => dispatch(actions.registerRemoteSessionSuccess, payload))
        .catch(errors => {
          dispatch(app.apiError, errors);
          throw errors;
        });
    },

    deleteCardSuccess() {},
    deleteCardError() {},
    deleteCard(card) {
      dispatch(actions.deleteCard);

      return api
        .fetch(`users/me/cards/${card._id}`, {
          method: 'DELETE'
        })
        .tap(payload => dispatch(actions.deleteCardSuccess, payload))
        .catch(errors => {
          dispatch([actions.deleteCardError, app.apiError], errors);
          throw errors;
        });
    },

    setDefaultCardSuccess() {},
    setDefaultCardError() {},
    setDefaultCard(card) {
      dispatch(actions.setDefaultCard);

      return api
        .fetch(`users/me/cards/${card._id}`, {
          method: 'PUT',
          body: JSON.stringify({
            isDefault: true
          })
        })
        .tap(payload => dispatch(actions.setDefaultCardSuccess, payload))
        .catch(errors => {
          dispatch([actions.setDefaultCardError, app.apiError], errors);
          throw errors;
        });
    },

    toggleProfileEdit() {
      dispatch(actions.toggleProfileEdit);
    },

    updateProfileSuccess() {},
    updateProfileError() {},
    updateProfile(fields) {
      dispatch(actions.updateProfile);

      return api
        .fetch('users/me', {
          method: 'PUT',
          body: JSON.stringify(fields)
        })
        .tap(payload => dispatch(actions.updateProfileSuccess, payload))
        .catch(errors => {
          dispatch([actions.updateProfileError, app.apiError], errors);
          throw errors;
        });
    },

    toggleProfileFormDatePicker() {
      dispatch(actions.toggleProfileFormDatePicker);
    },

    hideProfileFormDatePicker() {
      dispatch(actions.hideProfileFormDatePicker);
    },

    updateProfileFormField(name, value) {
      dispatch(actions.updateProfileFormField, {name, value});
    },

    togglePermission(permission) {
      dispatch(actions.togglePermission, permission);
    }

  };

}
