/* eslint no-undef:0 */

import {Map} from 'immutable';

jest.dontMock('../registerForm');

describe('register#form', () => {

  const RegisterForm = require('../registerForm').default;

  describe('constructor()', () => {

    it('should set pending property to false', () => {
      const form = new RegisterForm();
      expect(form.isPending).toBe(false);
    });

    it('should set errors to Map', () => {
      const form = new RegisterForm();
      expect(Map.isMap(form.errors)).toBe(true);
    });

  });

  describe('fields', () => {

    it('should contain first name, last name, email and password', () => {
      const form = new RegisterForm();
      expect(form.fields.firstName).toBeDefined();
      expect(form.fields.lastName).toBeDefined();
      expect(form.fields.email).toBeDefined();
      expect(form.fields.password).toBeDefined();
    });

  });

});
