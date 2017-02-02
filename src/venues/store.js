import {actions} from './actions';
import {actions as authActions} from '../auth/actions';
import {actions as productActions} from '../products/actions';
import Venue from './venue';
import {List} from 'immutable';
import VenueState from './state';
import VenueBeacon from './venueBeacon';

const initialState = new VenueState();

const revive = state => {
  const list = state.get('list');
  const activeVenue = state.get('activeVenue') || -1;
  const currentVenue = state.get('currentVenue') || -1;
  return initialState.merge({
    list: list ? list.map(venue => new Venue(venue)) : null,
    activeVenue,
    currentVenue
  });
};

export default function venueStore(state = initialState, action, payload) {
  if (!action) return revive(state);

  switch (action) {

    case actions.getVenues:
      return state
        .set('isPending', !state.list || state.list.size === 0)
        .remove('activeVenue')
        .remove('locationInVenue')
        .remove('currentVenue')
        .remove('error');

    case actions.getVenueBeacons: {
      const idx = state.get('activeVenue');
      return state.setIn(['list', idx, 'beacons'], List());
    }

    case actions.getVenueBeaconsSuccess: {
      const idx = state.get('activeVenue');
      const beacons = List(payload.map(b => new VenueBeacon(b)));
      return state.setIn(['list', idx, 'beacons'], beacons);
    }

    case actions.setLocationFromBeacon: {
      const {location} = payload;
      return state.set('locationInVenue', location);
    }

    case productActions.selectProductCategory:
      return state.set('isNewToVenue', false);

    case actions.removeLocationFromBeacon:
      return state.set('locationInVenue', null);

    case actions.getVenuesError:
      return state
        .remove('isPending')
        .remove('list')
        .set('error', payload);

    case actions.getVenuesSuccess:
      return state
        .remove('isPending')
        .set('list', List(payload.map(venue => new Venue(venue))));

    case actions.selectVenueByLocation:
      return state.set('activeVenue', 0);

    case actions.selectVenue:
      return state.set('currentVenue', findIndexInList(state, payload));

    case actions.chooseVenue:
      return state
        .set('activeVenue', findIndexInList(state, payload.venue))
        .set('isNewToVenue', !payload.isSilent)
        .remove('locationInVenue');

    case actions.hideWelcomeBar:
      return state.set('isNewToVenue', false);

    case authActions.logoutSuccess:
      return state
        .remove('locationInVenue')
        .set('activeVenue', -1);
  }

  return state;
}

function findIndexInList(venues, data) {
  return venues.get('list').findIndex(venue => venue._id === data._id);
}
