import {actions as app} from '../app/actions';

export const actions = create();
export const feature = 'venues';

export function create(dispatch, api) {

  return {

    //@todo Get rid of maxDistance once we submit the app
    getVenuesError() {},
    getVenuesSuccess() {},
    getVenues({lat, lng}) {
      dispatch(actions.getVenues);

      return api
        .fetch(`venues?lat=${lat}&lng=${lng}&maxDistance=1000000000`)
        .tap(payload => dispatch(actions.getVenuesSuccess, payload))
        .catch(err => {
          dispatch([actions.getVenuesError, app.apiError], err);
          throw err;
        });
    },

    getVenueBeaconsSuccess() {},
    getVenueBeacons({region}) {
      dispatch(actions.getVenueBeacons);

      return api
        .fetch(`beacons/${region}`)
        .tap(payload => dispatch(actions.getVenueBeaconsSuccess, payload));
    },

    removeLocationFromBeacon() {
      dispatch(actions.removeLocationFromBeacon);
    },

    setLocationFromBeacon(beacon) {
      dispatch(actions.setLocationFromBeacon, beacon);
    },

    selectVenueByLocation() {
      dispatch(actions.selectVenueByLocation);
    },

    selectVenue(venue) {
      dispatch(actions.selectVenue, venue);
    },

    chooseVenue(venue, isSilent) {
      dispatch(actions.chooseVenue, {venue, isSilent});
    },

    hideWelcomeBar() {
      dispatch(actions.hideWelcomeBar);
    }

  };

}
