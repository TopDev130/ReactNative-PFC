import {Record} from 'immutable';

const CardRecord = Record({
  _id: '',
  last4: '',
  expiryMonth: '',
  name: '',
  expiryYear: '',
  brand: '',
  country: '',
  isDefault: false
});

export default class Card extends CardRecord {}
