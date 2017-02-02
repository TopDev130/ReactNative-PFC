/* eslint no-undef:0 */

import {Map} from 'immutable';

jest.dontMock('../resetPasswordForm');

describe('resetPassword#form', () => {

  const ResetPasswordForm = require('../resetPasswordForm').default;

  describe('constructor()', () => {

    it('should set pending property to false', () => {
      const form = new ResetPasswordForm();
      expect(form.isPending).toBe(false);
    });

    it('should set errors to Map', () => {
      const form = new ResetPasswordForm();
      expect(Map.isMap(form.errors)).toBe(true);
    });

  });

  describe('fields', () => {

    it('should contain email', () => {
      const form = new ResetPasswordForm();
      expect(form.fields.email).toBeDefined();
    });

  });

});
