import {fromJS, Record} from 'immutable';
import VenueLabel from './venueLabel';


const LocationRecord = Record({
  name: '',
  loc: [],
  distance: 0
});

class Location extends LocationRecord {

  get lng() {
    return this.getIn(['loc', 0]);
  }

  get lat() {
    return this.getIn(['loc', 1]);
  }

}

const VenueRecord = Record({
  _id: '',
  title: '',
  description: '',
  address: new Location,
  phone: 0,
  logo: '',
  background: '',
  region: '',
  beacons: null,
  events: null,
  processingFee: 0,
  wePayStripe: false,
  distance: 0,
  collectionMessage: null,
  labels: []
});

export default class Venue extends VenueRecord {

  constructor(data) {
    super(fromJS(data)
      .update('address', address => new Location(address))
      .update('labels', (labels = []) => labels.map(l => new VenueLabel(l))));
  }

  hasBeaconsLoaded() {
    return !!this.beacons;
  }

  hasBeacons() {
    return this.region && this.region.length > 0;
  }

}
