/* eslint camelcase:0 */

import {Record, Map} from 'immutable';
import moment from 'moment';

const PaymentFormRecord = Record({
  fields: new (Record({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    ccv: ''
  })),
  isPending: false,
  errors: Map({})
});

export default class PaymentForm extends PaymentFormRecord {

  /**
   * Gets stripe form
   */
  get stripeForm() {
    const expiryDate = moment(this.fields.expiryDate, 'MM/YY');
    return {
      number: this.fields.cardNumber,
      exp_month: expiryDate.month() + 1,
      exp_year: expiryDate.year(),
      cvc: this.fields.ccv
    };
  }

}
