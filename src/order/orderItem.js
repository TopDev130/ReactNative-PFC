import {fromJS, Record} from 'immutable';
import Product from '../products/product';

const OrderItemRecord = Record({
  quantity: 0,
  price: 0,
  option: null,
  product: null
});

export default class OrderItem extends OrderItemRecord {
  constructor(data, {processingFee = 0}) {
    super(fromJS(data)
      .update('price', p => p + p * processingFee)
      .update('product', p => new Product(p, {processingFee})));
  }
}
