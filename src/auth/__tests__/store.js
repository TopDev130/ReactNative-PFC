/* eslint no-undef:0 */

import immutable from 'immutable';

jest.dontMock('../store');
jest.dontMock('../paymentForm');
jest.dontMock('../loginForm');
jest.dontMock('../registerForm');

const initialState = immutable.fromJS({
  paymentForm: {fields: {card: 424242}},
  registerForm: {fields: {email: 'grabbou@gmail.com'}},
  loginForm: {fields: {email: 'grabbou@gmail.com'}}
});

describe('auth#store', () => {

  const store = require('../store').default;
  const PaymentForm = require('../paymentForm').default;
  const LoginForm = require('../loginForm').default;
  const RegisterForm = require('../registerForm').default;

  describe('store()', () => {

    it('should have initial state', () => {
      const state = store();
      expect(state.paymentForm instanceof PaymentForm).toBe(true);
      expect(state.loginForm instanceof LoginForm).toBe(true);
      expect(state.registerForm instanceof RegisterForm).toBe(true);
    });

    it('should revive all forms correctly', () => {
      const state = store(initialState).toJS();
      const passedState = initialState.toJS();
      expect(state.paymentForm.fields.card).toEqual(passedState.paymentForm.fields.card);
      expect(state.loginForm.fields.email).toEqual(passedState.loginForm.fields.email);
      expect(state.registerForm.fields.card).toEqual(passedState.registerForm.fields.card);
    });

  });

});
