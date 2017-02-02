import {actions as app} from '../app/actions';

export const actions = create();
export const feature = 'events';

export function create(dispatch, api) {

  return {

    getEventsError() {},
    getEventsSuccess() {},
    getEvents(venue) {
      dispatch(actions.getEvents);

      return api
        .fetch(`venues/${venue._id}/events`)
        .tap(payload => dispatch(actions.getEventsSuccess, payload))
        .catch(err => {
          dispatch([actions.getEventsError, app.apiError], err);
          throw err;
        });
    },

    selectEvent(event) {
      dispatch(actions.selectEvent, event);
    }

  };

}
