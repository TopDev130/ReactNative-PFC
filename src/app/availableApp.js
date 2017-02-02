import {Record} from 'immutable';

const AvailableAppRecord = Record({
  name: '',
  generateDeepLink: () => {}
});

const locationMappings = {
  uber: (_, {lat, lng}) => {
    return `uber://?action=setPickup&pickup=my_location&dropoff[latitude]=${lat}&dropoff[longitude]=${lng}`;
  },
  gmaps: (_, {lat, lng}) => {
    return `comgooglemaps://?directionsmode=walking&daddr=${lat},${lng}`;
  },
  amaps: (uloc, {lat, lng}) => {
    return `http://maps.apple.com/?directionsmode=walking&daddr=${lat},${lng}&saddr=${uloc.lat},${uloc.lng}`;
  },
  cmapper: (_, {lat, lng, name}) => {
    return `citymapper://directions?endcoord=${lat},${lng}&endname=${name}`;
  }
};

const titleMappings = {
  uber: 'Uber',
  gmaps: 'Google Maps',
  amaps: 'Apple Maps',
  cmapper: 'City Mapper'
};

export default class AvailableApp extends AvailableAppRecord {

  constructor(type) {
    super({
      name: titleMappings[type],
      generateDeepLink: locationMappings[type]
    });
  }

}
