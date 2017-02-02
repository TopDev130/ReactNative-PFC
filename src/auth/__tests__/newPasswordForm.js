/* eslint no-undef:0 */

import {Map} from 'immutable';

jest.dontMock('../newPasswordForm');

describe('newPassword#form', () => {

  const NewPasswordForm = require('../newPasswordForm').default;

  describe('constructor()', () => {

    it('should set pending property to false', () => {
      const form = new NewPasswordForm();
      expect(form.isPending).toBe(false);
    });

    it('should set errors to Map', () => {
      const form = new NewPasswordForm();
      expect(Map.isMap(form.errors)).toBe(true);
    });

  });

  describe('fields', () => {

    it('should contain password and password confirmation', () => {
      const form = new NewPasswordForm();
      expect(form.fields.password).toBeDefined();
      expect(form.fields.checkPassword).toBeDefined();
    });

  });

});
