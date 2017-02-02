/* eslint no-undef:0 */

import {Map} from 'immutable';

jest.dontMock('../profileForm');

describe('profile#form', () => {

  const ProfileForm = require('../profileForm').default;

  describe('constructor()', () => {

    it('should set pending property to false', () => {
      const form = new ProfileForm();
      expect(form.isPending).toBe(false);
    });

    it('should set isDatePickerVisible property to false', () => {
      const form = new ProfileForm();
      expect(form.isDatePickerVisible).toBe(false);
    });

    it('should set errors to Map', () => {
      const form = new ProfileForm();
      expect(Map.isMap(form.errors)).toBe(true);
    });

  });

  describe('fields', () => {

    it('should contain first name, last name, email and dob', () => {
      const form = new ProfileForm();
      expect(form.fields.firstName).toBeDefined();
      expect(form.fields.lastName).toBeDefined();
      expect(form.fields.email).toBeDefined();
      expect(form.fields.dob).toBeDefined();
    });

  });

});
