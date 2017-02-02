import {Record} from 'immutable';

const BeaconRecord = Record({
  proximity: '',
  major: 0,
  minor: 0,
  location: '',
  isEntrance: false
});

export default class VenueBeacon extends BeaconRecord {

  isEqualTo({uuid, major, minor}) {
    return this.proximity.toUpperCase() === uuid.toUpperCase()
      && this.major === major
      && this.minor === minor;
  }

}
