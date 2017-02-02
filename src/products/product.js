import {fromJS, Record, List} from 'immutable';

export const OptionsRecord = Record({
  _id: '',
  kind: '',
  price: ''
});

const ProductRecord = Record({
  _id: '',
  title: '',
  description: '',
  options: List()
});

/**
 * Creates new product and automatically filters out options that are not available
 * for purchase
 */
export default class Product extends ProductRecord {

  constructor(data, {processingFee = 0} = {}) {
    super(fromJS(data)
      .update('options', options => options
        .filter(o => o.get('active'))
        .map(o => new OptionsRecord(
          o.update('price', price => price + price * processingFee)
        ))
        .sort((a, b) => a.price - b.price)
      ));
  }

}
