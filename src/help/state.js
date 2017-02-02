import {Record} from 'immutable';

const StateRecord = Record({
  list: null,
  isPending: false,
  error: null,
  currentItem: -1
});

export default class HelpState extends StateRecord {

  get currentItem() {
    return this.get('currentItem') > -1
      ? this.getIn(['list', this.get('currentItem')])
      : null;
  }

}
