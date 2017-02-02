import {Record} from 'immutable';

const BasketItemRecord = Record({
  product: null,
  option: null,
  quantity: 0
});

export default class BasketItem extends BasketItemRecord {}
