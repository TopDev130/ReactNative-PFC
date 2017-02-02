/* eslint no-undef:0 */

import immutable from 'immutable';

jest.setMock('react-native', {
  PushNotificationIOS: {}
});

jest.dontMock('../store');
jest.dontMock('../profileForm');
jest.dontMock('../user');

const initialState = immutable.fromJS({
  profileForm: {fields: {email: 'test@mail.com'}},
  profile: null
});

const profileInitialState = immutable.fromJS({
  profile: {
    email: 'test@mail.com',
    isPending: false
  }
});


describe('user#store', () => {

  const store = require('../store').default;
  const ProfileForm = require('../profileForm').default;

  describe('store()', () => {

    it('should have initial state', () => {
      const state = store();
      expect(state.profileForm instanceof ProfileForm).toBe(true);
      expect(state.profile).toBe(null);
    });

    describe('revive', () => {

      it('should revive profile correctly', () => {
        const state = store(profileInitialState).toJS();
        const passedState = profileInitialState.toJS();
        expect(state.profile.email).toBe(passedState.profile.email);
      });

      it('should revive profile form fields correctly', () => {
        const state = store(initialState).toJS();
        const passedState = initialState.toJS();
        expect(state.profileForm.fields.email).toEqual(passedState.profileForm.fields.email);
      });

      it('should not revive isPending flag', () => {
        const state = store(profileInitialState).toJS();
        expect(state.profile.isPending).toEqual(false);
      });

    });

  });

});
