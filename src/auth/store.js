import {actions} from './actions';
import RegisterForm from './registerForm';
import LoginForm from './loginForm';
import PaymentForm from './paymentForm';
import ResetPasswordForm from './resetPasswordForm';
import NewPasswordForm from './newPasswordForm';
import * as forms from '../lib/forms';
import {Record, Map} from 'immutable';

const initialState = new (Record({
  registerForm: null,
  loginForm: null,
  paymentForm: null,
  newPasswordCheck: new (Record({
    isPending: false,
    errors: Map({})
  })),
  resetPasswordForm: null,
  newPasswordForm: null,
  isFacebookLoginPending: false
}));

const revive = state => initialState.merge({
  registerForm: new RegisterForm(state.get('registerForm')),
  loginForm: new LoginForm(state.get('loginForm')),
  paymentForm: new PaymentForm(state.get('paymentForm')),
  resetPasswordForm: new ResetPasswordForm(state.get('resetPasswordForm')),
  newPasswordForm: new NewPasswordForm(state.get('newPasswordForm'))
});

export default function authStore(state = initialState, action, payload) {
  if (!action) return revive(state);

  switch (action) {

    case actions.registerSuccess:
    case actions.loginSuccess:
    case actions.addPaymentSuccess:
    case actions.resetPasswordSuccess:
    case actions.setNewPasswordSuccess:
      return state
        .set('registerForm', new RegisterForm)
        .set('resetPasswordForm', new ResetPasswordForm)
        .set('loginForm', new LoginForm)
        .set('newPasswordForm', new NewPasswordForm)
        .set('paymentForm', new PaymentForm)
        .set('isFacebookLoginPending', false);

    case actions.loginWithFacebook:
      return state.set('isFacebookLoginPending', true);

    case actions.register:
      return forms.markFormPending(state, 'registerForm');

    case actions.login:
      return forms.markFormPending(state, 'loginForm');

    case actions.addPayment:
      return forms.markFormPending(state, 'paymentForm');

    case actions.registerError:
      return forms.updateFormError(state, 'registerForm', payload);

    case actions.loginError:
      return forms
        .updateFormError(state, 'loginForm', payload)
        .set('isFacebookLoginPending', false);

    case actions.addPaymentError:
      return forms.updateFormError(state, 'paymentForm', payload);

    case actions.resetPassword:
      return forms.markFormPending(state, 'resetPasswordForm');

    case actions.setNewPassword:
      return forms.markFormPending(state, 'newPasswordForm');

    case actions.setNewPasswordError:
      return forms.updateFormError(state, 'newPasswordForm', payload);

    case actions.resetPasswordError:
      return forms.updateFormError(state, 'resetPasswordForm', payload);

    case actions.updateRegisterFormField:
      return forms.updateFormField(state, 'registerForm', payload);

    case actions.updateLoginFormField:
      return forms.updateFormField(state, 'loginForm', payload);

    case actions.updatePaymentFormField:
      return forms.updateFormField(state, 'paymentForm', payload);

    case actions.updateResetPasswordFormField:
      return forms.updateFormField(state, 'resetPasswordForm', payload);

    case actions.updateNewPasswordFormField:
      return forms.updateFormField(state, 'newPasswordForm', payload);

    case actions.addCardDetails:
      return state.updateIn(['paymentForm', 'fields'], fields => {
        const {cardNumber, cvv, expiryYear, expiryMonth} = payload;
        return fields
          .set('cardNumber', cardNumber)
          .set('ccv', cvv)
          .set('expiryDate', expiryYear && expiryMonth
            ? `${expiryMonth}/${expiryYear.slice(-2)}`
            : null);
      });

    case actions.validateResetToken:
      return state.update('newPasswordCheck', state => {
        return state
          .remove('errors')
          .set('isPending', true);
      });

    case actions.validateResetTokenError:
      return state.update('newPasswordCheck', state => {
        return state
          .set('errors', Map(payload))
          .remove('isPending');
      });

    case actions.validateResetTokenSuccess:
      return state.update('newPasswordCheck', state => {
        return state.remove('isPending');
      });
  }

  return state;
}
