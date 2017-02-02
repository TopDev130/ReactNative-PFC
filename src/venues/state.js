import {Record} from 'immutable';

const StateRecord = Record({
  list: null,
  currentVenue: -1,
  activeVenue: -1,
  isPending: false,
  error: null,
  isNewToVenue: false,
  locationInVenue: null
});

export default class VenueState extends StateRecord {

  get currentVenue() {
    return this.list && this.get('currentVenue') > -1
      ? this.list.get(this.get('currentVenue'))
      : null;
  }

  get activeVenue() {
    return this.list && this.get('activeVenue') > -1
      ? this.list.get(this.get('activeVenue'))
      : null;
  }

}
