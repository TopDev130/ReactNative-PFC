import {actions} from './actions';
import {actions as appActions} from '../app/actions';
import {actions as authActions} from '../auth/actions';
import User from './user';
import Card from './card';
import ProfileForm from './profileForm';
import * as forms from '../lib/forms';
import {Record, List} from 'immutable';

const initialState = new (Record({
  profileForm: new ProfileForm,
  profile: null,
  isLogoutPending: false,
  hasRemoteSession: false,
  hasSeenNotificationsPopup: false,
  hasSeenLocationPopup: false
}));

const revive = state => {
  const user = state.get('profile');
  return initialState.merge({
    profileForm: new ProfileForm(state.get('profileForm')),
    profile: user ? new User(user) : null,
    hasRemoteSession: state.get('hasRemoteSession'),
    hasSeenNotificationsPopup: state.get('hasSeenNotificationsPopup'),
    hasSeenLocationPopup: state.get('hasSeenLocationPopup')
  });
};


export default function userStore(state = initialState, action, payload) {
  if (!action) return revive(state);

  switch (action) {

    case actions.registerForLocationUpdates:
      return state.set('hasSeenLocationPopup', true);

    case actions.registerRemoteSessionSuccess:
      return state.set('hasRemoteSession', true);

    case actions.registerRemoteSession:
      return state.remove('hasRemoteSession');

    case actions.registerForRemoteNotifications:
      return state.set('hasSeenNotificationsPopup', true);

    case appActions.apiError:
      if (payload.statusCode === 401) {
        return state
          .remove('profile')
          .remove('profileForm')
          .remove('hasRemoteSession');
      }
      return state;

    case authActions.logout:
      return state.set('isLogoutPending', true);

    case authActions.logoutError:
      return state.set('isLogoutPending', false);

    case authActions.logoutSuccess:
      return state
        .set('isLogoutPending', false)
        .remove('profileForm')
        .remove('profile')
        .remove('hasRemoteSession');

    case actions.setDefaultCardSuccess:
    case actions.deleteCardSuccess:
    case authActions.addPaymentSuccess: {
      const cards = payload.map(card => new Card(card));
      return state
        .setIn(['profile', 'cards'], List(cards))
        .setIn(['profile', 'isPending'], false);
    }

    case authActions.registerSuccess:
    case authActions.setNewPasswordSuccess:
    case authActions.loginSuccess:
      return state.set('profile', new User(payload));

    case actions.toggleProfileEdit:
      return state.set('profileForm', new ProfileForm({
        fields: state.profile
      }));

    case actions.updateProfile:
      return forms
        .markFormPending(state, 'profileForm')
        .setIn(['profileForm', 'isDatePickerVisible'], false);

    case actions.updateProfileSuccess:
      return state.withMutations(state => {
        const {firstName, lastName, email, dob} = payload;
        const profile = state.profile.merge({
          dob,
          firstName,
          lastName,
          email
        });
        return state
          .set('profile', profile)
          .set('profileForm', new ProfileForm({fields: profile}));
      });

    case actions.updateProfileError:
      return forms.updateFormError(state, 'profileForm', payload);

    case actions.updateProfileFormField:
      return forms.updateFormField(state, 'profileForm', payload);

    case actions.toggleProfileFormDatePicker:
      return state.updateIn(['profileForm', 'isDatePickerVisible'], isVisible => !isVisible);

    case actions.hideProfileFormDatePicker:
      return state.setIn(['profileForm', 'isDatePickerVisible'], false);

    case actions.setDefaultCardError:
    case actions.deleteCardError:
      return state.setIn(['profile', 'isPending'], false);

    case actions.setDefaultCard:
    case actions.deleteCard:
      return state.setIn(['profile', 'isPending'], true);

  }

  return state;
}
