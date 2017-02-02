/* eslint no-undef:0 */

import {Map} from 'immutable';

jest.dontMock('../loginForm');

describe('login#form', () => {

  const LoginForm = require('../loginForm').default;

  describe('constructor()', () => {

    it('should set pending property to false', () => {
      const form = new LoginForm();
      expect(form.isPending).toBe(false);
    });

    it('should set errors to Map', () => {
      const form = new LoginForm();
      expect(Map.isMap(form.errors)).toBe(true);
    });

  });

  describe('fields', () => {

    it('should contain email and password', () => {
      const form = new LoginForm();
      expect(form.fields.email).toBeDefined();
      expect(form.fields.password).toBeDefined();
    });

  });

});
