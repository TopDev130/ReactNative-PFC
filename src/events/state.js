import {Record} from 'immutable';

const StateRecord = Record({
  list: null,
  isPending: false,
  error: null,
  currentEvent: -1
});

export default class EventState extends StateRecord {

  get currentEvent() {
    return this.get('currentEvent') > -1
      ? this.getIn(['list', this.get('currentEvent')])
      : null;
  }

}
