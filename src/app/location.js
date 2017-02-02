import {Record} from 'immutable';

const LocationRecord = Record({
  lng: 0,
  lat: 0
});

export default class Location extends LocationRecord {

  isValid() {
    return this.lng > 0 && this.lat > 0;
  }

}
