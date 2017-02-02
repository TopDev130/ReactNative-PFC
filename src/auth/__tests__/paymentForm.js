/* eslint no-undef:0 */

import {Map} from 'immutable';

jest.dontMock('../paymentForm');

describe('payment#form', () => {

  const PaymentForm = require('../paymentForm').default;

  describe('constructor()', () => {

    it('should set pending property to false', () => {
      const form = new PaymentForm();
      expect(form.isPending).toBe(false);
    });

    it('should set errors to Map', () => {
      const form = new PaymentForm();
      expect(Map.isMap(form.errors)).toBe(true);
    });

  });

  describe('fields', () => {

    it('should contain card number, card name, expiry date, ccv number', () => {
      const form = new PaymentForm();
      expect(form.fields.cardNumber).toBeDefined();
      expect(form.fields.cardName).toBeDefined();
      expect(form.fields.expiryDate).toBeDefined();
      expect(form.fields.ccv).toBeDefined();
    });

  });

});
