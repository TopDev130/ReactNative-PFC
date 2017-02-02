import {fromJS, Record, List} from 'immutable';
import Product from './product';

const CategoryRecord = Record({
  _id: '',
  title: '',
  categories: List(),
  products: List()
});

export default class Category extends CategoryRecord {

  constructor(data, venue) {
    super(fromJS(data)
      .update('categories', categories => categories.map(c => new Category(c, venue)))
      .update('products', products => products.map(p => new Product(p, venue))));
  }

}
