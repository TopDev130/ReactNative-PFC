import {actions as app} from '../app/actions';
import * as facebook from './facebook';
import * as stripe from './stripe';

export const actions = create();
export const feature = 'auth';
export const deps = [stripe, facebook];

export function create(dispatch, api, stripe, facebook) {

  return {

    validateResetTokenError() {},
    validateResetTokenSuccess() {},
    validateResetToken(resetPasswordToken) {
      dispatch(actions.validateResetToken);

      return api
        .fetch('auth/validatePasswordToken', {
          method: 'POST',
          body: JSON.stringify({resetPasswordToken})
        })
        .tap(payload => dispatch(actions.validateResetTokenSuccess, payload))
        .catch(err => {
          dispatch([actions.validateResetTokenError, actions.apiError], err);
          throw err;
        });
    },

    registerError() {},
    registerSuccess() {},
    register(fields) {
      dispatch(actions.register);

      return api
        .fetch('auth/register', {
          method: 'POST',
          body: JSON.stringify(fields)
        })
        .tap(payload => dispatch(actions.registerSuccess, payload))
        .catch(err => {
          dispatch([actions.registerError, app.apiError], err);
          throw err;
        });
    },

    loginError() {},
    loginSuccess() {},
    login(fields) {
      dispatch(actions.login);

      return api
        .fetch('auth/login', {
          method: 'POST',
          body: JSON.stringify(fields)
        })
        .tap(payload => dispatch(actions.loginSuccess, payload))
        .catch(err => {
          dispatch([actions.loginError, app.apiError], err);
          throw err;
        });
    },

    loginWithFacebook() {
      dispatch(actions.loginWithFacebook);

      return facebook
        .login()
        .then(facebook.getToken)
        .then(token => {
          return api.fetch('auth/loginWithFacebook', {
            method: 'POST',
            body: JSON.stringify({token})
          });
        })
        .tap(payload => dispatch(actions.loginSuccess, payload))
        .catch(err => {
          dispatch([actions.loginError, app.apiError], err);
          throw err;
        });
    },

    addPaymentError() {},
    addPaymentSuccess() {},
    addPayment(form, {cardName}) {
      dispatch(actions.addPayment);

      return stripe
        .fetch('tokens', {
          method: 'POST',
          body: api.encodeUri({card: form})
        })
        .then(token => {
          return api.fetch('users/me/cards', {
            method: 'POST',
            body: JSON.stringify({
              cardName: cardName || void 0,
              token: token.id
            })
          });
        })
        .tap(payload => dispatch(actions.addPaymentSuccess, payload))
        .catch(err => {
          dispatch([actions.addPaymentError, app.apiError], err);
          throw err;
        });
    },

    resetPasswordSuccess() {},
    resetPasswordError() {},
    resetPassword(fields) {
      dispatch(actions.resetPassword);

      return api
        .fetch('auth/resetPassword', {
          method: 'POST',
          body: JSON.stringify(fields)
        })
        .tap(payload => dispatch(actions.resetPasswordSuccess, payload))
        .catch(errors => {
          dispatch([actions.resetPasswordError, app.apiError], errors);
          throw errors;
        });
    },

    setNewPasswordSuccess() {},
    setNewPasswordError() {},
    setNewPassword(fields) {
      dispatch(actions.setNewPassword);

      return api
        .fetch('auth/loginWithNewPassword', {
          method: 'POST',
          body: JSON.stringify(fields)
        })
        .tap(payload => dispatch(actions.setNewPasswordSuccess, payload))
        .catch(errors => {
          dispatch([actions.setNewPasswordError, app.apiError], errors);
          throw errors;
        });
    },

    addCardDetails(card) {
      dispatch(actions.addCardDetails, card);
    },

    updateRegisterFormField(name, value) {
      dispatch(actions.updateRegisterFormField, {name, value});
    },

    updateLoginFormField(name, value) {
      dispatch(actions.updateLoginFormField, {name, value});
    },

    updatePaymentFormField(name, value) {
      dispatch(actions.updatePaymentFormField, {name, value});
    },

    updateResetPasswordFormField(name, value) {
      dispatch(actions.updateResetPasswordFormField, {name, value});
    },

    updateNewPasswordFormField(name, value) {
      dispatch(actions.updateNewPasswordFormField, {name, value});
    },

    logoutSuccess() {},
    logoutError() {},
    logout() {
      dispatch(actions.logout);

      return api
        .fetch(`auth/logout`, {
          method: 'POST'
        })
        .tap(_ => dispatch(actions.logoutSuccess))
        .catch(err => {
          dispatch([actions.logoutError, app.apiError], err);
          throw err;
        });
    }

  };

}
