import {Map, List, Record} from 'immutable';
import Card from './card';

const UserRecord = Record({
  _id: '',
  firstName: '',
  lastName: '',
  email: '',
  token: '',
  hash: '',
  cards: List([]),
  dob: null,
  isPending: false
});

export default class User extends UserRecord {

  constructor(data) {
    super(Map(data)
      .update('cards', (cards = []) => List(cards.map(card => new Card(card))))
      .set('isPending', false));
  }

  /**
   * Gets user display display name
   * by concatenating first & last name
   */
  get displayName() {
    return `${this.firstName} ${this.lastName}`;
  }

  /**
   * Checks if user has valid payment data
   *
   * @returns {boolean} true if payment data is valid, false otherwise
   */
  hasPaymentData() {
    return this.cards.size > 0;
  }

  /**
   * Gets avatar image from gravatar API
   */
  get avatar() {
    return `http://www.gravatar.com/avatar/${this.hash}`;
  }

}
