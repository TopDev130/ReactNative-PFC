import {fromJS, Record, List} from 'immutable';
import moment from 'moment';
import Card from '../user/card';
import OrderItem from './orderItem';
import Venue from '../venues/venue';
import {createSelector} from 'reselect';

const OrderAmount = Record({
  total: 0,
  stripeFee: 0,
  base: 0
});

const OrderRecord = Record({
  _id: '',
  orderId: 0,
  products: null,
  location: null,
  venue: null,
  password: '',
  basket: List([]),
  amount: new OrderAmount,
  processingFee: 0,
  statuses: List([]),
  card: null
});

const selectQuantity = createSelector(
  state => state.basket,
  basket => basket
    ? basket.reduce((acc, item) => acc + item.quantity, 0)
    : 0
);

export default class Order extends OrderRecord {

  constructor(payload) {
    const data = fromJS(payload);
    const processingFee = data.get('processingFee');

    super(data
      .update('basket', b => b.map(i => new OrderItem(i, {processingFee})))
      .update('card', c => new Card(c))
      .update('amount', a => new OrderAmount(a))
      .update('venue', v => new Venue(v)));
  }

  isNew() {
    return this.status === 'new';
  }

  isProcessing() {
    return this.status === 'processing';
  }

  isRejected() {
    return this.status === 'rejected';
  }

  isCancelled() {
    return this.status === 'cancelled';
  }

  isCollection() {
    return this.location === null;
  }

  isFinished() {
    return this.status === 'finished';
  }

  get quantity() {
    return selectQuantity(this);
  }

  get status() {
    return this.statuses.getIn([0, 'status']);
  }

  get statusDetails() {
    return this.statuses.getIn([0, 'statusDetails']);
  }

  get createdAt() {
    return this.statuses.getIn([0, 'createdAt']);
  }

  /**
   * Gets
   */
  get date() {
    return moment(this.createdAt).format('D/MM/YY h:mmA');
  }

}
