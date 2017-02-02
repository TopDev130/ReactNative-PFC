import {Record, fromJS} from 'immutable';

const EventRecord = Record({
  _id: '',
  title: '',
  description: '',
  background: '',
  start: null
});

export default class Event extends EventRecord {

  constructor(data) {
    super(fromJS(data)
      .update('start', start => new Date(start)));
  }

}
