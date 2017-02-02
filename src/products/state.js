import {Record} from 'immutable';

const StateRecord = Record({
  list: null,
  currentCategory: -1,
  isPending: false,
  error: null
});

export default class ProductState extends StateRecord {

  get currentCategory() {
    return this.list && this.get('currentCategory') > -1
      ? this.list.get(this.get('currentCategory'))
      : null;
  }

}
